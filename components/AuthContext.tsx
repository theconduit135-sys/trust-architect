import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../services/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { UserTier } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userTier: UserTier | null;
  hasActivePurchase: boolean;
  emailVerified: boolean;
  usedTemplateIds: string[];
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  userTier: null,
  hasActivePurchase: false,
  emailVerified: false,
  usedTemplateIds: [],
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userTier, setUserTier] = useState<UserTier | null>(null);
  const [hasActivePurchase, setHasActivePurchase] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [usedTemplateIds, setUsedTemplateIds] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setEmailVerified(firebaseUser?.emailVerified || false);
      
      if (!firebaseUser) {
        setLoading(false);
        setUserTier(null);
        setHasActivePurchase(false);
        setUsedTemplateIds([]);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) return;

    // Listen to subscriptions/payments to determine Tier
    const subsRef = collection(db, 'customers', user.uid, 'subscriptions');
    const q = query(subsRef, where('status', 'in', ['active', 'trialing']));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setHasActivePurchase(true);
        const subData = snapshot.docs[0].data();
        const priceId = subData.items?.[0]?.price?.id;

        if (priceId === 'price_1SoG37GbGCeV7JdZFgztajpB') setUserTier('SOVEREIGN');
        else if (priceId === 'price_1SoG0AGbGCeV7JdZCPvjIz2y') setUserTier('STRATEGIC');
        else if (priceId === 'price_1SoFyEGbGCeV7JdZYJrapUA0') setUserTier('FOUNDATION');
      } else {
        const paymentsRef = collection(db, 'customers', user.uid, 'payments');
        const qPay = query(paymentsRef, where('status', '==', 'succeeded'));
        
        onSnapshot(qPay, (paySnap) => {
            if (!paySnap.empty) {
                setHasActivePurchase(true);
                const payData = paySnap.docs[0].data();
                const priceId = payData.items?.[0]?.price?.id;
                if (priceId === 'price_1SoG37GbGCeV7JdZFgztajpB') setUserTier('SOVEREIGN');
                else if (priceId === 'price_1SoG0AGbGCeV7JdZCPvjIz2y') setUserTier('STRATEGIC');
                else if (priceId === 'price_1SoFyEGbGCeV7JdZYJrapUA0') setUserTier('FOUNDATION');
            } else {
                setHasActivePurchase(false);
                setUserTier(null);
            }
        });
      }
    });

    // Listen to template usage
    const usageRef = collection(db, 'customers', user.uid, 'usage');
    const unsubscribeUsage = onSnapshot(usageRef, (snapshot) => {
        const ids = snapshot.docs.map(doc => doc.id);
        setUsedTemplateIds(ids);
        setLoading(false);
    });

    return () => {
        unsubscribe();
        unsubscribeUsage();
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, userTier, hasActivePurchase, emailVerified, usedTemplateIds }}>
      {children}
    </AuthContext.Provider>
  );
};
