import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Share2, Copy, Check, X, Link, Clock, Building, Mail, Send, ExternalLink } from 'lucide-react';

export const ShareLinkModal = () => {
  const { isShareModalOpen, setIsShareModalOpen, addToast } = useDemo();
  const [clientInput, setClientInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [daysInput, setDaysInput] = useState(7);
  const [selectedModule, setSelectedModule] = useState('reinigung'); // 'all' or 'reinigung'
  const [copied, setCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  if (!isShareModalOpen) return null;

  const origin = window.location.origin || 'https://demo.team-track.de';
  const cleanClient = (clientInput || 'Kundenname').trim().replace(/\s+/g, '-');
  const displayClient = clientInput.trim() || 'Ihr Unternehmen';
  const moduleQuery = selectedModule === 'reinigung' ? '&module=reinigung' : '';
  const generatedUrl = `${origin}${window.location.pathname}?client=${encodeURIComponent(cleanClient)}${moduleQuery}&days=${daysInput}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    addToast('Link kopiert', `Der personalisierte Test-Link für "${displayClient}" wurde in die Zwischenablage kopiert.`, 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const emailSubject = selectedModule === 'reinigung'
    ? `Ihr persönlicher CleanPro Demo-Zugang für ${displayClient} (${daysInput} Tage)`
    : `Ihr persönlicher TeamTrack Demo-Zugang für ${displayClient} (${daysInput} Tage)`;

  const emailBody = selectedModule === 'reinigung'
    ? `Sehr geehrte Damen und Herren,\nliebes Team von ${displayClient},\n\nvielen Dank für Ihr Interesse an unserer CleanPro Software-Lösung für Gebäudereinigung & Hotel-Service.\n\nWir haben für Ihr Unternehmen eine 100% isolierte, persönliche Test-Umgebung eingerichtet. Sie können alle Funktionen für die nächsten ${daysInput} Tage unverbindlich testen:\n\n👉 Hier geht es zu Ihrem persönlichen Demo-Zugang:\n${generatedUrl}\n\nEnthaltene Module & Funktionen:\n• Objekt- & Zimmerverwaltung (EZ, DZ, Suite)\n• Tägliche Erfassung & digitaler Dienstplaner mit PDF-Aushang\n• Lohnabrechnung mit Sonn- (+50%) und Feiertagszuschlägen\n• Digitale Kundenabnahme & Signatur auf Tablet/Smartphone\n• Express-Preiskalkulator für Neukunden-Angebote\n\nBei Rückfragen oder für eine kurze gemeinsame Online-Vorstellung stehen wir Ihnen gerne zur Verfügung.\n\nMit freundlichen Grüßen,\nTeamTrack Softwareentwicklung\nE-Mail: info@team-track.de\nWeb: https://team-track.de`
    : `Sehr geehrte Damen und Herren,\nliebes Team von ${displayClient},\n\nvielen Dank für Ihr Interesse an TeamTrack.\n\nWir haben für Ihr Unternehmen eine 100% isolierte, persönliche Test-Umgebung eingerichtet. Sie können alle Module für die nächsten ${daysInput} Tage unverbindlich testen:\n\n👉 Hier geht es zu Ihrem persönlichen Demo-Zugang:\n${generatedUrl}\n\nEnthaltene Module & Funktionen:\n• Zeiterfassung & Live-Stempeluhr (Mobil, LKW, Werkstatt-Terminal)\n• Rechnungen, VOB-Abschläge & XRechnung / ZUGFeRD\n• CRM, Kundenakte & Angebots-Pipeline\n• Fuhrpark, TÜV/UVV-Radar & Werkzeug-Tracker\n• Disposition & Smarte GPS-Tourenplanung\n• Gebäudereinigung Suite (CleanPro)\n\nBei Fragen oder für eine kurze gemeinsame Online-Vorstellung stehen wir Ihnen jederzeit gerne zur Verfügung.\n\nMit freundlichen Grüßen,\nTeamTrack Softwareentwicklung\nE-Mail: info@team-track.de\nWeb: https://team-track.de`;

  const mailtoUrl = `mailto:${encodeURIComponent(emailInput.trim())}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const handleCopyEmailText = () => {
    navigator.clipboard.writeText(`Betreff: ${emailSubject}\n\n${emailBody}`);
    setEmailCopied(true);
    addToast('E-Mail-Text kopiert', 'Der vollständige E-Mail-Text inkl. Link wurde kopiert.', 'success');
    setTimeout(() => setEmailCopied(false), 2500);
  };

  const whatsappMessage = selectedModule === 'reinigung'
    ? `Hallo,\n\nhier ist Ihr persönlicher ${daysInput}-Tage Demo-Zugang für das CleanPro Gebäudereinigung & Hotel-Dashboard (${displayClient}):\n\n🔗 ${generatedUrl}\n\nEnthaltene Module:\n🏨 Hotel-Objekte & Zimmerpreise (EZ, DZ, Suite)\n📅 Tägliche Erfassung & Dienstplaner mit PDF-Aushang\n💰 Lohnabrechnung mit Sonn- (+50%) und Feiertagszuschlägen\n✍️ Digitale Kundenabnahme mit Unterschrift\n🧮 Express-Preiskalkulator für Kundenanfragen\n\nViele Grüße,\nTeamTrack Softwareentwicklung`
    : `Hallo,\n\nhier ist Ihr persönlicher ${daysInput}-Tage Demo-Zugang für die TeamTrack Handwerker- & Firmen-Software (${displayClient}):\n\n🔗 ${generatedUrl}\n\nEnthaltene Module:\n⏱️ Zeiterfassung & Live-Stempeluhr\n📑 Rechnungen & DATEV\n👥 CRM & Kundenkartei\n🚗 Fuhrpark & TÜV-Manager\n📋 Auftragsdisposition\n✨ Gebäudereinigung Suite\n\nViele Grüße,\nTeamTrack Softwareentwicklung`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel max-w-lg w-full p-5 sm:p-7 rounded-3xl border border-brand-500/30 shadow-2xl relative space-y-4 max-h-[95vh] overflow-y-auto">
        
        <button
          onClick={() => setIsShareModalOpen(false)}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-bold uppercase tracking-wider mb-1.5">
            <Share2 className="w-3.5 h-3.5" />
            Mandantentrennung & Generator
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white">
            Personalisierten Kunden-Demolink erstellen
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Geben Sie den Kundennamen und die E-Mail-Adresse ein, um einen isolierten Test-Zugang per Outlook oder WhatsApp zu versenden.
          </p>
        </div>

        <div className="space-y-3.5 text-xs">
          {/* Customer Name & Email Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Kunden- / Firmenname:</label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="z.B. Schmidt Gebäudereinigung"
                  value={clientInput}
                  onChange={(e) => setClientInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Kunden-E-Mail:</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="z.B. info@schmidt-reinigung.de"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Ziel-Modul beim Start:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedModule('reinigung')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all text-left flex items-center justify-between ${
                  selectedModule === 'reinigung'
                    ? 'bg-emerald-600/30 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>✨ Gebäudereinigung</span>
                {selectedModule === 'reinigung' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
              <button
                type="button"
                onClick={() => setSelectedModule('all')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all text-left flex items-center justify-between ${
                  selectedModule === 'all'
                    ? 'bg-brand-600/30 border-brand-500 text-white shadow-md shadow-brand-500/20'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>🏢 Komplett-Suite</span>
                {selectedModule === 'all' && <Check className="w-3.5 h-3.5 text-brand-400" />}
              </button>
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

          {/* Social Preview Box */}
          <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Vorschau & Vorbereitung:</span>
              <button
                type="button"
                onClick={handleCopyEmailText}
                className="text-[10px] text-sky-400 hover:text-sky-300 font-semibold"
              >
                {emailCopied ? '✓ E-Mail kopiert' : 'E-Mail-Text kopieren'}
              </button>
            </div>
            <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
              <img src="/logo.jpg" alt="TeamTrack" className="w-11 h-11 rounded-lg object-contain bg-slate-900 border border-brand-500/20 shrink-0" />
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-white truncate">
                  {selectedModule === 'reinigung' ? 'CleanPro | Gebäudereinigung & Hotel-Dashboard' : 'TeamTrack | Interaktives Demo-Portal'}
                </h4>
                <p className="text-[10px] text-slate-400 line-clamp-1">Kunden-Testumgebung für {displayClient} ({daysInput} Tage)</p>
                <span className="text-[9px] text-brand-400">team-track.de {emailInput ? `• an ${emailInput}` : ''}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons: Outlook, WhatsApp, Copy Link */}
        <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <span className="text-[11px] text-slate-400 hidden lg:inline">
            100% isolierte Mandanten-Umgebung.
          </span>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            {/* Outlook / E-Mail Button */}
            <a
              href={mailtoUrl}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 active:scale-95 text-white text-xs font-bold shadow-lg shadow-sky-600/25 transition-all"
              title="Öffnet Microsoft Outlook oder Ihr Standard-Mailprogramm mit fertigem Text und Link"
            >
              <Mail className="w-4 h-4" />
              <span>Outlook öffnen</span>
            </a>

            {/* WhatsApp Button */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold shadow-lg shadow-emerald-600/25 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Copy Link Button */}
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 active:scale-95 text-white text-xs font-bold shadow-lg shadow-brand-500/25 transition-all"
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
