import React, { useState, useEffect } from 'react';
import { useDemo } from '../../context/DemoContext';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  Smartphone, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Laptop, 
  Maximize2, 
  Minimize2, 
  LayoutDashboard, 
  Download, 
  DollarSign, 
  QrCode, 
  Send, 
  FileSpreadsheet, 
  Building2, 
  AlertCircle,
  Eye,
  CheckCheck,
  CreditCard,
  Percent
} from 'lucide-react';

export const InvoiceTrackProApp = ({ onBack }) => {
  const { triggerRestrictedAction, addToast } = useDemo();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [appMode, setAppMode] = useState('desktop'); // 'desktop' | 'mobile' | 'pdf' | 'mahnwesen'
  const [selectedInvoice, setSelectedInvoice] = useState('RE-2026-089 (Huber Bauunternehmung)');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  return (
    <div className={`transition-all duration-300 ${
      isFullscreen 
        ? 'fixed inset-0 z-50 bg-slate-950 p-4 sm:p-6 overflow-y-auto w-full h-full flex flex-col' 
        : 'space-y-6 w-full animate-in fade-in duration-300'
    }`}>
      
      {/* Top Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-emerald-500/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-slate-900/90 shadow-2xl shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 shrink-0">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-black text-white">InvoiceFlow Pro Suite</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                E-Rechnung 2025 Pflichtkonform (ZUGFeRD / XRechnung)
              </span>
              {isFullscreen && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  ⛶ Vollbildansicht aktiv (Esc)
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              1-Klick Fakturierung aus Zeiterfassung & Touren, XRechnung-Validierung, DATEV & Mahnwesen
            </p>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-xl border border-slate-800 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => setAppMode('desktop')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                appMode === 'desktop'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>1. Rechnungs-Center</span>
            </button>

            <button
              onClick={() => setAppMode('mobile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                appMode === 'mobile'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>2. Vor-Ort Kasse</span>
            </button>

            <button
              onClick={() => setAppMode('pdf')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                appMode === 'pdf'
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>3. PDF & XRechnung</span>
            </button>

            <button
              onClick={() => setAppMode('mahnwesen')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                appMode === 'mahnwesen'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>4. Mahnwesen & OPOS</span>
            </button>
          </div>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md ${
              isFullscreen 
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30' 
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
            title={isFullscreen ? 'Vollbild verlassen (Esc)' : 'Auf Vollbild vergrößern'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4 text-emerald-400" />}
            <span>{isFullscreen ? 'Vollbild beenden' : '⛶ Vollbild'}</span>
          </button>

          {onBack && !isFullscreen && (
            <button
              onClick={onBack}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition-all cursor-pointer"
            >
              Zurück
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. DESKTOP RECHNUNGS-CENTER */}
      {/* ========================================================================= */}
      {appMode === 'desktop' && (
        <div className="space-y-6 flex-1 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Fakturiert diesen Monat</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-2">64.480,00 €</div>
              <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                +14% gegenüber Vormonat
              </div>
            </div>

            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Offene Posten (OPOS)</span>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-2">12.180,00 €</div>
              <div className="text-[11px] text-slate-400 mt-1">
                Ø Zahlungsziel: 8.4 Tage
              </div>
            </div>

            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>XRechnung & ZUGFeRD 2.2</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2">100% Validiert</div>
              <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                Gesetzliche Pflicht ab 01.01.2025 ✓
              </div>
            </div>

            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>DATEV Unternehmen Online</span>
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              </div>
              <button
                onClick={() => triggerRestrictedAction('DATEV Buchungsstapel Export', 'Rechnungsdaten, Belegbilder und Kontierungsdaten werden direkt an DATEV Unternehmen Online übergeben.')}
                className="mt-2 w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/20 cursor-pointer transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DATEV Buchungsexport</span>
              </button>
            </div>
          </div>

          {/* Invoices List */}
          <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4 bg-slate-900/80">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-black text-white">Aktuelle Rechnungen & 1-Klick Generierung</h3>
                <p className="text-xs text-slate-400 mt-0.5">Automatisch erzeugt aus gestempelten Baustellenzeiten & Touren</p>
              </div>

              <button
                onClick={() => triggerRestrictedAction('Sammelrechnung aus Stundenzetteln erstellen', 'Alle offenen Zeiteinträge der Woche werden automatisch zu einer prüffähigen Sammelrechnung zusammengefasst.')}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 cursor-pointer transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>+ 1-Klick Rechnung aus Zeiterfassung</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800">
                    <th className="pb-3 font-semibold">Rechnungs-Nr. & Datum</th>
                    <th className="pb-3 font-semibold">Empfänger (Kunde)</th>
                    <th className="pb-3 font-semibold">Leistungszeitraum & Bauvorhaben</th>
                    <th className="pb-3 font-semibold">Nettobetrag</th>
                    <th className="pb-3 font-semibold">Gesamtbetrag (inkl. 19%)</th>
                    <th className="pb-3 font-semibold">E-Rechnung</th>
                    <th className="pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    { id: 'RE-2026-089', date: '04.09.2026', client: 'Huber Bauunternehmung GmbH', desc: 'Rohbau-Abnahme & Elektro-Installation Würzburg-Nord', net: '3.450,00 €', gross: '4.105,50 €', xrec: 'XML ZUGFeRD 2.2', status: '🟢 Bezahlt (Überweisung)' },
                    { id: 'RE-2026-090', date: '03.09.2026', client: 'Immobilienverwaltung Randersacker', desc: 'Monatspauschale Facility & Elektro-Wartung', net: '2.800,00 €', gross: '3.332,00 €', xrec: 'XML XRechnung', status: '🟡 Offen (Zahlbar bis 17.09.)' },
                    { id: 'RE-2026-091', date: '01.09.2026', client: 'Klinikum Würzburg gGmbH', desc: 'Hygienereinigung OP-Trakt & Notdienst-Bereitschaft', net: '8.650,00 €', gross: '10.293,50 €', xrec: 'XML Leitweg-ID geprüft', status: '🟢 Bezahlt (DATEV)' }
                  ].map((r) => (
                    <tr key={r.id} className="hover:bg-slate-950/60 transition-colors">
                      <td className="py-3.5 font-bold text-white">
                        <div className="font-mono text-emerald-400">{r.id}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{r.date}</div>
                      </td>
                      <td className="py-3.5 text-white font-semibold">{r.client}</td>
                      <td className="py-3.5 text-slate-300">{r.desc}</td>
                      <td className="py-3.5 font-mono text-slate-300">{r.net}</td>
                      <td className="py-3.5 font-mono font-bold text-emerald-400">{r.gross}</td>
                      <td className="py-3.5">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                          {r.xrec}
                        </span>
                      </td>
                      <td className="py-3.5 font-bold text-[11px] text-slate-200">{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. VOR-ORT KASSE SMARTPHONE APP */}
      {/* ========================================================================= */}
      {appMode === 'mobile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start flex-1">
          <div className="lg:col-span-7 flex justify-center w-full">
            <div className="w-full max-w-md bg-slate-950 rounded-[40px] p-3 sm:p-4 border-4 border-slate-800 shadow-2xl shadow-emerald-950/40 relative overflow-hidden">
              <div className="w-32 h-5 bg-slate-900 rounded-full mx-auto mb-3 flex items-center justify-center gap-2 border border-slate-800">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-800"></div>
                <div className="w-8 h-1 rounded-full bg-slate-800"></div>
              </div>

              <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-[30px] p-3.5 sm:p-5 border border-slate-800 space-y-3.5 text-white overflow-hidden">
                <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/80 pb-2">
                  <span className="font-mono font-bold text-white">14:20 Uhr</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CreditCard className="w-3.5 h-3.5" /> Vor-Ort Rechnungsstellung
                  </span>
                </div>

                <div className="bg-slate-800/70 p-3 rounded-2xl border border-slate-700/60">
                  <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">Sofort-Rechnung</span>
                  <div className="text-xs font-bold text-white mt-0.5">Huber Bauunternehmung GmbH</div>
                  <div className="text-[10px] text-slate-400">Einsatz: Notdienst & Kabelanschluss</div>
                </div>

                {/* Calculation Widget */}
                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>3.5 Std. Meister-Arbeitszeit:</span>
                    <span className="font-mono text-white">262,50 €</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Anfahrtspauschale Zone 1:</span>
                    <span className="font-mono text-white">45,00 €</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Material (Sicherungskasten):</span>
                    <span className="font-mono text-white">85,00 €</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between font-bold">
                    <span className="text-white">Gesamtbetrag (inkl. 19%):</span>
                    <span className="text-emerald-400 font-mono text-sm">467,07 €</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    addToast('Rechnung versendet', 'PDF-Rechnung mit GiroCode per E-Mail an Kunden übermittelt.', 'success');
                  }}
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Rechnung erzeugen & per E-Mail senden</span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="glass-panel p-5 rounded-3xl border border-slate-800 shadow-xl space-y-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Vorteile der mobilen Rechnungsstellung
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Schnellere Liquidität:</strong> Kunden erhalten die Rechnung sofort nach getaner Arbeit auf ihr Smartphone.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Kein bürokratischer Verzug:</strong> Keine vergessenen Arbeitsstunden oder verlorenen Materialzettel.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. PDF VORSCHAU & 4. MAHNWESEN */}
      {/* ========================================================================= */}
      {(appMode === 'pdf' || appMode === 'mahnwesen') && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-6 flex-1">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-black text-white">E-Rechnung (XRechnung / ZUGFeRD) & Mahnwesen</h3>
            <span className="text-xs text-emerald-400 font-mono">Gesetzeskonform 2025</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <span className="text-slate-400 font-bold">GiroCode & EPC-QR-Code</span>
              <div className="text-2xl font-black text-emerald-400 font-mono">100% Integriert</div>
              <span className="text-slate-400 text-[11px]">Kunde scannt mit Banking-App</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <span className="text-slate-400 font-bold">Automatische Zahlungserinnerung</span>
              <div className="text-2xl font-black text-amber-400 font-mono">3-Stufiges Mahnwesen</div>
              <span className="text-slate-400 text-[11px]">Freundliche E-Mail & SMS Erinnerung</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <span className="text-slate-400 font-bold">DATEV Schnittstelle</span>
              <div className="text-2xl font-black text-teal-400 font-mono">Belegbild-Transfer</div>
              <span className="text-slate-400 text-[11px]">Automatische Vorkontierung</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
