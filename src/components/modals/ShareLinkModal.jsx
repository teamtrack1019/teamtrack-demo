import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Share2, Copy, Check, X, Link, Clock, Building } from 'lucide-react';

export const ShareLinkModal = () => {
  const { isShareModalOpen, setIsShareModalOpen, addToast } = useDemo();
  const [clientInput, setClientInput] = useState('');
  const [daysInput, setDaysInput] = useState(7);
  const [copied, setCopied] = useState(false);

  if (!isShareModalOpen) return null;

  const origin = window.location.origin || 'https://demo.team-track.de';
  const cleanClient = (clientInput || 'Kundenname').trim().replace(/\s+/g, '-');
  const generatedUrl = `${origin}${window.location.pathname}?client=${encodeURIComponent(cleanClient)}&days=${daysInput}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    addToast('Link kopiert', `Der personalisierte Test-Link für "${cleanClient}" wurde in die Zwischenablage kopiert.`, 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel max-w-lg w-full p-6 lg:p-8 rounded-3xl border border-brand-500/30 shadow-2xl relative space-y-5">
        
        <button
          onClick={() => setIsShareModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Share2 className="w-3.5 h-3.5" />
            Mandantentrennung & Generator
          </div>
          <h3 className="text-xl font-black text-white">
            Personalisierten Kunden-Demolink erstellen
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Geben Sie den Firmennamen des Kunden ein. Dieser Link erstellt für den Kunden eine 100% isolierte, saubere Test-Umgebung.
          </p>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Kunden- / Firmenname:</label>
            <div className="relative">
              <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="z.B. Schmidt-Haustechnik-GmbH"
                value={clientInput}
                onChange={(e) => setClientInput(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Testlaufzeit:</label>
            <div className="grid grid-cols-3 gap-2">
              {[3, 7, 14].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDaysInput(d)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    daysInput === d
                      ? 'bg-brand-600 border-brand-500 text-white shadow-md shadow-brand-500/20'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {d} Tage Test
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Generierter Test-Link:</label>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] text-brand-300 break-all select-all">
              {generatedUrl}
            </div>
          </div>

          {/* Social Preview Preview Box */}
          <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">WhatsApp & Social Vorschau:</span>
            <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
              <img src="/logo.jpg" alt="TeamTrack" className="w-11 h-11 rounded-lg object-contain bg-slate-900 border border-brand-500/20 shrink-0" />
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-white truncate">TeamTrack | Interaktives Demo-Portal</h4>
                <p className="text-[10px] text-slate-400 line-clamp-1">Kunden-Testumgebung für {clientInput || 'Interessent'} ({daysInput} Tage)</p>
                <span className="text-[9px] text-brand-400">team-track.de</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] text-slate-400">
            100% isolierte Mandanten-Umgebung.
          </span>

          <div className="flex items-center gap-2">
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                `Hallo,\n\nhier ist Ihr persönlicher ${daysInput}-Tage Demo-Zugang für die TeamTrack Handwerker- & Firmen-Software (${cleanClient}):\n\n🔗 ${generatedUrl}\n\nEnthaltene Module:\n⏱️ Zeiterfassung & Live-Stempeluhr\n📑 Rechnungen & DATEV\n👥 CRM & Kundenkartei\n🚗 Fuhrpark & TÜV-Manager\n📋 Auftragsdisposition\n\nViele Grüße,\nTeamTrack Softwareentwicklung`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 transition-all"
            >
              <span>📲 Per WhatsApp senden</span>
            </a>

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-lg shadow-brand-500/25 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Kopiert!' : 'Link kopieren'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
