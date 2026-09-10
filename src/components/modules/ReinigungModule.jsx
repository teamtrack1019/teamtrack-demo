import React, { useState } from 'react';
import { ExternalLink, Sparkles, RefreshCw } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const ReinigungModule = () => {
  const { clientId } = useDemo();
  const [iframeKey, setIframeKey] = useState(0);

  const reinigungUrl = '/reinigung/index.html';

  const handleReload = () => {
    setIframeKey(prev => prev + 1);
  };

  const handleOpenDirect = () => {
    window.open(reinigungUrl, '_blank');
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-emerald-500/30 px-4 py-3 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-tight">CleanPro | Gebäudereinigung & Hotel-Suite</h2>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Live Modul
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Vollständige Reinigungs-Suite für {clientId} (Objektverwaltung, Dienstplaner, Lohnberechnung & Preiskalkulator)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-all"
            title="App neu laden"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Neu laden</span>
          </button>

          <button
            onClick={handleOpenDirect}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/25 transition-all"
            title="In eigenem Tab / Vollbild öffnen"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Vollbild öffnen</span>
          </button>
        </div>
      </div>

      {/* Embedded 100% Unchanged Exact Application */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-white" style={{ height: 'calc(100vh - 180px)', minHeight: '750px' }}>
        <iframe
          key={iframeKey}
          src={reinigungUrl}
          title="CleanPro Gebäudereinigung"
          className="w-full h-full border-0"
          allow="camera; microphone; geolocation"
        />
      </div>
    </div>
  );
};
