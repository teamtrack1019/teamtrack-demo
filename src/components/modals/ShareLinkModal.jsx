import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Share2, Copy, Check, X, Link, Clock, Building, Mail, Send, ExternalLink, Sparkles, Layers } from 'lucide-react';

const MODULE_CONFIG = {
  all: {
    name: 'Komplett-Suite',
    title: 'TeamTrack | Handwerker- & Firmen-Software',
    previewName: 'TeamTrack | Interaktives Demo-Portal',
    query: '',
    bullets: [
      '• ⏱️ Zeiterfassung & Live-Stempeluhr (Mobil, LKW, Terminal)',
      '• 📑 Rechnungen, VOB-Abschläge & XRechnung / ZUGFeRD',
      '• 👥 CRM, Kundenakte & Angebots-Pipeline',
      '• 🚗 Fuhrpark, TÜV/UVV-Radar & Werkzeug-Tracker',
      '• 🗺️ Disposition & Smarte GPS-Tourenplanung',
      '• ✨ Gebäudereinigung Suite (CleanPro)'
    ]
  },
  reinigung: {
    name: 'Gebäudereinigung (CleanPro)',
    title: 'CleanPro | Gebäudereinigung & Hotel-Dashboard',
    previewName: 'CleanPro | Gebäudereinigung & Hotel-Dashboard',
    query: '&module=reinigung',
    bullets: [
      '• 🏨 Hotel-Objekte & Zimmerpreise (EZ, DZ, Suite)',
      '• 📅 Tägliche Erfassung & digitaler Dienstplaner mit PDF-Aushang',
      '• 💰 Lohnabrechnung mit Sonn- (+50%) und Feiertagszuschlägen',
      '• ✍️ Digitale Kundenabnahme & Signatur auf Tablet/Smartphone',
      '• 🧮 Express-Preiskalkulator für Neukunden-Angebote'
    ]
  },
  zeiterfassung: {
    name: 'Zeiterfassung & Stempeluhr',
    title: 'TeamTrack | Mobile Zeiterfassung & Stempeluhr',
    previewName: 'TeamTrack | Zeiterfassung & Stempeluhr',
    query: '&module=zeiterfassung',
    bullets: [
      '• ⏱️ GPS-verifizierte Live-Stempeluhr (Kommen / Gehen / Pause)',
      '• 📊 Wochen-Matrix & 1-Klick DATEV Lodas Lohnexport',
      '• 🚛 EU-VO 561/2006 Modus für LKW- & Berufskraftfahrer',
      '• 📟 Tablet-Kiosk Terminal mit PIN & RFID/NFC Chip',
      '• 🏖️ Digitaler Urlaubsantrag & Krankmeldung (eAU)'
    ]
  },
  rechnungen: {
    name: 'Rechnungen, VOB & XRechnung',
    title: 'TeamTrack | Rechnungen, VOB & XRechnung',
    previewName: 'TeamTrack | Rechnungen & Finanzen',
    query: '&module=rechnungen',
    bullets: [
      '• 📑 Rechtssichere PDF-Rechnungen mit QR-Zahlcode',
      '• ⚡ Pflicht-konforme XRechnung & ZUGFeRD 2025/2026 (XML)',
      '• 🏗️ Kümulative VOB- & Abschlagsrechnungen mit Sicherheitseinbehalt',
      '• ⚠️ 3-stufiges automatisiertes Mahnwesen mit Verzugszins',
      '• 🏦 Live-Bankabgleich mit automatischem Zahlungsabgleich'
    ]
  },
  crm: {
    name: 'CRM & Kundenakte',
    title: 'TeamTrack | CRM & Kundenkartei',
    previewName: 'TeamTrack | CRM & Kundenkartei',
    query: '&module=crm',
    bullets: [
      '• 👥 360° Kundenakte mit Baustellen- & Kontakthistorie',
      '• 📈 Kanban Angebots-Pipeline mit Live-Umsatzvolumen',
      '• 🔑 Kunden-Self-Service Portal für Tickets & Rechnungs-Download',
      '• 🗂️ Notizen, Dokumentenarchiv & Schnellkontakt'
    ]
  },
  disposition: {
    name: 'Disposition & Tourenplanung',
    title: 'TeamTrack | Disposition & Tourenplanung',
    previewName: 'TeamTrack | Disposition & Tourenplanung',
    query: '&module=disposition',
    bullets: [
      '• 🗺️ Smarte GPS-Tourenplanung mit Google Maps Navigation',
      '• ✍️ Digitaler Lieferschein mit Touch-Signatur auf dem Smartphone',
      '• 📋 4-Stufen Kanban Auftragspipeline (Geplant bis Abnahme)',
      '• 👷 Monteur- & Kolonnen-Zuweisung ohne Doppelbelegungen'
    ]
  },
  fuhrpark: {
    name: 'Fuhrpark & Werkzeug-Tracker',
    title: 'TeamTrack | Fuhrpark & Werkzeug-Tracker',
    previewName: 'TeamTrack | Fuhrpark & Werkzeug-Tracker',
    query: '&module=fuhrpark',
    bullets: [
      '• 🚗 Fahrzeug-Radar mit TÜV-, UVV- & Inspektions-Countdown',
      '• 🔧 Digitaler Werkzeug-Tracker für Hilti/Bosch mit QR-Code',
      '• ⛽ Digitales Tankkarten- & Schaden-Logbuch mit Foto-Upload',
      '• 📊 Kosten- & Verbrauchskontrolle pro Fahrzeug'
    ]
  }
};

