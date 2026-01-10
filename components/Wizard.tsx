import React, { useState } from 'react';
import { WizardState, TrustType, TrustWizardData, GeneratedDocument, AppMode } from '../types';
import { generateTrustPacket } from '../services/legalTemplates';
import { exportToPdf } from '../services/documentExporter';
import { PreviewModal } from './PreviewModal';
import { ArrowRight, BrainCircuit, Loader2, FileText, ChevronLeft, CheckCircle, Layers, Star, Shield, Lock, ExternalLink } from 'lucide-react';

// --- Questionnaire Data Structure ---
type QuestionId = 'start' | 'probate_check' | 'control_check' | 're_type' | 'biz_confirm' | 'risk_profile';

interface QuestionOption {
  text: string;
  subtext?: string;
  icon?: any;
  image?: string; // New image property
  nextId?: QuestionId; // If undefined, it's a terminal node
  outcome?: TrustType;
  outcomeReason?: string;
}

interface Question {
  id: QuestionId;
  title: string;
  description: string;
  options: QuestionOption[];
}

const QUESTIONS: Record<string, Question> = {
  start: {
    id: 'start',
    title: "Identify Your Goal",
    description: "Select the primary objective for your new structure to get a tailored recommendation.",
    options: [
      { 
        text: "Family Inheritance", 
        subtext: "Avoid probate & courts.", 
        image: "https://images.unsplash.com/photo-1542318285-d867c268d0c2?auto=format&fit=crop&w=800&q=80",
        nextId: 'probate_check' 
      },
      { 
        text: "Asset Protection", 
        subtext: "Shield wealth from lawsuits.", 
        image: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=800&q=80",
        nextId: 'risk_profile' 
      },
      { 
        text: "Real Estate Privacy", 
        subtext: "Anonymous title holding.", 
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        nextId: 're_type' 
      },
      { 
        text: "Business Operations", 
        subtext: "Privacy for your company.", 
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        nextId: 'biz_confirm' 
      },
    ]
  },
  risk_profile: {
    id: 'risk_profile',
    title: "Portfolio Type",
    description: "What creates the most risk in your life currently?",
    options: [
      {
        text: "Business & Tenants",
        subtext: "High liability activities.",
        image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&w=800&q=80",
        outcome: TrustType.IRON_CHAIN,
        outcomeReason: "Iron Chain™ System"
      },
      {
        text: "Passive Wealth",
        subtext: "Stocks, Cash, Residence.",
        image: "https://images.unsplash.com/photo-1621504450168-38f647315a6e?auto=format&fit=crop&w=800&q=80",
        nextId: 'control_check'
      }
    ]
  },
  probate_check: {
    id: 'probate_check',
    title: "Estate Value",
    description: "Is your total estate value above the Federal Estate Tax exemption?",
    options: [
      { 
        text: "Over $13 Million", 
        subtext: "Advanced Tax Planning needed.", 
        image: "https://images.unsplash.com/photo-1565514020175-0517fd43b94d?auto=format&fit=crop&w=800&q=80",
        outcome: TrustType.REVOCABLE, 
        outcomeReason: "High Net Worth Estate Plan" 
      },
      { 
        text: "Under $13 Million", 
        subtext: "Standard Probate Avoidance.", 
        image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&q=80",
        outcome: TrustType.REVOCABLE, 
        outcomeReason: "Standard Revocable Living Trust" 
      },
    ]
  },
  control_check: {
    id: 'control_check',
    title: "Control vs. Protection",
    description: "Maximum protection requires giving up legal ownership. Are you ready for that?",
    options: [
      { 
        text: "Yes, Protect Me", 
        subtext: "I relinquish direct control.", 
        image: "https://images.unsplash.com/photo-1590422591603-9d9dd1240212?auto=format&fit=crop&w=800&q=80",
        outcome: TrustType.IRREVOCABLE, 
        outcomeReason: "Irrevocable Asset Protection Trust" 
      },
      { 
        text: "No, I need Access", 
        subtext: "I want full spending power.", 
        image: "https://images.unsplash.com/photo-1563986768494-4dee46a38531?auto=format&fit=crop&w=800&q=80",
        outcome: TrustType.REVOCABLE, 
        outcomeReason: "Revocable Trust (Base)" 
      },
    ]
  },
  re_type: {
    id: 're_type',
    title: "Property Usage",
    description: "How is the real estate being used?",
    options: [
      { 
        text: "Primary Residence", 
        subtext: "Personal use only.", 
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        outcome: TrustType.REAL_ESTATE, 
        outcomeReason: "Title-Holding Land Trust" 
      },
      { 
        text: "Rental / Investment", 
        subtext: "Income generating.", 
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
        outcome: TrustType.REAL_ESTATE, 
        outcomeReason: "Land Trust + LLC Beneficiary" 
      },
    ]
  },
  biz_confirm: {
    id: 'biz_confirm',
    title: "Privacy Level",
    description: "Are you looking to avoid state franchise tax lists?",
    options: [
      { 
        text: "Maximum Privacy", 
        subtext: "Total anonymity (508c1a).",
        image: "https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?auto=format&fit=crop&w=800&q=80",
        outcome: TrustType.BULLETPROOF, 
        outcomeReason: "Bulletproof 508(c)(1)(A) Private Trust" 
      },
      { 
        text: "Standard", 
        subtext: "Standard liability protection.",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
        outcome: TrustType.BUSINESS, 
        outcomeReason: "Business Trust Holding Company" 
      },
    ]
  }
};

