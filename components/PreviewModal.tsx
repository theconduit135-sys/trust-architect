import React from 'react';
import { GeneratedDocument } from '../types';
import { X, File, FileType, FileCode } from 'lucide-react';
import { exportToPdf, exportToDocx, exportToMarkdown } from '../services/documentExporter';

interface PreviewModalProps {
  doc: GeneratedDocument | null;
  onClose: () => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({ doc, onClose }) => {
  if (!doc) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden animate-scale-in ring-1 ring-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center space-x-3">
             <div className="p-2 bg-indigo-50 rounded-lg">
                <File className="w-5 h-5 text-indigo-600" />
             </div>
             <div>
                <h3 className="font-bold text-slate-900 font-sans">{doc.title}</h3>
                <p className="text-xs text-slate-500 font-sans">Document Preview</p>
             </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-12 bg-white custom-scrollbar">
           {/* Document Paper Effect */}
           <div className="max-w-2xl mx-auto">
             <div className="font-serif text-[12pt] leading-relaxed text-black whitespace-pre-wrap select-text">
                {doc.content}
             </div>
           </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/80 flex flex-col sm:flex-row gap-4 justify-between items-center backdrop-blur-md">
          <div className="text-xs text-slate-400 italic font-sans">
            Educational draft. Not legal advice.
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
             <button 
                onClick={() => exportToPdf(doc.title, doc.content)} 
                className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2.5 bg-white text-slate-700 rounded-lg font-semibold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all border border-slate-200 shadow-sm font-sans"
             >
               <File className="w-4 h-4" />
               <span>PDF</span>
             </button>
             <button 
                onClick={() => exportToDocx(doc.title, doc.content)} 
                className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2.5 bg-white text-slate-700 rounded-lg font-semibold hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all border border-slate-200 shadow-sm font-sans"
             >
               <FileType className="w-4 h-4" />
               <span>DOCX</span>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};