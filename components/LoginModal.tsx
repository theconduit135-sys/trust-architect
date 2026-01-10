import React, { useState } from 'react';
import { X, Lock, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';

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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API authentication delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

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
            <h2 className="text-2xl font-display font-bold text-brandBlue-900">Member Access</h2>
            <p className="text-slate-500 text-sm mt-1">Please sign in to access your secure architecture.</p>
        </div>

        <div className="p-8">
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

                <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary py-3 flex items-center justify-center space-x-2 mt-6 shadow-lg"
                >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
                    <span>Secure Sign In</span>
                </button>
            </form>

            <div className="mt-6 text-center border-t border-slate-100 pt-6">
                <p className="text-sm text-slate-500 mb-3">Don't have a Sovereign Plan?</p>
                <button 
                    onClick={onGoToPricing}
                    className="text-orange-600 font-bold text-sm hover:underline flex items-center justify-center mx-auto"
                >
                    <span>View Access Plans</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};