import React, { useState, useEffect } from 'react';
import { getMasterTemplates, extractPlaceholders, fillTemplate } from '../services/legalTemplates';
import { LegalTemplate } from '../types';
import { exportToPdf } from '../services/documentExporter';
import { useAuth } from './AuthContext';
import { 
  FileText, 
  Shield, 
  Home, 
  Edit3, 
  X, 
  ClipboardList, 
  Lock, 
  ChevronRight,
  Download,
  History,
  Search
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const TemplateLibrary: React.FC = () => {
  const templates = getMasterTemplates();
  const { user, userTier, usedTemplateIds } = useAuth();
  const [mode, setMode] = useState<'PICK' | 'FORM'>('PICK');
  const [editingTemplate, setEditingTemplate] = useState<LegalTemplate | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [previewContent, setPreviewContent] = useState<string>("");

  const [masterData, setMasterData] = useState({
    trustName: '',
    grantorName: '',
    grantorAddress: '',
    trusteeName: '',
    trusteeAddress: '',
    state: 'Wyoming',
    assets: 'Everything I own.',
  });
  
  const [readyDocs, setReadyDocs] = useState<{id: string, title: string, content: string}[]>([]);

  const startEditing = (template: LegalTemplate) => {
    const placeholders = extractPlaceholders(template.content);
    const initialValues: Record<string, string> = {};
    placeholders.forEach(key => {
        initialValues[key] = '';
    });
    setFormValues(initialValues);
    setEditingTemplate(template);
  };

  const makeAllDocs = () => {
    const map: Record<string, string> = {
        "Trust Name": masterData.trustName,
        "Grantor Name": masterData.grantorName,
        "Address": masterData.grantorAddress,
        "State": masterData.state,
    };

    const results = templates.map(t => ({
        id: t.id,
        title: t.title,
        content: fillTemplate(t.content, map)
    }));

    setReadyDocs(results);
  };

  const inputStyle = "w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brandBlue-500 outline-none text-slate-900 font-bold transition-all shadow-sm";
  const labelStyle = "block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2";

  return (
    <div className="max-w-7xl mx-auto py-12 animate-fade-in px-4 space-y-12">
      <div className="text-center space-y-6">
        <h2 className="text-5xl font-extrabold text-slate-900 font-display">Document Library</h2>
        <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium">Simple forms to help you keep things safe.</p>
        
        <div className="flex justify-center gap-4 mt-8 bg-slate-100 p-1.5 rounded-2xl w-fit mx-auto border border-slate-200">
            <button 
                onClick={() => setMode('PICK')} 
                className={`px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${mode === 'PICK' ? 'bg-white text-brandBlue-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <Search className="w-4 h-4" /> Pick a Form
            </button>
            <button 
                onClick={() => setMode('FORM')} 
                className={`px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${mode === 'FORM' ? 'bg-white text-brandBlue-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <ClipboardList className="w-4 h-4" /> Use One Simple Form
            </button>
        </div>
      </div>

      {mode === 'PICK' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => {
              const isUsed = usedTemplateIds.includes(template.id);
              return (
                <div key={template.id} className="card-white p-8 flex flex-col h-full border-t-4 border-brandBlue-500">
                  <div className="flex-1">
                    <div className="flex items-start space-x-4 mb-8">
                        <div className="p-4 rounded-xl bg-brandBlue-50 text-brandBlue-600 shadow-sm">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-lg leading-tight">{template.title}</h3>
                          <p className="text-xs font-bold text-slate-400 uppercase mt-1">Simple File</p>
                        </div>
                    </div>
                    <p className="text-sm text-slate-500 font-semibold leading-relaxed mb-8">{template.description}</p>
                  </div>
                  <button 
                    disabled={isUsed}
                    onClick={() => startEditing(template)}
                    className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center space-x-3 transition-all ${isUsed ? 'bg-slate-50 text-slate-300' : 'btn-primary'}`}
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>{isUsed ? 'Done' : 'Fill Out This Form'}</span>
                  </button>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="animate-fade-in space-y-12 max-w-4xl mx-auto">
            <div className="card-white overflow-hidden shadow-xl">
                <div className="p-10 bg-slate-50 flex items-center gap-6 border-b border-slate-100">
                    <div className="p-5 bg-white rounded-2xl border border-slate-200 text-brandBlue-600 shadow-sm">
                        <ClipboardList className="w-10 h-10" />
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-slate-900">The One-Page Form</h3>
                        <p className="text-sm text-slate-500 font-bold italic">Fill this out once and we'll finish everything for you!</p>
                    </div>
                </div>
                
                <div className="p-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                        <label className={labelStyle}>What is the plan name?</label>
                        <input className={inputStyle} value={masterData.trustName} onChange={e => setMasterData({...masterData, trustName: e.target.value})} placeholder="e.g. My Family Protection Plan" />
                    </div>
                    <div>
                        <label className={labelStyle}>What is your full name?</label>
                        <input className={inputStyle} value={masterData.grantorName} onChange={e => setMasterData({...masterData, grantorName: e.target.value})} placeholder="First and Last Name" />
                    </div>
                    <div className="md:col-span-2">
                        <label className={labelStyle}>Where do you live?</label>
                        <input className={inputStyle} value={masterData.grantorAddress} onChange={e => setMasterData({...masterData, grantorAddress: e.target.value})} placeholder="Your Full Home Address" />
                    </div>
                    <div>
                        <label className={labelStyle}>Who will manage the plan?</label>
                        <input className={inputStyle} value={masterData.trusteeName} onChange={e => setMasterData({...masterData, trusteeName: e.target.value})} placeholder="Usually You" />
                    </div>
                    <div>
                        <label className={labelStyle}>Which state are you in?</label>
                        <select className={inputStyle} value={masterData.state} onChange={e => setMasterData({...masterData, state: e.target.value})}>
                            <option value="Wyoming">Wyoming (Most Private)</option>
                            <option value="Nevada">Nevada (Very Safe)</option>
                            <option value="Florida">Florida</option>
                        </select>
                    </div>

                    <div className="lg:col-span-2 flex justify-center pt-16 border-t border-slate-50">
                        <button 
                            onClick={makeAllDocs} 
                            disabled={!masterData.trustName || !masterData.grantorName}
                            className="btn-primary px-20 py-5 text-sm uppercase tracking-widest shadow-xl flex items-center gap-4 disabled:bg-slate-100 disabled:text-slate-400"
                        >
                            <span>MAKE ALL MY FILES NOW</span>
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {readyDocs.length > 0 && (
                <div className="space-y-8 animate-fade-in">
                    <h4 className="text-2xl font-bold text-slate-900 text-center">Your files are ready!</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {readyDocs.map((doc) => (
                            <div key={doc.id} className="card-white p-6 flex items-center justify-between group hover:border-brandBlue-500">
                                <div className="flex items-center gap-5">
                                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 group-hover:bg-brandBlue-50 group-hover:text-brandBlue-600 transition-all">
                                        <FileText className="w-6 h-6 text-slate-600" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-900 truncate max-w-[200px]">{doc.title}</span>
                                </div>
                                <button 
                                    onClick={() => exportToPdf(doc.title, doc.content)} 
                                    className="p-3 bg-brandBlue-600 text-white rounded-xl hover:bg-brandBlue-700 shadow-sm"
                                >
                                    <Download className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
      )}

      {editingTemplate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm" onClick={() => setEditingTemplate(null)}>
          <div className="card-white w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h4 className="font-bold text-slate-900 text-2xl">{editingTemplate.title}</h4>
                <button onClick={() => setEditingTemplate(null)} className="p-3 hover:bg-white rounded-full text-slate-400"><X className="w-6 h-6" /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-12 bg-white flex justify-center">
                <div className="max-w-2xl w-full font-serif text-[12pt] leading-relaxed text-slate-900">
                    <ReactMarkdown>{previewContent}</ReactMarkdown>
                </div>
            </div>
            <div className="p-8 bg-white border-t border-slate-100 flex justify-end gap-6">
                <button onClick={() => setEditingTemplate(null)} className="px-10 py-3 text-slate-400 font-bold text-xs uppercase">Cancel</button>
                <button 
                    onClick={() => exportToPdf(editingTemplate.title, previewContent)} 
                    className="btn-primary px-16 py-4 shadow-xl"
                >
                    GET PDF
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
