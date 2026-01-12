import React, { useState } from 'react';
import { auth, googleProvider } from '../services/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, sendEmailVerification } from 'firebase/auth';
import { X, Lock, ArrowRight, Loader2, ShieldCheck, Mail, LogIn, CheckCircle2 } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onGoToPricing: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin, onGoToPricing }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        setVerificationSent(true);
        // We don't call onLogin yet because they need to verify
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        onLogin();
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      onLogin();
    } catch (err: any) {
      setError(err.message || "Google sign-in failed.");
    } finally {
      setIsLoading(false);
    }
  };

  if (verificationSent) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10 text-center animate-scale-in" onClick={e => e.stopPropagation()}>
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-display font-bold text-brandBlue-900 mb-4">Verify Your Email</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            A verification link has been sent to <strong>{email}</strong>. Please check your inbox and click the link to activate your account.
          </p>
          <button 
            onClick={onClose}
            className="btn-primary w-full py-4 text-lg"
          >
            I've Checked My Email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
            <X className="w-5 h-5" />
        </button>

        <div className="p-8 text-center border-b border-slate-100 bg-slate-50/50">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-orange-500" />
            </div>
            <h2 className="text-2xl font-display font-bold text-brandBlue-900">
                {isSignUp ? 'Create Architecture Account' : 'Member Access'}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
                {isSignUp ? 'Establish your Sovereign credentials.' : 'Please sign in to access your secure architecture.'}
            </p>
        </div>

        <div className="p-8">
            <button 
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full mb-6 flex items-center justify-center space-x-3 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-bold text-slate-700"
            >
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
              <span>Continue with Google</span>
            </button>

            <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 font-bold">Or with email</span></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                    <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sovereign@example.com"
                        className="w-full p-3 bg-white text-slate-900 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password</label>
                    <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full p-3 bg-white text-slate-900 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                </div>

                {error && <p className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}

                <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary py-3.5 flex items-center justify-center space-x-2 mt-6 shadow-lg"
                >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
                    <span>{isSignUp ? 'Sign Up & Verify Email' : 'Secure Sign In'}</span>
                </button>
            </form>

            <div className="mt-6 text-center space-y-4">
                <button 
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-brandBlue-600 text-sm font-bold hover:underline"
                >
                  {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
                </button>
                
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-xs text-slate-400 mb-2 font-medium">Restricted Access Environment</p>
                  <p className="text-[10px] text-slate-400 italic mb-3">Only verified, paid members may access the architecture engine.</p>
                  <button 
                      onClick={onGoToPricing}
                      className="text-orange-600 font-black text-xs uppercase tracking-widest hover:underline flex items-center justify-center mx-auto"
                  >
                      <span>Explore Sovereign Plans</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};