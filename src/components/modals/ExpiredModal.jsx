import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Clock, Sparkles, Phone, Mail, RotateCcw } from 'lucide-react';

export const ExpiredModal = () => {
  const { isExpired, clientId, openUpgradeModal, resetSandbox } = useDemo();

  if (!isExpired) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="glass-panel max-w-lg w-full p-8 rounded-3xl border border-brand-500/40 shadow-2xl text-center space-y-5">
        
        <div className="w-16 h-16 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 flex items-center justify-center mx-auto">
          <Clock className="w-8 h-8 text-brand-400 animate-pulse" />
        </div>

        <h2 className="text-2xl font-black text-white">
          Ihre Testphase für <span className="text-brand-400">{clientId}</span> ist abgelaufen
        </h2>

        <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
          Wir hoffen, Sie konnten sich einen guten ersten Eindruck von den TeamTrack Modulen verschaffen! 
          Möchten Sie eine maßgeschneiderte Original-Version mit Ihrem Firmen-Branding und Ihren Prozessen produktiv nutzen?
        </p>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-left text-xs space-y-2">
          <div className="font-semibold text-slate-200">Ihr direkter Entwickler-Kontakt:</div>
          <div className="text-slate-400 flex items-center gap-2">
            <Phone className="w-4 h-4 text-brand-400" />
            <span>+49 172 6125371 (Direktanruf oder WhatsApp)</span>
          </div>
          <div className="text-slate-400 flex items-center gap-2">
            <Mail className="w-4 h-4 text-brand-400" />
            <span>kontakt@team-track.de</span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <button
            onClick={() => openUpgradeModal('Vollversion nach Testphase')}
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 text-white font-bold text-sm shadow-xl shadow-brand-500/25 flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>Jetzt Angebot für Original-Software anfordern</span>
          </button>

          <button
            onClick={resetSandbox}
            className="w-full py-2 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Demo-Daten zurücksetzen & erneut testen</span>
          </button>
        </div>

      </div>
    </div>
  );
};
