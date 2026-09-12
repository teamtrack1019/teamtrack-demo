import React, { useState, useEffect } from 'react';
import { useDemo } from '../../context/DemoContext';
import { 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  User, 
  Smartphone, 
  ShieldCheck, 
  Gauge, 
  Calendar, 
  Sparkles, 
  Check, 
  Radio, 
  Laptop, 
  Maximize2, 
  Minimize2, 
  LayoutDashboard, 
  Download, 
  Fuel, 
  Wrench, 
  AlertTriangle, 
  Camera, 
  FileSpreadsheet,
  Zap,
  BatteryCharging,
  Car
} from 'lucide-react';

export const FleetTrackProApp = ({ onBack }) => {
  const { triggerRestrictedAction, addToast } = useDemo();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [appMode, setAppMode] = useState('desktop'); // 'desktop' | 'mobile' | 'gps' | 'fuel'
  const [selectedVehicle, setSelectedVehicle] = useState('WÜ-TT-101 (Mercedes Sprinter)');
  
  // Abfahrtscheck items state
  const [checkItems, setCheckItems] = useState([
    { id: 1, label: 'Reifendruck & Profiltiefe (> 2.5mm)', done: true },
    { id: 2, label: 'Beleuchtung & Blinker rundum', done: true },
    { id: 3, label: 'Motorölstand & Wischwasser', done: true },
    { id: 4, label: 'Ladungssicherung & Verzurrgurte', done: false },
    { id: 5, label: 'Verbandskasten & Warnwesten (StVZO)', done: true }
  ]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const handleToggleCheck = (id) => {
    setCheckItems(prev => prev.map(c => c.id === id ? { ...c, done: !c.done } : c));
  };

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
            <Truck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-black text-white">FleetTrack Pro Suite</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                OBD-2 Live Telematik
              </span>
              {isFullscreen && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  ⛶ Vollbildansicht aktiv (Esc)
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              Fuhrparkmanagement, 100% Finanzamt-konformes Fahrtenbuch, TÜV-Warnsystem & Abfahrtscheck
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
              <span>1. FleetManager 360</span>
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
              <span>2. Abfahrtscheck-App</span>
            </button>

            <button
              onClick={() => setAppMode('gps')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                appMode === 'gps'
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>3. Live GPS Ortung</span>
            </button>

            <button
              onClick={() => setAppMode('fuel')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                appMode === 'fuel'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Fuel className="w-3.5 h-3.5" />
              <span>4. Tankbuch & CO2</span>
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
      {/* 1. DESKTOP FLEETMANAGER 360 */}
      {/* ========================================================================= */}
      {appMode === 'desktop' && (
        <div className="space-y-6 flex-1 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Flottenbestand</span>
                <Car className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-2">6 Fahrzeuge</div>
              <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                ✓ 100% einsatzbereit
              </div>
            </div>

            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>TÜV & UVV Fälligkeit</span>
                <Wrench className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-2">1 Fällig in 30T</div>
              <div className="text-[11px] text-amber-400 font-semibold mt-1">
                WÜ-TT-204 (TÜV Okt 2026)
              </div>
            </div>

            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Finanzamt-Fahrtenbuch</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2">100% Konform</div>
              <div className="text-[11px] text-slate-400 mt-1">
                Manipulationssicherer GPS-Log
              </div>
            </div>

            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Fahrtenbuch-Export</span>
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              </div>
              <button
                onClick={() => triggerRestrictedAction('Finanzamt Fahrtenbuch PDF/Excel Export', 'Lückenloser Export aller Dienst- & Privatfahrten zur Vorlage beim Finanzamt oder Steuerberater.')}
                className="mt-2 w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/20 cursor-pointer transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Finanzamt-PDF Export</span>
              </button>
            </div>
          </div>

          {/* Vehicle List Table */}
          <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4 bg-slate-900/80">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-black text-white">Fahrzeugübersicht & Telematik-Status</h3>
              <span className="text-xs text-slate-400 font-mono">Live OBD-2 Daten</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800">
                    <th className="pb-3 font-semibold">Kennzeichen & Modell</th>
                    <th className="pb-3 font-semibold">Fester Fahrer</th>
                    <th className="pb-3 font-semibold">Kilometerstand</th>
                    <th className="pb-3 font-semibold">Tank / Akku</th>
                    <th className="pb-3 font-semibold">Nächster TÜV / UVV</th>
                    <th className="pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    { id: 'WÜ-TT-101', model: 'Mercedes-Benz Sprinter 316 CDI', driver: 'Murat Demir', km: '142.850 km', fuel: '78% Diesel', tuv: '04/2027 (in 7 Mon)', status: '🟢 Aktiv (B27)', color: 'text-emerald-400' },
                    { id: 'WÜ-TT-204', model: 'VW Transporter T6.1', driver: 'Max Mustermann', km: '98.320 km', fuel: '45% Diesel', tuv: '10/2026 (Fällig bald)', status: '🟢 Aktiv (Baustelle)', color: 'text-amber-400' },
                    { id: 'WÜ-TT-305', model: 'Ford Transit Custom', driver: 'Jan Becker', km: '64.120 km', fuel: '92% Diesel', tuv: '09/2027 (in 12 Mon)', status: '🟢 Aktiv (Tour)', color: 'text-emerald-400' },
                    { id: 'WÜ-TT-402', model: 'Renault Master Kastenwagen', driver: 'Sarah Weber', km: '112.400 km', fuel: '60% Diesel', tuv: '02/2027 (in 5 Mon)', status: '🟢 Aktiv (Werkstatt)', color: 'text-emerald-400' },
                    { id: 'WÜ-TT-509', model: 'Mercedes eVito Elektro (100% EV)', driver: 'Elena Rostova', km: '28.900 km', fuel: '85% ⚡ 240km', tuv: '11/2027 (in 14 Mon)', status: '🟢 Aktiv (Klinikum)', color: 'text-emerald-400' }
                  ].map((v) => (
                    <tr key={v.id} className="hover:bg-slate-950/60 transition-colors">
                      <td className="py-3.5 font-bold text-white">
                        <div className="font-mono text-emerald-400">{v.id}</div>
                        <div className="text-[11px] text-slate-400 font-normal">{v.model}</div>
                      </td>
                      <td className="py-3.5 text-slate-300 font-semibold">{v.driver}</td>
                      <td className="py-3.5 font-mono text-white">{v.km}</td>
                      <td className="py-3.5 font-mono text-emerald-400">{v.fuel}</td>
                      <td className="py-3.5 text-slate-300">
                        <span className={v.tuv.includes('Fällig') ? 'text-amber-400 font-bold' : ''}>{v.tuv}</span>
                      </td>
                      <td className="py-3.5 font-bold text-[11px] text-emerald-400">{v.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. FAHRER ABFAHRTSCHECK APP */}
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
                  <span className="font-mono font-bold text-white">06:45 Uhr</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> DGUV V70 Vorschrift
                  </span>
                </div>

                <div className="bg-slate-800/70 p-3 rounded-2xl border border-slate-700/60">
                  <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">Fahrzeug-Prüfung</span>
                  <div className="text-xs font-bold text-white mt-0.5">WÜ-TT-101 • Mercedes Sprinter</div>
                  <div className="text-[10px] text-slate-400">Fahrer: Murat Demir</div>
                </div>

                {/* Checklist */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-300">Tägliche Sichtprüfung vor Abfahrt:</span>
                  {checkItems.map(c => (
                    <div 
                      key={c.id}
                      onClick={() => handleToggleCheck(c.id)}
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2 cursor-pointer hover:border-emerald-500/50 transition-all text-xs"
                    >
                      <span className={c.done ? 'text-slate-200' : 'text-slate-400'}>{c.label}</span>
                      <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border ${
                        c.done ? 'bg-emerald-600 border-emerald-500 text-white' : 'border-slate-700 bg-slate-900'
                      }`}>
                        {c.done && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setCheckItems(prev => prev.map(c => ({ ...c, done: true })));
                    addToast('Abfahrtskontrolle quittiert', 'DGUV V70 Prüfprotokoll digital im Fuhrpark abgelegt.', 'success');
                  }}
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Abfahrtscheck bestätigen & Motor starten</span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="glass-panel p-5 rounded-3xl border border-slate-800 shadow-xl space-y-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                DGUV V70 & Fuhrpark-Rechtssicherheit
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Gesetzliche Halterhaftung erfüllt:</strong> Jeder Fahrer führt die Pflicht-Prüfung morgens in 30 Sekunden durch.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Sofortige Schadensmeldung:</strong> Mängel werden per Foto erfasst und sofort der Werkstatt gemeldet.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. GPS & 4. TANKBUCH */}
      {/* ========================================================================= */}
      {(appMode === 'gps' || appMode === 'fuel') && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-6 flex-1">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-black text-white">Live GPS Ortung & Tankmanagement</h3>
            <span className="text-xs text-emerald-400 font-mono">100% OBD-2 Vernetzt</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <span className="text-slate-400 font-bold">Durchschnittsverbrauch Flotte</span>
              <div className="text-2xl font-black text-white font-mono">7.4 L / 100 km</div>
              <span className="text-emerald-400 text-[11px]">-8% durch Eco-Driving Coach</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <span className="text-slate-400 font-bold">CO2-Gesamtbilanz Monat</span>
              <div className="text-2xl font-black text-emerald-400 font-mono">1.42 Tonnen</div>
              <span className="text-slate-400 text-[11px]">CSRD Nachhaltigkeits-Zertifikat</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <span className="text-slate-400 font-bold">Diebstahlschutz & Geofence</span>
              <div className="text-2xl font-black text-emerald-400 font-mono">Aktiv (6 Zonen)</div>
              <span className="text-slate-400 text-[11px]">Push-Alarm bei unbefugter Bewegung</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
