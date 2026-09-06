import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Lock, Sparkles, X, ShieldCheck, ArrowRight } from 'lucide-react';

export const RestrictionModal = () => {
  const { restrictionModal, setRestrictionModal, openUpgradeModal } = useDemo();

  if (!restrictionModal.isOpen) return null;

  const handleClose = () => {
    setRestrictionModal({ isOpen: false, title: '', message: '', feature: '' });
  };

  const handleUpgradeClick = () => {
    handleClose();
    openUpgradeModal(restrictionModal.feature || 'Vollversion');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel max-w-md w-full p-6 rounded-3xl border border-amber-500/30 shadow-2xl relative overflow-hidden text-center">
        
        {/* Glow */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-7 h-7" />
        </div>

        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
          Demo-Umgebung
        </span>

        <h3 className="text-xl font-extrabold text-white mt-2">
          {restrictionModal.title || 'Funktion in der Demo gesperrt'}
        </h3>

        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
          {restrictionModal.message}
        </p>

        <div className="mt-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-left text-xs space-y-1.5">
          <div className="font-semibold text-slate-200">In Ihrer Vollversion enthalten:</div>
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Unbegrenzte Speicherkapazität & eigene SQL-Datenbank</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>DATEV / Lexware / SevDesk Voll-Schnittstellen</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>100% Eigenes Firmen-Branding & eigener Server</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <button
            onClick={handleUpgradeClick}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold text-xs shadow-lg shadow-brand-500/20 flex items-center justify-center gap-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Vollversion unverbindlich anfragen</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleClose}
            className="w-full py-2 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-semibold transition-all"
          >
            Weiter testen
          </button>
        </div>

      </div>
    </div>
  );
};
