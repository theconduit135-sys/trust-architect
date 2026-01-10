import React, { useState } from 'react';
import { Beneficiary, TrustWizardData, GeneratedDocument } from '../types';
import { generateTrustPacket } from '../services/legalTemplates';
import { exportToPdf } from '../services/documentExporter';
import { PreviewModal } from './PreviewModal';
import { 
  ArrowRight, 
  Trash2, 
  FileText, 
  Loader2, 
  ShieldCheck, 
  AlertCircle, 
  Landmark, 
  ExternalLink, 
  Info, 
  Gavel, 
  Scale, 
  UserCheck, 
  Gem,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Building,
  HelpCircle
} from 'lucide-react';

export const TrustArchitect: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [docs, setDocs] = useState<GeneratedDocument[]>([]);
  const [previewDoc, setPreviewDoc] = useState<GeneratedDocument | null>(null);
  const [showEinGuide, setShowEinGuide] = useState(false);
  
  const [data, setData] = useState<TrustWizardData>({
    type: 'Revocable Living Trust',
    name: '',
    jurisdiction: 'Wyoming',
    settlorName: '',
    settlorAddress: '',
    settlorStreet: '',
    settlorCity: '',
    settlorState: '',
    settlorZip: '',
    initialTrustee: '',
    initialTrusteeAddress: '',
    initialTrusteeStreet: '',
    initialTrusteeCity: '',
    initialTrusteeState: '',
    initialTrusteeZip: '',
    successorTrustee: '',
    successorTrusteeAddress: '',
    successorTrusteeStreet: '',
    successorTrusteeCity: '',
    successorTrusteeState: '',
    successorTrusteeZip: '',
    beneficiaries: [],
    assets: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newBen, setNewBen] = useState<Beneficiary>({ id: '', name: '', dob: '', relationship: '' });
  const [benError, setBenError] = useState('');

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 1) {
       if (!data.name.trim()) newErrors.name = "Trust Name is required.";
       if (!data.jurisdiction.trim()) newErrors.jurisdiction = "Jurisdiction is required.";
    }
    if (currentStep === 2) {
       if (!data.settlorName.trim()) newErrors.settlorName = "Settlor Name is required.";
       if (!data.settlorStreet?.trim()) newErrors.settlorStreet = "Street Address is required.";
       if (!data.settlorCity?.trim()) newErrors.settlorCity = "City is required.";
       if (!data.settlorState?.trim()) newErrors.settlorState = "State is required.";
       if (!data.settlorZip?.trim()) newErrors.settlorZip = "Zip is required.";
    }
    if (currentStep === 3) {
       if (!data.initialTrustee.trim()) newErrors.initialTrustee = "Initial Trustee is required.";
       if (!data.successorTrustee.trim()) newErrors.successorTrustee = "Successor Trustee is required.";
    }
    if (currentStep === 4 && data.beneficiaries.length === 0) {
        newErrors.beneficiaries = "You must add at least one beneficiary.";
    }
    if (currentStep === 5 && !data.assets.trim()) {
        newErrors.assets = "Please list the assets to be funded.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
        setStep(s => s + 1);
        window.scrollTo(0, 0);
    }
  };

  const addBeneficiary = () => {
    if (!newBen.name.trim() || !newBen.relationship.trim()) {
      setBenError("Name and Relationship are required.");
      return;
    }
    setData(prev => ({
      ...prev,
      beneficiaries: [...prev.beneficiaries, { ...newBen, id: Date.now().toString() }]
    }));
    setNewBen({ id: '', name: '', dob: '', relationship: '' });
    setBenError('');
  };

  const removeBeneficiary = (id: string) => {
    setData(prev => ({
      ...prev,
      beneficiaries: prev.beneficiaries.filter(b => b.id !== id)
    }));
  };

  const handleGenerate = async () => {
    if (validateStep(step)) {
        setIsLoading(true);
        const results = generateTrustPacket(data.type, data);
        setTimeout(() => {
            setDocs(results);
            setIsLoading(false);
            setStep(6);
            window.scrollTo(0, 0);
        }, 1500);
    }
  };

  const getInputClass = (fieldName: string) => {
    const hasError = !!errors[fieldName];
    return `w-full mt-2 p-4 bg-white text-slate-900 border text-lg rounded-xl outline-none transition-all placeholder-slate-400 ${
        hasError 
        ? 'border-red-300 focus:ring-2 focus:ring-red-200 focus:border-red-400 shadow-[0_0_10px_rgba(239,68,68,0.1)]' 
        : 'border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 shadow-sm'
    }`;
  };

  const labelClass = "block text-sm font-bold text-slate-500 uppercase tracking-widest mb-1";
  const sectionTitle = "text-3xl font-display font-bold text-brandBlue-900 mb-2";
  const sectionDesc = "text-lg text-slate-600 leading-relaxed";

  const renderStep1 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-fade-in max-w-6xl mx-auto">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-brandBlue-900 text-white p-8 rounded-3xl shadow-xl">
           <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
             <Scale className="w-6 h-6 text-white" />
           </div>
           <h4 className="text-xl font-bold mb-4">Strategic Framework</h4>
           <p className="text-brandBlue-200 text-sm leading-relaxed mb-6">
             Your first choice defines the "DNA" of your estate. A <strong>Revocable Trust</strong> is built for probate avoidance and ease of management, while an <strong>Irrevocable Trust</strong> is a fortress built to stop creditors.
           </p>
           <div className="space-y-4">
             <div className="flex items-start gap-3">
               <CheckCircle2 className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
               <p className="text-xs text-brandBlue-100"><strong>Jurisdiction Matters:</strong> Wyoming is the global gold standard for privacy and asset protection laws.</p>
             </div>
           </div>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm italic text-sm text-slate-500">
          "The most expensive trust is the one that is poorly categorized from the start." — Aurelius
        </div>
      </div>

      <div className="lg:col-span-8 space-y-8">
        <div>
          <h3 className={sectionTitle}>The Framework</h3>
          <p className={sectionDesc}>Define the entity's governing laws and identity.</p>
        </div>
        
        <div className="card-modern p-10 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className={labelClass}>Trust Modality</label>
              <div className="relative">
                <select 
                  value={data.type}
                  onChange={e => setData({...data, type: e.target.value})}
                  className={getInputClass('type') + " appearance-none pr-10"}
                >
                  <option>Revocable Living Trust</option>
                  <option>Irrevocable Asset Protection Trust</option>
                  <option>Business Trust</option>
                  <option>Land Trust</option>
                </select>
                <ChevronDown className="absolute right-4 top-[2.2rem] text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Legal Situs (Jurisdiction)</label>
              <input 
                type="text" 
                value={data.jurisdiction}
                onChange={e => setData({...data, jurisdiction: e.target.value})}
                className={getInputClass('jurisdiction')}
                placeholder="e.g. Wyoming"
              />
              <div className="mt-2 flex items-center text-[10px] font-bold text-orange-600 uppercase tracking-tighter">
                <Info className="w-3 h-3 mr-1" /> Recommendation: Use Wyoming for maximum privacy.
              </div>
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Full Trust Name</label>
              <input 
                type="text" 
                value={data.name}
                onChange={e => setData({...data, name: e.target.value})}
                placeholder="e.g. The Apex Family Sovereign Trust"
                className={getInputClass('name')}
              />
              <p className="mt-2 text-xs text-slate-400">Pro-Tip: Do not include your family name in the title if you want maximum privacy.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-fade-in max-w-6xl mx-auto">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-slate-50 border-2 border-slate-100 p-8 rounded-3xl">
           <div className="w-12 h-12 bg-brandBlue-900 rounded-2xl flex items-center justify-center mb-6">
             <Gavel className="w-6 h-6 text-white" />
           </div>
           <h4 className="text-xl font-bold text-brandBlue-900 mb-4">The Settlor Role</h4>
           <p className="text-slate-600 text-sm leading-relaxed mb-4">
             The <strong>Settlor</strong> (also known as the Grantor) is the architect and financier of the trust. This role holds the power to fund the trust and, in revocable structures, the power to dissolve it.
           </p>
           <p className="text-slate-600 text-sm leading-relaxed">
             <strong>Warning:</strong> In an Irrevocable Trust, the Settlor must give up "dominion and control" over the assets for them to be shielded from lawsuits.
           </p>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-8">
        <div>
          <h3 className={sectionTitle}>The Settlor</h3>
          <p className={sectionDesc}>Specify the individual establishing the legal structure.</p>
        </div>

        <div className="card-modern p-10 bg-white">
          <div className="space-y-8">
            <div>
              <label className={labelClass}>Full Legal Name</label>
              <input 
                type="text" 
                value={data.settlorName}
                onChange={e => setData({...data, settlorName: e.target.value})}
                className={getInputClass('settlorName')}
                placeholder="First Middle Last"
              />
            </div>
            <div>
              <label className={labelClass}>Principal Residence / Mailing Address</label>
              <input 
                type="text" 
                placeholder="Street Address"
                value={data.settlorStreet}
                onChange={e => setData({...data, settlorStreet: e.target.value})}
                className={getInputClass('settlorStreet')}
              />
              <div className="grid grid-cols-3 gap-4 mt-4">
                <input placeholder="City" value={data.settlorCity} onChange={e => setData({...data, settlorCity: e.target.value})} className={getInputClass('settlorCity') + " text-base p-3"} />
                <input placeholder="State" value={data.settlorState} onChange={e => setData({...data, settlorState: e.target.value})} className={getInputClass('settlorState') + " text-base p-3"} />
                <input placeholder="Zip" value={data.settlorZip} onChange={e => setData({...data, settlorZip: e.target.value})} className={getInputClass('settlorZip') + " text-base p-3"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-fade-in max-w-6xl mx-auto">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-orange-500 text-white p-8 rounded-3xl shadow-xl">
           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6">
             <UserCheck className="w-6 h-6 text-orange-500" />
           </div>
           <h4 className="text-xl font-bold mb-4">Fiduciary Mandate</h4>
           <p className="text-orange-100 text-sm leading-relaxed mb-6">
             The <strong>Trustee</strong> holds legal title to the assets and is bound by <strong>Fiduciary Duty</strong>—the highest standard of care under the law.
           </p>
           <div className="p-4 bg-orange-600 rounded-xl text-xs font-medium space-y-2">
             <p>● Management: Decisions must favor beneficiaries.</p>
             <p>● Succession: If the Initial Trustee fails, the Successor automatically steps in without court approval.</p>
           </div>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-8">
        <div>
          <h3 className={sectionTitle}>The Trustees</h3>
          <p className={sectionDesc}>Define the operational management of the Trust estate.</p>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          <div className="card-modern p-10 bg-white border-t-8 border-t-brandBlue-900">
            <h4 className="font-bold text-brandBlue-900 mb-6 text-xl flex items-center gap-2 uppercase tracking-wide">
              <ShieldCheck className="w-6 h-6 text-orange-500" /> Initial Trustee
            </h4>
            <div className="space-y-6">
              <input 
                type="text" 
                value={data.initialTrustee}
                onChange={e => setData({...data, initialTrustee: e.target.value})}
                placeholder="Name (Usually You or an LLC)"
                className={getInputClass('initialTrustee')}
              />
              <p className="text-xs text-slate-500 italic">In a Revocable Trust, the Settlor and Trustee are usually the same person.</p>
            </div>
          </div>

          <div className="card-modern p-10 bg-white border-t-8 border-t-orange-500">
            <h4 className="font-bold text-orange-500 mb-6 text-xl flex items-center gap-2 uppercase tracking-wide">
              <ShieldCheck className="w-6 h-6 text-brandBlue-900" /> Successor Trustee
            </h4>
            <div className="space-y-6">
              <input 
                type="text" 
                value={data.successorTrustee}
                onChange={e => setData({...data, successorTrustee: e.target.value})}
                placeholder="Name (A trusted family member or professional)"
                className={getInputClass('successorTrustee')}
              />
              <p className="text-xs text-slate-500 italic">This individual only takes power if the Initial Trustee is deceased or incapacitated.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-fade-in max-w-6xl mx-auto">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-brandBlue-50 border-2 border-brandBlue-100 p-8 rounded-3xl">
           <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mb-6">
             <Gem className="w-6 h-6 text-white" />
           </div>
           <h4 className="text-xl font-bold text-brandBlue-900 mb-4">Equitable Interest</h4>
           <p className="text-slate-600 text-sm leading-relaxed mb-6">
             The <strong>Beneficiaries</strong> own the "equitable interest." They do not manage the assets, but they have the right to enjoy them.
           </p>
           <div className="bg-white p-4 rounded-xl border border-brandBlue-100 text-xs text-slate-500 space-y-2">
             <p><strong>Per Stirpes:</strong> If a beneficiary dies, their share goes to their children (the "roots").</p>
             <p><strong>Spendthrift Clause:</strong> Our documents automatically include clauses preventing creditors from seizing a beneficiary's inheritance.</p>
           </div>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-8">
        <div>
          <h3 className={sectionTitle}>Beneficiaries</h3>
          <p className={sectionDesc}>Who is entitled to the equitable interest of the trust?</p>
        </div>
        
        <div className="card-modern p-10 bg-slate-50 border-2 border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-end">
            <div className="sm:col-span-2">
              <label className={labelClass}>Full Name</label>
              <input 
                  placeholder="Legal Name" 
                  value={newBen.name}
                  onChange={e => setNewBen({...newBen, name: e.target.value})}
                  className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Relationship</label>
              <input 
                  placeholder="e.g. Spouse, Son, Daughter" 
                  value={newBen.relationship}
                  onChange={e => setNewBen({...newBen, relationship: e.target.value})}
                  className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
             <button onClick={addBeneficiary} className="btn-primary h-[58px] sm:col-span-1">Add</button>
          </div>
          {benError && <p className="text-red-500 text-xs mt-3 font-bold uppercase tracking-tight">{benError}</p>}
        </div>

        <div className="space-y-4">
          {data.beneficiaries.map(b => (
            <div key={b.id} className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-orange-300 transition-colors">
              <div>
                <p className="font-bold text-brandBlue-900 text-xl">{b.name}</p>
                <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mt-1">{b.relationship}</p>
              </div>
              <button onClick={() => removeBeneficiary(b.id)} className="text-red-400 hover:text-red-600 bg-red-50 p-3 rounded-full hover:bg-red-100 transition-colors">
                <Trash2 className="w-6 h-6" />
              </button>
            </div>
          ))}
          {data.beneficiaries.length === 0 && <p className="text-base text-slate-400 italic text-center py-10">No beneficiaries added to the charter yet.</p>}
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-fade-in max-w-6xl mx-auto">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-brandBlue-900 text-white p-8 rounded-3xl shadow-xl">
           <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mb-6">
             <Landmark className="w-6 h-6 text-white" />
           </div>
           <h4 className="text-xl font-bold mb-4">The "Schedule A"</h4>
           <p className="text-brandBlue-200 text-sm leading-relaxed mb-6">
             A trust is a "legal box." If the box is empty, it does nothing. <strong>Funding</strong> is the process of re-titling your assets from your name to the name of the Trust.
           </p>
           <div className="space-y-3 text-xs text-brandBlue-100 font-medium">
             <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /> Real Estate: Requires a Deed transfer.</p>
             <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /> Bank Accounts: Use your Cert of Trust.</p>
             <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /> Business: Assign membership interests.</p>
           </div>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-8">
        <div>
          <h3 className={sectionTitle}>Funding Blueprint</h3>
          <p className={sectionDesc}>Inventory the assets that will be conveyed to the Trust's control.</p>
        </div>
        <div className="relative card-modern bg-white p-2">
          <textarea 
            value={data.assets}
            onChange={e => setData({...data, assets: e.target.value})}
            className={getInputClass('assets') + " h-80 border-0 resize-none"}
            placeholder="Inventory your assets:&#10;1. 123 Maple Street, City, State (Primary Residence)&#10;2. 100% Membership Interest in [Your LLC]&#10;3. Wells Fargo Account ending in 1234&#10;4. Private Art Collection"
          />
        </div>
        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 text-[11px] text-orange-800 leading-relaxed italic">
          <strong>Note:</strong> Listing these here populates the "Schedule A" document, which proves to third parties that these items were legally conveyed to the Trust.
        </div>
      </div>
    </div>
  );

  const renderResults = () => {
    const einSteps = [
      { num: "01", title: "Visit IRS.gov", desc: "Go to the IRS page titled 'Get an Employer Identification Number (EIN)' on the official site.", link: "https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online" },
      { num: "02", title: "Confirm Eligibility", desc: "Ensure your entity is in the U.S. and you have a valid TIN (SSN/ITIN). Click 'Begin Application' during operating hours." },
      { num: "03", title: "Select 'Trust'", desc: "When asked for legal structure, choose 'Trust'. Confirm the description matches your documentation." },
      { num: "04", title: "Specify Type", desc: "Choose 'Irrevocable' or 'Revocable'. Select 'Created a Trust' as your reason for applying." },
      { num: "05", title: "Responsible Party", desc: "Enter your legal name and SSN. Confirm you are an individual and an officer of the trust." },
      { num: "06", title: "Trust Details", desc: `Enter the name exactly: '${data.name || 'Your Trust Name'}'. Provide the mailing address.` },
      { num: "07", title: "Funding Date", desc: "Enter today's date as the funded date. Set accounting year-end to December." },
      { num: "08", title: "Describe Activity", desc: "Choose 'Other' and specify 'Trust holding investment assets' for the primary purpose." },
      { num: "09", title: "Prior EIN Check", desc: "Answer 'No' to whether this trust has ever had an EIN previously." },
      { num: "10", title: "Select Delivery", desc: "Choose 'Receive Letter Online' for immediate issuance of your confirmation notice." },
      { num: "11", title: "Save Confirmation", desc: "Download and save the CP 575 notice. This is your most vital banking document." }
    ];

    return (
      <div className="space-y-12 animate-fade-in max-w-5xl mx-auto">
         <div className="text-center space-y-4">
              <h3 className="text-5xl font-display font-extrabold text-brandBlue-900">
                  Sovereign Blueprint Ready
              </h3>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">Your comprehensive trust suite has been engineered. Review the execution instructions below for final implementation.</p>
         </div>

         {/* EIN Master Guide Toggle Card */}
         <div className="bg-brandBlue-900 text-white rounded-[2.5rem] p-10 md:p-12 shadow-2xl border border-brandBlue-700 relative overflow-hidden transition-all duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-[120px] opacity-20 -mr-32 -mt-32"></div>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                  <div className="flex items-start space-x-8">
                      <div className="p-5 bg-orange-500 rounded-3xl shadow-lg shadow-orange-500/20">
                          <Landmark className="w-10 h-10 text-white" />
                      </div>
                      <div>
                          <h4 className="text-3xl font-bold text-white mb-2 tracking-tight">Post-Generation Protocol</h4>
                          <p className="text-brandBlue-200 text-lg max-w-lg leading-relaxed">
                              To activate your architecture, you must obtain an <strong>EIN (Tax ID)</strong> to interface with the banking system. We have prepared an explicit walkthrough.
                          </p>
                      </div>
                  </div>
                  <button 
                      onClick={() => setShowEinGuide(!showEinGuide)}
                      className="bg-white text-brandBlue-900 font-black py-5 px-10 rounded-2xl transition-all flex items-center justify-center space-x-3 text-lg shadow-xl hover:bg-orange-50 active:scale-95"
                  >
                      <span>{showEinGuide ? 'Close EIN Guide' : 'Open EIN Master Guide'}</span>
                      {showEinGuide ? <ChevronDown className="w-5 h-5 rotate-180 transition-transform" /> : <ChevronRight className="w-5 h-5" />}
                  </button>
              </div>

              {showEinGuide && (
                <div className="mt-12 pt-12 border-t border-white/10 animate-fade-in">
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {einSteps.map((s, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                           <div className="flex items-center justify-between mb-4">
                              <span className="text-3xl font-black text-orange-500/50">{s.num}</span>
                              {s.link && (
                                <a href={s.link} target="_blank" rel="noreferrer" className="text-orange-400 hover:text-orange-300">
                                   <ExternalLink className="w-5 h-5" />
                                </a>
                              )}
                           </div>
                           <h5 className="font-bold text-white text-lg mb-2">{s.title}</h5>
                           <p className="text-sm text-brandBlue-200 leading-relaxed">{s.desc}</p>
                        </div>
                      ))}
                   </div>
                   <div className="mt-10 bg-orange-500/10 border border-orange-500/20 p-6 rounded-2xl flex items-start gap-4">
                      <AlertCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                      <div className="text-sm text-orange-100">
                         <strong>Compliance Warning:</strong> Never use a Third-Party "EIN Service" that charges money. The IRS provides EINs for <strong>FREE</strong>. Use only the official .gov link provided in Step 01.
                      </div>
                   </div>
                </div>
              )}
         </div>
         
         {/* Document List */}
         <div className="grid grid-cols-1 gap-6">
           {docs.map((doc, idx) => (
             <div key={idx} className="card-modern p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 border-l-8 border-l-orange-500 hover:border-l-brandBlue-600 group">
               <div className="flex items-center space-x-6">
                   <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-brandBlue-50 transition-colors">
                     <FileText className="w-10 h-10 text-slate-400 group-hover:text-brandBlue-600" />
                   </div>
                   <div>
                      <h4 className="font-bold text-2xl text-brandBlue-900 group-hover:text-brandBlue-600 transition-colors">{doc.title}</h4>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Instrument #{(idx+1).toString().padStart(2, '0')}</p>
                   </div>
               </div>
               
               <div className="flex flex-wrap gap-4">
                   <button 
                     onClick={() => setPreviewDoc(doc)}
                     className="btn-secondary px-8 py-4 text-base bg-white border-2 border-slate-200 hover:border-brandBlue-600"
                   >
                     Preview
                   </button>
                   
                   <button 
                    onClick={() => exportToPdf(doc.title, doc.content)} 
                    className="btn-primary px-10 py-4 text-base shadow-xl"
                   >
                     Get Document
                   </button>
               </div>
             </div>
           ))}
         </div>
         
         <PreviewModal doc={previewDoc} onClose={() => setPreviewDoc(null)} />
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Dynamic Breadcrumbs / Progress */}
      <div className="mb-20 max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <span className="text-brandBlue-900">Blueprint Protocol</span>
          </div>
          <div className="flex items-center gap-4">
            {['Origin', 'Grantor', 'Ops', 'Heirs', 'Funding', 'Draft'].map((name, i) => (
              <span key={name} className={`${step === i + 1 ? 'text-orange-500 underline underline-offset-8' : ''}`}>{name}</span>
            ))}
          </div>
        </div>
        <div className="h-4 bg-slate-100 w-full rounded-full overflow-hidden shadow-inner p-1">
          <div className="h-full bg-brandBlue-900 rounded-full transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)" style={{ width: `${(step/6)*100}%` }}></div>
        </div>
      </div>

      {/* Content Area */}
      <div className="min-h-[600px] px-4 pb-20">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
        {step === 5 && renderStep5()}
        {step === 6 && renderResults()}
      </div>

      {/* Floating Navigation Controls */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mt-8 pt-8 border-t border-slate-200 px-4">
        <button 
          onClick={() => setStep(s => Math.max(1, s - 1))}
          disabled={step === 1} 
          className="text-slate-400 font-black uppercase tracking-widest hover:text-brandBlue-900 disabled:opacity-20 transition-all text-xs"
        >
          ← Return to Previous
        </button>
        
        {step < 5 && (
          <button 
            onClick={handleNext}
            className="btn-primary px-12 py-5 flex items-center space-x-4 text-lg shadow-2xl group"
          >
            <span className="uppercase tracking-widest font-black text-xs">Proceed to {['Settlor', 'Trustees', 'Beneficiaries', 'Funding'][step-1]}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
        
        {step === 5 && (
          <button 
            onClick={handleGenerate}
            disabled={isLoading}
            className="btn-primary px-16 py-6 flex items-center space-x-4 text-xl shadow-2xl group active:scale-95 transition-all"
          >
            {isLoading ? <Loader2 className="animate-spin w-6 h-6" /> : (
              <>
                <FileText className="w-6 h-6" />
                <span className="uppercase tracking-widest font-black text-sm">Finalize Architecture</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};