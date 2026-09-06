import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Lightbulb
} from 'lucide-react';

export const ModuleWorkflowGuide = ({ 
  moduleTitle, 
  tagline, 
  steps = [], 
  benefitText = '' 
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="rounded-2xl border border-brand-500/30 bg-gradient-to-r from-slate-900/90 via-brand-950/20 to-slate-900/90 shadow-lg overflow-hidden transition-all">
      {/* Clickable Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 text-left hover:bg-brand-500/5 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0 border border-brand-500/30">
            <Lightbulb className="w-4 h-4 text-brand-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-extrabold text-white tracking-tight">
                💡 So funktioniert dieses Modul: {moduleTitle}
              </span>
              <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 hidden sm:inline">
                Ablauf-Leitfaden
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-normal mt-0.5">{tagline}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 shrink-0">
          <span className="hidden sm:inline">{isOpen ? 'Anleitung einklappen' : 'Ablauf ansehen'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expandable Step-by-Step Workflow Map */}
      {isOpen && (
        <div className="px-4 sm:px-6 pb-5 pt-2 border-t border-brand-500/15 animate-in fade-in duration-200">
          
          {/* Workflow Steps Grid / Connected Roadmap */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-3">
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between relative group hover:border-brand-500/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-full bg-brand-600 text-white font-black text-xs flex items-center justify-center shadow-md shadow-brand-500/30">
                      {idx + 1}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">
                      Schritt {idx + 1}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-brand-300 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {step.hint && (
                  <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 shrink-0" />
                    <span>{step.hint}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Value Note */}
          {benefitText && (
            <div className="mt-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-3 text-xs text-slate-300">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-300 shrink-0" />
                <span>{benefitText}</span>
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider hidden md:inline">
                Praxis-Tipp für Tester
              </span>
            </div>
          )}

        </div>
      )}
    </div>
  );
};
