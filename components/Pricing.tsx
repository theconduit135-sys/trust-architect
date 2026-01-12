import React from 'react';
import { Check, Shield, Layers, Crown } from 'lucide-react';

export const Pricing: React.FC = () => {
  const tiers = [
    {
      name: "Foundation",
      price: "249",
      description: "Essential family estate plan and basic business structuring.",
      features: [
        "Lifetime RLT Builder Access",
        "Business Trust Architect",
        "Irrevocable Instrument Drafter",
        "Pour-Over Will Generation",
        "Unlimited Blueprint Updates",
        "Standard Templates Library",
        "PDF & DOCX Export Suite"
      ],
      icon: Shield,
      color: "navy",
      cta: "Acquire Foundation"
    },
    {
      name: "Strategic",
      price: "997",
      description: "Advanced anonymity protocols for significant portfolios.",
      features: [
        "Everything in Foundation",
        "Privacy Land Trust Generator",
        "Anonymous Banking Protocol",
        "Aurelius AI Voice Advisor",
        "Nesting Doll Protocol Guide",
        "Private Address Setup"
      ],
      icon: Layers,
      color: "gold",
      cta: "Unlock Strategic",
      popular: true
    },
    {
      name: "Sovereign",
      price: "1,997",
      description: "Institutional Iron Chain™ implementation and ministry systems.",
      features: [
        "Everything in Strategic",
        "Iron Chain™ Multi-Tier System",
        "Asset Transfer (Financed/Leased Assets)",
        "Business Credit Builder (Non-PG)",
        "Bulletproof 508(c)(1)(A) Ministry",
        "Wyoming Holding Co. Instruments",
        "Equity Stripping Architect",
        "Debt-Shielding Instruments"
      ],
      icon: Crown,
      color: "navy-gold",
      cta: "Purchase Sovereign"
    }
  ];

  return (
    <div className="py-20 animate-fade-in space-y-20">
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <span className="text-gold-500 font-bold uppercase tracking-[0.2em] text-[10px]">Infrastructure Design</span>
        <h2 className="text-5xl font-display font-bold text-navy-900 leading-tight">
          Own Your Wealth <span className="text-gradient-gold">Infrastructure</span>
        </h2>
        <p className="text-xl text-slate-500">
          Professional-grade legal engineering. Pay once, protect forever.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto px-4">
        {tiers.map((tier, idx) => {
          const isPopular = tier.popular;
          return (
            <div 
              key={idx} 
              className={`relative bg-white rounded-2xl border transition-all duration-500 flex flex-col hover:-translate-y-2
                ${isPopular ? 'border-gold-500 ring-8 ring-gold-500/5 scale-105 z-10 shadow-premium-hover' : 'border-slate-200 shadow-premium'}
              `}
            >
              {isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold-500 text-navy-900 px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                  Most Strategic
                </div>
              )}

              <div className="p-10 border-b border-slate-100 bg-slate-50/30">
                <div className={`inline-flex p-4 rounded-2xl mb-6 shadow-md ${
                  tier.color === 'gold' ? 'bg-gold-500 text-navy-900' : 
                  tier.color === 'navy-gold' ? 'bg-navy-900 text-gold-500' : 'bg-slate-100 text-navy-900'
                }`}>
                  <tier.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-navy-900">{tier.name}</h3>
                <p className="text-slate-500 text-sm mt-3 font-medium leading-relaxed">{tier.description}</p>
                <div className="mt-8">
                  <span className="text-4xl font-black text-navy-900 tracking-tight">${tier.price}</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mt-1">Single Deployment Fee</span>
                </div>
              </div>

              <div className="p-10 flex-1 space-y-4">
                <ul className="space-y-4">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-start">
                      <Check className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${feat.includes('Financed') ? 'text-gold-500' : 'text-slate-300'}`} />
                      <span className={`text-sm font-semibold ${feat.includes('Financed') ? 'text-gold-600' : 'text-slate-600'}`}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-10 pt-0">
                <button className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg
                  ${tier.color === 'gold' ? 'bg-gold-500 text-navy-900 hover:bg-gold-600' : 
                    tier.color === 'navy-gold' ? 'btn-premium-gold' : 
                    'btn-premium-navy'}
                `}>
                  {tier.cta}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};