import React from 'react';
import { Check, Shield, Layers, Crown } from 'lucide-react';

export const Pricing: React.FC = () => {
  const tiers = [
    {
      name: "Foundation",
      price: "249",
      description: "Complete family estate plan & basic business structuring.",
      features: [
        "Lifetime Access to RLT Builder",
        "Business Trust Generator",
        "Irrevocable Trust Generator",
        "Pour-Over Will Generation",
        "Unlimited Updates & Edits",
        "Standard Templates Library",
        "PDF & DOCX Exports"
      ],
      icon: Shield,
      color: "blue",
      cta: "Buy Foundation"
    },
    {
      name: "Strategic",
      price: "997",
      description: "Advanced asset protection & anonymity.",
      features: [
        "Everything in Foundation",
        "Privacy Land Trust Generator",
        "Anonymous Banking Guide",
        "Aurelius AI Voice Advisor (Lifetime)",
        "Nesting Doll Protocol Guide"
      ],
      icon: Layers,
      color: "orange",
      cta: "Get Strategic Access",
      popular: true
    },
    {
      name: "Sovereign",
      price: "1,997",
      description: "Full Iron Chain™ implementation. Compare to Boutique Firms ($15k+).",
      features: [
        "Everything in Strategic",
        "Complete Iron Chain™ System",
        "Business Credit Builder (Net 30)",
        "Bulletproof 508(c)(1)(A) Trust",
        "Multi-Jurisdictional Structuring",
        "Holding & Operating Co. Agreements",
        "Equity Stripping Instruments"
      ],
      icon: Crown,
      color: "slate",
      cta: "Purchase Sovereign"
    }
  ];

  return (
    <div className="py-12 animate-fade-in">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl font-display font-bold text-brandBlue-900 mb-4">
          Own Your Infrastructure
        </h2>
        <p className="text-lg text-slate-600">
          Pay once, protect forever. Professional-grade legal engineering at a fraction of the cost of a retained law firm.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {tiers.map((tier, idx) => {
          const isPopular = tier.popular;
          return (
            <div 
              key={idx} 
              className={`relative bg-white rounded-2xl shadow-xl border transition-transform hover:-translate-y-2 duration-300 flex flex-col
                ${isPopular ? 'border-orange-400 ring-4 ring-orange-100 scale-105 z-10' : 'border-slate-200'}
              `}
            >
              {isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                  Best Value
                </div>
              )}

              <div className="p-8 border-b border-slate-100">
                <div className={`inline-flex p-3 rounded-xl mb-4 ${
                  tier.color === 'orange' ? 'bg-orange-100 text-orange-600' : 
                  tier.color === 'slate' ? 'bg-slate-800 text-white' : 'bg-blue-100 text-blue-600'
                }`}>
                  <tier.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-brandBlue-900">{tier.name}</h3>
                <p className="text-slate-500 text-sm mt-2">{tier.description}</p>
                <div className="mt-6 flex flex-col">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-extrabold text-brandBlue-900">${tier.price}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">One-Time Payment</span>
                </div>
              </div>

              <div className="p-8 flex-1">
                <ul className="space-y-4">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-600 text-sm font-medium">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 pt-0">
                <button className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg
                  ${tier.color === 'orange' ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-orange-200' : 
                    tier.color === 'slate' ? 'bg-brandBlue-900 text-white hover:bg-brandBlue-800 shadow-slate-200' : 
                    'bg-white text-brandBlue-600 border-2 border-brandBlue-100 hover:border-brandBlue-300'}
                `}>
                  {tier.cta}
                </button>
                <p className="text-center text-[10px] text-slate-400 mt-3">
                  Secure checkout. 30-day money-back guarantee.
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};