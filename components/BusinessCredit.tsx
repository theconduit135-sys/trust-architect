import React, { useState } from 'react';
import { CheckCircle, Circle, TrendingUp, Building2, CreditCard, ShieldCheck, AlertCircle, ArrowRight, Lock, ExternalLink, Zap } from 'lucide-react';

// --- The Credit Database ---
interface CreditStep {
  id: string;
  category: 'FOUNDATION' | 'REGISTRATION' | 'TIER_1' | 'TIER_2' | 'TIER_3' | 'TIER_PG';
  title: string;
  description: string;
  actionUrl?: string;
  vendors?: { name: string; reportsTo: string[]; link: string }[];
}

const CREDIT_DATABASE: CreditStep[] = [
  {
    id: 'f1',
    category: 'FOUNDATION',
    title: 'Professional Contact Data',
    description: 'Banks reject applications with residential data. You must have a dedicated business phone (listed with 411) and a professional email domain (no Gmail/Yahoo).',
  },
  {
    id: 'f2',
    category: 'FOUNDATION',
    title: 'Physical Address Consistency',
    description: 'Do not use a PO Box. Use a Virtual Office or Physical Address. Ensure this exact address matches your Secretary of State filing, IRS records, and Bank Account perfectly.',
    actionUrl: 'https://www.wyomingagents.com/'
  },
  {
    id: 'r1',
    category: 'REGISTRATION',
    title: 'Get D-U-N-S Number',
    description: 'Dun & Bradstreet is the primary credit bureau for businesses. You need a D-U-N-S number to build a Paydex score.',
    actionUrl: 'https://www.dnb.com/duns-number/get-a-duns.html'
  },
  {
    id: 'r2',
    category: 'REGISTRATION',
    title: 'Business Bank Account Rating',
    description: 'Maintain a "Low 5" bank rating. This means keeping an average daily balance of at least $10,000 for 3 months to trigger internal bank scoring.',
  },
  {
    id: 't1',
    category: 'TIER_1',
    title: 'Tier 1: Net-30 Vendors',
    description: 'These vendors extend credit to anyone with an EIN. Buy small items ($50+), pay the invoice in full 15 days early. Do this for 3 months.',
    vendors: [
      { name: 'Uline', reportsTo: ['D&B', 'Experian'], link: 'https://www.uline.com' },
      { name: 'Quill', reportsTo: ['D&B'], link: 'https://www.quill.com' },
      { name: 'Grainger', reportsTo: ['D&B'], link: 'https://www.grainger.com' },
      { name: 'The CEO Creative', reportsTo: ['D&B', 'Equifax'], link: 'https://theceocreative.com' },
      { name: 'Summa Office Supplies', reportsTo: ['Equifax'], link: 'https://summaofficesupplies.com' }
    ]
  },
  {
    id: 't2',
    category: 'TIER_2',
    title: 'Tier 2: Store Credit Cards',
    description: 'After 3-4 tradelines report on Tier 1 (approx 90 days), apply for store cards. These usually require a Personal Guarantee (PG) unless your Paydex is 80+.',
    vendors: [
      { name: 'Amazon Net 55', reportsTo: ['D&B', 'Experian', 'Equifax'], link: 'https://amazon.com' },
      { name: 'Sam\'s Club Business', reportsTo: ['D&B', 'Experian', 'Equifax'], link: 'https://samsclub.com' },
      { name: 'Lowe\'s Pro', reportsTo: ['D&B', 'Experian'], link: 'https://lowes.com' }
    ]
  },
  {
    id: 't3',
    category: 'TIER_3',
    title: 'Tier 3: Cash & Fleet Cards',
    description: 'The Holy Grail. Visa/Mastercard financing without a Personal Guarantee. Requires 10+ reporting tradelines and $10k+ limits on Tier 2 cards.',
    vendors: [
      { name: 'Divvy / Bill.com', reportsTo: ['D&B', 'Experian'], link: 'https://getdivvy.com' },
      { name: 'Brex', reportsTo: ['Experian', 'D&B'], link: 'https://brex.com' },
      { name: 'Amex Corporate', reportsTo: ['D&B', 'Experian', 'Equifax'], link: 'https://americanexpress.com' }
    ]
  },
  {
    id: 'pg1',
    category: 'TIER_PG',
    title: 'Accelerated Funding (PG)',
    description: 'Skip the line by leveraging your personal credit (680+ FICO). These cards report to business bureaus but require a Personal Guarantee.',
    vendors: [
      { name: 'Chase Ink Business Preferred', reportsTo: ['Experian Biz'], link: 'https://creditcards.chase.com/business-credit-cards' },
      { name: 'Amex Business Gold', reportsTo: ['D&B', 'Experian', 'Equifax'], link: 'https://www.americanexpress.com/us/credit-cards/business/' },
      { name: 'Capital One Spark', reportsTo: ['All 3 Personal Bureaus'], link: 'https://www.capitalone.com/small-business/credit-cards/' }
    ]
  }
];

