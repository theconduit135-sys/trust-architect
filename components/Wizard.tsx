import React, { useState } from 'react';
import { WizardState, TrustType, AppMode } from '../types';
import { useAuth } from './AuthContext';
import { ArrowRight, ChevronLeft, Shield, CheckCircle, Crown, Layers, Zap, Info } from 'lucide-react';

type QuestionId = 'priority' | 'asset_value' | 'risk_source' | 'privacy_needs';

interface QuestionOption {
  text: string;
  subtext: string;
  image: string;
  nextId?: QuestionId;
  recommendation?: string;
  tier?: 'Foundation' | 'Strategic' | 'Sovereign';
}

interface Question {
  id: QuestionId;
  title: string;
  description: string;
  options: QuestionOption[];
}

const QUESTIONS: Record<QuestionId, Question> = {
  priority: {
    id: 'priority',
    title: "What is your primary objective?",
    description: "Phase 1: Establishing the architectural foundation of your asset protection strategy.",
    options: [
      { 
        text: "Family Legacy", 
        subtext: "Probate avoidance and keeping assets for heirs.", 
        image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop",
        nextId: 'asset_value' 
      },
      { 
        text: "Asset Defense", 
        subtext: "Shielding wealth from future lawsuits and creditors.", 
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop",
        nextId: 'risk_source' 
      },
      { 
        text: "Anonymity", 
        subtext: "Hiding property ownership from public record.", 
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
        nextId: 'privacy_needs' 
      }
    ]
  },
  asset_value: {
    id: 'asset_value',
    title: "What is your estimated net worth?",
    description: "Phase 2: Determining the complexity of the jurisdictional requirements.",
    options: [
      { 
        text: "High Net Worth", 
        subtext: "Assets exceeding $13M (Complex tax exposure).", 
        image: "https://images.unsplash.com/photo-1454165833767-027ffea9e7a7?q=80&w=800&auto=format&fit=crop",
        nextId: 'risk_source'
      },
      { 
        text: "Standard Growth", 
        subtext: "Assets below $13M (Core protection needed).", 
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop",
        nextId: 'risk_source'
      }
    ]
  },
  risk_source: {
    id: 'risk_source',
    title: "Identify your source of risk",
    description: "Phase 3: Locating where the most significant legal liability originates.",
    options: [
      { 
        text: "Active Business", 
        subtext: "Contract disputes, employees, or trade risks.", 
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
        nextId: 'privacy_needs'
      },
      { 
        text: "Passive Holdings", 
        subtext: "Real estate, stocks, or managed portfolios.", 
        image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=800&auto=format&fit=crop",
        nextId: 'privacy_needs'
      }
    ]
  },
  privacy_needs: {
    id: 'privacy_needs',
    title: "Required Anonymity Level",
    description: "Phase 4: Selecting the visibility of your situs and identity.",
    options: [
      { 
        text: "Elite Privacy", 
        subtext: "Total public shielding of all titles and situs.", 
        image: "https://images.unsplash.com/photo-1554224155-1696413575b9?q=80&w=800&auto=format&fit=crop",
        recommendation: "Sovereign Infrastructure Protocol",
        tier: "Sovereign"
      },
      { 
        text: "Strategic Privacy", 
        subtext: "Hiding specific high-value assets (e.g. Real Estate).", 
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop",
        recommendation: "Strategic Infrastructure Protocol",
        tier: "Strategic"
      },
      { 
        text: "Standard", 
        subtext: "Basic asset separation and probate avoidance.", 
        image: "https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?q=80&w=800&auto=format&fit=crop",
        recommendation: "Foundation Infrastructure Protocol",
        tier: "Foundation"
      }
    ]
  }
};

interface WizardProps {
  onNavigate?: (mode: AppMode) => void;
}

