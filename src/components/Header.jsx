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
    <header className="sticky top-0 z-30 glass-panel border-b border-white/10 px-3 sm:px-6 lg:px-8 h-16 max-h-16 min-h-[64px] flex items-center select-none overflow-hidden">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-2 sm:gap-4 flex-nowrap">
        
        {/* Brand & Client Identity */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div 
            onClick={() => setActiveModule('overview')}
            className="flex items-center gap-2 cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform shrink-0">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <div className="shrink-0">
              <div className="flex items-center gap-1 leading-none">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">TeamTrack</span>
                <span className="text-[8px] sm:text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/30">
                  Demo
                </span>
              </div>
              <p className="text-[9px] text-slate-400 mt-0.5 leading-none hidden md:block">Softwareentwicklung</p>
            </div>
          </div>

          {/* Client Specific Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-900/90 border border-slate-700/60 text-xs shrink-0 max-w-[140px] md:max-w-[200px]">
            <Building2 className="w-3.5 h-3.5 text-brand-400 shrink-0" />
            <span className="text-slate-400 text-[10px] hidden md:inline">Mandant:</span>
            <span className="font-bold text-slate-200 text-[11px] truncate">{clientId}</span>
          </div>
        </div>

        {/* Status Center & Actions (Strictly single-row nowrap with fixed height) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 flex-nowrap">
          
          {/* Trial Countdown Pill with fixed width digits */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-brand-950/80 border border-brand-500/30 text-xs text-brand-300 shrink-0">
            <Clock className="w-3.5 h-3.5 text-brand-400 shrink-0" />
            <span className="font-medium text-[10px] hidden lg:inline">Test:</span>
            <span className="font-bold font-mono tabular-nums text-white tracking-tight text-[11px] sm:text-xs w-[88px] sm:w-[96px] text-center inline-block">
              {remainingTime.days}T {String(remainingTime.hours).padStart(2, '0')}h {String(remainingTime.minutes).padStart(2, '0')}m {String(remainingTime.seconds).padStart(2, '0')}s
            </span>
          </div>

          {/* Link Generator for Multi-Client */}
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs text-slate-300 hover:text-white transition-all shrink-0"
            title="Neuen Kunden-Testlink generieren"
          >
            <Share2 className="w-3.5 h-3.5 text-brand-400 shrink-0" />
            <span className="text-[11px] whitespace-nowrap hidden md:inline">Kundenlink</span>
          </button>

          {/* Reset Sandbox */}
          <button
            onClick={resetSandbox}
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-rose-500/20 border border-slate-700 hover:border-rose-500/40 text-xs text-slate-300 hover:text-rose-300 transition-all shrink-0"
            title="Alle Daten auf Musterwerte zurücksetzen"
          >
            <RotateCcw className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden lg:inline text-[11px] whitespace-nowrap">Reset</span>
          </button>

          {/* CTA: Request Original Software */}
          <button
            onClick={() => openUpgradeModal('Komplettpaket')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white text-xs font-bold shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
            <span className="text-[11px] sm:text-xs whitespace-nowrap font-bold">Vollversion anfragen</span>
          </button>

        </div>
      </div>
    </header>
  );
};
