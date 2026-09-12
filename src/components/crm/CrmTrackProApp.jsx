import React, { useState, useEffect } from 'react';
import { useDemo } from '../../context/DemoContext';
import { 
  Building2, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  User, 
  Smartphone, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Radio, 
  Laptop, 
  Maximize2, 
  Minimize2, 
  LayoutDashboard, 
  Download, 
  PhoneCall, 
  Mail, 
  FileText, 
  Key, 
  FolderKanban, 
  TrendingUp,
  Star,
  Users
} from 'lucide-react';

export const CrmTrackProApp = ({ onBack }) => {
  const { triggerRestrictedAction, addToast } = useDemo();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [appMode, setAppMode] = useState('desktop'); // 'desktop' | 'mobile' | 'hierarchy' | 'portal'
  const [selectedClient, setSelectedClient] = useState('Huber Bauunternehmung GmbH');
  const [inspectionDone, setInspectionDone] = useState(false);

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
      <div className="glass-panel p-4 rounded-2xl border border-indigo-500/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-slate-900/90 shadow-2xl shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 shrink-0">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-black text-white">TeamTrack CRM 360° Suite</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Kunden- & Objekt-Hub
              </span>
              {isFullscreen && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  ⛶ Vollbildansicht aktiv (Esc)
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              360° Kundenakten, Gebäude-Hierarchien, Schlüsselmanagement & digitale Objektbegehungen
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
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>1. CRM 360° Portal</span>
            </button>

            <button
              onClick={() => setAppMode('mobile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                appMode === 'mobile'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>2. Vor-Ort Begehung</span>
            </button>

            <button
              onClick={() => setAppMode('hierarchy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                appMode === 'hierarchy'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>3. Objekt-Hierarchie</span>
            </button>

            <button
              onClick={() => setAppMode('portal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                appMode === 'portal'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>4. Kunden-Service-Desk</span>
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
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4 text-indigo-400" />}
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
      {/* 1. DESKTOP CRM 360 */}
      {/* ========================================================================= */}
      {appMode === 'desktop' && (
        <div className="space-y-6 flex-1 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Aktive Firmenkunden</span>
                <Building2 className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-2">28 Kunden</div>
              <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                +3 Neukunden im laufenden Quartal
              </div>
            </div>

            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Verwaltete Liegenschaften</span>
                <FolderKanban className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-2">64 Objekte</div>
              <div className="text-[11px] text-slate-400 mt-1">
                Inkl. Schließanlagen & Raumbücher
              </div>
            </div>

            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Wiederkehrender Umsatz (MRR)</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2">48.250 € / M.</div>
              <div className="text-[11px] text-emerald-400 mt-1">
                98% Kunden-Bindungsrate
              </div>
            </div>

            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Kundenakte & DSGVO</span>
                <Download className="w-4 h-4 text-sky-400" />
              </div>
              <button
                onClick={() => triggerRestrictedAction('360° Kundenakte PDF Export', 'Vollständiges Kundenstammblatt mit Ansprechpartnern, Objekten, Verträgen und Rechnungshistorie.')}
                className="mt-2 w-full py-2 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/20 cursor-pointer transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Kunden-Dossier exportieren</span>
              </button>
            </div>
          </div>

          {/* Customer Dossier Table */}
          <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4 bg-slate-900/80">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-black text-white">Zentrale Kundenkartei & Betreuungsstatus</h3>
              <span className="text-xs text-slate-400 font-mono">28 Datensätze</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800">
                    <th className="pb-3 font-semibold">Unternehmen & Kundennummer</th>
                    <th className="pb-3 font-semibold">Ansprechpartner</th>
                    <th className="pb-3 font-semibold">Zugeordnete Objekte</th>
                    <th className="pb-3 font-semibold">Vertragstyp</th>
                    <th className="pb-3 font-semibold">Schlüssel & Zutritt</th>
                    <th className="pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    { id: 'KD-1001', name: 'Huber Bauunternehmung GmbH', contact: 'Herr Thomas Huber', phone: '+49 171 987654', objects: 'Neubau Wohnpark Würzburg-Nord', contract: 'Rahmenvertrag Bau 2026', keys: '🔑 4 Transponder aktiv', status: '🟢 Premium Kunde' },
                    { id: 'KD-1002', name: 'Immobilienverwaltung Randersacker', contact: 'Frau Dr. Martina Klein', phone: '+49 931 45678', objects: 'Bürokomplex & Tiefgarage (12 Einheiten)', contract: 'Full-Service Facility (Wartung & Elektro)', keys: '🔑 Generalschlüssel registriert', status: '🟢 Aktiv' },
                    { id: 'KD-1003', name: 'Klinikum Würzburg gGmbH', contact: 'Herr Markus Leitner (Technik)', phone: '+49 931 2010', objects: 'Hauptgebäude & OP-Trakt Süd', contract: 'Hygienereinigung & Notdienst 24/7', keys: '🔑 RFID Chipkarten (Stufe 4)', status: '🟢 Premium Kunde' }
                  ].map((c) => (
                    <tr key={c.id} className="hover:bg-slate-950/60 transition-colors">
                      <td className="py-3.5 font-bold text-white">
                        <div className="font-bold text-indigo-300">{c.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{c.id}</div>
                      </td>
                      <td className="py-3.5 text-slate-300">
                        <div>{c.contact}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{c.phone}</div>
                      </td>
                      <td className="py-3.5 text-white font-medium">{c.objects}</td>
                      <td className="py-3.5 text-slate-300">{c.contract}</td>
                      <td className="py-3.5 text-emerald-400 font-mono text-[11px]">{c.keys}</td>
                      <td className="py-3.5 font-bold text-emerald-400">{c.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. VOR-ORT OBJEKTBEGEHUNG SMARTPHONE APP */}
      {/* ========================================================================= */}
      {appMode === 'mobile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start flex-1">
          <div className="lg:col-span-7 flex justify-center w-full">
            <div className="w-full max-w-md bg-slate-950 rounded-[40px] p-3 sm:p-4 border-4 border-slate-800 shadow-2xl shadow-indigo-950/40 relative overflow-hidden">
              <div className="w-32 h-5 bg-slate-900 rounded-full mx-auto mb-3 flex items-center justify-center gap-2 border border-slate-800">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-800"></div>
                <div className="w-8 h-1 rounded-full bg-slate-800"></div>
              </div>

              <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-[30px] p-3.5 sm:p-5 border border-slate-800 space-y-3.5 text-white overflow-hidden">
                <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/80 pb-2">
                  <span className="font-mono font-bold text-white">11:15 Uhr</span>
                  <span className="text-indigo-400 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Digitale Objekt-Übergabe
                  </span>
                </div>

                <div className="bg-slate-800/70 p-3 rounded-2xl border border-slate-700/60">
                  <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider">Vor-Ort Protokoll</span>
                  <div className="text-xs font-bold text-white mt-0.5">Bürokomplex Randersacker (1.OG)</div>
                  <div className="text-[10px] text-slate-400">Kunde: Immobilienverwaltung Randersacker</div>
                </div>

                {/* Inspection Checklist */}
                <div className="space-y-2 text-xs">
                  <span className="font-bold text-slate-300">Zustands- & Zählerstandserfassung:</span>
                  {[
                    'Strom- & Wasserzähler abgelesen (Foto hinterlegt)',
                    'Schlüsselübergabe quittiert (3 Bund erhalten)',
                    'Brandschutztüren & Notausgänge geprüft',
                    'Mängelfrei übergeben & abgenommen'
                  ].map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2">
                      <span className="text-slate-300">{item}</span>
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setInspectionDone(true);
                    addToast('Objektbegehung gespeichert', 'Übergabeprotokoll signiert und im Kundenkonto archiviert.', 'success');
                  }}
                  className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Übergabeprotokoll digital abschließen</span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="glass-panel p-5 rounded-3xl border border-slate-800 shadow-xl space-y-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Vorteile des digitalen Objektmanagements
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Lückenlose Beweisbarkeit:</strong> Zählerstände, Mängel und Schlüsselübergaben mit Zeitstempel & Foto.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Direkter Zugriff vor Ort:</strong> Alle Baupläne, Kontaktdaten und Handwerker-Freigaben auf dem Smartphone.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. HIERARCHIE & 4. PORTAL */}
      {/* ========================================================================= */}
      {(appMode === 'hierarchy' || appMode === 'portal') && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-6 flex-1">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-black text-white">Objekt-Hierarchie & Digitales Kundenportal</h3>
            <span className="text-xs text-indigo-400 font-mono">Live 360° Synchronisiert</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <span className="text-slate-400 font-bold">Kunden-Zufriedenheit</span>
              <div className="text-2xl font-black text-amber-400 font-mono">4.9 / 5.0 ⭐</div>
              <span className="text-slate-400 text-[11px]">Basierend auf 142 Bewertungen</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <span className="text-slate-400 font-bold">Offene Kunden-Tickets</span>
              <div className="text-2xl font-black text-emerald-400 font-mono">0 Eskalationen</div>
              <span className="text-slate-400 text-[11px]">Ø Reaktionszeit: 14 Minuten</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <span className="text-slate-400 font-bold">Digitale Schlüsselakte</span>
              <div className="text-2xl font-black text-indigo-400 font-mono">100% Nachverfolgbar</div>
              <span className="text-slate-400 text-[11px]">Kein Verlustrisiko</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
