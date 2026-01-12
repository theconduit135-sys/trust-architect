import React, { useState } from 'react';
import { BookOpen, Scale, Shield, Landmark, Building2, ChevronRight, Search, GraduationCap, FileText, Lock, Users, Gavel, EyeOff, Heart, ExternalLink, Globe, Landmark as Bank } from 'lucide-react';

// --- Data Structures ---

interface GlossaryTerm {
  term: string;
  definition: string;
  layman: string;
}

interface Module {
  id: string;
  title: string;
  icon: any;
  content: React.ReactNode;
}

const GLOSSARY: GlossaryTerm[] = [
  {
    term: "Grantor / Settlor / Trustor",
    definition: "The individual who establishes the trust and contributes the initial assets.",
    layman: "The Creator. The person whose money and rules start the game."
  },
  {
    term: "Trustee",
    definition: "The fiduciary appointed to hold legal title to the property and administer it according to the trust's terms.",
    layman: "The Manager. The person who holds the checkbook and makes decisions."
  },
  {
    term: "Beneficiary",
    definition: "The person or entity entitled to the equitable interest (benefit) of the trust assets.",
    layman: "The Receiver. The person who gets the money or gets to live in the house."
  },
  {
    term: "Fiduciary Duty",
    definition: "A legal obligation of the highest degree for one party to act in the best interest of another.",
    layman: "The Golden Rule. The Trustee must put the Beneficiaries' interests above their own, or they can be sued."
  },
  {
    term: "Corpus / Res",
    definition: "The principal assets or property held within the trust.",
    layman: "The Stuff. The actual money, houses, or stocks inside the box."
  },
  {
    term: "Revocable Living Trust (RLT)",
    definition: "A trust that can be altered, amended, or canceled by the Grantor at any time during their life.",
    layman: "The Open Box. You can take the money back whenever you want. Great for avoiding probate, but offers zero asset protection."
  },
  {
    term: "Irrevocable Trust",
    definition: "A trust that cannot be modified or terminated without the permission of the beneficiary or a court order.",
    layman: "The Locked Box. You gave the money away. You can't get it back, but neither can the people suing you."
  },
  {
    term: "Iron Chain™ Strategy",
    definition: "A multi-entity asset protection structure separating 'Holding' entities from 'Operating' entities.",
    layman: "The Firewall. We separate your safe assets (Holding Co) from your risky activities (Operating Co) so a lawsuit can't burn down the whole house."
  },
  {
    term: "508(c)(1)(A) Trust",
    definition: "A specialized tax-exempt status for churches and religious organizations that is mandatory by Congress and does not require applying for official recognition (unlike 501(c)(3)).",
    layman: "The Sovereign Ministry. A private trust that operates largely outside IRS reporting requirements (no Form 990) due to religious freedom laws."
  }
];

