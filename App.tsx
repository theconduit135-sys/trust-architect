import React, { useState } from 'react';
import { AppMode } from './types';
import { Wizard } from './components/Wizard';
import { IronChain } from './components/IronChain';
import { TrustArchitect } from './components/TrustArchitect';
import { BulletproofTrust } from './components/BulletproofTrust';
import { BusinessCredit } from './components/BusinessCredit';
import { Education } from './components/Education';
import { TemplateLibrary } from './components/TemplateLibrary';
import { VoiceWidget } from './components/VoiceWidget';
import { Catalog } from './components/Catalog';
import { LoginModal } from './components/LoginModal';
import { AssetTransfer } from './components/AssetTransfer';
import { useAuth } from './components/AuthContext';
import { auth } from './services/firebase';
import { signOut, sendEmailVerification } from 'firebase/auth';
import { Star, Shield, LogOut, User, Lock, Loader2, Compass, ChevronRight, CheckCircle, HelpCircle, Zap, Globe, UserCheck, ShieldCheck, Briefcase, Landmark } from 'lucide-react';

export default function App() {
  const [mode, setMode] = useState<AppMode>(AppMode.WIZARD);
  const [showLogin, setShowLogin] = useState(false);
  const { user, loading, userTier, hasActivePurchase, emailVerified } = useAuth();

  const handleNavClick = (targetMode: AppMode) => {
    // Ungated sections: Wizard (Assessment), Catalog (Pricing), and Education
    if (targetMode === AppMode.WIZARD || targetMode === AppMode.CATALOG || targetMode === AppMode.EDUCATION) {
      setMode(targetMode);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!user) {
      setShowLogin(true);
      return;
    }

    if (!emailVerified) {
      alert("Verification Required: Please check your email for the confirmation link.");
      return;
    }

    if (!hasActivePurchase) {
      setMode(AppMode.CATALOG);
      return;
    }
    
    setMode(targetMode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-brandBlue-600 animate-spin mb-4" />
        <p className="text-slate-900 font-bold uppercase tracking-widest text-[10px]">Securely Opening Your Workspace...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-brandBlue-100">
      {/* Upper Security Banner */}
      <div className="bg-brandBlue-900 text-white text-[10px] font-black py-2.5 px-6 flex items-center justify-center space-x-8 relative z-10 tracking-[0.15em]">
        <span className="flex items-center gap-2 opacity-90">
          <Lock className="w-3.5 h-3.5 text-wealth-400" /> AES-256 BANK-GRADE ENCRYPTION
        </span>
        <span className="hidden md:inline-flex items-center gap-2 opacity-90">
          <ShieldCheck className="w-3.5 h-3.5 text-wealth-400" /> GUARANTEED ASSET PRIVACY
        </span>
        {user && !emailVerified && (
          <button onClick={() => sendEmailVerification(user!)} className="text-wealth-400 underline hover:text-white transition-colors">
            Resend Verification Link
          </button>
        )}
      </div>

      <header className="glass-morphism sticky top-0 z-50 px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setMode(AppMode.WIZARD)}>
          <div className="bg-brandBlue-600 p-2.5 rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col leading-none">
             <span className="font-display font-extrabold text-2xl tracking-tight text-slate-900">WealthBuilder</span>
             <span className="text-[9px] text-brandBlue-600 font-black uppercase tracking-[0.25em] mt-1">Sovereign Asset Protection</span>
          </div>
        </div>
        
        <nav className="hidden lg:flex items-center space-x-1">
          {[
            { mode: AppMode.WIZARD, label: '1. Strategic Design' },
            { mode: AppMode.TRUST_ARCHITECT, label: '2. Architecture' },
            { mode: AppMode.TEMPLATES, label: '3. Legal Library' },
            { mode: AppMode.CATALOG, label: 'Pricing' }
          ].map((item) => (
            <button 
              key={item.mode}
              onClick={() => handleNavClick(item.mode)} 
              className={`px-5 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all rounded-xl hover:bg-slate-200 ${mode === item.mode ? 'text-brandBlue-600 bg-white shadow-sm border-2 border-brandBlue-600' : 'text-slate-900'}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-5">
           {user ? (
               <div className="flex items-center space-x-4">
                  <div className="hidden xl:flex flex-col items-end text-right">
                      <span className="text-[9px] font-black text-brandBlue-600 uppercase tracking-[0.1em]">{userTier || 'FREE'} ACCESS</span>
                      <span className="text-xs font-bold text-slate-900">{user.email?.split('@')[0]}</span>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-white border-2 border-slate-300 flex items-center justify-center text-slate-900 shadow-sm">
                      <User className="w-5 h-5" />
                  </div>
                  <button onClick={() => signOut(auth)} className="text-slate-900 hover:text-red-600 p-2 transition-colors">
                      <LogOut className="w-5 h-5" />
                  </button>
               </div>
           ) : (
              <button onClick={() => setShowLogin(true)} className="btn-primary px-8 py-3 text-[11px] uppercase tracking-[0.15em] shadow-lg">
                  Deploy Shield
              </button>
           )}
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 lg:py-20 relative z-10">
        {mode === AppMode.WIZARD && (
          <div className="animate-fade-in space-y-24">
            <div className="max-w-4xl mx-auto text-center space-y-8">
                <div className="inline-flex items-center space-x-3 text-brandBlue-600 font-black text-[10px] uppercase tracking-[0.3em] bg-white px-5 py-2 rounded-full border-2 border-brandBlue-600 shadow-sm">
                    <Star className="w-3.5 h-3.5 text-wealth-500 fill-current" />
                    <span>Asset Design Advisor • Phase 1 of 6</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-display font-extrabold text-slate-900 leading-[1.05] tracking-tight">
                    Shield your assets. <br />
                    <span className="text-gradient-blue italic">Secure your legacy.</span>
                </h1>
                
                <p className="text-xl text-slate-900 leading-relaxed max-w-2xl mx-auto font-bold">
                    WealthBuilder provides the professional legal blueprints used by elite owners to protect their houses, businesses, and family holdings. One platform for total asset security.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-5 justify-center pt-4">
                    <button onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })} className="btn-primary px-12 py-5 text-sm flex items-center gap-3 shadow-2xl group border-2 border-brandBlue-800">
                        <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
                        START MY ASSET EVALUATION
                    </button>
                    <button onClick={() => setMode(AppMode.EDUCATION)} className="px-12 py-5 text-sm font-black border-2 border-slate-900 rounded-2xl bg-white hover:bg-slate-900 hover:text-white transition-all flex items-center gap-2 group shadow-sm text-slate-900">
                        Explore the Protocol
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
                
                {/* Marketing-focused feature blocks */}
                <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                  <div className="p-8 bg-white rounded-[2rem] border-2 border-slate-200 shadow-premium flex flex-col gap-5 hover:border-brandBlue-600 transition-all duration-500 group">
                    <div className="w-12 h-12 bg-brandBlue-50 rounded-2xl flex items-center justify-center text-brandBlue-600 shadow-inner group-hover:scale-110 transition-transform">
                        <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base">Instant Document Engine</h4>
                      <p className="text-sm text-slate-900 mt-2 leading-relaxed font-semibold">Generate complete legal packets—from Private Trusts to Asset Assignments—in under 5 minutes.</p>
                    </div>
                  </div>
                  <div className="p-8 bg-white rounded-[2rem] border-2 border-slate-200 shadow-premium flex flex-col gap-5 hover:border-wealth-500 transition-all duration-500 group">
                    <div className="w-12 h-12 bg-wealth-50 rounded-2xl flex items-center justify-center text-wealth-600 shadow-inner group-hover:scale-110 transition-transform">
                        <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base">Strategic Asset Layering</h4>
                      <p className="text-sm text-slate-900 mt-2 leading-relaxed font-semibold">Implement multi-state jurisdictional protocols like the Iron Chain™ to isolate risk and hide ownership.</p>
                    </div>
                  </div>
                  <div className="p-8 bg-white rounded-[2rem] border-2 border-slate-200 shadow-premium flex flex-col gap-5 hover:border-emerald-600 transition-all duration-500 group">
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner group-hover:scale-110 transition-transform">
                        <UserCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base">AI-Guided Analysis</h4>
                      <p className="text-sm text-slate-900 mt-2 leading-relaxed font-semibold">Our 'Aurelius' advisor uses expert legal logic to guide you to the perfect structure for your unique asset profile.</p>
                    </div>
                  </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto pt-10" id="wizard-start">
                 <Wizard onNavigate={handleNavClick} />
            </div>
          </div>
        )}
        
        {mode === AppMode.TRUST_ARCHITECT && <TrustArchitect />}
        {mode === AppMode.IRON_CHAIN && <IronChain />}
        {mode === AppMode.BULLETPROOF && <BulletproofTrust />}
        {mode === AppMode.BUSINESS_CREDIT && <BusinessCredit />}
        {mode === AppMode.TEMPLATES && <TemplateLibrary />}
        {mode === AppMode.EDUCATION && <Education />}
        {mode === AppMode.CATALOG && <Catalog />}
        {mode === AppMode.ASSET_TRANSFER && <AssetTransfer />}
      </main>

      <VoiceWidget />
      
      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
        onLogin={() => setShowLogin(false)} 
        onGoToPricing={() => { setShowLogin(false); setMode(AppMode.CATALOG); }} 
      />

      <footer className="border-t-2 border-slate-300 py-20 mt-auto bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-8 text-center space-y-12">
            <div className="flex flex-col items-center justify-center space-y-2 group">
              <div className="bg-brandBlue-600 p-2 rounded-xl mb-4 border-2 border-brandBlue-800">
                  <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="font-display font-extrabold text-2xl text-slate-900">WealthBuilder</div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brandBlue-600">Sovereign Asset Infrastructure</div>
            </div>

            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-[11px] font-black uppercase tracking-[0.15em] text-slate-900">
                <button onClick={() => setMode(AppMode.CATALOG)} className="hover:text-brandBlue-600 transition-colors">Strategic Plans</button>
                <button onClick={() => setMode(AppMode.EDUCATION)} className="hover:text-brandBlue-600 transition-colors">Protocol Academy</button>
                <button onClick={() => setMode(AppMode.TEMPLATES)} className="hover:text-brandBlue-600 transition-colors">Asset Instruments</button>
                <button onClick={() => setMode(AppMode.ASSET_TRANSFER)} className="hover:text-brandBlue-600 transition-colors">Property Transfer</button>
            </div>

            <div className="bg-slate-100 p-10 rounded-[2.5rem] border-2 border-slate-300 max-w-3xl mx-auto shadow-inner">
              <p className="text-xs leading-relaxed text-slate-900 font-bold italic">
                Advanced AI Infrastructure • Expert Legal Logic • Designed for Pure Asset Defense
              </p>
              <p className="text-[10px] text-slate-900 mt-4 font-black uppercase tracking-[0.2em]">
                WealthBuilder is a software platform for educational and structural generation purposes only. This platform is not a law firm and does not provide legal or tax advice.
              </p>
              <div className="flex items-center justify-center gap-4 mt-8 opacity-100 grayscale-0 transition-all duration-700">
                  <ShieldCheck className="w-5 h-5 text-brandBlue-600" />
                  <Briefcase className="w-5 h-5 text-brandBlue-600" />
                  <Landmark className="w-5 h-5 text-brandBlue-600" />
                  <CheckCircle className="w-5 h-5 text-brandBlue-600" />
              </div>
            </div>
            
            <p className="text-[9px] font-black text-slate-900 uppercase tracking-widest">
              Aurelius v3.2 • Secure Deployment Active
            </p>
        </div>
      </footer>
    </div>
  );
}