interface WizardProps {
  onNavigate?: (mode: AppMode) => void;
}

export const Wizard: React.FC<WizardProps> = ({ onNavigate }) => {
  const [state, setState] = useState<WizardState>({
    step: 1,
    trustType: null,
    assets: '',
    objectives: '',
    analysis: null,
    isLoading: false,
  });

  const [formData, setFormData] = useState<TrustWizardData>({
    type: '',
    name: '',
    jurisdiction: 'Wyoming',
    settlorName: '',
    settlorAddress: '',
    initialTrustee: '',
    initialTrusteeAddress: '',
    successorTrustee: '',
    successorTrusteeAddress: '',
    beneficiaries: [],
    assets: ''
  });

  const [generatedDocs, setGeneratedDocs] = useState<GeneratedDocument[]>([]);
  const [previewDoc, setPreviewDoc] = useState<GeneratedDocument | null>(null);

  const [currentQ, setCurrentQ] = useState<QuestionId>('start');
  const [history, setHistory] = useState<QuestionId[]>([]);
  const [recommendationReason, setRecommendationReason] = useState<string>('');

  const handleOptionSelect = (opt: QuestionOption) => {
    if (opt.nextId) {
      setHistory([...history, currentQ]);
      setCurrentQ(opt.nextId);
    } else if (opt.outcome) {
      setRecommendationReason(opt.outcomeReason || '');
      setState(s => ({ 
        ...s, 
        trustType: opt.outcome || null, 
        step: 2,
        objectives: opt.outcomeReason || '' 
      }));
      setFormData(prev => ({...prev, type: opt.outcome || ''}));
    }
  };

  const handleBackQuestion = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setCurrentQ(prev);
    }
  };

  const handleGenerateDocuments = () => {
    setState(s => ({ ...s, isLoading: true }));
    setTimeout(() => {
        if (state.trustType) {
            const docs = generateTrustPacket(state.trustType, formData);
            setGeneratedDocs(docs);
            setState(s => ({ ...s, isLoading: false, step: 3 }));
        }
    }, 1500);
  };

  // --- RENDERERS ---

  const renderQuestionnaire = () => {
    const q = QUESTIONS[currentQ];
    // Dynamic grid cols: Start usually has 4, others usually 2
    const gridCols = q.options.length === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2';

    return (
      <div className="animate-fade-in w-full">
        <div className="text-center mb-10">
            <span className="text-orange-500 font-bold uppercase tracking-wider text-xs">Phase 1: Diagnosis</span>
            <h2 className="text-3xl font-display font-bold text-brandBlue-900 mt-2">{q.title}</h2>
            <p className="text-slate-600 mt-2">{q.description}</p>
        </div>

        <div className={`grid grid-cols-1 ${gridCols} gap-6 max-w-6xl mx-auto`}>
          {q.options.map((opt, idx) => {
            const Icon = opt.icon || ArrowRight;
            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(opt)}
                className={`group flex flex-col items-center text-center relative overflow-hidden transition-all duration-300
                  ${opt.image 
                    ? 'bg-black rounded-2xl shadow-xl hover:-translate-y-2 hover:shadow-2xl border-2 border-transparent hover:border-orange-400 p-0 h-96' 
                    : 'card-modern p-8 hover:border-orange-300 min-h-[16rem] justify-center'
                  }
                `}
              >
                {opt.image ? (
                  <>
                     <div className="absolute inset-0 z-0">
                        <img src={opt.image} alt={opt.text} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
                     </div>
                     <div className="relative z-10 w-full h-full flex flex-col justify-end p-8 text-left">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors shadow-sm drop-shadow-md">{opt.text}</h3>
                        <p className="text-sm text-slate-200 font-medium leading-snug drop-shadow">{opt.subtext}</p>
                        <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-orange-400 text-xs font-bold uppercase tracking-widest">
                            <span>Select Strategy</span>
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                     </div>
                  </>
                ) : (
                  <>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 group-hover:bg-orange-500 transition-colors"></div>
                    
                    <div className="mb-6 p-4 bg-brandBlue-50 rounded-full text-brandBlue-500 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
                      <Icon className="w-10 h-10" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-brandBlue-900 mb-2">{opt.text}</h3>
                    {opt.subtext && (
                      <p className="text-base text-slate-500">{opt.subtext}</p>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>

        {history.length > 0 && (
          <div className="text-center mt-12">
            <button 
                onClick={handleBackQuestion}
                className="text-slate-400 hover:text-brandBlue-500 flex items-center justify-center mx-auto text-sm font-bold uppercase tracking-wider transition-colors"
            >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous Step
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderDataCollection = () => {
    return (
      <div className="animate-fade-in max-w-4xl mx-auto">
         {/* Recommendation Banner */}
         <div className="bg-gradient-to-r from-brandBlue-900 to-brandBlue-600 text-white p-8 rounded-2xl shadow-xl flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <BrainCircuit className="w-32 h-32 text-white" />
            </div>
            
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                <CheckCircle className="w-8 h-8 text-orange-400" />
            </div>
            <div className="flex-1 z-10 text-center md:text-left">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Phase 2: Strategy</span>
              <h3 className="text-2xl font-display font-bold text-white mt-1 mb-2">Recommendation: {state.trustType}</h3>
              <p className="text-brandBlue-100 text-sm leading-relaxed">{recommendationReason}</p>
            </div>
         </div>

         <div className="card-modern p-8 md:p-10">
            <div className="flex items-center space-x-3 mb-8 border-b border-slate-100 pb-4">
                <div className="bg-orange-100 p-2 rounded-lg">
                    <FileText className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-brandBlue-900">
                    Configure Preliminary Details
                </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Name of Trust</label>
                    <input 
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        placeholder="e.g. The Apex Business Trust"
                        className="w-full p-4 bg-white text-slate-900 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-shadow placeholder-slate-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Grantor (Creator)</label>
                    <input 
                        type="text" 
                        value={formData.settlorName}
                        onChange={e => setFormData({...formData, settlorName: e.target.value})}
                        placeholder="Full Legal Name"
                        className="w-full p-4 bg-white text-slate-900 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Trustee (Manager)</label>
                    <input 
                        type="text" 
                        value={formData.initialTrustee}
                        onChange={e => setFormData({...formData, initialTrustee: e.target.value})}
                        placeholder="Individual or LLC Name"
                        className="w-full p-4 bg-white text-slate-900 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                </div>

                 <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Address</label>
                    <input 
                        type="text" 
                        value={formData.settlorAddress}
                        onChange={e => setFormData({...formData, settlorAddress: e.target.value})}
                        placeholder="Business or Mailing Address (City, State)"
                        className="w-full p-4 bg-white text-slate-900 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                </div>
                 
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Jurisdiction</label>
                    <select 
                        value={formData.jurisdiction}
                        onChange={e => setFormData({...formData, jurisdiction: e.target.value})}
                        className="w-full p-4 bg-white text-slate-900 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none appearance-none"
                    >
                        <option value="Wyoming">Wyoming (Recommended)</option>
                        <option value="Delaware">Delaware</option>
                        <option value="Nevada">Nevada</option>
                        <option value="Florida">Florida</option>
                        <option value="Texas">Texas</option>
                    </select>
                    <a 
                        href="https://www.wyomingagents.com/" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center mt-2 text-xs font-bold text-brandBlue-500 hover:text-orange-500 transition-colors"
                    >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Get a Wyoming Registered Agent
                    </a>
                </div>
            </div>

            <div className="mt-10 flex items-center justify-between">
                <button
                    onClick={() => setState(s => ({ ...s, step: 1 }))}
                    className="text-slate-400 hover:text-brandBlue-600 font-medium text-sm flex items-center"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to Assessment
                </button>
                
                <button
                    onClick={handleGenerateDocuments}
                    disabled={!formData.name || !formData.settlorName || state.isLoading}
                    className="btn-primary px-10 py-4 flex items-center space-x-2 text-lg"
                >
                    {state.isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Generate Drafts</span>}
                    {!state.isLoading && <ArrowRight className="w-5 h-5" />}
                </button>
            </div>
         </div>
      </div>
    );
  };

  const renderResults = () => {
    return (
        <div className="animate-fade-in max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
                 <div className="flex justify-center space-x-1 mb-2">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 text-orange-400 fill-current" />)}
                 </div>
                <h2 className="text-4xl font-display font-bold text-brandBlue-900">Preliminary Packet Ready</h2>
                <p className="text-slate-600 text-lg">We have generated your starting documents. For full implementation, use the dedicated builder below.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {generatedDocs.map((doc, idx) => (
                    <div key={idx} className="card-modern p-8 flex flex-col justify-between h-full border-t-4 border-t-orange-500">
                        <div>
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-3 bg-blue-50 text-brandBlue-600 rounded-xl">
                                    <FileText className="w-8 h-8" />
                                </div>
                                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">DRAFT</span>
                            </div>
                            <h3 className="text-xl font-bold text-brandBlue-900 mb-2">{doc.title}</h3>
                            <p className="text-sm text-slate-500 line-clamp-3 mb-6 bg-slate-50 p-3 rounded-lg border border-slate-100 font-mono">
                                {doc.content.substring(0, 150)}...
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-3 mt-4 pt-6 border-t border-slate-100">
                             <button 
                               onClick={() => setPreviewDoc(doc)}
                               className="flex-1 btn-secondary text-sm py-2.5"
                             >
                                Preview
                             </button>
                             <button 
                               onClick={() => exportToPdf(doc.title, doc.content)}
                               className="flex-1 btn-primary text-sm py-2.5 shadow-none"
                             >
                                Download PDF
                             </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Smart Navigation CTAs */}
            {state.trustType === TrustType.IRON_CHAIN && (
               <div className="bg-brandBlue-900 text-white p-8 rounded-2xl shadow-2xl border border-brandBlue-700 text-center max-w-3xl mx-auto relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-orange-500/10 to-blue-500/10 z-0"></div>
                  <div className="relative z-10">
                    <h4 className="text-2xl font-bold mb-4 flex items-center justify-center gap-3">
                        <Layers className="w-8 h-8 text-orange-400" />
                        Next Step: The Iron Chain™
                    </h4>
                    <p className="text-blue-100 mb-8 max-w-lg mx-auto text-lg">
                        You have the Sovereign Trust foundation. Now implement the Holding Company and Operating Company structure for maximum protection.
                    </p>
                    <button 
                        onClick={() => onNavigate?.(AppMode.IRON_CHAIN)} 
                        className="btn-primary px-8 py-3 text-lg flex items-center justify-center mx-auto"
                    >
                        Launch Iron Chain Builder <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>
               </div>
            )}

            {state.trustType === TrustType.BULLETPROOF && (
               <div className="bg-slate-800 text-white p-8 rounded-2xl shadow-2xl border border-slate-700 text-center max-w-3xl mx-auto relative overflow-hidden">
                  <div className="relative z-10">
                    <h4 className="text-2xl font-bold mb-4 flex items-center justify-center gap-3">
                        <Shield className="w-8 h-8 text-orange-400" />
                        Next Step: Bulletproof System
                    </h4>
                    <p className="text-slate-300 mb-8 max-w-lg mx-auto text-lg">
                        Your objective is Maximum Privacy. Proceed to the Bulletproof Trust module to finalize your 508(c)(1)(A) instruments.
                    </p>
                    <button 
                        onClick={() => onNavigate?.(AppMode.BULLETPROOF)} 
                        className="btn-primary px-8 py-3 text-lg flex items-center justify-center mx-auto"
                    >
                        Launch Bulletproof Builder <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>
               </div>
            )}

            {(state.trustType === TrustType.REVOCABLE || state.trustType === TrustType.IRREVOCABLE) && (
               <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 text-center max-w-3xl mx-auto">
                    <h4 className="text-2xl font-bold mb-4 flex items-center justify-center gap-3 text-brandBlue-900">
                        <BrainCircuit className="w-8 h-8 text-brandBlue-600" />
                        Next Step: Trust Architect
                    </h4>
                    <p className="text-slate-600 mb-8 max-w-lg mx-auto text-lg">
                        You have your draft. Now use the full Architect to refine beneficiaries, powers, and clauses.
                    </p>
                    <button 
                        onClick={() => onNavigate?.(AppMode.TRUST_ARCHITECT)} 
                        className="btn-secondary px-8 py-3 text-lg flex items-center justify-center mx-auto"
                    >
                        Open Full Architect <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
               </div>
            )}
            
            <PreviewModal doc={previewDoc} onClose={() => setPreviewDoc(null)} />
        </div>
    );
  };

  return (
    <div className="w-full">
      {/* Visual Step Indicator */}
      <div className="mb-12 max-w-xl mx-auto">
        <div className="flex justify-between items-center relative">
            {/* Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-10 rounded-full"></div>
            <div className={`absolute top-1/2 left-0 h-1 bg-orange-500 -z-10 rounded-full transition-all duration-500`} style={{ width: `${(state.step / 3) * 100}%` }}></div>

            {/* Steps */}
            {[1, 2, 3].map((step) => (
                <div key={step} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    state.step >= step ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'bg-white text-slate-400 border-2 border-slate-200'
                }`}>
                    {step}
                </div>
            ))}
        </div>
        <div className="flex justify-between text-xs font-bold text-slate-500 mt-2 uppercase tracking-wide">
            <span>Diagnosis</span>
            <span>Strategy</span>
            <span>Execution</span>
        </div>
      </div>

      <div className="min-h-[500px]">
        {state.step === 1 && renderQuestionnaire()}
        {state.step === 2 && renderDataCollection()}
        {state.step === 3 && renderResults()}
      </div>
      
      {state.step === 3 && (
          <div className="flex justify-center mt-16 space-x-4">
             {/* Back Button for Step 3 */}
            <button 
                onClick={() => setState(s => ({ ...s, step: 2 }))}
                className="text-slate-400 hover:text-brandBlue-600 font-medium text-sm flex items-center px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Details
            </button>
            <button 
                onClick={() => {
                    setState({step: 1, trustType: null, assets: '', objectives: '', analysis: null, isLoading: false});
                    setFormData({
                        type: '', name: '', jurisdiction: 'Wyoming', settlorName: '', settlorAddress: '', 
                        initialTrustee: '', initialTrusteeAddress: '', successorTrustee: '', successorTrusteeAddress: '', beneficiaries: [], assets: ''
                    });
                    setGeneratedDocs([]);
                }}
                className="text-orange-500 hover:text-orange-600 font-medium text-sm flex items-center px-4 py-2 border border-orange-200 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
            >
                Start New Session
                <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
      )}
    </div>
  );
};