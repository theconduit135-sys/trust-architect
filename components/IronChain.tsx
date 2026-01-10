import React, { useState } from 'react';
import { IronChainData, GeneratedDocument } from '../types';
import { generateIronChainPacket } from '../services/legalTemplates';
import { exportToPdf, exportToDocx, exportToMarkdown } from '../services/documentExporter';
import { PreviewModal } from './PreviewModal';
import { Layers, Shield, Link as LinkIcon, FileText, Download, Loader2, File, FileType, FileCode, Eye, MapPin, ExternalLink } from 'lucide-react';

export const IronChain: React.FC = () => {
  const [data, setData] = useState<IronChainData>({
    trustName: '',
    trustStreet: '',
    trustCity: '',
    trustState: '',
    trustZip: '',
    
    holdingCoName: '',
    holdingCoStreet: '',
    holdingCoCity: '',
    holdingCoState: '', // Recommendation: Wyoming
    holdingCoZip: '',

    operatingCoName: '',
    operatingCoStreet: '',
    operatingCoCity: '',
    operatingCoState: '', // Recommendation: Operation State
    operatingCoZip: '',

    jurisdiction: 'Wyoming'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [docs, setDocs] = useState<GeneratedDocument[]>([]);
  const [previewDoc, setPreviewDoc] = useState<GeneratedDocument | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    // Use the deterministic generator to ensure Sovereign Tier compliance
    const results = generateIronChainPacket(data);
    
    // Simulate processing time for UX effect (feels more "heavy duty")
    setTimeout(() => {
        setDocs(results);
        setIsLoading(false);
    }, 1500);
  };

  // High contrast input styles
  const inputClass = "w-full p-3 bg-slate-50 text-black border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none font-semibold placeholder-slate-500 mb-2 shadow-sm";
  const smallInputClass = "w-full p-2 bg-slate-50 text-black border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-orange-500 outline-none font-semibold placeholder-slate-500 shadow-sm";
  const labelClass = "text-xs font-bold text-slate-700 uppercase mb-1 block";

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-12 animate-fade-in px-4">
      
      {/* Header & Definition */}
      <div className="text-center space-y-8">
        <div>
            <h2 className="text-5xl font-display font-bold text-brandBlue-900 mb-4">Iron Chain™ Strategy</h2>
            <p className="text-slate-700 max-w-3xl mx-auto text-xl leading-relaxed">
            Implement the "Triple-Tier" defense by separating risky operations from valuable assets.
            </p>
        </div>

        {/* Definition Block */}
        <div className="max-w-4xl mx-auto bg-brandBlue-50 border-l-4 border-orange-500 p-6 rounded-r-xl text-left shadow-sm">
            <h4 className="font-bold text-brandBlue-900 text-lg flex items-center mb-2">
                <Shield className="w-5 h-5 mr-2 text-orange-500" />
                Strategic Definition
            </h4>
            <p className="text-slate-700 leading-relaxed text-base mb-4">
                The <strong>Iron Chain™</strong> is an asset protection protocol that utilizes a multi-entity structure to compartmentalize risk. By placing safe assets into a <em>Holding Company</em> and business activities into a separate <em>Operating Company</em>—both owned by a private <em>Sovereign Trust</em>—you create a legal firewall. If the Operating Company is sued, the "Iron Chain" prevents creditors from seizing the assets held in the Holding Company.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-sm text-slate-600 bg-white/60 p-4 rounded-lg border border-orange-100">
               <span className="font-bold text-orange-600 whitespace-nowrap">Pro Tip:</span> 
               <span>Establish your Holding Company in Wyoming for maximum protection.</span>
               <a 
                 href="https://www.wyomingagents.com/" 
                 target="_blank" 
                 rel="noreferrer" 
                 className="text-brandBlue-600 hover:text-orange-500 font-bold underline flex items-center gap-1 transition-colors"
               >
                 Start with Wyoming Agents <ExternalLink className="w-3 h-3" />
               </a>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start relative px-4 pt-4">
        {/* Visual Line */}
        <div className="hidden md:block absolute top-[180px] left-0 w-full h-3 bg-slate-200 -z-10 rounded-full"></div>

        {/* Tier 1: Sovereign Trust */}
        <div className="card-modern p-8 relative z-10 border-t-8 border-t-brandBlue-600 bg-white flex flex-col items-center min-h-[500px]">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-brandBlue-600 text-white px-6 py-2 text-sm font-bold rounded-full shadow-lg tracking-widest uppercase">
            CONTROL
          </div>
          <div className="flex justify-center mb-6 mt-4">
            <Shield className="w-16 h-16 text-brandBlue-600" />
          </div>
          <h3 className="text-center font-bold text-brandBlue-900 text-xl">Sovereign Trust</h3>
          <p className="text-sm text-center text-slate-500 font-medium mb-6">Owns the Holding Co.</p>
          
          <div className="w-full space-y-3 mt-auto text-left">
            <label className={labelClass}>Trust Details</label>
            <input 
              placeholder="Name (e.g. Smith Family Trust)" 
              value={data.trustName}
              onChange={e => setData({...data, trustName: e.target.value})}
              className={inputClass}
            />
            <input 
              placeholder="Street Address" 
              value={data.trustStreet}
              onChange={e => setData({...data, trustStreet: e.target.value})}
              className={inputClass}
            />
            <div className="grid grid-cols-2 gap-2">
                <input placeholder="City" value={data.trustCity} onChange={e => setData({...data, trustCity: e.target.value})} className={smallInputClass} />
                <input placeholder="Zip" value={data.trustZip} onChange={e => setData({...data, trustZip: e.target.value})} className={smallInputClass} />
            </div>
            <div className="relative">
                <input 
                    placeholder="State" 
                    value={data.trustState} 
                    onChange={e => setData({...data, trustState: e.target.value})} 
                    className={smallInputClass + " pr-8"} 
                />
                <span className="absolute right-2 top-1.5 text-[10px] text-green-600 font-bold bg-green-50 px-1 rounded border border-green-100">Rec: WY</span>
            </div>
          </div>
        </div>

        {/* Tier 2: Holding LLC */}
        <div className="card-modern p-8 relative z-10 border-t-8 border-t-orange-500 transform md:-translate-y-6 shadow-2xl bg-white flex flex-col items-center min-h-[500px]">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-6 py-2 text-sm font-bold rounded-full shadow-lg tracking-widest uppercase">
            HOLDING
          </div>
          <div className="flex justify-center mb-6 mt-4">
             <Layers className="w-16 h-16 text-orange-500" />
          </div>
          <h3 className="text-center font-bold text-brandBlue-900 text-xl">Holding LLC</h3>
          <p className="text-sm text-center text-slate-500 font-medium mb-2">Owns Assets & Op Co.</p>
          
          <a href="https://www.wyomingagents.com/" target="_blank" rel="noreferrer" className="text-xs font-bold text-orange-500 hover:text-orange-600 flex items-center justify-center mb-6 transition-colors border border-orange-200 bg-orange-50 rounded-full px-3 py-1">
             <ExternalLink className="w-3 h-3 mr-1" /> Register in Wyoming
          </a>
          
          <div className="w-full space-y-3 mt-auto text-left">
            <label className={labelClass}>LLC Details</label>
            <input 
              placeholder="Name (e.g. Smith Holdings LLC)" 
              value={data.holdingCoName}
              onChange={e => setData({...data, holdingCoName: e.target.value})}
              className={inputClass}
            />
            <input 
              placeholder="Street Address (Registered Agent)" 
              value={data.holdingCoStreet}
              onChange={e => setData({...data, holdingCoStreet: e.target.value})}
              className={inputClass}
            />
            <div className="grid grid-cols-2 gap-2">
                <input placeholder="City" value={data.holdingCoCity} onChange={e => setData({...data, holdingCoCity: e.target.value})} className={smallInputClass} />
                <input placeholder="Zip" value={data.holdingCoZip} onChange={e => setData({...data, holdingCoZip: e.target.value})} className={smallInputClass} />
            </div>
            <div className="relative">
                <input 
                    placeholder="State" 
                    value={data.holdingCoState} 
                    onChange={e => setData({...data, holdingCoState: e.target.value})} 
                    className={smallInputClass + " pr-8"} 
                />
                <span className="absolute right-2 top-1.5 text-[10px] text-green-600 font-bold bg-green-50 px-1 rounded border border-green-100">Rec: WY</span>
            </div>
          </div>
        </div>

        {/* Tier 3: Operating LLC */}
        <div className="card-modern p-8 relative z-10 border-t-8 border-t-slate-600 bg-white flex flex-col items-center min-h-[500px]">
           <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-600 text-white px-6 py-2 text-sm font-bold rounded-full shadow-lg tracking-widest uppercase">
            OPERATIONS
          </div>
          <div className="flex justify-center mb-6 mt-4">
             <LinkIcon className="w-16 h-16 text-slate-600" />
          </div>
          <h3 className="text-center font-bold text-brandBlue-900 text-xl">Operating LLC</h3>
          <p className="text-sm text-center text-slate-500 font-medium mb-6">Face of Business</p>
          
          <div className="w-full space-y-3 mt-auto text-left">
            <label className={labelClass}>LLC Details</label>
            <input 
              placeholder="Name (e.g. Smith Consulting LLC)" 
              value={data.operatingCoName}
              onChange={e => setData({...data, operatingCoName: e.target.value})}
              className={inputClass}
            />
            <input 
              placeholder="Street Address (Office/Home)" 
              value={data.operatingCoStreet}
              onChange={e => setData({...data, operatingCoStreet: e.target.value})}
              className={inputClass}
            />
            <div className="grid grid-cols-2 gap-2">
                <input placeholder="City" value={data.operatingCoCity} onChange={e => setData({...data, operatingCoCity: e.target.value})} className={smallInputClass} />
                <input placeholder="Zip" value={data.operatingCoZip} onChange={e => setData({...data, operatingCoZip: e.target.value})} className={smallInputClass} />
            </div>
            <div className="relative">
                <input 
                    placeholder="State" 
                    value={data.operatingCoState} 
                    onChange={e => setData({...data, operatingCoState: e.target.value})} 
                    className={smallInputClass + " pr-8"} 
                />
                <span className="absolute right-2 top-1.5 text-[10px] text-blue-600 font-bold bg-blue-50 px-1 rounded border border-blue-100">Rec: Home</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-12">
         <button 
            onClick={handleGenerate}
            disabled={isLoading || !data.trustName || !data.holdingCoName || !data.operatingCoName}
            className="btn-primary px-16 py-6 text-xl flex items-center gap-4 shadow-xl hover:scale-105 transform transition-all"
          >
            {isLoading ? <Loader2 className="animate-spin w-6 h-6" /> : <><LinkIcon className="w-6 h-6" /> <span>Generate Iron Chain™ Packet</span></>}
          </button>
      </div>

      {/* Results */}
      {docs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in pt-16 border-t border-slate-200">
           {docs.map((doc, idx) => (
             <div key={idx} className="card-modern p-8 flex flex-col justify-between hover:border-orange-300">
               <div>
                <div className="flex items-center space-x-3 mb-4">
                    <FileText className="w-6 h-6 text-orange-500" />
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Instrument</span>
                </div>
                <h4 className="font-bold text-brandBlue-900 mb-6 text-lg leading-snug min-h-[3.5rem]">{doc.title}</h4>
               </div>
               
               <div className="flex flex-col gap-4 mt-4">
                 <button 
                   onClick={() => setPreviewDoc(doc)}
                   className="btn-secondary w-full text-sm py-3"
                 >
                   Preview
                 </button>
                 
                 <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => exportToPdf(doc.title, doc.content)} 
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg py-3 text-sm font-bold transition-colors"
                    >
                      PDF
                    </button>
                    <button 
                      onClick={() => exportToDocx(doc.title, doc.content)} 
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg py-3 text-sm font-bold transition-colors"
                    >
                      DOCX
                    </button>
                 </div>
               </div>
             </div>
           ))}
        </div>
      )}

      <PreviewModal doc={previewDoc} onClose={() => setPreviewDoc(null)} />
    </div>
  );
};