export const Wizard: React.FC<WizardProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<number>(1);
  const [currentQ, setCurrentQ] = useState<QuestionId>('priority');
  const [history, setHistory] = useState<QuestionId[]>([]);
  const [finalTier, setFinalTier] = useState<'Foundation' | 'Strategic' | 'Sovereign' | null>(null);
  const [recText, setRecText] = useState("");

  const handleOptionSelect = (opt: QuestionOption) => {
    if (opt.nextId) {
      setHistory([...history, currentQ]);
      setCurrentQ(opt.nextId);
    } else if (opt.tier) {
      setFinalTier(opt.tier);
      setRecText(opt.recommendation || "");
      setStep(2); // Final summary
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setCurrentQ(prev);
    }
  };

  if (step === 2) {
    const Icon = finalTier === 'Sovereign' ? Crown : finalTier === 'Strategic' ? Layers : Shield;
    const desc = finalTier === 'Sovereign' 
      ? "Your profile requires the Iron Chain™ system and 508(c)(1)(A) private ministry protocols for maximum immunity."
      : finalTier === 'Strategic'
      ? "We recommend advanced anonymity through Land Trusts and anonymous banking nesting doll protocols."
      : "The Foundation tier is ideal for your family estate planning and core asset protection needs.";

    return (
      <div className="animate-fade-in max-w-4xl mx-auto space-y-12 pb-20">
        <div className="bg-white border-2 border-brandBlue-600 p-12 rounded-[3rem] shadow-heavy flex flex-col items-center text-center space-y-10">
          <div className="p-8 rounded-[2rem] bg-brandBlue-50 border-2 border-brandBlue-600 text-brandBlue-600 shadow-xl">
            <Icon className="w-20 h-20" />
          </div>
          
          <div className="space-y-4">
            <span className="text-brandBlue-600 font-black uppercase tracking-[0.3em] text-xs">Assessment Complete</span>
            <h2 className="text-5xl font-display font-black text-slate-900 tracking-tight leading-tight">{recText}</h2>
            <p className="text-slate-900 text-xl font-bold leading-relaxed max-w-2xl mx-auto">{desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Risk Profiles Mapped</h4>
                <p className="text-[11px] text-slate-900 font-bold mt-1">Identified all jurisdictional exposures based on your input.</p>
              </div>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Protocol Verified</h4>
                <p className="text-[11px] text-slate-900 font-bold mt-1">Selected the optimal architectural blueprint for your legacy.</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t-2 border-slate-100 w-full flex flex-col items-center space-y-6">
            <p className="text-xs text-slate-900 font-black uppercase tracking-widest">Deploy Your Infrastructure</p>
            <button 
              onClick={() => onNavigate?.(AppMode.CATALOG)}
              className="btn-primary w-full max-w-lg py-6 text-lg flex items-center justify-center gap-4 shadow-2xl border-2 border-brandBlue-800 group"
            >
              <span>VIEW {finalTier?.toUpperCase()} PRICING & SPECS</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
            <button onClick={() => { setStep(1); setCurrentQ('priority'); setHistory([]); }} className="text-[10px] font-black uppercase tracking-widest text-slate-400">Retake Assessment</button>
          </div>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[currentQ];
  const progressPercent = ((history.length) / 4) * 100;

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="mb-20 max-w-2xl mx-auto px-4">
        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden mb-6 border border-slate-300">
           <div className="h-full bg-brandBlue-600 transition-all duration-700" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
           <span>Analysis Start</span>
           <span className="text-brandBlue-600">Question {history.length + 1} of 4</span>
           <span>Recommendation</span>
        </div>
      </div>

      <div className="animate-fade-in w-full">
        <div className="text-center mb-16">
          <span className="text-brandBlue-600 font-black uppercase tracking-[0.3em] text-[10px] bg-brandBlue-50 px-4 py-1.5 rounded-full border-2 border-brandBlue-600 shadow-sm">Phase 1: Diagnostic Assessment</span>
          <h2 className="text-4xl lg:text-5xl font-display font-extrabold text-slate-900 mt-6 tracking-tight">{q.title}</h2>
          <p className="text-slate-900 mt-4 text-xl max-w-2xl mx-auto font-bold">{q.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-4">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionSelect(opt)}
              className="group flex flex-col items-center text-center relative overflow-hidden transition-all duration-500 bg-white rounded-[2.5rem] shadow-heavy border-2 border-slate-300 hover:border-brandBlue-600 h-[28rem]"
            >
              <div className="absolute inset-0 z-0">
                <img src={opt.image} alt={opt.text} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-white/10"></div>
              </div>
              <div className="relative z-10 w-full h-full flex flex-col justify-end p-10 text-left bg-gradient-to-t from-white via-white/80 to-transparent">
                <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-brandBlue-600 transition-colors tracking-tight">{opt.text}</h3>
                <p className="text-sm text-slate-900 font-bold leading-relaxed mb-8">{opt.subtext}</p>
                <div className="inline-flex items-center space-x-3 bg-brandBlue-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transform translate-y-2 group-hover:translate-y-0 opacity-100 transition-all duration-300 border-2 border-brandBlue-800">
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {history.length > 0 && (
          <div className="text-center mt-16">
            <button 
              onClick={handleBack}
              className="text-slate-900 hover:bg-slate-900 hover:text-white flex items-center justify-center mx-auto text-[11px] font-black uppercase tracking-[0.2em] transition-colors bg-white px-6 py-2 rounded-xl border-2 border-slate-900 shadow-sm"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};