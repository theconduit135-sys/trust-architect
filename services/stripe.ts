import { db } from './firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

export async function createCheckoutSession(uid: string, priceId: string) {
  try {
    const checkoutSessionsRef = collection(db, 'customers', uid, 'checkout_sessions');
    
    const docRef = await addDoc(checkoutSessionsRef, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
      client_reference_id: uid,
    });

    // Wait for the extension to create the session URL
    onSnapshot(docRef, (snap) => {
      const data = snap.data();
      if (data && data.url) {
        window.location.assign(data.url);
      }
      if (data && data.error) {
        console.error(`Stripe Error: ${data.error.message}`);
        alert("Payment gateway error. Please try again.");
      }
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    alert("Could not initialize checkout. Please try again.");
  }
}

export const PRICE_IDS = {
  FOUNDATION: 'price_1SoFyEGbGCeV7JdZYJrapUA0',
  STRATEGIC: 'price_1SoG0AGbGCeV7JdZCPvjIz2y',
  SOVEREIGN: 'price_1SoG37GbGCeV7JdZFgztajpB',
};
