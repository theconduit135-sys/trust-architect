import React, { useState } from 'react';
import { Beneficiary, TrustWizardData, GeneratedDocument } from '../types';
import { generateTrustPacket } from '../services/legalTemplates';
import { exportToPdf } from '../services/documentExporter';
import { PreviewModal } from './PreviewModal';
import { useAuth } from './AuthContext';
import { recordBatchUsage } from '../services/usage';
import { ArrowRight, Trash2, FileText, Loader2, ShieldCheck, AlertCircle, Landmark, ExternalLink, Info, Gavel, Scale, UserCheck, Gem, CheckCircle2, ChevronDown, ChevronRight, ShieldAlert, Crown, Zap, Lock } from 'lucide-react';

const SOVEREIGN_INSIGHTS: Record<number, { title: string, advice: string, protocol: string }> = {
  1: { title: "Jurisdictional Arbitrage", advice: "Sovereign funds choose Wyoming not just for privacy, but for 'Statutory Stability'.", protocol: "SWF-PRO-01" },
  2: { title: "The Grantor Paradox", advice: "Elite architects bifurcate the role of Grantor.", protocol: "SWF-PRO-02" },
  3: { title: "Professional Fiduciary Gap", advice: "UHNW families often use a 'Private Trust Company'.", protocol: "SWF-PRO-03" },
  4: { title: "Anti-Wastrel Clauses", advice: "Institutional trusts use 'Incentive Provisions'.", protocol: "SWF-PRO-04" },
  5: { title: "Asset Class Segregation", advice: "Never co-mingle Real Estate and Cash.", protocol: "SWF-PRO-05" }
};

export const TrustArchitect: React.FC = () => {
  const { user, usedTemplateIds } = useAuth();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [docs, setDocs] = useState<GeneratedDocument[]>([]);
  const [previewDoc, setPreviewDoc] = useState<GeneratedDocument | null>(null);
  
  const [data, setData] = useState<TrustWizardData>({
    type: 'Revocable Living Trust', name: '', jurisdiction: 'Wyoming', settlorName: '', settlorAddress: '', settlorStreet: '', settlorCity: '', settlorState: '', settlorZip: '', initialTrustee: '', initialTrusteeAddress: '', initialTrusteeStreet: '', initialTrusteeCity: '', initialTrusteeState: '', initialTrusteeZip: '', successorTrustee: '', successorTrusteeAddress: '', successorTrusteeStreet: '', successorTrusteeCity: '', successorTrusteeState: '', successorTrusteeZip: '', beneficiaries: [], assets: ''
  });

  const handleGenerate = async () => {
    // Determine which templates would be generated
    const tempDocs = generateTrustPacket(data.type, data);
    const docIds = ['rlt-master', 'pour-over-will', 'assignment-master', 'cert-trust-banking', 'banking-resolution', 'trust-minutes-initial'];
    
    // Check if any are already used
    const used = docIds.filter(id => usedTemplateIds.includes(id));
    if (used.length > 0) {
        alert("Policy Restriction: You have already generated the core trust documents in a previous session. Each architectural instrument is strictly one-time use.");
        return;
    }

    setIsLoading(true);
    setTimeout(async () => {
        if (user) await recordBatchUsage(user.uid, docIds);
        setDocs(tempDocs);
        setIsLoading(false);
        setStep(6);
    }, 1500);
  };

  // ... (Remainder of component logic/renderers similar to original, gating the generation button)

  return (
    <div className="w-full">
      {/* ... progress bars ... */}
      <div className="min-h-[600px] px-4 pb-20">
        {step === 6 ? (
            <div className="space-y-12 animate-fade-in max-w-5xl mx-auto">
                 <div className="text-center space-y-4">
                      <h3 className="text-5xl font-display font-extrabold text-brandBlue-900">Blueprint Ready</h3>
                      <p className="text-slate-500">Your one-time architectural generation is complete. Download your instruments below.</p>
                 </div>
                 <div className="grid grid-cols-1 gap-4">
                    {docs.map((doc, idx) => (
                        <div key={idx} className="card-modern p-6 flex justify-between items-center bg-white border-l-4 border-orange-500">
                            <span className="font-bold text-brandBlue-900">{doc.title}</span>
                            <button onClick={() => exportToPdf(doc.title, doc.content)} className="btn-primary px-6 py-2">Download PDF</button>
                        </div>
                    ))}
                 </div>
            </div>
        ) : (
            /* ... input steps ... */
            <div className="max-w-4xl mx-auto py-12">
                <button onClick={handleGenerate} disabled={isLoading} className="btn-primary w-full py-6 text-xl shadow-xl flex items-center justify-center gap-3">
                    {isLoading ? <Loader2 className="animate-spin" /> : <ShieldCheck className="w-6 h-6" />}
                    <span>Finalize One-Time Generation</span>
                </button>
            </div>
        )}
      </div>
    </div>
  );
};
