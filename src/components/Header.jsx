import React from 'react';
import { useDemo } from '../context/DemoContext';
import { 
  Clock, 
  RotateCcw, 
  Sparkles, 
  Building2, 
  Share2,
  Layers
} from 'lucide-react';

export const Header = () => {
  const { 
    clientId, 
    remainingTime, 
    resetSandbox, 
    openUpgradeModal, 
    setIsShareModalOpen,
    setActiveModule 
  } = useDemo();

  return (
    <header className="sticky top-0 z-30 glass-panel border-b border-white/10 px-4 lg:px-8 h-16 max-h-16 flex items-center">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-4">
        
        {/* Brand & Client Identity */}
        <div className="flex items-center gap-3 shrink-0">
          <div 
            onClick={() => setActiveModule('overview')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform shrink-0">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div className="shrink-0">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-extrabold text-lg tracking-tight text-white">TeamTrack</span>
                <span className="text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/30">
                  Demo
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1 leading-none hidden sm:block">Softwareentwicklung</p>
            </div>
          </div>

          {/* Client Specific Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700/60 text-xs shrink-0">
            <Building2 className="w-3.5 h-3.5 text-brand-400 shrink-0" />
            <span className="text-slate-400 text-[11px]">Mandant:</span>
            <span className="font-bold text-slate-200 text-xs max-w-[130px] lg:max-w-[180px] truncate">{clientId}</span>
          </div>
        </div>

        {/* Status Center & Actions (Strictly single-row nowrap with fixed height) */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Trial Countdown Pill with fixed width digits */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-950/80 border border-brand-500/30 text-xs text-brand-300 shrink-0">
            <Clock className="w-3.5 h-3.5 text-brand-400 shrink-0" />
            <span className="font-medium text-[11px] hidden sm:inline">Testphase:</span>
            <span className="font-bold font-mono tabular-nums text-white tracking-tight w-[96px] text-center inline-block">
              {remainingTime.days}T {String(remainingTime.hours).padStart(2, '0')}h {String(remainingTime.minutes).padStart(2, '0')}m {String(remainingTime.seconds).padStart(2, '0')}s
            </span>
          </div>

          {/* Link Generator for Multi-Client */}
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs text-slate-300 hover:text-white transition-all shrink-0"
            title="Neuen Kunden-Testlink generieren"
          >
            <Share2 className="w-3.5 h-3.5 text-brand-400 shrink-0" />
            <span className="whitespace-nowrap">Kundenlink</span>
          </button>

          {/* Reset Sandbox */}
          <button
            onClick={resetSandbox}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-rose-500/20 border border-slate-700 hover:border-rose-500/40 text-xs text-slate-300 hover:text-rose-300 transition-all shrink-0"
            title="Alle Daten auf Musterwerte zurücksetzen"
          >
            <RotateCcw className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">Reset</span>
          </button>

          {/* CTA: Request Original Software */}
          <button
            onClick={() => openUpgradeModal('Komplettpaket')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white text-xs font-bold shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
            <span className="whitespace-nowrap">Original-Modul anfragen</span>
          </button>

        </div>
      </div>
    </header>
  );
};
