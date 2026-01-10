import React, { useState } from 'react';
import { BookOpen, Scale, Shield, Landmark, Building2, ChevronRight, Search, GraduationCap, FileText, Lock, Users, Gavel, EyeOff, Heart, ExternalLink } from 'lucide-react';

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
  },
  {
    term: "Equity Stripping",
    definition: "The process of reducing the net equity of an asset by encumbering it with debt to make it unattractive to creditors.",
    layman: "The 'Paper Poor' Strategy. Taking a loan against your own business so it looks like it has no value to a lawsuit predator."
  },
  {
    term: "Holding Company",
    definition: "A company created specifically to own assets (IP, Real Estate, Equipment) and lease them to an operating entity.",
    layman: "The Vault. This company takes no risks, hires no one, and does nothing but safely hold valuable items."
  },
  {
    term: "Operating Company",
    definition: "A company that conducts active business, hires employees, and incurs liability.",
    layman: "The Soldier. This company goes out into the world, takes risks, and interacts with the public. It owns nothing valuable itself."
  },
  {
    term: "Spendthrift Clause",
    definition: "A provision that prevents a beneficiary from transferring their interest and protects it from creditors before distribution.",
    layman: "The 'Protect Me From Myself' Rule. It stops a beneficiary from selling their future inheritance for quick cash and stops creditors from intercepting checks."
  },
  {
    term: "Charging Order",
    definition: "A court order granting a judgment creditor the right to receive distributions from an entity, but not voting rights or asset seizure.",
    layman: "The Force Field. A creditor can't take your business; they can only sit outside and wait for profit checks that you don't have to send."
  },
  {
    term: "Per Stirpes",
    definition: "A method of distributing an estate where if a beneficiary dies before the grantor, their share passes to their descendants.",
    layman: "By the Roots. If your son dies before you, his share goes to his children (your grandkids) instead of your other siblings."
  },
  {
    term: "Certificate of Beneficial Interest",
    definition: "A document evidencing an equitable ownership interest in a Business Trust.",
    layman: "Trust Stock. It looks and acts like a stock certificate, but for a Trust instead of a Corporation."
  },
  {
    term: "Probate",
    definition: "The court-supervised process of authenticating a last will and testament and distributing assets.",
    layman: "The Nightmare. A long, expensive, public court process to give your stuff away after you die. We want to avoid this."
  },
  {
    term: "Pour-Over Will",
    definition: "A will that acts as a safety net, transferring any neglected assets into the trust upon death.",
    layman: "The Safety Net. If you forgot to put your vintage car in the trust, this document catches it when you die and puts it there."
  },
  {
    term: "Corporate Veil",
    definition: "The legal distinction between a company and its owners/shareholders.",
    layman: "The Wall. It separates your personal piggy bank from your business piggy bank. If you mix them, the wall falls."
  },
  {
    term: "Situs",
    definition: "The legal jurisdiction where the trust is administered and whose laws govern its validity.",
    layman: "Home Base. The state whose rulebook you are playing by (e.g., Wyoming, Nevada, Delaware)."
  },
  {
    term: "Statutory Trust",
    definition: "A trust created under specific state statutes (like Wyoming) rather than common law, often offering better liability protection.",
    layman: "The Modern Trust. A trust built on specific state laws that are designed for business and asset protection."
  },
  {
    term: "Land Trust",
    definition: "A trust designed specifically to hold title to real estate for privacy, where the beneficiary retains control.",
    layman: "The Ghost Owner. Your house is owned by a trust, so your name doesn't appear in public records."
  },
  {
    term: "Quitclaim Deed",
    definition: "A legal instrument used to transfer interest in real property without warranties of title.",
    layman: "The Quick Transfer. The fastest way to move a house from 'You' to 'Your Trust'."
  },
  {
    term: "EIN (Employer Identification Number)",
    definition: "A unique nine-digit number assigned by the IRS to business entities for tax identification.",
    layman: "Social Security Number for Business. It lets your trust open bank accounts without using your personal SSN."
  }
];