export const BusinessCredit: React.FC = () => {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [strategy, setStrategy] = useState<'SOVEREIGN' | 'ACCELERATED'>('SOVEREIGN');

  const toggleStep = (id: string) => {
    setCompleted(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const activeSteps = CREDIT_DATABASE.filter(step => {
     if (strategy === 'SOVEREIGN') return step.category !== 'TIER_PG';
     return true; 
  });

  const progress = Math.round((Object.values(completed).filter(Boolean).length / activeSteps.length) * 100);

  const renderSection = (title: string, category: string, icon: any, colorClass: string) => {
    const steps = CREDIT_DATABASE.filter(s => s.category === category);
    if (steps.length === 0) return null;
    
    // If sovereign mode, skip PG tier
    if (strategy === 'SOVEREIGN' && category === 'TIER_PG') return null;

    const Icon = icon;

    return (
      <div className="mb-12">
        <div className={`flex items-center space-x-3 mb-6 pb-2 border-b border-slate-200 ${colorClass}`}>
          <Icon className="w-6 h-6" />
          <h3 className="text-2xl font-display font-bold text-brandBlue-900">{title}</h3>
        </div>

        <div className="space-y-6">
          {steps.map(step => {
            const isChecked = !!completed[step.id];
            return (
              <div 
                key={step.id} 
                className={`group card-modern p-6 border-l-4 transition-all duration-300 ${isChecked ? 'border-l-green-500 bg-slate-50 opacity-75' : 'border-l-slate-300 bg-white hover:border-l-orange-400'}`}
              >
                <div className="flex items-start space-x-4">
                  <button 
                    onClick={() => toggleStep(step.id)}
                    className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isChecked ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300 text-transparent hover:border-orange-400'}`}
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-lg font-bold ${isChecked ? 'text-slate-500 line-through' : 'text-brandBlue-900'}`}>
                        {step.title}
                      </h4>
                      {step.actionUrl && (
                        <a href={step.actionUrl} target="_blank" rel="noreferrer" className="text-xs font-bold text-orange-500 hover:text-orange-600 flex items-center uppercase tracking-wide">
                          Action <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      )}
                    </div>
                    
                    <p className="text-slate-600 mt-2 text-sm leading-relaxed">
                      {step.description}
                    </p>

                    {/* Vendor Table if exists */}
                    {step.vendors && (
                      <div className="mt-4 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                        <table className="w-full text-sm text-left">
                          <thead className="bg-slate-200 text-slate-600 font-bold uppercase text-xs">
                            <tr>
                              <th className="px-4 py-2">Vendor</th>
                              <th className="px-4 py-2">Reports To</th>
                              <th className="px-4 py-2 text-right">Link</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            {step.vendors.map((v, i) => (
                              <tr key={i} className="hover:bg-white transition-colors">
                                <td className="px-4 py-3 font-medium text-brandBlue-900">{v.name}</td>
                                <td className="px-4 py-3">
                                  <div className="flex gap-1">
                                    {v.reportsTo.map(r => (
                                      <span key={r} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-500">
                                        {r}
                                      </span>
                                    ))}
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-right">
                                  <a href={v.link} target="_blank" rel="noreferrer" className="text-orange-500 hover:underline">Apply</a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto py-8 animate-fade-in px-4">
      
      {/* Header */}
      <div className="text-center mb-12 space-y-4">
        <h2 className="text-4xl font-display font-bold text-brandBlue-900">Corporate Credit Builder</h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Access capital without personal liability. This interactive checklist guides your Business Trust through the underwriting gauntlet.
        </p>
      </div>

      {/* Progress Dashboard */}
      <div className="bg-brandBlue-900 text-white rounded-2xl p-8 mb-12 shadow-2xl border border-brandBlue-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-16 -mt-16"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center space-x-6">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                 <TrendingUp className="w-10 h-10 text-orange-400" />
              </div>
              <div>
                 <h3 className="text-2xl font-bold">Credit Readiness Score</h3>
                 <p className="text-brandBlue-200">
                    {strategy === 'SOVEREIGN' ? 'Path: Organic Build (No PG)' : 'Path: Accelerated (With PG)'}
                 </p>
              </div>
           </div>
           
           <div className="flex-1 w-full md:max-w-sm">
              <div className="flex justify-between text-sm font-bold mb-2 uppercase tracking-wider">
                 <span>Progress</span>
                 <span className="text-orange-400">{progress}%</span>
              </div>
              <div className="h-4 bg-brandBlue-800 rounded-full overflow-hidden border border-brandBlue-700">
                 <div className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 transition-all duration-1000 ease-out" style={{ width: `${progress}%` }}></div>
              </div>
           </div>
        </div>
      </div>

      {/* Strategy Toggle */}
      <div className="flex justify-center mb-12">
        <div className="bg-white p-1 rounded-full border border-slate-200 shadow-sm inline-flex">
            <button 
                onClick={() => setStrategy('SOVEREIGN')}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${
                    strategy === 'SOVEREIGN' ? 'bg-brandBlue-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'
                }`}
            >
                Sovereign (No PG)
            </button>
            <button 
                onClick={() => setStrategy('ACCELERATED')}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                    strategy === 'ACCELERATED' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'
                }`}
            >
                <Zap className="w-4 h-4" />
                Accelerated (With PG)
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Main Checklist */}
        <div className="lg:col-span-2">
           {strategy === 'ACCELERATED' && (
              <div className="mb-8 bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl">
                 <h4 className="font-bold text-orange-800 flex items-center mb-2">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Personal Guarantee Warning
                 </h4>
                 <p className="text-sm text-orange-800 leading-relaxed">
                    By choosing the Accelerated Path, you are agreeing to <strong>Personaly Guarantee (PG)</strong> the debt. 
                    This means if the Trust defaults, the bank can pursue your personal assets. This builds credit faster (2 weeks vs 6 months) but links liability.
                 </p>
              </div>
           )}

           {strategy === 'ACCELERATED' && renderSection("⚡ Accelerated Funding (PG)", "TIER_PG", Zap, "text-yellow-600")}
           
           {renderSection("1. Foundation & Compliance", "FOUNDATION", Building2, "text-slate-600")}
           {renderSection("2. Bureau Registration", "REGISTRATION", ShieldCheck, "text-blue-600")}
           {renderSection("3. The Vendor Tier System", "TIER_1", CreditCard, "text-orange-500")}
           {renderSection("4. Revolving Credit (Store)", "TIER_2", CreditCard, "text-indigo-500")}
           {renderSection("5. Cash & Fleet (No PG)", "TIER_3", Lock, "text-emerald-500")}
        </div>

        {/* Right Col: Info/Tips */}
        <div className="space-y-6">
           <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl sticky top-24">
              <h4 className="font-bold text-brandBlue-900 flex items-center mb-4">
                 <AlertCircle className="w-5 h-5 text-orange-500 mr-2" />
                 Golden Rules
              </h4>
              <ul className="space-y-4 text-sm text-slate-700">
                 <li className="flex items-start">
                    <span className="font-bold text-orange-500 mr-2">1.</span>
                    Always pay 10-15 days before the due date. This boosts your Paydex score to 80+.
                 </li>
                 <li className="flex items-start">
                    <span className="font-bold text-orange-500 mr-2">2.</span>
                    Never use your personal phone number on credit applications.
                 </li>
                 <li className="flex items-start">
                    <span className="font-bold text-orange-500 mr-2">3.</span>
                    Ensure your business name is spelled <em>exactly</em> the same on every single document.
                 </li>
                 <li className="flex items-start">
                    <span className="font-bold text-orange-500 mr-2">4.</span>
                    Spend at least $50 per transaction with Net-30 vendors to ensure they report it.
                 </li>
              </ul>
           </div>
           
           <div className="bg-brandBlue-50 border border-brandBlue-100 p-6 rounded-2xl">
              <h4 className="font-bold text-brandBlue-900 mb-2">Why Corporate Credit?</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                 When you build credit under your Trust's EIN, you separate the liability from your SSN. 
                 If the business fails, your personal credit score remains 800.
              </p>
           </div>
        </div>

      </div>

    </div>
  );
};