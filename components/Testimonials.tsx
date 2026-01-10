import React, { useEffect, useState } from 'react';
import { generateTestimonials } from '../services/gemini';
import { Testimonial } from '../types';
import { Loader2, Quote, User } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      const data = await generateTestimonials();
      if (mounted) {
        setItems(data);
        setLoading(false);
      }
    };
    fetch();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="w-full py-12 text-center text-slate-400 flex flex-col items-center">
        <Loader2 className="w-6 h-6 animate-spin mb-2" />
        <span className="text-xs">Generating photo-realistic client stories with Gemini Nano...</span>
      </div>
    );
  }

  if (items.length === 0) return null;

  return (
    <div className="py-12 border-t border-slate-100 mt-12 animate-fade-in">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-slate-800">Trusted by Sovereigns</h3>
        <p className="text-sm text-slate-500">Real-time generated testimonials</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((t, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start space-x-4">
            <div className="flex-shrink-0">
              {t.avatar ? (
                <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                   <User className="w-8 h-8 text-slate-300" />
                </div>
              )}
            </div>
            <div>
               <div className="flex text-indigo-200 mb-2">
                 <Quote className="w-4 h-4 fill-current" />
               </div>
               <p className="text-slate-600 text-sm italic mb-4">"{t.quote}"</p>
               <div>
                 <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                 <p className="text-xs text-indigo-600">{t.role}</p>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};