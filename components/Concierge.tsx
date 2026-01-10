import React, { useEffect, useState } from 'react';
import { AppMode } from '../types';
import { getConciergeAnalysis } from '../services/gemini';
import { Crown, TrendingUp, AlertCircle } from 'lucide-react';

interface ConciergeProps {
  currentView: AppMode;
}

export const Concierge: React.FC<ConciergeProps> = ({ currentView }) => {
  const [insight, setInsight] = useState("Initializing concierge...");
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Simulate updating insights on view change
    let mounted = true;
    setVisible(false); // Brief fade out
    
    const updateInsight = async () => {
      // Small delay for UI smoothness
      setTimeout(async () => {
          if (!mounted) return;
          const msg = await getConciergeAnalysis(`User moved to ${currentView} module.`);
          if (mounted) {
            setInsight(msg);
            setVisible(true);
          }
      }, 500);
    };
    updateInsight();
    
    return () => { mounted = false; };
  }, [currentView]);

  return (
    <div className={`fixed bottom-6 right-6 w-80 bg-brand-950 text-white rounded-xl shadow-2xl border border-brand-800 p-5 z-50 glass-panel transition-all duration-700 transform ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      <div className="flex items-center space-x-3 mb-3 border-b border-brand-800 pb-2">
        <Crown className="w-5 h-5 text-brand-gold" />
        <h4 className="font-serif tracking-wide text-brand-gold">Concierge</h4>
      </div>
      
      <p className="text-xs text-brand-100 leading-relaxed italic mb-4">
        "{insight}"
      </p>

      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
           <span className="block text-brand-500 mb-1">Status</span>
           <span className="bg-brand-900 px-2 py-1 rounded text-brand-gold border border-brand-800 inline-block">VIP Client</span>
        </div>
        <div>
           <span className="block text-brand-500 mb-1">Active Module</span>
           <span className="font-bold text-white tracking-wider">{currentView.replace(/_/g, ' ')}</span>
        </div>
      </div>
    </div>
  );
};