import React, { useState, useEffect } from 'react';
import { useDemo } from '../../context/DemoContext';
import { 
  Play, 
  Square, 
  Pause, 
  MapPin, 
  Plus, 
  CheckCircle2, 
  Clock, 
  User, 
  Smartphone, 
  Send, 
  Camera, 
  ShieldCheck, 
  Truck, 
  Gauge, 
  Calendar, 
  Sparkles, 
  Navigation, 
  Check, 
  Radio, 
  Laptop, 
  Maximize2, 
  Minimize2, 
  LayoutDashboard, 
  Building2, 
  TrendingUp, 
  Download, 
  CheckCheck, 
  Route, 
  FileCheck2, 
  PhoneCall, 
  PenTool, 
  AlertTriangle,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

export const DispoTrackProApp = ({ onBack }) => {
  const { data, addItem, triggerRestrictedAction, addToast } = useDemo();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [appMode, setAppMode] = useState('desktop'); // 'desktop' | 'mobile' | 'radar' | 'cockpit'
  const [selectedDriver, setSelectedDriver] = useState('Murat Demir');
  const [selectedTour, setSelectedTour] = useState('Tour Nord-1 (Express Würzburg)');
  const [signatureDone, setSignatureDone] = useState(false);
  const [activeStopIndex, setActiveStopIndex] = useState(1);

  // Tour stops state
  const [stops, setStops] = useState([
    { id: 1, title: 'Warenaufnahme Zentrallager Würzburg', client: 'TeamTrack Logistik Hub', address: 'Nürnberger Str. 45, Würzburg', time: '07:00 Uhr', status: 'Erledigt', packageCount: '12 Paletten', notes: 'Frühschicht Lieferschein #9821' },
    { id: 2, title: 'Materiallieferung & Rohbau-Abnahme', client: 'Huber Bauunternehmung GmbH', address: 'Würzburg-Nord Bauabschnitt 2', time: '09:30 Uhr', status: 'In Anfahrt', packageCount: '4 Großkisten', notes: 'Ansprechpartner vor Ort: Herr Huber' },
    { id: 3, title: 'Kabelpritschen & Unterverteilung', client: 'Bürokomplex Randersacker', address: 'Klosterweg 12, Randersacker', time: '13:00 Uhr', status: 'Geplant', packageCount: '2 Rollen', notes: 'Zufahrt über Lieferantentor B' },
    { id: 4, title: 'Rückholung Mietgeräte & Leergebinde', client: 'Klinikum Würzburg', address: 'Josef-Schneider-Str. 2, Würzburg', time: '15:30 Uhr', status: 'Geplant', packageCount: '1 Palette', notes: 'Rückgabeschein unterschreiben lassen' }
  ]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const handleCompleteStop = (stopId) => {
    setStops(prev => prev.map(s => s.id === stopId ? { ...s, status: 'Erledigt' } : s));
    setActiveStopIndex(prev => prev + 1);
    setSignatureDone(false);
    addToast('Stopp erfolgreich abgeschlossen', `Lieferschein digital signiert und GPS-Stempel hinterlegt.`, 'success');
  };

  return (
    <div className={`transition-all duration-300 ${
      isFullscreen 
        ? 'fixed inset-0 z-50 bg-slate-950 p-4 sm:p-6 overflow-y-auto w-full h-full flex flex-col' 
        : 'space-y-6 w-full animate-in fade-in duration-300'
    }`}>
      
      {/* Top Navigation & App Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-sky-500/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-slate-900/90 shadow-2xl shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/30 shrink-0">
            <Route className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-black text-white">DispoTrack Pro Suite</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Touren- & Flotten-Leitstand
              </span>
              {isFullscreen && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  ⛶ Vollbildansicht aktiv (Esc)
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              Einsatzdisposition, Tourenoptimierung, Live-Fahrer-Navigation & digitaler Lieferschein
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
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>1. Dispo-Leitstand</span>
            </button>

            <button
              onClick={() => setAppMode('mobile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                appMode === 'mobile'
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>2. Fahrer-App</span>
            </button>

            <button
              onClick={() => setAppMode('radar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                appMode === 'radar'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>3. Live-Radar</span>
            </button>

            <button
              onClick={() => setAppMode('cockpit')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                appMode === 'cockpit'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>4. Tour-Cockpit</span>
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
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4 text-sky-400" />}
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
      {/* 1. DISPO-LEITSTAND DESKTOP VIEW */}
      {/* ========================================================================= */}
      {appMode === 'desktop' && (
        <div className="space-y-6 flex-1 animate-in fade-in duration-200">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Touren in Ausführung</span>
                <Truck className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-2">4 Touren Aktiv</div>
              <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                ✓ 18 von 24 Stopps pünktlich
              </div>
            </div>

            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Fahrleistung Heute</span>
                <Gauge className="w-4 h-4 text-brand-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-brand-400 mt-2">342 km</div>
              <div className="text-[11px] text-slate-400 mt-1">
                Ø 1.2h pro Einsatzort
              </div>
            </div>

            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Touren-Optimierung</span>
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2">-18% CO2</div>
              <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                KI-Routenoptimierung aktiv
              </div>
            </div>

            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Touren-Export & Lieferscheine</span>
                <Download className="w-4 h-4 text-indigo-400" />
              </div>
              <button
                onClick={() => triggerRestrictedAction('Touren-Export & Lieferschein-Archiv', 'Alle Tourenprotokolle und unterschriebenen Kunden-Lieferscheine werden als revisionssicheres PDF archiviert.')}
                className="mt-2 w-full py-2 px-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-sky-600/20 cursor-pointer transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF Tourenplan exportieren</span>
              </button>
            </div>
          </div>

          {/* Active Tours Management Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 4 Cols: Available Teams & Dispatch Control */}
            <div className="lg:col-span-4 space-y-6">
              <div className="glass-panel p-5 rounded-3xl border border-slate-800 shadow-xl space-y-4 bg-slate-900/80">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-sky-400" />
                    <h3 className="text-sm font-bold text-white">Fahrer & Fahrzeugzuweisung</h3>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">4 Fahrer</span>
                </div>

                <div className="space-y-3">
                  {[
                    { name: 'Murat Demir', vehicle: 'Mercedes Sprinter (WÜ-TT-101)', tour: 'Tour Nord (Würzburg Express)', status: '🟢 Unterwegs', stops: '3/4 erledigt' },
                    { name: 'Max Mustermann', vehicle: 'VW Transporter (WÜ-TT-204)', tour: 'Montage-Tour Süd', status: '🟢 Vor Ort', stops: '2/3 erledigt' },
                    { name: 'Jan Becker', vehicle: 'Ford Transit (WÜ-TT-305)', tour: 'Baustellen-Logistik', status: '🟢 Unterwegs', stops: '1/2 erledigt' },
                    { name: 'Sarah Weber', vehicle: 'Werkstatt-Wagen (WÜ-TT-402)', tour: 'Elektro-Service Tour', status: '🟢 Vor Ort', stops: '4/4 erledigt' }
                  ].map((d, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{d.name}</span>
                        <span className="text-emerald-400 font-bold text-[10px]">{d.status}</span>
                      </div>
                      <div className="text-slate-400 text-[11px]">{d.vehicle}</div>
                      <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px]">
                        <span className="text-sky-300 font-semibold">{d.tour}</span>
                        <span className="text-slate-400 font-mono">{d.stops}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 8 Cols: Interactive Route Schedule */}
            <div className="lg:col-span-8 glass-panel p-5 sm:p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4 bg-slate-900/80">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <Route className="w-4 h-4 text-sky-400" />
                    Heutige Einsatz-Stopps ({selectedTour})
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Fahrer: <strong>{selectedDriver}</strong> • Status wird sekundengenau synchronisiert
                  </p>
                </div>

                <button
                  onClick={() => {
                    setStops(prev => prev.map(s => ({ ...s, status: 'Erledigt' })));
                    addToast('Alle Tour-Stopps quittiert', 'Alle 4 Lieferscheine digital abgeschlossen.', 'success');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-sky-600/20 cursor-pointer transition-all"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Alle Stopps freigeben</span>
                </button>
              </div>

              <div className="space-y-3">
                {stops.map((stop, idx) => (
                  <div key={stop.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                          stop.status === 'Erledigt' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          stop.status === 'In Anfahrt' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30 animate-pulse' :
                          'bg-slate-800 text-slate-400'
                        }`}>
                          {stop.id}
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm">{stop.title}</div>
                          <div className="text-xs text-slate-400">{stop.client} • {stop.address}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <span className="text-xs font-mono font-bold text-sky-300">{stop.time}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          stop.status === 'Erledigt' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          stop.status === 'In Anfahrt' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' :
                          'bg-slate-800 text-slate-400'
                        }`}>
                          {stop.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                      <span>Ladegut: <strong className="text-white">{stop.packageCount}</strong></span>
                      <span className="italic">"{stop.notes}"</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. FAHRER SMARTPHONE APP VIEW */}
      {/* ========================================================================= */}
      {appMode === 'mobile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start flex-1">
          <div className="lg:col-span-7 flex justify-center w-full">
            <div className="w-full max-w-md bg-slate-950 rounded-[40px] p-3 sm:p-4 border-4 border-slate-800 shadow-2xl shadow-sky-950/40 relative overflow-hidden">
              {/* Speaker notch */}
              <div className="w-32 h-5 bg-slate-900 rounded-full mx-auto mb-3 flex items-center justify-center gap-2 border border-slate-800">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-800"></div>
                <div className="w-8 h-1 rounded-full bg-slate-800"></div>
              </div>

              {/* Screen */}
              <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-[30px] p-3.5 sm:p-5 border border-slate-800 space-y-3.5 text-white overflow-hidden">
                <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/80 pb-2">
                  <span className="font-mono font-bold text-white">09:30 Uhr</span>
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <Radio className="w-3 h-3 animate-pulse" /> Live Tour Navigation
                  </span>
                </div>

                {/* Driver header */}
                <div className="bg-slate-800/70 p-3 rounded-2xl border border-slate-700/60 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className="w-9 h-9 rounded-full bg-sky-600 flex items-center justify-center text-white font-black text-xs border border-sky-400 shadow-md shrink-0">
                      MD
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] text-sky-300 font-semibold uppercase tracking-wider">Fahrer</div>
                      <div className="text-xs font-bold text-white truncate">Murat Demir</div>
                      <div className="text-[10px] text-slate-400 truncate">Mercedes Sprinter (WÜ-TT-101)</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                    🟢 Tour läuft
                  </span>
                </div>

                {/* Current Active Stop Card */}
                <div className="bg-gradient-to-br from-sky-950/60 to-slate-900 p-4 rounded-3xl border border-sky-500/40 space-y-3 shadow-lg">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-sky-300 font-bold uppercase tracking-wider text-[10px]">Aktueller Stopp (2 von 4)</span>
                    <span className="text-emerald-400 font-bold font-mono">Pünktlich (09:30 Uhr)</span>
                  </div>

                  <div>
                    <h4 className="text-base font-black text-white">Huber Bauunternehmung GmbH</h4>
                    <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      Würzburg-Nord Bauabschnitt 2
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Auftrag:</span>
                      <strong className="text-white">Materiallieferung 4 Großkisten</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Kontakt:</span>
                      <span className="text-sky-400">Herr Huber (+49 171 987654)</span>
                    </div>
                  </div>

                  {/* 1-Click Navigation */}
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-600/30 transition-all block text-center"
                  >
                    <Navigation className="w-4 h-4 inline" />
                    <span>In Google Maps öffnen ↗</span>
                  </a>
                </div>

                {/* Customer Signature Box Simulator */}
                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300 flex items-center gap-1">
                      <PenTool className="w-3.5 h-3.5 text-brand-400" /> Digitale Kunden-Unterschrift:
                    </span>
                    {signatureDone ? (
                      <span className="text-[10px] text-emerald-400 font-bold">Unterschrieben ✓</span>
                    ) : (
                      <span className="text-[10px] text-amber-400 font-bold">Ausstehend</span>
                    )}
                  </div>

                  <div 
                    onClick={() => setSignatureDone(true)}
                    className="h-20 rounded-xl bg-slate-900 border border-dashed border-slate-700 flex items-center justify-center cursor-pointer hover:border-sky-500 transition-all p-2 text-center"
                  >
                    {signatureDone ? (
                      <div className="font-serif italic text-xl text-sky-400 font-bold">
                        H. Huber (Bauleiter)
                      </div>
                    ) : (
                      <span className="text-xs text-slate-500">Hier tippen zur Unterschrift-Simulation</span>
                    )}
                  </div>

                  <button
                    disabled={!signatureDone}
                    onClick={() => handleCompleteStop(2)}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                      signatureDone 
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 cursor-pointer' 
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Stopp abschließen & Lieferschein senden</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Tour Summary */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-panel p-5 rounded-3xl border border-slate-800 shadow-xl space-y-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400" />
                Vorteile der DispoTrack Fahrer-App
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>100% Papierlos:</strong> Keine verlorenen Lieferscheine mehr – Kunde unterschreibt direkt auf dem Smartphone.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Echtzeit-Status für die Zentrale:</strong> Disponent sieht sofort, wenn ein Stopp erledigt wurde.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Automatischer Rechnungsanstoß:</strong> Unterschriebener Lieferschein landet sofort im Rechnungsmodul.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. LIVE-RADAR & 4. TOUR-COCKPIT */}
      {/* ========================================================================= */}
      {(appMode === 'radar' || appMode === 'cockpit') && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-6 flex-1">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-black text-white">Live Touren-Flottenradar & Geofencing</h3>
            <span className="text-xs text-emerald-400 font-mono">4 Fahrzeuge online</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: 'WÜ-TT-101', driver: 'Murat Demir', speed: '62 km/h', loc: 'B27 Würzburg Nord', dest: 'Huber Bauunternehmung', eta: 'In 4 Min' },
              { id: 'WÜ-TT-204', driver: 'Max Mustermann', speed: '0 km/h (Motor aus)', loc: 'Baustelle Süd', dest: 'Rohbau Abnahme', eta: 'Vor Ort' },
              { id: 'WÜ-TT-305', driver: 'Jan Becker', speed: '45 km/h', loc: 'Klosterweg Randersacker', dest: 'Bürokomplex', eta: 'In 12 Min' },
              { id: 'WÜ-TT-402', driver: 'Sarah Weber', speed: '0 km/h (Standort)', loc: 'Klinikum Würzburg', dest: 'Elektro-Wartung', eta: 'Vor Ort' }
            ].map((v, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sky-400">{v.id}</span>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800">
                    {v.speed}
                  </span>
                </div>
                <div className="font-bold text-white">{v.driver}</div>
                <div className="text-[11px] text-slate-400">📍 {v.loc}</div>
                <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px]">
                  <span className="text-slate-300">Ziel: {v.dest}</span>
                  <span className="text-sky-300 font-bold">{v.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
