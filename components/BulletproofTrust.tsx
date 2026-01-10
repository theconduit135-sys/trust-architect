import React, { useState } from 'react';
import { GeneratedDocument } from '../types';
import { generateBulletproofPacket } from '../services/legalTemplates';
import { exportToPdf, exportToDocx } from '../services/documentExporter';
import { PreviewModal } from './PreviewModal';
import { Shield, Lock, FileText, Loader2, Key, Building, ExternalLink } from 'lucide-react';

interface BulletproofData {
  trustName: string;
  grantorName: string;
  trusteeName: string;
  successorTrusteeName: string;
  state: string;
  street: string;
  city: string;
  zip: string;
}

export const BulletproofTrust: React.FC = () => {
  const [data, setData] = useState<BulletproofData>({
    trustName: '',
    grantorName: '',
    trusteeName: '',
    successorTrusteeName: '',
    state: '',
    street: '',
    city: '',
    zip: ''
  });
  
  const [docs, setDocs] = useState<GeneratedDocument[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<GeneratedDocument | null>(null);

  const handleGenerate = () => {
    setIsLoading(true);
    setTimeout(() => {
        // Map granular data to single address string for backward compatibility or use new method
        const packetData = {
            ...data,
            address: `${data.street}, ${data.city}, ${data.state} ${data.zip}`
        };
        const generated = generateBulletproofPacket(packetData);
        setDocs(generated);
        setIsLoading(false);
    }, 1500);
  };

  const isFormValid = Object.values(data).every((val) => (val as string).trim().length > 0);
  const inputClass = "w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white text-slate-900 mb-1";
  const smallInputClass = "w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white text-slate-900 text-sm";

  return (
    <div className="max-w-6xl mx-auto py-8 animate-fade-in px-4">
      
      {/* Hero Section */}
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-5xl font-display font-bold text-brandBlue-900">The Bulletproof Trust</h2>
        <p className="text-slate-600 text-xl max-w-2xl mx-auto">
          Create a 508(c)(1)(A) Private Trust. Operate in the private realm with no IRS filing requirements, while maintaining public banking access.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Column: Education & Inputs */}
        <div className="space-y-8">
            {/* The Concept Card */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-l-brandBlue-600">
                <div className="flex items-center space-x-3 mb-4">
                    <Shield className="w-8 h-8 text-brandBlue-600" />
                    <h3 className="text-2xl font-bold text-brandBlue-900">The Strategy</h3>
                </div>
                <p className="text-slate-600 leading-relaxed mb-4">
                    This structure creates two distinct versions of your trust:
                </p>
                <ul className="space-y-3">
                    <li className="flex items-start">
                        <Lock className="w-5 h-5 text-red-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-slate-700"><strong>The Private Copy:</strong> Stays in your safe. It strictly <em>prohibits</em> public commerce, keeping it legally "outside" federal jurisdiction.</span>
                    </li>
                    <li className="flex items-start">
                        <Building className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-slate-700"><strong>The Banking Copy (With EIN):</strong> Goes to the bank. It specifically <em>allows</em> public commerce (Paragraph #39) so you can open accounts.</span>
                    </li>
                </ul>
            </div>

            {/* Form */}
            <div className="card-modern p-8 bg-white">
                <h3 className="text-xl font-bold text-brandBlue-900 mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-orange-500" /> Trust Details
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Name of Private Trust</label>
                        <input 
                            className={inputClass}
                            placeholder="e.g. The Sovereign Family Trust"
                            value={data.trustName}
                            onChange={e => setData({...data, trustName: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Mailing Address</label>
                        <input 
                            className={inputClass}
                            placeholder="Street Address"
                            value={data.street}
                            onChange={e => setData({...data, street: e.target.value})}
                        />
                        <div className="grid grid-cols-3 gap-2 mt-1">
                            <input 
                                className={smallInputClass}
                                placeholder="City"
                                value={data.city}
                                onChange={e => setData({...data, city: e.target.value})}
                            />
                            <input 
                                className={smallInputClass}
                                placeholder="State"
                                value={data.state}
                                onChange={e => setData({...data, state: e.target.value})}
                            />
                            <input 
                                className={smallInputClass}
                                placeholder="Zip"
                                value={data.zip}
                                onChange={e => setData({...data, zip: e.target.value})}
                            />
                        </div>
                        <a 
                            href="https://www.wyomingagents.com/" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="flex items-center text-xs font-bold text-brandBlue-600 mt-2 hover:text-orange-500 transition-colors"
                        >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Need a Private Mailbox or Agent?
                        </a>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Grantor / Creator Name</label>
                        <input 
                            className={inputClass}
                            placeholder="Full Legal Name"
                            value={data.grantorName}
                            onChange={e => setData({...data, grantorName: e.target.value})}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Trustee Name</label>
                            <input 
                                className={inputClass}
                                placeholder="Usually You"
                                value={data.trusteeName}
                                onChange={e => setData({...data, trusteeName: e.target.value})}
                            />
                        </div>
                         <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Successor Trustee</label>
                            <input 
                                className={inputClass}
                                placeholder="Beneficiary or Spouse"
                                value={data.successorTrusteeName}
                                onChange={e => setData({...data, successorTrusteeName: e.target.value})}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <button 
                        onClick={handleGenerate}
                        disabled={!isFormValid || isLoading}
                        className="w-full btn-primary py-4 text-lg shadow-lg flex items-center justify-center gap-2"
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : <Key className="w-5 h-5" />}
                        <span>Generate Bulletproof Packet</span>
                    </button>
                </div>
            </div>
        </div>

        {/* Right Column: Results */}
        <div className="space-y-6">
            <div className="bg-brandBlue-900 text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                
                <h3 className="text-2xl font-bold font-display mb-6 relative z-10">Your Secure Documents</h3>
                
                {docs.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-brandBlue-200 border-2 border-dashed border-brandBlue-700 rounded-xl p-8">
                        <Lock className="w-16 h-16 mb-4 opacity-50" />
                        <p className="text-center text-sm">Fill out the details on the left to unlock your private trust instruments.</p>
                    </div>
                ) : (
                    <div className="space-y-4 relative z-10 animate-fade-in">
                        {docs.map((doc, idx) => (
                            <div key={idx} className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-colors group">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-orange-500 rounded-lg">
                                            <FileText className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="font-bold text-white text-sm">{doc.title}</span>
                                    </div>
                                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => setPreviewDoc(doc)}
                                            className="px-3 py-1 bg-white text-brandBlue-900 text-xs font-bold rounded shadow hover:bg-slate-100"
                                        >
                                            View
                                        </button>
                                        <button 
                                            onClick={() => exportToPdf(doc.title, doc.content)}
                                            className="px-3 py-1 bg-brandBlue-600 text-white text-xs font-bold rounded shadow hover:bg-brandBlue-500"
                                        >
                                            PDF
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="mt-8 p-4 bg-green-900/40 rounded-xl border border-green-500/30">
                            <h4 className="font-bold text-green-400 text-sm mb-2">Next Steps</h4>
                            <ol className="list-decimal list-inside text-xs text-green-100 space-y-1">
                                <li>Review the <strong>EIN Guide</strong> first.</li>
                                <li>Print 1 copy of the <strong>Standard</strong> trust (Keep Safe).</li>
                                <li>Print 1 copy of the <strong>Banking</strong> trust (Take to Bank).</li>
                                <li>Notarize both.</li>
                            </ol>
                        </div>
                    </div>
                )}
            </div>
        </div>

      </div>
      
      <PreviewModal doc={previewDoc} onClose={() => setPreviewDoc(null)} />
    </div>
  );
};