export const Education: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState<string>("swf-protocol");
  const [searchTerm, setSearchTerm] = useState("");

  const modules: Module[] = [
    {
        id: "swf-protocol",
        title: "Sovereign Wealth Protocol",
        icon: Globe,
        content: (
            <div className="space-y-8 animate-fade-in">
                <div className="bg-brandBlue-900 text-white p-8 rounded-2xl shadow-xl">
                    <h3 className="font-bold text-xl mb-4">The Sovereign Standard</h3>
                    <p className="text-brandBlue-100 text-base leading-relaxed">
                        Sovereign Wealth Funds (SWFs) like GIC (Singapore) or the Abu Dhabi Investment Authority (ADIA) utilize "Jurisdictional Arbitrage" to protect trillions in assets. 
                    </p>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-white/10 rounded-xl border border-white/10">
                            <span className="font-black text-orange-500 text-xs block mb-1 uppercase">Rule 01: Diversification of Law</span>
                            <p className="text-xs">Never trust one single legal system. Layer assets across Wyoming (Internal) and the Cook Islands (External).</p>
                        </div>
                        <div className="p-4 bg-white/10 rounded-xl border border-white/10">
                            <span className="font-black text-orange-500 text-xs block mb-1 uppercase">Rule 02: Stateless Titling</span>
                            <p className="text-xs">Assets should be owned by entities that are 'foreign' to the jurisdiction of the risk.</p>
                        </div>
                    </div>
                </div>

                <div className="prose prose-slate bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-brandBlue-900">Institutional Layering</h4>
                    <p>
                        To mirror SWF strategy, we implement the **Triple-Tier Protection**:
                    </p>
                    <ol className="space-y-2">
                        <li><strong>The Control Layer (The Trust):</strong> Holds the voting rights but no operational liability.</li>
                        <li><strong>The Capital Layer (Holding LLC):</strong> Owns the intellectual property, real estate, and equipment.</li>
                        <li><strong>The Action Layer (Operating LLC):</strong> Interfaces with the public, hires employees, and takes the risk.</li>
                    </ol>
                    <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-100 flex items-center gap-3">
                        <Bank className="w-5 h-5 text-orange-600" />
                        <span className="text-xs font-bold text-orange-800 italic">This is the precise architecture used by elite Family Offices to protect generational wealth from frivolous litigation.</span>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: "roles",
        title: "Roles & Responsibilities",
        icon: Users,
        content: (
            <div className="space-y-8 animate-fade-in">
                <div className="bg-brandBlue-50 border-l-4 border-brandBlue-600 p-6 rounded-r-xl">
                    <h3 className="font-bold text-brandBlue-900 text-lg">The Trinity of Trust</h3>
                    <p className="text-base text-slate-700 mt-2 leading-relaxed">
                        Understanding the "Bifurcation of Title"—the legal split between control and benefit.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-lg hover:border-orange-300 transition-colors">
                        <div className="w-16 h-16 bg-brandBlue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="w-8 h-8 text-brandBlue-600" />
                        </div>
                        <h4 className="font-bold text-brandBlue-900 text-xl">The Grantor</h4>
                        <p className="text-base text-slate-600 mt-4 leading-relaxed">The Architect who provides the capital and the rules.</p>
                    </div>
                    <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-lg hover:border-orange-300 transition-colors">
                        <div className="w-16 h-16 bg-brandBlue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Gavel className="w-8 h-8 text-brandBlue-600" />
                        </div>
                        <h4 className="font-bold text-brandBlue-900 text-xl">The Trustee</h4>
                        <p className="text-base text-slate-600 mt-4 leading-relaxed">The Fiduciary who holds 'Legal Title' and manages assets.</p>
                    </div>
                    <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-lg hover:border-orange-300 transition-colors">
                        <div className="w-16 h-16 bg-brandBlue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Shield className="w-8 h-8 text-brandBlue-600" />
                        </div>
                        <h4 className="font-bold text-brandBlue-900 text-xl">The Beneficiary</h4>
                        <p className="text-base text-slate-600 mt-4 leading-relaxed">The person who holds 'Equitable Title' and receives the benefit.</p>
                    </div>
                </div>
            </div>
        )
    }
  ];

  const activeModule = modules.find(m => m.id === activeModuleId) || modules[0];

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-12 px-4">
      <div className="text-center space-y-6 pt-8">
        <h2 className="text-5xl font-bold font-display text-brandBlue-900 flex items-center justify-center gap-4">
          <GraduationCap className="w-12 h-12 text-orange-500" />
          Sovereign Academy
        </h2>
        <p className="text-slate-700 max-w-3xl mx-auto text-xl leading-relaxed">
          The same information used by global banks and funds, simplified for your sovereign wealth design.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
            <div className="p-6 bg-brandBlue-50 border-b border-slate-200 font-bold text-brandBlue-900 text-lg">
              Master Curriculum
            </div>
            <div className="p-4 space-y-2">
              {modules.map(module => {
                const Icon = module.icon;
                const isActive = activeModuleId === module.id;
                return (
                  <button
                    key={module.id}
                    onClick={() => setActiveModuleId(module.id)}
                    className={`w-full flex items-center justify-between p-5 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-orange-50 text-orange-700 shadow-md ring-1 ring-orange-200' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2.5 rounded-lg ${isActive ? 'bg-white text-orange-500 shadow-sm' : 'bg-slate-100 text-slate-400'}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-bold text-base">{module.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl min-h-[600px] flex flex-col card-modern">
            <div className="p-10 border-b border-slate-100 flex items-center space-x-6 bg-brandBlue-50/30">
              <div className="p-4 bg-brandBlue-600 text-white rounded-2xl shadow-lg">
                <activeModule.icon className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bold text-brandBlue-900 font-display">{activeModule.title}</h3>
            </div>
            <div className="p-10 flex-1">
              {activeModule.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};