export const Education: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState<string>("roles");
  const [searchTerm, setSearchTerm] = useState("");

  const modules: Module[] = [
    {
        id: "roles",
        title: "Roles & Responsibilities",
        icon: Users,
        content: (
            <div className="space-y-8 animate-fade-in">
                <div className="bg-brandBlue-50 border-l-4 border-brandBlue-600 p-6 rounded-r-xl">
                    <h3 className="font-bold text-brandBlue-900 text-lg">Who is Who?</h3>
                    <p className="text-base text-slate-700 mt-2 leading-relaxed">
                        Understanding the "Trinity of Trust" is essential. A trust is a relationship between three parties.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-lg hover:border-orange-300 transition-colors">
                        <div className="w-16 h-16 bg-brandBlue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="w-8 h-8 text-brandBlue-600" />
                        </div>
                        <h4 className="font-bold text-brandBlue-900 text-xl">The Grantor</h4>
                        <p className="text-sm font-bold text-orange-500 mt-2 uppercase tracking-wide">"The Creator"</p>
                        <p className="text-base text-slate-600 mt-4 leading-relaxed">Creates the trust & funds it with assets.</p>
                    </div>
                    <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-lg hover:border-orange-300 transition-colors">
                        <div className="w-16 h-16 bg-brandBlue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Gavel className="w-8 h-8 text-brandBlue-600" />
                        </div>
                        <h4 className="font-bold text-brandBlue-900 text-xl">The Trustee</h4>
                        <p className="text-sm font-bold text-orange-500 mt-2 uppercase tracking-wide">"The Manager"</p>
                        <p className="text-base text-slate-600 mt-4 leading-relaxed">Manages assets & follows the rulebook.</p>
                    </div>
                    <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-lg hover:border-orange-300 transition-colors">
                        <div className="w-16 h-16 bg-brandBlue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Shield className="w-8 h-8 text-brandBlue-600" />
                        </div>
                        <h4 className="font-bold text-brandBlue-900 text-xl">The Beneficiary</h4>
                        <p className="text-sm font-bold text-orange-500 mt-2 uppercase tracking-wide">"The Receiver"</p>
                        <p className="text-base text-slate-600 mt-4 leading-relaxed">Receives the benefit of the assets.</p>
                    </div>
                </div>

                <div className="prose prose-lg prose-slate bg-slate-50 p-8 rounded-2xl border border-slate-200">
                    <h4 className="text-brandBlue-900 font-bold">Can I be all three?</h4>
                    <p>
                        <strong>Yes!</strong> In a Revocable Living Trust, you are usually the Grantor, the Trustee, and the Beneficiary while you are alive. 
                        This keeps you in total control.
                    </p>
                    <p>
                        In an <strong>Irrevocable Asset Protection Trust</strong>, you usually give up the "Trustee" role to a third party to prove you don't control the assets anymore.
                    </p>
                </div>
            </div>
        )
    },
    {
      id: "508c1a",
      title: "The 508(c)(1)(A) Strategy",
      icon: Heart,
      content: (
        <div className="space-y-8 animate-fade-in">
          <div className="bg-brandBlue-50 border-l-4 border-brandBlue-600 p-6 rounded-r-xl">
            <h3 className="font-bold text-brandBlue-900 text-lg">The "Bulletproof" Faith-Based Trust</h3>
            <p className="text-base text-slate-700 mt-2 leading-relaxed">
                The 508(c)(1)(A) is the most powerful tax-exempt structure available under US law. It allows for total financial privacy and tax-deductible donations without IRS permission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg">
              <h4 className="font-bold text-brandBlue-900 mb-4 flex items-center text-lg">
                <FileText className="w-6 h-6 mr-3 text-slate-400" /> The 501(c)(3) (Public)
              </h4>
              <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start"><span className="text-red-500 mr-2">✖</span> Must apply for IRS permission (Form 1023).</li>
                  <li className="flex items-start"><span className="text-red-500 mr-2">✖</span> Must file annual Form 990 tax returns (Public).</li>
                  <li className="flex items-start"><span className="text-red-500 mr-2">✖</span> Can be revoked by the IRS at any time.</li>
                  <li className="flex items-start"><span className="text-red-500 mr-2">✖</span> Restricted speech (No political endorsements).</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl border-2 border-orange-200 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100 rounded-bl-full -mr-10 -mt-10 z-0"></div>
              <h4 className="font-bold text-brandBlue-900 mb-4 flex items-center text-lg relative z-10">
                <Shield className="w-6 h-6 mr-3 text-orange-500" /> The 508(c)(1)(A) (Private)
              </h4>
              <ul className="space-y-3 text-sm text-slate-600 relative z-10">
                  <li className="flex items-start"><span className="text-green-500 mr-2">✔</span> <strong>Mandatory</strong> Exception (Congress said so).</li>
                  <li className="flex items-start"><span className="text-green-500 mr-2">✔</span> <strong>No Application</strong> required. It exists by right.</li>
                  <li className="flex items-start"><span className="text-green-500 mr-2">✔</span> <strong>No Tax Returns</strong> (No Form 990 filing).</li>
                  <li className="flex items-start"><span className="text-green-500 mr-2">✔</span> <strong>Total Privacy</strong> of donors and spending.</li>
              </ul>
            </div>
          </div>

          {/* New Section: The Two Documents Strategy */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg mt-4">
             <h4 className="font-bold text-brandBlue-900 mb-6 flex items-center text-lg">
                <FileText className="w-6 h-6 mr-3 text-orange-500" /> The Strategy of Two Documents
             </h4>
             <p className="text-slate-700 mb-6 leading-relaxed">
                This structure creates two distinct versions of your trust to satisfy both private rights and public banking requirements:
             </p>
             <div className="space-y-4">
                <div className="flex items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="p-2 bg-red-100 rounded-lg mr-4 mt-1 flex-shrink-0">
                        <Lock className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                        <span className="block font-bold text-brandBlue-900 text-sm mb-1">The Private Copy</span>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Stays in your safe. It strictly <strong>prohibits</strong> public commerce, keeping it legally "outside" federal jurisdiction.
                        </p>
                    </div>
                </div>
                <div className="flex items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="p-2 bg-green-100 rounded-lg mr-4 mt-1 flex-shrink-0">
                        <Building2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <span className="block font-bold text-brandBlue-900 text-sm mb-1">The Banking Copy (With EIN)</span>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Goes to the bank. It specifically <strong>allows</strong> public commerce (Paragraph #39) so you can open accounts.
                        </p>
                    </div>
                </div>
             </div>
          </div>

          <div className="prose prose-lg prose-slate bg-slate-50 p-8 rounded-2xl border border-slate-200">
            <h4 className="text-brandBlue-900 font-bold">Is it Legal?</h4>
            <p>
              Yes. It is codified in Title 26 of the US Code.
              <br/>
              <em>"New organizations must notify the Secretary that they are applying for recognition of section 501(c)(3) status EXCEPT as provided in subsection (c)."</em>
            </p>
            <p>
              Subsection (c) lists the exceptions: <strong>"Churches, their integrated auxiliaries, and conventions or associations of churches."</strong>
            </p>
            <p>
                By using a 508(c)(1)(A) Private Trust, you are operating as a Free Church or Ministry. You have First Amendment protection and are treated as a foreign entity to the IRS for reporting purposes.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "iron-chain",
      title: "The Iron Chain™ Strategy",
      icon: LinkIcon,
      content: (
        <div className="space-y-8 animate-fade-in">
          <div className="bg-brandBlue-50 border-l-4 border-brandBlue-600 p-6 rounded-r-xl">
            <h3 className="font-bold text-brandBlue-900 text-lg">Why a Single LLC is Not Enough</h3>
            <p className="text-base text-slate-700 mt-2 leading-relaxed">
              Most people think an LLC protects them. It protects your personal assets from the business (Inside Liability), 
              but it does <strong>not</strong> protect the business from your personal life (Outside Liability).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg">
              <h4 className="font-bold text-brandBlue-900 mb-4 flex items-center text-lg">
                <Shield className="w-6 h-6 mr-3 text-red-500" /> Inside Liability
              </h4>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Examples: Slip & fall, contract dispute</p>
              <p className="text-base text-slate-700 leading-relaxed">
                A standard LLC works here. If the business is sued, they can take the business assets, but they can't take your house.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg">
              <h4 className="font-bold text-brandBlue-900 mb-4 flex items-center text-lg">
                <Shield className="w-6 h-6 mr-3 text-green-500" /> Outside Liability
              </h4>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Examples: Car accident, personal divorce</p>
              <p className="text-base text-slate-700 leading-relaxed">
                A standard LLC fails here. A judge can seize your "Membership Interest" in the LLC to pay your personal debt.
              </p>
            </div>
          </div>

          <div className="prose prose-lg prose-slate bg-slate-50 p-8 rounded-2xl border border-slate-200">
            <h4 className="text-brandBlue-900 font-bold">The Solution: The Charging Order</h4>
            <p>
              To stop Outside Liability, we use the "Iron Chain" structure. We place a <strong>Holding LLC</strong> in a jurisdiction like Wyoming. 
              Wyoming law states that a creditor's <em>sole remedy</em> is a "Charging Order."
            </p>
            <p>
              This means the creditor gets a lien on distributions. They cannot vote, they cannot force a sale of assets, and they cannot take the company. 
              If the Trustee decides not to distribute money, the creditor gets nothing (and may even have to pay taxes on the "phantom income").
            </p>
            
            <div className="mt-8 text-center">
                 <a href="https://www.wyomingagents.com/" target="_blank" rel="noreferrer" className="inline-flex items-center btn-primary px-8 py-3 text-sm shadow-md">
                    <span>Register Your Wyoming LLC</span>
                    <ExternalLink className="w-4 h-4 ml-2" />
                 </a>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "funding",
      title: "Funding Your Trust",
      icon: Building2,
      content: (
        <div className="space-y-8 animate-fade-in">
          <p className="text-slate-700 italic text-xl font-serif text-center py-4">
            "A trust without assets is like a safe with nothing inside."
          </p>

          <div className="space-y-6">
            <div className="flex items-start bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="bg-orange-100 p-3 rounded-xl mr-6 flex-shrink-0">
                <Landmark className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <h4 className="font-bold text-brandBlue-900 text-xl">1. Real Estate</h4>
                <p className="text-base text-slate-700 mt-2 leading-relaxed">
                  You must record a new <strong>Deed</strong> with the county clerk. 
                </p>
                <ul className="list-disc list-inside text-sm text-slate-600 mt-3 space-y-2 font-medium">
                  <li><strong>Quitclaim Deed:</strong> Fastest, easiest. Transfers interest without warranty.</li>
                  <li><strong>Warranty Deed:</strong> Preferred for title insurance continuity.</li>
                  <li><strong>Review:</strong> Check for "Due on Sale" clauses.</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="bg-green-100 p-3 rounded-xl mr-6 flex-shrink-0">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h4 className="font-bold text-brandBlue-900 text-xl">2. Financial Accounts</h4>
                <p className="text-base text-slate-700 mt-2 leading-relaxed">
                  Banks require a <strong>Certificate of Trust</strong>. They do not need your full trust agreement.
                </p>
                <ul className="list-disc list-inside text-sm text-slate-600 mt-3 space-y-2 font-medium">
                  <li>Obtain a new EIN for Irrevocable Trusts.</li>
                  <li>For Revocable Trusts, account title becomes: "John Doe, Trustee of the Doe Family Trust."</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="bg-blue-100 p-3 rounded-xl mr-6 flex-shrink-0">
                <Briefcase className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-brandBlue-900 text-xl">3. Business Interests</h4>
                <p className="text-base text-slate-700 mt-2 leading-relaxed">
                  Execute an <strong>Assignment of Membership Interest</strong>.
                </p>
                <p className="text-sm text-slate-600 mt-3 font-medium">
                  The "Member" of your LLC changes from "John Doe" to "The Doe Family Trust." Update your Operating Agreement.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "privacy",
      title: "Anonymous Banking",
      icon: Lock,
      content: (
        <div className="space-y-8 animate-fade-in">
           <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 rounded-2xl shadow-xl border border-slate-700 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                 <EyeOff className="w-32 h-32" />
             </div>
             <h4 className="text-xl font-bold font-display flex items-center mb-4 text-orange-400">
               <Scale className="w-6 h-6 mr-3" /> The Specialist's Definition
             </h4>
             <p className="text-base leading-relaxed text-slate-200 relative z-10">
               "Anonymous Banking" is not about hiding money from the IRS. That is tax evasion, and that gets you a prison cell. 
               <strong>Anonymous Banking</strong> is about hiding your net worth from the public, data brokers, and predators.
             </p>
             <p className="mt-4 font-bold text-white relative z-10">
               It is the art of owning everything, but appearing to own nothing.
             </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
               <h4 className="font-bold text-brandBlue-900 text-xl mb-3">Secrecy vs. Privacy</h4>
               <p className="text-base text-slate-700 leading-relaxed mb-4">
                 Think of your house. You have curtains, right?
               </p>
               <ul className="space-y-3">
                 <li className="flex items-start text-sm text-slate-600">
                   <div className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></div>
                   <span><strong>Secrecy (Illegal):</strong> Building a bunker with no address so the police can't find you.</span>
                 </li>
                 <li className="flex items-start text-sm text-slate-600">
                   <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3 flex-shrink-0"></div>
                   <span><strong>Privacy (Smart):</strong> Living in a normal house but closing the curtains so your neighbors can't see what TV show you're watching.</span>
                 </li>
               </ul>
             </div>

             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
               <h4 className="font-bold text-brandBlue-900 text-xl mb-3">The "Nesting Doll" Strategy</h4>
               <p className="text-base text-slate-700 leading-relaxed">
                 How do we achieve this legally? We use layers.
               </p>
               <ol className="list-decimal list-inside space-y-3 mt-4 text-sm text-slate-600 font-medium">
                 <li><strong>Layer 1 (Public):</strong> An anonymous LLC (e.g., "Blue Sky Holdings") conducts the business.</li>
                 <li><strong>Layer 2 (Private):</strong> The "Member" of that LLC is not you, it is your Trust.</li>
                 <li><strong>Layer 3 (Hidden):</strong> The Bank knows who you are (KYC Laws), but the public record only shows "Blue Sky Holdings."</li>
               </ol>
             </div>
           </div>

           <div className="bg-brandBlue-50 p-8 rounded-2xl border border-brandBlue-100">
               <h4 className="font-bold text-brandBlue-900 text-lg mb-4">The Golden Rule of Anonymity</h4>
               <p className="text-base text-slate-700 leading-relaxed">
                 Never sign your own name on public documents. Always sign as:
                 <br/><br/>
                 <span className="font-serif italic text-xl text-brandBlue-800">"John Doe, Trustee"</span>
                 <br/><br/>
                 Or better yet, appoint a <strong>Nominee Trustee</strong> (like a lawyer or private trust company) to sign public documents for you, while you retain control as the "Manager" of the underlying assets.
               </p>
           </div>
        </div>
      )
    }
  ];

  const activeModule = modules.find(m => m.id === activeModuleId) || modules[0];

  // Dynamic colors for the glossary
  const cardColors = [
      'border-l-orange-500',
      'border-l-blue-600',
      'border-l-emerald-500',
      'border-l-purple-600',
      'border-l-red-500',
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-12 px-4">
      
      {/* Header */}
      <div className="text-center space-y-6 pt-8">
        <h2 className="text-5xl font-bold font-display text-brandBlue-900 flex items-center justify-center gap-4">
          <GraduationCap className="w-12 h-12 text-orange-500" />
          Sovereign Academy
        </h2>
        <p className="text-slate-700 max-w-3xl mx-auto text-xl leading-relaxed">
          Master the mechanics of asset protection. Understanding the "Why" and "How" is just as important as the legal documents themselves.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Sidebar - Navigation */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
            <div className="p-6 bg-brandBlue-50 border-b border-slate-200 font-bold text-brandBlue-900 text-lg">
              Core Curriculum
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
                    {isActive && <ChevronRight className="w-5 h-5 text-orange-500" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Tip */}
          <div className="bg-brandBlue-900 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brandBlue-800 rounded-bl-full opacity-50"></div>
            <h4 className="font-bold mb-3 relative z-10 text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-orange-500" /> Pro Tip
            </h4>
            <p className="text-sm text-brandBlue-100 leading-relaxed relative z-10">
              Always print your Trust documents on high-quality bond paper. It doesn't make them more legal, but it signals to bankers and courts that this is a serious, professional instrument.
            </p>
          </div>
        </div>

        {/* Right Content - Active Module */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl min-h-[700px] flex flex-col card-modern">
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

      {/* Glossary Section */}
      <div className="border-t border-slate-200 pt-16">
        
        {/* Fox Branding Header */}
        <div className="relative rounded-3xl overflow-hidden mb-12 h-64 shadow-2xl group">
             <img 
               src="https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=1600&q=80" 
               alt="Dark Black Fox" 
               className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
             />
             <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent flex flex-col justify-center px-12">
                <h3 className="text-4xl font-display font-bold text-white mb-2 tracking-wide">
                  The Fox's Dictionary
                </h3>
                <p className="text-orange-200 text-lg max-w-xl font-medium leading-relaxed">
                  "The fox knows many things, but the hedgehog knows one big thing." <br/>
                  In asset protection, we must be the fox. Clever. Adaptable. Hidden.
                </p>
             </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h3 className="text-3xl font-bold text-brandBlue-900 flex items-center gap-3 font-display">
              <BookOpen className="w-8 h-8 text-orange-500" />
              Strategic Definitions
            </h3>
            <p className="text-slate-600 text-lg mt-2">Legal terminology translated for the cunning investor.</p>
          </div>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search terms..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-4 border border-slate-200 rounded-full text-base text-slate-900 focus:ring-2 focus:ring-orange-500 outline-none w-full md:w-80 shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GLOSSARY.filter(g => 
            g.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
            g.layman.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((item, idx) => {
            const colorClass = cardColors[idx % cardColors.length];
            return (
                <div key={idx} className={`card-modern bg-white p-8 border-l-4 ${colorClass} hover:shadow-xl transition-all group relative overflow-hidden`}>
                <h4 className="font-bold text-brandBlue-900 text-xl mb-4 group-hover:text-orange-600 transition-colors pl-2">
                    {item.term}
                </h4>
                <div className="space-y-4 pl-2">
                    <div className="text-xl text-black font-bold font-display leading-tight border-l-2 border-slate-100 pl-4 py-2">
                    "{item.definition}"
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl text-base text-gray-700 border border-slate-100 shadow-inner">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2 flex items-center gap-2">
                        The Fox Says <EyeOff className="w-3 h-3" />
                    </span>
                    {item.layman}
                    </div>
                </div>
                </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Helper Icon for Funding Module
function Briefcase(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  )
}

// Helper Icon for Iron Chain
function LinkIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    )
  }