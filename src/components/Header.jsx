import React from 'react';
import { useDemo } from '../context/DemoContext';
import { 
  Clock, 
  RotateCcw, 
  Sparkles, 
  Building2, 
  Share2,
  Infinity as InfinityIcon,
  ShieldCheck
} from 'lucide-react';

export const Header = () => {
  const { 
    clientId, 
    isAdmin,
    remainingTime, 
    resetSandbox, 
    openUpgradeModal, 
    setIsShareModalOpen,
    setActiveModule 
  } = useDemo();

  return (
    <header className="sticky top-0 z-30 glass-panel border-b border-white/10 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 select-none">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-2">
        
        {/* Brand & Client Identity */}
        <div className="flex items-center gap-2 shrink-0">
          <div 
            onClick={() => setActiveModule('overview')}
            className="flex items-center gap-2 cursor-pointer group shrink-0"
          >
            <img 
              src="/logo.jpg" 
              alt="TeamTrack Logo" 
              className="w-9 h-9 rounded-xl object-contain bg-white/5 p-0.5 border border-brand-500/30 shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform shrink-0" 
            />
            <div className="shrink-0">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">TeamTrack</span>
                <span className="text-[8px] sm:text-[9px] uppercase font-bold tracking-widest px-1 py-0.2 rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/30">
                  {isAdmin ? 'Admin' : 'Demo'}
                </span>
              </div>
              <p className="text-[9px] text-slate-400 mt-0.5 leading-none hidden lg:block">Softwareentwicklung</p>
            </div>
          </div>

          {/* Client Specific Badge (Hidden on very small mobile, visible on tablet/desktop) */}
          <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900/90 border border-slate-700/60 text-xs shrink-0 max-w-[170px]">
            {isAdmin ? (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            ) : (
              <Building2 className="w-3 h-3 text-brand-400 shrink-0" />
            )}
            <span className="text-slate-400 text-[10px]">{isAdmin ? 'Modus:' : 'Mandant:'}</span>
            <span className="font-bold text-slate-200 text-[11px] truncate">{clientId}</span>
          </div>
        </div>

        {/* Status Center & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Admin Unlimited Badge OR Trial Countdown Pill */}
          {isAdmin ? (
            <div 
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 shrink-0 shadow-sm shadow-emerald-950/40"
              title="Admin-Modus: Unbegrenzte Demo für Kundenpräsentationen"
            >
              <InfinityIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-bold font-mono text-white text-[11px] sm:text-xs tracking-wide">
                Unbegrenzt
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg bg-brand-950/80 border border-brand-500/30 text-brand-300 shrink-0">
              <Clock className="w-3 h-3 text-brand-400 shrink-0" />
              <span className="font-bold font-mono tabular-nums text-white text-[11px] sm:text-xs">
                {remainingTime.days}T {String(remainingTime.hours).padStart(2, '0')}:{String(remainingTime.minutes).padStart(2, '0')}:{String(remainingTime.seconds).padStart(2, '0')}
              </span>
            </div>
          )}

          {/* Link Generator for Multi-Client (ONLY ADMIN) */}
          {isAdmin && (
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-brand-500/40 text-xs text-brand-300 hover:text-white transition-all shrink-0"
              title="Admin: Neuen Kunden-Testlink generieren"
            >
              <Share2 className="w-3 h-3 text-brand-400 shrink-0" />
              <span className="text-[10px] hidden sm:inline">Link</span>
            </button>
          )}

          {/* Reset Sandbox Button */}
          <button
            onClick={resetSandbox}
            className="flex items-center justify-center p-1.5 sm:px-2 sm:py-1 rounded-lg bg-slate-800/80 hover:bg-rose-500/20 border border-slate-700 hover:border-rose-500/40 text-slate-300 hover:text-rose-300 transition-all shrink-0"
            title="Demo-Daten zurücksetzen"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline text-[10px] ml-1">Reset</span>
          </button>

          {/* CTA: Request Original Software */}
          <button
            onClick={() => openUpgradeModal('Komplettpaket')}
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 text-white text-[11px] sm:text-xs font-bold shadow-md shadow-brand-500/25 transition-all shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
            <span className="hidden sm:inline">Vollversion anfragen</span>
            <span className="sm:hidden">Anfragen</span>
          </button>

        </div>
      </div>
    </header>
  );
};
