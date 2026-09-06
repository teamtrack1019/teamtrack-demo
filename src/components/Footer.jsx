import React from 'react';
import { useDemo } from '../context/DemoContext';
import { ShieldCheck, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

export const Footer = () => {
  const { openUpgradeModal } = useDemo();

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 mt-16 py-10 px-4 lg:px-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left info with official Logo */}
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <img 
              src="/logo.jpg" 
              alt="TeamTrack Logo" 
              className="w-7 h-7 rounded-lg object-contain bg-white/5 p-0.5 border border-brand-500/20 shadow-md"
            />
            <span className="font-extrabold text-sm text-white tracking-tight">TeamTrack</span>
            <span className="text-[10px] text-slate-400">Softwareentwicklung & IT-Beratung</span>
          </div>
          <p className="text-[11px] text-slate-400 max-w-md">
            Individuelle WebApps, Zeiterfassung, ERP-Schnittstellen und Firmen-Software für Handwerk, Logistik und Mittelstand in Würzburg & ganz Deutschland.
          </p>
        </div>

        {/* Contact info */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-300">
          <a 
            href="tel:+491726125371" 
            className="flex items-center gap-1.5 hover:text-white transition-colors bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800"
          >
            <Phone className="w-3.5 h-3.5 text-brand-400" />
            <span>+49 172 6125371</span>
          </a>

          <a 
            href="mailto:kontakt@team-track.de" 
            className="flex items-center gap-1.5 hover:text-white transition-colors bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800"
          >
            <Mail className="w-3.5 h-3.5 text-brand-400" />
            <span>kontakt@team-track.de</span>
          </a>

          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span>97236 Randersacker / Würzburg</span>
          </div>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <a
            href="https://team-track.de"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-brand-300 transition-colors"
          >
            <span>team-track.de</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={() => openUpgradeModal('Fußzeile CTA')}
            className="px-3.5 py-1.5 rounded-lg bg-brand-600/20 hover:bg-brand-600/40 text-brand-300 border border-brand-500/30 font-bold transition-all"
          >
            Vollversion anfragen
          </button>
        </div>

      </div>

      {/* Legal Links Bar */}
      <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4 text-[11px]">
        <div className="flex flex-wrap items-center gap-4 text-slate-300">
          <button
            type="button"
            onClick={() => openLegalModal('impressum')}
            className="hover:text-brand-400 transition-colors cursor-pointer font-medium"
          >
            Impressum (§ 5 DDG)
          </button>
          <span className="text-slate-700">•</span>
          <button
            type="button"
            onClick={() => openLegalModal('datenschutz')}
            className="hover:text-brand-400 transition-colors cursor-pointer font-medium"
          >
            Datenschutz (DSGVO)
          </button>
          <span className="text-slate-700">•</span>
          <button
            type="button"
            onClick={() => openLegalModal('agb')}
            className="hover:text-brand-400 transition-colors cursor-pointer font-medium"
          >
            AGB & Sandbox-Bedingungen
          </button>
          <span className="text-slate-700">•</span>
          <button
            type="button"
            onClick={() => openLegalModal('kontakt')}
            className="hover:text-brand-400 transition-colors cursor-pointer font-medium"
          >
            Kontakt & Beratung
          </button>
        </div>

        <div className="text-slate-400 flex items-center gap-2">
          <span>Inhaberin: Huriye Ünalsoy • 97236 Randersacker</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-4 pt-3 border-t border-slate-900/60 text-center text-[10px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>© {new Date().getFullYear()} TeamTrack Softwareentwicklung & IT-Beratung. Alle Rechte vorbehalten. 100% DSGVO-konform.</span>
        <span>Demo-Sandbox-Modus • Daten werden isoliert gespeichert</span>
      </div>
    </footer>
  );
};
