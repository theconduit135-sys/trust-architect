import React, { useState, useEffect } from 'react';
import { getMasterTemplates, LegalTemplate, extractPlaceholders, fillTemplate } from '../services/legalTemplates';
import { exportToPdf, exportToDocx, exportToMarkdown } from '../services/documentExporter';
import { FileText, Shield, Home, PenTool, Eye, Scale, X, File, FileType, FileCode, Edit3, ArrowRight, Layers, Layout, ClipboardList, CheckCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

type LibraryMode = 'BROWSE' | 'MASTER_INTAKE';

export const TemplateLibrary: React.FC = () => {
  const templates = getMasterTemplates();
  const [mode, setMode] = useState<LibraryMode>('BROWSE');
  const [editingTemplate, setEditingTemplate] = useState<LegalTemplate | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [previewContent, setPreviewContent] = useState<string>("");

  // Master Intake State
  const [masterData, setMasterData] = useState({
    trustName: '',
    trustDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    grantorName: '',
    grantorAddress: '',
    trusteeName: '',
    trusteeAddress: '',
    successorTrustee: '',
    state: '',
    assets: '',
    beneficiaryName: '',
    holdingCoName: '',
    operatingCoName: ''
  });
  const [generatedMasterDocs, setGeneratedMasterDocs] = useState<{title: string, content: string}[]>([]);

  const getIcon = (category: string) => {
    switch(category) {
      case 'Foundation': return FileText;
      case 'Protection': return Shield;
      case 'Real Estate': return Home;
      case 'Funding': return PenTool;
      case 'Strategy': return Layers;
      default: return Scale;
    }
  };

  const startEditing = (template: LegalTemplate) => {
    const placeholders = extractPlaceholders(template.content);
    const initialValues: Record<string, string> = {};
    
    placeholders.forEach(key => {
        if (key === 'Date') {
            initialValues[key] = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        } else {
            initialValues[key] = '';
        }
    });

    setFormValues(initialValues);
    setEditingTemplate(template);
  };

  const generateAllTemplates = () => {
    const map: Record<string, string> = {
        "Trust Name": masterData.trustName,
        "Date": masterData.trustDate,
        "Grantor Name": masterData.grantorName,
        "Grantor/Creator": masterData.grantorName, // Alias
        "Address": masterData.grantorAddress, // Default address fallback
        "Grantor Street": masterData.grantorAddress, // Simplified for master
        "Grantor City": "", 
        "Grantor State": masterData.state,
        "Grantor Zip": "",
        "Trustee Name": masterData.trusteeName,
        "Trustee Street": masterData.trusteeAddress,
        "Trustee City": "",
        "Trustee State": "",
        "Trustee Zip": "",
        "Successor Trustee Name": masterData.successorTrustee,
        "State": masterData.state,
        "Assets": masterData.assets,
        "Beneficiary Name": masterData.beneficiaryName,
        "Holding Co Name": masterData.holdingCoName,
        "Operating Co Name": masterData.operatingCoName,
        "Operating Co Street": "", // Fallback empty
        "Holding Co Street": "", // Fallback empty
    };

    const results = templates.map(t => ({
        title: t.title,
        content: fillTemplate(t.content, map)
    }));

    setGeneratedMasterDocs(results);
  };

  useEffect(() => {
    if (editingTemplate) {
        setPreviewContent(fillTemplate(editingTemplate.content, formValues));
    }
  }, [formValues, editingTemplate]);

  const handleInputChange = (key: string, value: string) => {
    setFormValues(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto py-12 animate-fade-in px-4">
      <div className="text-center mb-12 space-y-4">
        <h2 className="text-4xl font-bold text-brandBlue-900 font-display">Master Template Library</h2>
        <p className="text-slate-700 text-xl max-w-2xl mx-auto leading-relaxed">
          Access our repository of attorney-drafted instruments. Customize individual documents or populate the entire suite at once.
        </p>
        
        <div className="flex justify-center gap-4 mt-8">
            <button 
                onClick={() => setMode('BROWSE')}
                className={`px-6 py-2 rounded-full font-bold transition-all ${mode === 'BROWSE' ? 'bg-brandBlue-900 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-200'}`}
            >
                Individual Templates
            </button>
            <button 
                onClick={() => setMode('MASTER_INTAKE')}
                className={`px-6 py-2 rounded-full font-bold transition-all flex items-center gap-2 ${mode === 'MASTER_INTAKE' ? 'bg-orange-500 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-200'}`}
            >
                <ClipboardList className="w-4 h-4" />
                Master Intake Sheet
            </button>
        </div>
      </div>

      {mode === 'BROWSE' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => {
            const Icon = getIcon(template.category);
            return (
                <div key={template.id} className="card-modern bg-white p-8 flex flex-col h-full hover:border-orange-300">
                <div className="flex-1">
                    <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-brandBlue-50 rounded-xl">
                        <Icon className="w-8 h-8 text-orange-500" />
                        </div>
                        <div>
                        <span className="text-xs font-bold text-brandBlue-500 uppercase tracking-widest">{template.category}</span>
                        <h3 className="font-bold text-brandBlue-900 text-xl mt-1 leading-tight">{template.title}</h3>
                        </div>
                    </div>
                    </div>
                    
                    <p className="text-slate-600 text-base mb-8 leading-relaxed">
                    {template.description}
                    </p>
                </div>

                <div className="pt-0 mt-auto">
                    <button 
                    onClick={() => startEditing(template)}
                    className="w-full flex items-center justify-center space-x-2 btn-primary py-4 rounded-xl font-bold text-white shadow-lg text-base"
                    >
                    <Edit3 className="w-5 h-5" />
                    <span>Customize & Download</span>
                    </button>
                </div>
                </div>
            );
            })}
        </div>
      ) : (
        <div className="animate-fade-in space-y-12">
            {/* Master Intake Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                <div className="bg-orange-500 text-white p-6 flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-bold">Master Data Entry</h3>
                        <p className="text-orange-100 text-sm">Fill once. Populate everywhere.</p>
                    </div>
                    <Layers className="w-10 h-10 text-orange-200" />
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Trust Name</label>
                        <input className="w-full p-3 border border-slate-200 rounded-lg" placeholder="The Sovereign Family Trust" value={masterData.trustName} onChange={e => setMasterData({...masterData, trustName: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Jurisdiction (State)</label>
                        <input className="w-full p-3 border border-slate-200 rounded-lg" placeholder="Wyoming" value={masterData.state} onChange={e => setMasterData({...masterData, state: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Grantor Name</label>
                        <input className="w-full p-3 border border-slate-200 rounded-lg" placeholder="John Doe" value={masterData.grantorName} onChange={e => setMasterData({...masterData, grantorName: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Trustee Name</label>
                        <input className="w-full p-3 border border-slate-200 rounded-lg" placeholder="John Doe (or LLC)" value={masterData.trusteeName} onChange={e => setMasterData({...masterData, trusteeName: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Successor Trustee</label>
                        <input className="w-full p-3 border border-slate-200 rounded-lg" placeholder="Jane Doe" value={masterData.successorTrustee} onChange={e => setMasterData({...masterData, successorTrustee: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Beneficiary</label>
                        <input className="w-full p-3 border border-slate-200 rounded-lg" placeholder="John Doe Jr." value={masterData.beneficiaryName} onChange={e => setMasterData({...masterData, beneficiaryName: e.target.value})} />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Addresses (Grantor/Trustee)</label>
                        <input className="w-full p-3 border border-slate-200 rounded-lg" placeholder="123 Main St, City, State, Zip" value={masterData.grantorAddress} onChange={e => {
                            setMasterData({...masterData, grantorAddress: e.target.value, trusteeAddress: e.target.value});
                        }} />
                        <p className="text-[10px] text-slate-400 mt-1">Defaults both Grantor and Trustee address to same value for convenience.</p>
                    </div>
                    <div className="md:col-span-3 border-t border-slate-100 pt-6 mt-2">
                        <label className="block text-sm font-bold text-brandBlue-900 mb-3">Optional: Iron Chain™ Entities</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Holding Company Name</label>
                                <input className="w-full p-3 border border-slate-200 rounded-lg" placeholder="Doe Holdings LLC" value={masterData.holdingCoName} onChange={e => setMasterData({...masterData, holdingCoName: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Operating Company Name</label>
                                <input className="w-full p-3 border border-slate-200 rounded-lg" placeholder="Doe Consulting LLC" value={masterData.operatingCoName} onChange={e => setMasterData({...masterData, operatingCoName: e.target.value})} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-200 text-center">
                    <button 
                        onClick={generateAllTemplates}
                        className="btn-primary px-12 py-4 text-lg shadow-xl"
                    >
                        Populate All Templates
                    </button>
                </div>
            </div>

            {/* Generated Results */}
            {generatedMasterDocs.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {generatedMasterDocs.map((doc, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span className="font-bold text-brandBlue-900 text-sm">{doc.title}</span>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => exportToPdf(doc.title, doc.content)}
                                    className="px-3 py-1 bg-slate-100 text-slate-600 rounded text-xs font-bold hover:bg-slate-200"
                                >
                                    PDF
                                </button>
                                <button 
                                    onClick={() => exportToDocx(doc.title, doc.content)}
                                    className="px-3 py-1 bg-slate-100 text-slate-600 rounded text-xs font-bold hover:bg-slate-200"
                                >
                                    DOCX
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      )}

      {/* Info Footer */}
      <div className="mt-16 bg-brandBlue-50 border border-brandBlue-100 rounded-2xl p-8 flex items-start space-x-6 card-modern shadow-none">
        <Scale className="w-8 h-8 text-brandBlue-600 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-bold text-brandBlue-900 text-lg">Professional Usage Note</h4>
          <p className="text-slate-700 text-base mt-2">
            These templates contain standard legal boilerplate. While you can fill them online, we recommend a final review by legal counsel.
          </p>
        </div>
      </div>

      {/* Editor Modal */}
      {editingTemplate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onClick={() => setEditingTemplate(null)}>
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-brandBlue-100 rounded-xl">
                    <Edit3 className="w-6 h-6 text-brandBlue-600" />
                </div>
                <div>
                    <h3 className="font-bold text-brandBlue-900 text-xl">{editingTemplate.title}</h3>
                    <p className="text-sm text-slate-500 font-semibold uppercase tracking-wide">Document Editor</p>
                </div>
              </div>
              <button 
                onClick={() => setEditingTemplate(null)} 
                className="p-3 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Content: Split View */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Left Panel: Form */}
                <div className="w-full lg:w-1/3 bg-slate-50 border-r border-slate-200 overflow-y-auto p-8 custom-scrollbar">
                    <h4 className="text-base font-bold text-brandBlue-900 uppercase mb-8 flex items-center tracking-wider">
                        <PenTool className="w-5 h-5 mr-3 text-orange-500" />
                        Fill Details
                    </h4>
                    
                    <div className="space-y-6">
                        {Object.keys(formValues).length > 0 ? (
                            Object.keys(formValues).map((key) => (
                                <div key={key}>
                                    <label className="block text-sm font-bold text-slate-600 uppercase mb-2">{key}</label>
                                    <input 
                                        type="text" 
                                        value={formValues[key]}
                                        onChange={(e) => handleInputChange(key, e.target.value)}
                                        className="w-full p-4 bg-white border border-slate-200 rounded-xl text-base text-slate-900 focus:ring-2 focus:ring-orange-500 outline-none transition-shadow shadow-sm"
                                        placeholder={`Enter ${key}...`}
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="text-base text-slate-500 italic">No customizable fields detected in this document.</p>
                        )}
                    </div>
                </div>

                {/* Right Panel: Live Preview */}
                <div className="w-full lg:w-2/3 bg-slate-100 p-8 overflow-y-auto custom-scrollbar flex justify-center">
                    <div className="bg-white shadow-xl w-full max-w-4xl min-h-[800px] p-16 rounded-sm border border-slate-200">
                         <article className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-slate-900 prose-p:text-slate-800 prose-li:text-slate-800">
                             <ReactMarkdown>{previewContent}</ReactMarkdown>
                         </article>
                    </div>
                </div>
            </div>

            {/* Footer: Actions */}
            <div className="p-6 bg-white border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
               <div className="text-sm text-slate-500 italic font-medium hidden sm:block">
                 Changes update in real-time.
               </div>
               <div className="flex gap-4 w-full sm:w-auto">
                    <button 
                        onClick={() => exportToPdf(editingTemplate.title, previewContent)} 
                        className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-3 bg-white text-slate-700 rounded-xl font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all border-2 border-slate-100 shadow-sm"
                    >
                        <File className="w-5 h-5" />
                        <span>Download PDF</span>
                    </button>
                    <button 
                        onClick={() => exportToDocx(editingTemplate.title, previewContent)} 
                        className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-3 bg-white text-slate-700 rounded-xl font-bold hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all border-2 border-slate-100 shadow-sm"
                    >
                        <FileType className="w-5 h-5" />
                        <span>Download DOCX</span>
                    </button>
                    <button 
                        onClick={() => exportToMarkdown(editingTemplate.title, previewContent)} 
                        className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-3 bg-white text-slate-700 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all border-2 border-slate-100 shadow-sm"
                    >
                        <FileCode className="w-5 h-5" />
                        <span>Download MD</span>
                    </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};