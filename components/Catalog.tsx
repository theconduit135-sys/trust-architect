import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { createCheckoutSession, PRICE_IDS } from '../services/stripe';
import { LoginModal } from './LoginModal';
import { 
  Shield, 
  Layers, 
  Crown, 
  FileText, 
  Mic, 
  Zap, 
  Globe, 
  GraduationCap,
  Loader2,
  Check,
  ChevronRight
} from 'lucide-react';

export const Catalog: React.FC = () => {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const handlePurchase = async (tierId: string, priceId: string) => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    setIsProcessing(tierId);
    try {
        await createCheckoutSession(user.uid, priceId);
    } catch (err) {
        console.error("Stripe Error", err);
        setIsProcessing(null);
        alert("Payment process failed. Please ensure you are logged in with a valid account.");
    }
  };

  const tiers = [
    {
      id: 'foundation',
      name: 'Foundation',
      price: '$249',
      priceId: PRICE_IDS.FOUNDATION,
      description: 'The essential bedrock for family wealth and probate immunity.',
      icon: Shield,
      software: [
        'Revocable Living Trust Builder',
        'Business Trust Architect',
        'Irrevocable Instrument Drafter',
        'Estate Planning Blueprint'
      ],
      deliverables: [
        'Declaration of Trust (RLT)',
        'Privacy Certification',
        'Tangible Asset Assignments',
        'Trustee Banking Resolutions'
      ]
    },
    {
      id: 'strategic',
      name: 'Strategic',
      price: '$997',
      priceId: PRICE_IDS.STRATEGIC,
      description: 'Advanced anonymity for high-net-worth real estate investors.',
      icon: Layers,
      software: [
        'Everything in Foundation',
        'Privacy Land Trust Architect',
        'Aurelius AI Live Voice Advisor',
        'Nesting Doll Visualization'
      ],
      deliverables: [
        'Land Trust Agreements',
        'Anonymous Banking Protocols',
        'Privacy Address Registration',
        'Live Advisory Access'
      ]
    },
    {
      id: 'sovereign',
      name: 'Sovereign',
      price: '$1,997',
      priceId: PRICE_IDS.SOVEREIGN,
      description: 'Institutional-grade immunity for entrepreneurs and sovereigns.',
      icon: Crown,
      software: [
        'Everything in Strategic',
        'Iron Chain™ Multi-Entity System',
        'Asset Transfer (Financed & Leased)',
        'Bulletproof 508(c)(1)(A) Ministry',
        'Business Credit Mastery Tracker'
      ],
      deliverables: [
        'Wyoming Holding Company OAs',
        'Equitable Assignment Instruments',
        'Equity Stripping Documents',
        'Tier 1-3 Credit Database'
      ]
    }
  ];

  const powerCurriculum = [
    {
      title: 'Aurelius AI',
      desc: 'Interactive live legal logic consultation for sovereign strategy.',
      img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
      icon: Mic
    },
    {
      title: 'SWF Protocol',
      desc: "Institutional frameworks mirrored from the world's largest wealth funds.",
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
      icon: Globe
    },
    {
      title: 'Total Anonymity',
      desc: 'Hiding your situs and identity from the public gaze using tiered entities.',
      img: 'https://images.unsplash.com/photo-1554224155-1696413575b9?q=80&w=800&auto=format&fit=crop',
      icon: Shield
    },
    {
      title: 'Strategy Academy',
      desc: '100+ modules on jurisdictional arbitrage and private ministry systems.',
      img: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800&auto=format&fit=crop',
      icon: GraduationCap
    }
  ];

  return (
    <div className="space-y-24 animate-fade-in pb-20">
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} onLogin={() => setShowLogin(false)} onGoToPricing={() => setShowLogin(false)} />

      <div className="text-center max-w-4xl mx-auto space-y-6">
        <span className="text-brandBlue-600 font-black uppercase tracking-[0.3em] text-[10px] bg-white px-5 py-2 rounded-full border-2 border-brandBlue-600 shadow-sm">Infrastructure Deployment</span>
        <h2 className="text-5xl lg:text-7xl font-display font-black text-brandBlue-600 leading-tight">
          Select Your <span className="italic">Infrastructure.</span>
        </h2>
        <p className="text-xl text-slate-900 leading-relaxed max-w-2xl mx-auto font-bold">
          Own the legal blueprints used by the top 1%. One-time deployment fee. Lifetime architectural sovereignty.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {tiers.map((tier) => (
          <div key={tier.id} className={`bg-white rounded-[2.5rem] shadow-heavy overflow-hidden flex flex-col transition-all hover:-translate-y-2 border-2 ${tier.id === 'sovereign' ? 'border-brandBlue-600 ring-8 ring-brandBlue-50 scale-105 z-10' : 'border-slate-200'}`}>
            <div className="p-10 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center justify-between mb-8">
                <div className={`p-4 rounded-2xl shadow-xl border-2 ${tier.id === 'sovereign' ? 'bg-brandBlue-600 text-white border-brandBlue-800' : 'bg-white text-brandBlue-600 border-slate-200'}`}>
                  <tier.icon className="w-8 h-8" />
                </div>
                <div className="text-right">
                  <span className="block text-4xl font-black text-brandBlue-600 tracking-tight">{tier.price}</span>
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest block mt-1">Single Fee</span>
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">{tier.name}</h3>
              <p className="text-sm text-slate-900 font-bold leading-relaxed">{tier.description}</p>
            </div>

            <div className="p-10 space-y-12 flex-1">
                <div>
                    <h4 className="text-[10px] font-black text-brandBlue-600 uppercase tracking-[0.2em] mb-6 flex items-center">
                    <Zap className="w-4 h-4 mr-2" /> Software Modules
                    </h4>
                    <ul className="space-y-4">
                    {tier.software.map((s, i) => (
                        <li key={i} className="text-xs font-black flex items-start gap-4 text-brandBlue-600">
                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-brandBlue-600" />
                        {s}
                        </li>
                    ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-[10px] font-black text-brandBlue-600 uppercase tracking-[0.2em] mb-6 flex items-center">
                    <FileText className="w-4 h-4 mr-2" /> Documentation
                    </h4>
                    <ul className="space-y-4">
                    {tier.deliverables.map((d, i) => (
                        <li key={i} className="text-[11px] text-brandBlue-800 flex items-start gap-4 font-bold italic">
                        <div className="w-1.5 h-1.5 bg-brandBlue-600 rounded-full mt-2 flex-shrink-0"></div>
                        {d}
                        </li>
                    ))}
                    </ul>
                </div>
            </div>

            <div className="p-10 bg-slate-50 border-t-2 border-slate-100 mt-auto">
              <button 
                onClick={() => handlePurchase(tier.id, tier.priceId)}
                disabled={isProcessing === tier.id}
                className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl flex items-center justify-center gap-3 border-2 ${tier.id === 'sovereign' ? 'bg-brandBlue-600 text-white border-brandBlue-800 hover:bg-brandBlue-700' : 'bg-white text-brandBlue-600 border-brandBlue-600 hover:bg-brandBlue-50'}`}
              >
                {isProcessing === tier.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>Acquire {tier.name} Plan</span><ChevronRight className="w-4 h-4" /></>}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center space-y-4 mt-32">
        <span className="text-brandBlue-600 font-black uppercase tracking-[0.3em] text-[10px]">The Curriculum of Power</span>
        <h3 className="text-4xl font-display font-black text-slate-900">Advanced Strategic Capabilities</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {powerCurriculum.map((item, idx) => (
          <div key={idx} className="group relative h-[28rem] rounded-[2.5rem] overflow-hidden shadow-heavy border-2 border-slate-200 transition-all duration-700 hover:border-brandBlue-600">
            <img 
              src={item.img} 
              alt={item.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
              <div className="mb-6 bg-brandBlue-600 w-fit p-3 rounded-2xl border-2 border-brandBlue-400 shadow-xl group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6" />
              </div>
              <h5 className="text-2xl font-black mb-3 tracking-tight">{item.title}</h5>
              <p className="text-sm font-bold text-slate-200 leading-relaxed opacity-90">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};