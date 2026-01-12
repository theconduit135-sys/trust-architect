import React, { useState, useEffect } from 'react';
import { AssetCategory, AssetTransferData, GeneratedDocument, TrustWizardData } from '../types';
import { generateAssetTransferPacket } from '../services/legalTemplates';
import { exportToPdf } from '../services/documentExporter';
import { PreviewModal } from './PreviewModal';
import { useAuth } from './AuthContext';
import { 
    Shield, 
    Home, 
    Plane, 
    Truck, 
    Hammer, 
    ChevronRight, 
    ChevronLeft, 
    Info, 
    CheckCircle, 
    Loader2, 
    Lock, 
    Download, 
    PlusCircle,
    Building,
    FileText,
    AlertTriangle,
    CreditCard
} from 'lucide-react';

export const AssetTransfer: React.FC = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [trusts, setTrusts] = useState<TrustWizardData[]>([]);
  const [docs, setDocs] = useState<GeneratedDocument[]>([]);
  const [previewDoc, setPreviewDoc] = useState<GeneratedDocument | null>(null);

  const [data, setData] = useState<AssetTransferData>({
    trustId: '',
    trustName: '',
    category: null,
    isLien: false,
    isLease: false,
    attestNoLienRemoval: false,
    attestPaymentRemains: false,
    attestNoTitleTransfer: false,
    dateSigned: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (!user) return;
    const fetchTrusts = async () => {
        // Mocking fetch from Firestore
        const mockTrusts: TrustWizardData[] = [
            { 
              id: 't1', 
              name: 'The Sovereign Family Trust', 
              type: 'Revocable', 
              settlorName: 'Sovereign Holder', 
              settlorAddress: 'Private Domicile', 
              initialTrustee: 'Sovereign Holder', 
              initialTrusteeAddress: 'Private Domicile', 
              successorTrustee: 'Estate Fiduciary',
              successorTrusteeAddress: 'Fiduciary Office',
              jurisdiction: 'Wyoming', 
              beneficiaries: [], 
              assets: '' 
            }
        ];
        setTrusts(mockTrusts);
    };
    fetchTrusts();
  }, [user]);

  const handleGenerate = async () => {
    setIsLoading(true);
    const parentTrust = trusts.find(t => t.id === data.trustId) || trusts[0];
    const generated = generateAssetTransferPacket(data, parentTrust);
    
    setTimeout(() => {
        setDocs(generated);
        setIsLoading(false);
        setStep(6);
    }, 1500);
  };

  const steps = [
    { title: 'Target', icon: Shield },
    { title: 'Asset', icon: PlusCircle },
    { title: 'Identify', icon: Info },
    { title: 'Finance', icon: Building },
    { title: 'Confirm', icon: Lock },
    { title: 'Get Files', icon: Download },
  ];

  const inputStyle = "w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brandBlue-500 outline-none text-slate-900 font-medium transition-all shadow-sm placeholder:text-slate-400";
  const labelStyle = "block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2";

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-fade-in px-4">
      {/* Stepper */}
      <div className="flex items-center justify-between max-w-3xl mx-auto mb-16">
        {steps.map((s, i) => {
            const active = step === i + 1;
            const completed = step > i + 1;
            return (
                <div key={i} className="flex flex-col items-center flex-1 relative">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 z-10 ${
                        active ? 'bg-brandBlue-600 text-white shadow-xl' : completed ? 'bg-green-500 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-300'
                    }`}>
                        {completed ? <CheckCircle className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                    </div>
                    <span className={`text-[9px] font-black mt-3 uppercase tracking-[0.2em] ${active ? 'text-brandBlue-600' : 'text-slate-400'}`}>
                        {s.title}
                    </span>
                    {i < steps.length - 1 && (
                        <div className={`absolute top-5 left-1/2 w-full h-[1px] -z-0 ${completed ? 'bg-green-500' : 'bg-slate-100'}`}></div>
                    )}
                </div>
            )
        })}
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 bg-white rounded-3xl shadow-xl border border-slate-100 flex flex-col min-h-[550px]">
            <div className="p-10 flex-1">
                {step === 1 && (
                    <div className="space-y-8 animate-fade-in">
                        <div>
                            <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">Target Strategy</h2>
                            <p className="text-slate-500">Select the setup that will receive ownership of your property.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {trusts.map(t => (
                                <button 
                                    key={t.id} 
                                    onClick={() => setData({...data, trustId: t.id || '', trustName: t.name})}
                                    className={`p-6 rounded-2xl border-2 text-left transition-all ${data.trustId === t.id ? 'border-brandBlue-500 bg-brandBlue-50' : 'border-slate-100 bg-slate-50 hover:border-slate-300'}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-bold text-slate-900 text-lg">{t.name}</h4>
                                        <Shield className={`w-5 h-5 ${data.trustId === t.id ? 'text-brandBlue-600' : 'text-slate-300'}`} />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Locus: {t.jurisdiction}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-8 animate-fade-in">
                        <div>
                            <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">Property Category</h2>
                            <p className="text-slate-500">What kind of property are you moving into your protection plan?</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { id: AssetCategory.HOUSE, name: 'Home/Land', icon: Home, desc: 'Real Estate' },
                                { id: AssetCategory.AIRPLANE, name: 'Aviation', icon: Plane, desc: 'Aircraft' },
                                { id: AssetCategory.EQUIPMENT, name: 'Business', icon: Hammer, desc: 'Machinery' },
                                { id: AssetCategory.VEHICLE, name: 'Vehicle', icon: Truck, desc: 'Cars/Trucks' },
                            ].map(cat => (
                                <button 
                                    key={cat.id}
                                    onClick={() => setData({...data, category: cat.id})}
                                    className={`p-6 rounded-2xl border-2 flex flex-col items-center text-center transition-all ${data.category === cat.id ? 'border-brandBlue-500 bg-brandBlue-50 text-brandBlue-600 shadow-md' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-300'}`}
                                >
                                    <cat.icon className="w-8 h-8 mb-4" />
                                    <span className="text-xs font-black uppercase tracking-widest mb-1">{cat.name}</span>
                                    <span className="text-[10px] opacity-60 font-medium">{cat.desc}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-8 animate-fade-in">
                        <div>
                            <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">Property Details</h2>
                            <p className="text-slate-500">Provide the specific details to link this property to your plan.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {data.category === AssetCategory.HOUSE && (
                                <>
                                    <div className="col-span-2">
                                        <label className={labelStyle}>Full Property Address</label>
                                        <input className={inputStyle} value={data.address} onChange={e => setData({...data, address: e.target.value})} placeholder="Street, City, State, Zip" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className={labelStyle}>Short Description</label>
                                        <textarea className={inputStyle} rows={3} value={data.legalDescription} onChange={e => setData({...data, legalDescription: e.target.value})} placeholder="e.g., Primary Residence in Dallas County" />
                                    </div>
                                </>
                            )}
                            {data.category === AssetCategory.VEHICLE && (
                                <>
                                    <div className="col-span-2"><label className={labelStyle}>VIN (Vehicle ID Number)</label><input className={inputStyle} value={data.vin} onChange={e => setData({...data, vin: e.target.value})} maxLength={17} placeholder="17 Digit VIN" /></div>
                                    <div><label className={labelStyle}>Year</label><input className={inputStyle} value={data.year} onChange={e => setData({...data, year: e.target.value})} /></div>
                                    <div><label className={labelStyle}>Make/Model</label><input className={inputStyle} value={data.makeModel} onChange={e => setData({...data, makeModel: e.target.value})} /></div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="space-y-8 animate-fade-in">
                        <div>
                            <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">Loan Information</h2>
                            <p className="text-slate-500">Does this property have an active loan or lease?</p>
                        </div>
                        <div className="flex gap-4 p-1 bg-slate-100 rounded-2xl border border-slate-200">
                            <button onClick={() => setData({...data, isLien: true, isLease: false})} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${data.isLien ? 'bg-white text-brandBlue-600 shadow-sm' : 'text-slate-500'}`}>Loan / Mortgage</button>
                            <button onClick={() => setData({...data, isLien: false, isLease: true})} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${data.isLease ? 'bg-white text-brandBlue-600 shadow-sm' : 'text-slate-500'}`}>Lease / Finance</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="col-span-2"><label className={labelStyle}>Lender/Bank Name</label><input className={inputStyle} value={data.lenderName} onChange={e => setData({...data, lenderName: e.target.value})} placeholder="Name of Financial Institution" /></div>
                            <div><label className={labelStyle}>Loan/Account Number</label><input className={inputStyle} value={data.accountNumber} onChange={e => setData({...data, accountNumber: e.target.value})} /></div>
                            <div><label className={labelStyle}>Date Started</label><input className={inputStyle} type="date" value={data.startDate} onChange={e => setData({...data, startDate: e.target.value})} /></div>
                        </div>
                        <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex items-start gap-4 shadow-sm">
                            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                            <div className="space-y-1">
                                <h4 className="font-bold text-amber-900 text-sm uppercase tracking-wide">Expert Tip</h4>
                                <p className="text-xs text-slate-600 leading-relaxed font-medium">By using an "Equitable Transfer," your setup takes the benefit of the property without forcing you to pay off the bank loan immediately. This is a common strategy for private protection.</p>
                            </div>
                        </div>
                    </div>
                )}

                {step === 5 && (
                    <div className="space-y-8 animate-fade-in">
                        <div>
                            <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">Confirm Action</h2>
                            <p className="text-slate-500">Confirm you understand how this transfer works.</p>
                        </div>
                        <div className="space-y-4">
                            {[
                                { id: 'attestNoLienRemoval', text: 'I understand this does not pay off the existing bank loan.' },
                                { id: 'attestPaymentRemains', text: 'I agree that monthly payments stay my responsibility.' },
                                { id: 'attestNoTitleTransfer', text: 'I understand the bank keeps their primary legal claim.' }
                            ].map(item => (
                                <button 
                                    key={item.id}
                                    onClick={() => setData({...data, [item.id]: !data[item.id as keyof AssetTransferData]})}
                                    className={`w-full p-6 rounded-2xl border-2 text-left flex items-center gap-5 transition-all ${data[item.id as keyof AssetTransferData] ? 'border-brandBlue-500 bg-brandBlue-50' : 'border-slate-100 bg-slate-50 hover:border-slate-300'}`}
                                >
                                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 ${data[item.id as keyof AssetTransferData] ? 'bg-brandBlue-600 border-brandBlue-600 text-white shadow-sm' : 'border-slate-300'}`}>
                                        {data[item.id as keyof AssetTransferData] && <CheckCircle className="w-4 h-4" />}
                                    </div>
                                    <span className="text-sm font-bold text-slate-900">{item.text}</span>
                                </button>
                            ))}
                        </div>
                        <div className="pt-8 border-t border-slate-100">
                             <label className={labelStyle}>Your Full Legal Name (Signature)</label>
                             <input className="w-full p-5 bg-slate-50 text-slate-900 border border-slate-200 rounded-2xl font-display text-2xl focus:ring-2 focus:ring-brandBlue-500 outline-none shadow-inner" placeholder="Type Your Full Name" value={data.signature} onChange={e => setData({...data, signature: e.target.value})} />
                        </div>
                    </div>
                )}

                {step === 6 && (
                    <div className="space-y-10 animate-fade-in py-16 text-center">
                        <div className="w-24 h-24 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl border border-green-100">
                            <CheckCircle className="w-12 h-12" />
                        </div>
                        <div>
                            <h2 className="text-4xl font-display font-extrabold text-slate-900 mb-3">Documents Ready</h2>
                            <p className="text-slate-500 text-lg">Your property transfer instruments have been built.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto text-left">
                            {docs.map((doc, i) => (
                                <div key={i} className="p-6 bg-white border border-slate-100 rounded-2xl flex items-center justify-between shadow-md hover:shadow-lg transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-brandBlue-600 group-hover:bg-brandBlue-50 transition-all"><FileText className="w-6 h-6" /></div>
                                        <span className="font-bold text-slate-800 tracking-wide">{doc.title}</span>
                                    </div>
                                    <div className="flex gap-3">
                                        <button onClick={() => setPreviewDoc(doc)} className="p-2.5 text-slate-400 hover:text-slate-900 transition-colors"><Info className="w-5 h-5" /></button>
                                        <button onClick={() => exportToPdf(doc.title, doc.content)} className="p-2.5 bg-brandBlue-600 text-white rounded-xl font-bold shadow-md hover:bg-brandBlue-700 transition-all"><Download className="w-5 h-5" /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setStep(1)} className="px-10 py-4 text-xs font-black uppercase tracking-[0.2em] border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-500 transition-all shadow-sm">Transfer Another Asset</button>
                    </div>
                )}
            </div>

            {step < 6 && (
                <div className="px-10 py-8 bg-slate-50 border-t border-slate-200 flex items-center justify-between rounded-b-3xl">
                    <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400 gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        SECURE SESSION ACTIVE
                    </div>
                    <div className="flex gap-4">
                        {step > 1 && <button onClick={() => setStep(step - 1)} className="px-6 py-3 bg-white text-slate-600 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-slate-50 transition-all border border-slate-200 shadow-sm">Back</button>}
                        <button 
                            disabled={(step === 1 && !data.trustId) || (step === 2 && !data.category) || (step === 5 && (!data.attestNoLienRemoval || !data.attestPaymentRemains || !data.attestNoTitleTransfer || !data.signature))}
                            onClick={() => {
                                if (step === 5) handleGenerate();
                                else setStep(step + 1);
                            }} 
                            className="btn-primary px-10 py-3.5 flex items-center gap-3 text-xs uppercase tracking-[0.2em] shadow-xl"
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : step === 5 ? 'Finish Documents' : 'Continue'}
                            {!isLoading && step < 5 && <ChevronRight className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            )}
        </div>

        <div className="w-full lg:w-80 space-y-8">
            <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-xl">
                <h4 className="font-bold flex items-center gap-3 mb-6 text-brandBlue-600 uppercase tracking-[0.2em] text-xs">
                    <Shield className="w-4 h-4" /> Smart Strategy
                </h4>
                <div className="space-y-6 text-xs leading-relaxed text-slate-500 font-medium">
                    <p>Moving property uses a method called <strong>Equitable Assignment</strong>.</p>
                    <p>This allows your setup to own the "benefit" of the property without requiring a bank's permission or a full payoff.</p>
                    <div className="pt-6 border-t border-slate-100">
                        <span className="text-brandBlue-600 font-black block mb-2 uppercase tracking-widest">Financed Assets</span>
                        <p>We specifically guide you on how to protect cars, equipment, and homes that still have active loans.</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-brandBlue-50 border border-brandBlue-100 p-8 rounded-3xl shadow-sm">
                 <h4 className="font-bold text-slate-900 mb-4 text-xs uppercase tracking-widest">Safe Protocols</h4>
                 <div className="space-y-4">
                    <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                        <span className="font-black block text-brandBlue-600 text-[9px] mb-1 uppercase tracking-widest">Direct Linkage</span>
                        <p className="text-[10px] text-slate-500 leading-tight">Unique IDs (like VINs) connect your property directly to your protection plan.</p>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                        <span className="font-black block text-brandBlue-600 text-[9px] mb-1 uppercase tracking-widest">Lender Notification</span>
                        <p className="text-[10px] text-slate-500 leading-tight">We provide forms to help you coordinate with your bank or insurance company.</p>
                    </div>
                 </div>
            </div>
        </div>
      </div>

      <PreviewModal doc={previewDoc} onClose={() => setPreviewDoc(null)} />
    </div>
  );
};