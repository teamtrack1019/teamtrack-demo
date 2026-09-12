import React, { useState, useEffect } from 'react';
import { useDemo } from '../../context/DemoContext';
import { VariantSelectorBar } from '../VariantSelectorBar';
import { 
  Sparkles, 
  CheckCircle2, 
  QrCode, 
  Star, 
  AlertTriangle, 
  Building2, 
  Layers, 
  ExternalLink, 
  Check, 
  Camera, 
  ShieldCheck, 
  RotateCcw, 
  Plus, 
  Trash2,
  Maximize2,
  Minimize2,
  Laptop,
  Smartphone,
  LayoutDashboard
} from 'lucide-react';

export const ReinigungModule = () => {
  const { clientId, trialDays, isAdmin, isDedicatedClient, openUpgradeModal, addToast, triggerRestrictedAction } = useDemo();
  const [activeVariant, setActiveVariant] = useState('a');
  const [showFullCleanPro, setShowFullCleanPro] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // State for Variante A: Raum-Checklisten
  const [rooms, setRooms] = useState([
    {
      id: 'R-101',
      name: 'Büro 1.OG (Geschäftsführung)',
      building: 'Bürokomplex Würzburg',
      cleaner: 'Elena Rostova',
      time: 'Heute 06:30 Uhr',
      status: 'Erledigt',
      tasks: [
        { id: 1, name: 'Schreibtische & Monitore nebelfeucht abwischen', done: true },
        { id: 2, name: 'Papierkörbe & Aktenvernichter leeren', done: true },
        { id: 3, name: 'Teppichboden saugen & lüften', done: true },
        { id: 4, name: 'Tastaturen & Türklinken desinfizieren', done: true }
      ]
    },
    {
      id: 'R-102',
      name: 'Sanitärräume Damen & Herren (EG)',
      building: 'Bürokomplex Würzburg',
      cleaner: 'Elena Rostova',
      time: 'Heute 07:15 Uhr',
      status: 'In Bearbeitung',
      tasks: [
        { id: 1, name: 'WCs & Urinale mit Sanitärreiniger entkalken', done: true },
        { id: 2, name: 'Waschbecken, Spiegel & Armaturen polieren', done: true },
        { id: 3, name: 'Seifenspender & Papierhandtücher auffüllen', done: false },
        { id: 4, name: 'Fliesen nass wischen & desinfizieren', done: false }
      ]
    },
    {
      id: 'R-103',
      name: 'Empfangsfoyer & Konferenzraum',
      building: 'Bürokomplex Würzburg',
      cleaner: 'Elena Rostova',
      time: 'Heute 08:00 Uhr',
      status: 'Ausstehend',
      tasks: [
        { id: 1, name: 'Konferenztisch reinigen & Stühle ausrichten', done: false },
        { id: 2, name: 'Glasflächen & Eingangstüren streifenfrei putzen', done: false },
        { id: 3, name: 'Hartboden saugen & nebelfeucht wischen', done: false }
      ]
    }
  ]);

  const toggleTask = (roomId, taskId) => {
    setRooms(rooms.map(r => {
      if (r.id === roomId) {
        const updatedTasks = r.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t);
        const allDone = updatedTasks.every(t => t.done);
        const someDone = updatedTasks.some(t => t.done);
        return {
          ...r,
          tasks: updatedTasks,
          status: allDone ? 'Erledigt' : someDone ? 'In Bearbeitung' : 'Ausstehend'
        };
      }
      return r;
    }));
  };

  // State for Variante B: 4-Farben-Hygienesystem
  const [selectedColorZone, setSelectedColorZone] = useState('all');
  const hygieneZones = [
    {
      color: 'Rot',
      colorClass: 'border-rose-500 bg-rose-500/10 text-rose-400',
      badgeBg: 'bg-rose-500 text-white',
      name: 'Rote Zone (WC & Urinal)',
      desc: 'Ausschließlich für Toilettenschüsseln, Urinale und WC-Sitze mit keimtötendem Desinfektionsreiniger.',
      cloth: 'Rote Mikrofaser-Tücher & Eimer',
      hygieneLevel: 'Sehr hoch (Keimbarriere)'
    },
    {
      color: 'Gelb',
      colorClass: 'border-amber-500 bg-amber-500/10 text-amber-400',
      badgeBg: 'bg-amber-500 text-slate-950',
      name: 'Gelbe Zone (Sanitärbereich)',
      desc: 'Für Waschbecken, Armaturen, Duschkabinen, Fliesenwände und Spiegel im Sanitärbereich.',
      cloth: 'Gelbe Mikrofaser-Tücher & Eimer',
      hygieneLevel: 'Hoch (Kalklöser)'
    },
    {
      color: 'Blau',
      colorClass: 'border-sky-500 bg-sky-500/10 text-sky-400',
      badgeBg: 'bg-sky-500 text-white',
      name: 'Blaue Zone (Büromöbel & Oberflächen)',
      desc: 'Für Schreibtische, Schränke, Regale, Türen, Telefone, Tastaturen und Büroeinrichtung.',
      cloth: 'Blaue Mikrofaser-Tücher (Allzweck)',
      hygieneLevel: 'Normal (Schonreiniger)'
    },
    {
      color: 'Grün',
      colorClass: 'border-emerald-500 bg-emerald-500/10 text-emerald-400',
      badgeBg: 'bg-emerald-500 text-slate-950',
      name: 'Grüne Zone (Küche & Kantine)',
      desc: 'Für Teeküchen, Kaffeemaschinen, Esstische, Kühlschränke und lebensmittelnahe Arbeitsflächen.',
      cloth: 'Grüne Mikrofaser-Tücher (Lebensmittelecht)',
      hygieneLevel: 'HACCP-Geprüft'
    }
  ];

  // State for Variante C: QS-Audit & Reklamation
  const [audits, setAudits] = useState([
    {
      id: 'AUD-91',
      date: '10.09.2026',
      objectName: 'Bürokomplex Würzburg (Etage 1-3)',
      inspector: 'Elena Rostova (Objektleiterin)',
      score: 4.8,
      status: 'Bestanden (Sehr gut)',
      notes: 'Hervorragende Reinigungsqualität. Bodenbeläge glänzen, Sanitäranlagen geruchsfrei und desinfiziert.'
    },
    {
      id: 'AUD-92',
      date: '05.09.2026',
      objectName: 'Gewerbehalle Frankfurt (Halle 2)',
      inspector: 'Elena Rostova (Objektleiterin)',
      score: 4.2,
      status: 'Nacharbeit erforderlich',
      notes: 'Fensterfront zur Laderampe wies leichte Schlieren auf. Nachreinigung für 06.09. terminiert.'
    }
  ]);

  const [newAuditRating, setNewAuditRating] = useState(5);
  const [newAuditText, setNewAuditText] = useState('');

  const handleCreateAudit = (e) => {
    e.preventDefault();
    const newA = {
      id: `AUD-0${audits.length + 1}`,
      date: new Date().toLocaleDateString('de-DE'),
      objectName: 'Bürokomplex Würzburg',
      inspector: 'Elena Rostova (Objektleiterin)',
      score: newAuditRating,
      status: newAuditRating >= 4 ? 'Bestanden' : 'Nacharbeit gefordert',
      notes: newAuditText || 'Standard Qualitätsprüfung'
    };
    setAudits([newA, ...audits]);
    setNewAuditText('');
    addToast('Qualitätsaudit gespeichert', `Audit ${newA.id} mit ${newAuditRating} Sternen protokolliert.`, 'success');
  };

  // Listen for modal trigger requests from inside CleanPro iframe
  React.useEffect(() => {
    const handleMessage = (e) => {
      if (e.data && e.data.type === 'OPEN_UPGRADE_MODAL') {
        openUpgradeModal('Gebäudereinigung');
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [openUpgradeModal]);

  const currentParams = new URLSearchParams(window.location.search);
  if (!currentParams.get('client') && clientId) currentParams.set('client', clientId);
  if (!currentParams.get('days') && trialDays) currentParams.set('days', trialDays);
  if (isAdmin) currentParams.set('admin', 'true');

  const queryString = currentParams.toString();
  const reinigungUrl = `/reinigung/index.html${queryString ? `?${queryString}` : ''}`;

  const variants = [
    {
      id: 'a',
      badge: 'A',
      label: 'Variante A',
      sub: 'Raum-Checklisten & QR-Scan',
      icon: CheckCircle2
    },
    {
      id: 'b',
      badge: 'B',
      label: 'Variante B',
      sub: '4-Farben-Hygienesystem',
      icon: Layers
    },
    {
      id: 'c',
      badge: 'C',
      label: 'Variante C',
      sub: 'QS-Audit & Reklamations-Protokoll',
      icon: Star
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 w-full">
      
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 glass-panel p-4 sm:p-6 rounded-2xl w-full">
        <div className="w-full lg:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Modul 6</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 font-bold">
              CleanPro Suite
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">Gebäudereinigung & Objektmanagement</h2>
          <p className="text-xs text-slate-400 mt-1">
            Reinigungspläne, 4-Farben-Hygienestandards, QR-Raumchecks und Qualitätsaudits für professionelle Reinigungsbetriebe.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full lg:w-auto">
          <button
            onClick={() => setShowFullCleanPro(!showFullCleanPro)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer w-full sm:w-auto ${
              showFullCleanPro
                ? 'bg-slate-800 text-teal-300 border border-teal-500/40'
                : 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-500/20'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{showFullCleanPro ? 'Zurück zur Modul-Übersicht' : 'Vollständige CleanPro App öffnen'}</span>
          </button>
        </div>
      </div>

      {/* Full CleanPro iframe mode with Fullscreen toolbar */}
      {showFullCleanPro ? (
        <div className={`transition-all duration-300 ${
          isFullscreen 
            ? 'fixed inset-0 z-50 bg-slate-950 p-4 sm:p-6 overflow-y-auto w-full h-full flex flex-col space-y-4' 
            : 'space-y-4 w-full animate-in fade-in duration-200'
        }`}>
          {/* Top Control bar inside CleanPro */}
          <div className="glass-panel p-3.5 rounded-2xl border border-teal-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900/90 shadow-xl shrink-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"></span>
              <span className="text-xs font-bold text-white">CleanPro Suite Live Web-App</span>
              {isFullscreen && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  ⛶ Vollbildansicht aktiv (Esc)
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
                  isFullscreen 
                    ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30' 
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
                title={isFullscreen ? 'Vollbild verlassen (Esc)' : 'Auf Vollbild vergrößern'}
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5 text-teal-400" />}
                <span>{isFullscreen ? 'Vollbild beenden' : '⛶ Vollbild'}</span>
              </button>

              <button
                onClick={() => {
                  setIsFullscreen(false);
                  setShowFullCleanPro(false);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition-all cursor-pointer"
              >
                Zurück zur Übersicht
              </button>
            </div>
          </div>

          <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl bg-white relative flex-1" style={{ minHeight: isFullscreen ? 'calc(100vh - 120px)' : '840px', height: isFullscreen ? '100%' : 'calc(100vh - 150px)' }}>
            <iframe
              key={iframeKey}
              src={reinigungUrl}
              title="CleanPro Gebäudereinigung"
              className="w-full h-full border-0 block"
              allow="camera; microphone; geolocation"
            />
          </div>
        </div>
      ) : (
        <>
          {/* Top Variant Selector Bar */}
          <VariantSelectorBar
            moduleName="Gebäudereinigung"
            variants={variants}
            activeVariant={activeVariant}
            onSelectVariant={setActiveVariant}
          />

          {/* ======================= VARIANTE A: RAUM-CHECKLISTEN & QR-SCAN ======================= */}
          {activeVariant === 'a' && (
            <div className="space-y-6">
              <div className="glass-panel p-6 rounded-3xl border border-teal-500/20 shadow-2xl space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      Digitale Raum-Abnahme
                    </span>
                    <h3 className="text-xl font-black text-white mt-1.5">
                      Interaktive Raum-Reinigungspläne
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Reinigungskräfte haken erledigte Tätigkeiten direkt im Raum ab. Status wechselt automatisch auf "Erledigt".
                    </p>
                  </div>

                  <button
                    onClick={() => triggerRestrictedAction('QR-Code Raumscanner', 'In der CleanPro-Smartphone-App scannt die Reinigungskraft den QR-Code an der Zimmertür und öffnet sofort die Raum-Checkliste.')}
                    className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all cursor-pointer"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Tür-QR scannen</span>
                  </button>
                </div>

                {/* Rooms Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rooms.map((r) => {
                    const doneCount = r.tasks.filter(t => t.done).length;
                    const percent = Math.round((doneCount / r.tasks.length) * 100);

                    return (
                      <div key={r.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-800/80">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-teal-400 font-bold text-xs">{r.id}</span>
                                <span className="text-[10px] text-slate-500">{r.building}</span>
                              </div>
                              <h4 className="text-sm font-bold text-white mt-0.5">{r.name}</h4>
                            </div>

                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              r.status === 'Erledigt' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                              r.status === 'In Bearbeitung' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse' :
                              'bg-slate-800 text-slate-400'
                            }`}>
                              {r.status}
                            </span>
                          </div>

                          {/* Progress bar */}
                          <div className="mt-3 space-y-1">
                            <div className="flex justify-between text-[11px] text-slate-400">
                              <span>Fortschritt:</span>
                              <span className="font-bold text-white font-mono">{doneCount}/{r.tasks.length} ({percent}%)</span>
                            </div>
                            <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                              <div 
                                className="bg-teal-400 h-full rounded-full transition-all" 
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                          </div>

                          {/* Tasks Checklist */}
                          <div className="mt-4 space-y-2">
                            {r.tasks.map((t) => (
                              <label
                                key={t.id}
                                className={`flex items-start gap-2.5 p-2 rounded-xl border text-xs transition-all cursor-pointer ${
                                  t.done 
                                    ? 'bg-emerald-950/20 border-emerald-800/50 text-slate-300' 
                                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={t.done}
                                  onChange={() => toggleTask(r.id, t.id)}
                                  className="mt-0.5 accent-teal-500 cursor-pointer rounded"
                                />
                                <span className={t.done ? 'line-through text-slate-400' : 'text-slate-200'}>
                                  {t.name}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                          <span>Reinigerin: <strong className="text-white">{r.cleaner}</strong></span>
                          <span className="font-mono text-[10px]">{r.time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ======================= VARIANTE B: 4-FARBEN-HYGIENESYSTEM ======================= */}
          {activeVariant === 'b' && (
            <div className="space-y-6">
              <div className="glass-panel p-6 rounded-3xl border border-teal-500/20 shadow-2xl space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      DIN EN 13549 & HACCP Standard
                    </span>
                    <h3 className="text-xl font-black text-white mt-1.5">
                      4-Farben-Hygienesystem (Keimübertragungsschutz)
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Strikte Trennung von Reinigungstüchern und Chemikalien nach Farbzonen verhindert Kreuzkontamination.
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Zertifiziert nach RKI-Richtlinie</span>
                  </span>
                </div>

                {/* 4 Color Zones Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {hygieneZones.map((z) => (
                    <div key={z.color} className={`p-5 rounded-2xl border ${z.colorClass} space-y-3 bg-slate-950/80`}>
                      <div className="flex items-center justify-between pb-2 border-b border-white/10">
                        <div className="flex items-center gap-2.5">
                          <span className={`px-2.5 py-0.5 rounded-full font-black text-xs uppercase ${z.badgeBg}`}>
                            {z.color}
                          </span>
                          <h4 className="font-bold text-white text-sm">{z.name}</h4>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono font-bold">{z.hygieneLevel}</span>
                      </div>

                      <p className="text-xs text-slate-300">{z.desc}</p>

                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                        <span className="text-slate-400">Verwendetes Material:</span>
                        <span className="font-bold text-white">{z.cloth}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================= VARIANTE C: QS-AUDIT & REKLAMATIONS-PROTOKOLL ======================= */}
          {activeVariant === 'c' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Col: New Audit Form */}
                <div className="glass-panel p-6 rounded-3xl border border-teal-500/20 shadow-xl space-y-4">
                  <div className="pb-3 border-b border-slate-800">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      Objektleiter-Audit
                    </span>
                    <h3 className="text-base font-black text-white mt-1">
                      Qualitätskontrolle durchführen
                    </h3>
                  </div>

                  <form onSubmit={handleCreateAudit} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Qualitätsbewertung (Sterne):</label>
                      <div className="flex items-center gap-2 pt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewAuditRating(star)}
                            className="p-1 text-amber-400 hover:scale-125 transition-all cursor-pointer"
                          >
                            <Star className={`w-6 h-6 ${newAuditRating >= star ? 'fill-current' : 'opacity-30'}`} />
                          </button>
                        ))}
                        <span className="text-xs font-bold text-white ml-2">{newAuditRating} von 5 Sternen</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Audit-Bemerkung / Mängel:</label>
                      <textarea
                        rows="3"
                        placeholder="z. B. Böden streifenfrei, Sanitärbereich hygienisch einwandfrei..."
                        value={newAuditText}
                        onChange={(e) => setNewAuditText(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Audit-Protokoll speichern</span>
                    </button>
                  </form>
                </div>

                {/* Right 2 Cols: Audit Logs */}
                <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="text-base font-black text-white">
                      Protokollierte Qualitäts-Audits
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">{audits.length} Prüfberichte</span>
                  </div>

                  <div className="space-y-3">
                    {audits.map((a) => (
                      <div key={a.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-teal-400 font-bold text-xs">{a.id}</span>
                              <span className="text-white font-bold">{a.objectName}</span>
                            </div>
                            <span className="text-[11px] text-slate-400">{a.inspector} • {a.date}</span>
                          </div>

                          <div className="flex items-center gap-1 text-amber-400 font-bold">
                            <Star className="w-4 h-4 fill-current" />
                            <span>{a.score} / 5</span>
                          </div>
                        </div>

                        <p className="text-slate-300 text-[11px] bg-slate-900 p-2.5 rounded-xl border border-slate-800 italic">
                          "{a.notes}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}
        </>
      )}

    </div>
  );
};