export const ShareLinkModal = () => {
  const { isShareModalOpen, setIsShareModalOpen, addToast } = useDemo();
  const [clientInput, setClientInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [daysInput, setDaysInput] = useState(7);
  const [selectedModule, setSelectedModule] = useState('reinigung'); // 'all' or specific module key
  const [copied, setCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  if (!isShareModalOpen) return null;

  const origin = window.location.origin || 'https://demo.team-track.de';
  const cleanClient = (clientInput || 'Kundenname').trim().replace(/\s+/g, '-');
  const displayClient = clientInput.trim() || 'Ihr Unternehmen';
  
  const currentConfig = MODULE_CONFIG[selectedModule] || MODULE_CONFIG.all;
  const moduleQuery = currentConfig.query;
  const generatedUrl = `${origin}${window.location.pathname}?client=${encodeURIComponent(cleanClient)}${moduleQuery}&days=${daysInput}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    addToast('Link kopiert', `Der personalisierte Test-Link für "${displayClient}" wurde in die Zwischenablage kopiert.`, 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const emailSubject = `Ihr persönlicher ${currentConfig.name} Demo-Zugang für ${displayClient} (${daysInput} Tage)`;

  const emailLines = [
    `Sehr geehrte Damen und Herren,`,
    `liebes Team von ${displayClient},`,
    ``,
    `vielen Dank für Ihr Interesse an TeamTrack.`,
    ``,
    `Wir haben für Ihr Unternehmen eine 100% isolierte, persönliche Test-Umgebung für den Bereich "${currentConfig.name}" eingerichtet. Sie können alle Funktionen für die nächsten ${daysInput} Tage unverbindlich testen.`,
    ``,
    `👉 Hier klicken für Ihren persönlichen Demo-Zugang:`,
    `${generatedUrl}`,
    ``,
    `Enthaltene Module & Funktionen:`,
    ...currentConfig.bullets,
    ``,
    `Bei Fragen oder für eine kurze gemeinsame Online-Vorstellung stehen wir Ihnen jederzeit gerne zur Verfügung.`,
    ``,
    `Mit freundlichen Grüßen,`,
    `TeamTrack Softwareentwicklung`,
    `E-Mail: info@team-track.de`,
    `Web: https://team-track.de`
  ];

  const emailBody = emailLines.join('\r\n');
  const mailtoUrl = `mailto:${encodeURIComponent(emailInput.trim())}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody).replace(/%0A/g, '%0D%0A').replace(/%0D%0D%0A/g, '%0D%0A')}`;

  const [htmlCopied, setHtmlCopied] = useState(false);

  const handleCopyRichText = async () => {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6;">
        <p>Sehr geehrte Damen und Herren,<br>liebes Team von <strong>${displayClient}</strong>,</p>
        <p>vielen Dank für Ihr Interesse an TeamTrack.</p>
        <p>Wir haben für Ihr Unternehmen eine 100% isolierte, persönliche Test-Umgebung für den Bereich <strong>"${currentConfig.name}"</strong> eingerichtet. Sie können alle Funktionen für die nächsten <strong>${daysInput} Tage</strong> unverbindlich testen:</p>
        <p style="margin: 20px 0;">
          <a href="${generatedUrl}" style="background-color: #0284c7; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">👉 Hier klicken: Zu Ihrer persönlichen Demo</a>
        </p>
        <p>Direktlink: <a href="${generatedUrl}" style="color: #0284c7; text-decoration: underline;">${generatedUrl}</a></p>
        <p><strong>Enthaltene Module & Funktionen:</strong></p>
        <ul>
          ${currentConfig.bullets.map(b => `<li>${b.replace(/^[•\s-]+/, '')}</li>`).join('')}
        </ul>
        <p>Bei Fragen oder für eine kurze gemeinsame Online-Vorstellung stehen wir Ihnen jederzeit gerne zur Verfügung.</p>
        <p>Mit freundlichen Grüßen,<br><strong>TeamTrack Softwareentwicklung</strong><br>E-Mail: <a href="mailto:info@team-track.de">info@team-track.de</a><br>Web: <a href="https://team-track.de">https://team-track.de</a></p>
      </div>
    `;

    const plainText = `Betreff: ${emailSubject}\n\n${emailBody}`;

    try {
      const blobHtml = new Blob([htmlContent], { type: 'text/html' });
      const blobText = new Blob([plainText], { type: 'text/plain' });
      const item = new ClipboardItem({
        'text/html': blobHtml,
        'text/plain': blobText
      });
      await navigator.clipboard.write([item]);
      setHtmlCopied(true);
      addToast('HTML-E-Mail kopiert!', 'Einfügen in Outlook (Strg+V): Der Link ist sofort als klickbarer Button formatiert!', 'success');
      setTimeout(() => setHtmlCopied(false), 3000);
    } catch (err) {
      navigator.clipboard.writeText(plainText);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 3000);
    }
  };

  const whatsappMessage = `Hallo,\n\nhier ist Ihr persönlicher ${daysInput}-Tage Demo-Zugang für ${currentConfig.title} (${displayClient}):\n\n${generatedUrl}\n\nEnthaltene Module:\n${currentConfig.bullets.join('\n')}\n\nViele Grüße,\nTeamTrack Softwareentwicklung`;

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

          {/* Module Selector: Dropdown for Specific Module vs Komplett-Suite */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Ziel-Modul beim Start:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              
              {/* Left: Dropdown of Specific Modules */}
              <div className={`p-1.5 rounded-xl border transition-all ${
                selectedModule !== 'all'
                  ? 'bg-emerald-600/20 border-emerald-500 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/80 border-slate-800'
              }`}>
                <div className="text-[10px] text-slate-400 font-bold px-2 py-0.5 flex items-center justify-between">
                  <span>🎯 Einzelfokus-Modul:</span>
                  {selectedModule !== 'all' && <span className="text-emerald-400 font-bold">Aktiv ✓</span>}
                </div>
                <select
                  value={selectedModule === 'all' ? 'reinigung' : selectedModule}
                  onChange={(e) => setSelectedModule(e.target.value)}
                  onClick={() => { if (selectedModule === 'all') setSelectedModule('reinigung'); }}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-white font-bold text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="reinigung">✨ Gebäudereinigung (CleanPro)</option>
                  <option value="zeiterfassung">⏱️ Zeiterfassung & Stempeluhr</option>
                  <option value="rechnungen">📑 Rechnungen, VOB & XRechnung</option>
                  <option value="crm">👥 CRM & Kundenakte</option>
                  <option value="disposition">🗺️ Disposition & Tourenplanung</option>
                  <option value="fuhrpark">🚗 Fuhrpark & Werkzeug-Radar</option>
                </select>
              </div>

              {/* Right: Komplett-Suite Button */}
              <button
                type="button"
                onClick={() => setSelectedModule('all')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all text-left flex items-center justify-between ${
                  selectedModule === 'all'
                    ? 'bg-brand-600/30 border-brand-500 text-white shadow-md shadow-brand-500/20'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span>🏢 Komplett-Suite</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-normal">Alle Module freigeschaltet</div>
                </div>
                {selectedModule === 'all' && <Check className="w-4 h-4 text-brand-400 shrink-0" />}
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
            <div className="flex items-center justify-between mb-1">
              <label className="block text-slate-300 font-semibold">Generierter Test-Link:</label>
              <a
                href={generatedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-brand-400 hover:text-brand-300 font-bold flex items-center gap-1 cursor-pointer"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Im Browser testen ↗</span>
              </a>
            </div>
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
                onClick={handleCopyRichText}
                className="text-[10px] text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1 cursor-pointer"
                title="Kopiert formatierten HTML-Text mit klickbarem Button direkt für Outlook / Webmail"
              >
                <Sparkles className="w-3 h-3" />
                <span>{htmlCopied ? '✓ Formatiert kopiert!' : 'Klickbaren Outlook-Text kopieren'}</span>
              </button>
            </div>
            <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
              <img src="/logo.jpg" alt="TeamTrack" className="w-11 h-11 rounded-lg object-contain bg-slate-900 border border-brand-500/20 shrink-0" />
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-white truncate">
                  {currentConfig.previewName}
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
