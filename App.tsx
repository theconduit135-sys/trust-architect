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
import { Pricing } from './components/Pricing';
import { LoginModal } from './components/LoginModal';
import { Star, Shield, LogOut, User, Lock } from 'lucide-react';

export type UserTier = 'FOUNDATION' | 'STRATEGIC' | 'SOVEREIGN';

export default function App() {
  const [mode, setMode] = useState<AppMode>(AppMode.WIZARD);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userTier, setUserTier] = useState<UserTier>('SOVEREIGN'); // Defaulting to Sovereign for demo purposes

  const handleNavClick = (targetMode: AppMode) => {
    // 1. Basic Auth Check
    if (targetMode !== AppMode.WIZARD && !isLoggedIn) {
      setShowLogin(true);
      return;
    }

    // 2. Tier Restriction Check
    // Sovereign Only Modules: Iron Chain, Bulletproof, and Business Credit
    if (targetMode === AppMode.IRON_CHAIN || targetMode === AppMode.BULLETPROOF || targetMode === AppMode.BUSINESS_CREDIT) {
      if (userTier !== 'SOVEREIGN') {
        alert("This module requires the Sovereign package. Please upgrade to access the Iron Chain™, Bulletproof Trust, and Corporate Credit systems.");
        scrollToSection('features-section');
        return;
      }
    }

    setMode(targetMode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    // For demo purposes, we log them in as Sovereign so they can verify the features.
    // In a real app, this would be fetched from the backend.
    setUserTier('SOVEREIGN'); 
    setShowLogin(false);
    
    // Redirect logic
    if (mode === AppMode.WIZARD) {
        setMode(AppMode.TRUST_ARCHITECT);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setMode(AppMode.WIZARD);
    window.scrollTo(0, 0);
  };

  const NavButton = ({ targetMode, label, restrictedTo }: { targetMode: AppMode, label: string, restrictedTo?: UserTier | UserTier[] }) => {
     // Check lock status
     let isLocked = false;
     
     // If restrictions are defined
     if (restrictedTo) {
         if (Array.isArray(restrictedTo)) {
             // If userTier is NOT in the allowed array
             if (!restrictedTo.includes(userTier)) isLocked = true;
         } else {
             // Single tier check (strict)
             if (restrictedTo === 'SOVEREIGN' && userTier !== 'SOVEREIGN') isLocked = true;
             // If a module is Strategic+, Foundation is locked
             if (restrictedTo === 'STRATEGIC' && userTier === 'FOUNDATION') isLocked = true;
         }
     }
     
     const showLock = isLoggedIn && isLocked;

     return (
        <button
            onClick={() => handleNavClick(targetMode)}
            className={`px-4 py-2 text-sm flex items-center space-x-1 ${mode === targetMode ? 'btn-nav active' : 'btn-nav'}`}
        >
            <span>{label}</span>
            {showLock && <Lock className="w-3 h-3 text-slate-400" />}
        </button>
     );
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F9FF] flex flex-col font-sans">
      {/* Top Notification Bar */}
      {!isLoggedIn && (
        <div className="bg-orange-400 text-white text-xs md:text-sm font-bold text-center py-2 px-4 cursor-pointer" onClick={() => scrollToSection('features-section')}>
          Protect Your Assets Today. Foundation Plans start at $249 (One-Time). <span className="underline">Get Started</span>
        </div>
      )}

      {/* Header / Navbar */}
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo Area */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setMode(AppMode.WIZARD)}>
            <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col leading-none">
               <span className="font-display font-bold text-xl text-brandBlue-900 tracking-tight">TrustArchitect</span>
               <span className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">Software</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavButton targetMode={AppMode.WIZARD} label="Strategy" />
            <NavButton targetMode={AppMode.TRUST_ARCHITECT} label="Builder" />
            {/* Business Credit is now SOVEREIGN only */}
            <NavButton targetMode={AppMode.BUSINESS_CREDIT} label="Credit" restrictedTo="SOVEREIGN" />
            <NavButton targetMode={AppMode.IRON_CHAIN} label="Iron Chain™" restrictedTo="SOVEREIGN" />
            <NavButton targetMode={AppMode.BULLETPROOF} label="Bulletproof" restrictedTo="SOVEREIGN" />
            <NavButton targetMode={AppMode.TEMPLATES} label="Templates" />
            <NavButton targetMode={AppMode.EDUCATION} label="Academy" />
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
             {isLoggedIn ? (
                 <div className="flex items-center space-x-3">
                    <div className="hidden lg:flex flex-col items-end text-right">
                        <span className="text-xs font-bold text-slate-400 uppercase">{userTier} Member</span>
                        <span className="text-sm font-bold text-brandBlue-900">John Doe</span>
                    </div>
                    <div className="w-10 h-10 bg-brandBlue-50 rounded-full flex items-center justify-center border border-brandBlue-100">
                        <User className="w-5 h-5 text-brandBlue-600" />
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="text-slate-400 hover:text-red-500 p-2"
                        title="Logout"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                 </div>
             ) : (
                <>
                    <button 
                        onClick={() => setShowLogin(true)}
                        className="hidden lg:block text-brandBlue-900 font-semibold hover:text-brandBlue-500 text-sm"
                    >
                        Login
                    </button>
                    <button 
                        onClick={() => scrollToSection('wizard-section')}
                        className="btn-primary px-6 py-2.5 text-sm shadow-orange-200"
                    >
                        GET STARTED
                    </button>
                </>
             )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Dynamic Title Section */}
        {mode !== AppMode.WIZARD && (
            <div className="mb-8">
                <h1 className="text-3xl font-display font-bold text-brandBlue-900">{mode.replace(/_/g, ' ')}</h1>
                <div className="h-1 w-20 bg-orange-400 rounded-full mt-2"></div>
            </div>
        )}

        {mode === AppMode.WIZARD && (
          <div className="animate-fade-in-up">
            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row items-center mb-16 gap-12">
                <div className="flex-1 text-center lg:text-left space-y-6">
                    <div className="inline-flex items-center space-x-1 text-orange-500 font-bold text-sm uppercase tracking-wide">
                        <span>Built For Scalability</span>
                        <div className="flex">
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                        </div>
                    </div>
                    
                    <h1 className="text-5xl lg:text-6xl font-display font-extrabold text-brandBlue-900 leading-tight">
                        Empower Your <span className="text-brandBlue-500">Wealth</span> <br/>
                        <span className="text-black">Architecture Today</span>
                    </h1>
                    
                    <p className="text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                        Start or manage your asset protection strategy with our <strong>all-in-one Trust Architect</strong> software designed to simplify your workflow and secure your legacy.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                        <button 
                            onClick={() => scrollToSection('wizard-section')} 
                            className="btn-primary px-8 py-4 text-lg w-full sm:w-auto"
                        >
                            Start Architecture
                        </button>
                        <button 
                            onClick={() => scrollToSection('features-section')}
                            className="btn-secondary px-8 py-4 text-lg w-full sm:w-auto"
                        >
                            View Features
                        </button>
                    </div>

                    <div className="flex items-center justify-center lg:justify-start space-x-2 text-sm font-semibold text-slate-700 pt-4">
                        <div className="flex items-center text-orange-500"><Star className="w-5 h-5 fill-current" /></div>
                        <span>One-time Payment</span>
                        <span className="mx-2 text-slate-300">|</span>
                        <div className="flex items-center text-orange-500"><Star className="w-5 h-5 fill-current" /></div>
                        <span>Lifetime Access</span>
                    </div>
                </div>
                
                <div className="flex-1 relative">
                    {/* Abstract Background Blobs */}
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-50 to-orange-50 rounded-full blur-3xl opacity-50 -z-10"></div>
                    <img 
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                        alt="Dashboard Preview" 
                        className="rounded-2xl shadow-2xl border-4 border-white transform rotate-1 hover:rotate-0 transition-transform duration-500"
                    />
                </div>
            </div>

            {/* Wizard Component */}
            <div id="wizard-section" className="max-w-4xl mx-auto scroll-mt-24">
                 <Wizard onNavigate={handleNavClick} />
            </div>
            
            {/* Pricing Section */}
            <div id="features-section" className="mt-24 scroll-mt-24">
                <Pricing />
            </div>
          </div>
        )}
        
        {mode === AppMode.TRUST_ARCHITECT && <TrustArchitect />}
        {mode === AppMode.IRON_CHAIN && <IronChain />}
        {mode === AppMode.BULLETPROOF && <BulletproofTrust />}
        {mode === AppMode.BUSINESS_CREDIT && <BusinessCredit />}
        {mode === AppMode.TEMPLATES && <TemplateLibrary />}
        {mode === AppMode.EDUCATION && <div className="animate-fade-in"><Education /></div>}
      </main>

      {/* Floating Widgets */}
      <VoiceWidget />
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
        onLogin={handleLogin}
        onGoToPricing={() => {
            setShowLogin(false);
            setMode(AppMode.WIZARD);
            // Small delay to allow mode switch render
            setTimeout(() => scrollToSection('features-section'), 100);
        }}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="flex justify-center items-center space-x-2 mb-6">
                <Shield className="w-6 h-6 text-orange-500" />
                <span className="font-display font-bold text-xl text-brandBlue-900">TrustArchitect</span>
            </div>
            <p className="text-slate-500 text-sm max-w-md mx-auto mb-8">
                Empowering individuals to take control of their sovereign wealth architecture through AI-driven design.
            </p>
            <div className="flex justify-center space-x-8 text-sm font-semibold text-brandBlue-900">
                <button onClick={() => {
                    if(mode !== AppMode.WIZARD) setMode(AppMode.WIZARD);
                    setTimeout(() => scrollToSection('features-section'), 100);
                }} className="hover:text-orange-500 transition-colors">Features</button>
                
                <button onClick={() => {
                    if(mode !== AppMode.WIZARD) setMode(AppMode.WIZARD);
                    setTimeout(() => scrollToSection('features-section'), 100);
                }} className="hover:text-orange-500 transition-colors">Pricing</button>
                
                {!isLoggedIn && (
                    <button onClick={() => setShowLogin(true)} className="hover:text-orange-500 transition-colors">Login</button>
                )}
            </div>
            <p className="mt-8 text-xs text-slate-400">
                Powered by Google Gemini 2.5 Flash. Educational use only. Not legal advice.
            </p>
        </div>
      </footer>

      {/* Global Styles */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-scale-in {
            animation: scale-in 0.2s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-bounce-slow {
            animation: bounce-slow 3s infinite ease-in-out;
        }
        .glass-panel {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        html {
            scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}