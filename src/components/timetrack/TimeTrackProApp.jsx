import React, { useState, useEffect } from 'react';
import { useDemo } from '../../context/DemoContext';
import { 
  Play, 
  Square, 
  Pause, 
  RotateCcw, 
  MapPin, 
  Plus, 
  CheckCircle2, 
  Clock, 
  User, 
  Smartphone, 
  Send, 
  Camera, 
  Coffee, 
  AlertCircle, 
  ShieldCheck, 
  Truck, 
  Hammer, 
  ShieldAlert, 
  Gauge, 
  QrCode, 
  Layers, 
  Table, 
  MonitorCheck, 
  Key,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  Navigation,
  Check,
  Calendar,
  FileText,
  FileSpreadsheet,
  Sun,
  Moon,
  Activity,
  Award,
  Zap,
  Radio,
  Sliders,
  ExternalLink,
  Laptop
} from 'lucide-react';

export const TimeTrackProApp = ({ onBack }) => {
  const { 
    data, 
    addItem, 
    triggerRestrictedAction, 
    openUpgradeModal,
    addToast 
  } = useDemo();

  // App Modes: 'mobile' (Smartphone PWA) | 'kiosk' (Tablet-Terminal) | 'meister' (Büro Cockpit)
  const [appMode, setAppMode] = useState('mobile');

  // Selected Employee for Mobile View
  const [selectedEmp, setSelectedEmp] = useState('Max Mustermann');
  
  // Mobile Punch Clock Live State
  const [punchStatus, setPunchStatus] = useState('working'); // 'working' | 'break' | 'drive' | 'off'
  const [elapsedSeconds, setElapsedSeconds] = useState(2 * 3600 + 45 * 60 + 20); // 2h 45m 20s
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedProject, setSelectedProject] = useState('Neubau Wohnpark Würzburg-Nord');
  const [selectedActivity, setSelectedActivity] = useState('Rohbau & Montage');
  
  // Today's punches log
  const [punches, setPunches] = useState([
    { id: 1, type: 'Kommen', time: '07:30', project: 'Neubau Wohnpark Würzburg-Nord', location: 'Würzburg (GPS: 49.7913° N, 9.9534° E)', status: 'Verifiziert' },
    { id: 2, type: 'Pause Start', time: '12:00', project: 'Pausenbereich Baucontainer', location: 'Würzburg (GPS verifiziert)', status: 'Verifiziert' },
    { id: 3, type: 'Pause Ende', time: '12:30', project: 'Neubau Wohnpark Würzburg-Nord', location: 'Würzburg (GPS verifiziert)', status: 'Verifiziert' }
  ]);

  // Photo & Note modal state
  const [noteText, setNoteText] = useState('');
  const [photoCount, setPhotoCount] = useState(2);
  const [showPhotoSuccess, setShowPhotoSuccess] = useState(false);

  // Kiosk PIN Pad State
  const [pinCode, setPinCode] = useState('');
  const [kioskFeedback, setKioskFeedback] = useState(null);

  // Live Clock Ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (punchStatus === 'working' || punchStatus === 'drive') {
        setElapsedSeconds(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [punchStatus]);

  // Format Elapsed Time HH:MM:SS
  const formatElapsed = (totalSec) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const employees = data.employees || [
    { id: 'EMP-01', name: 'Max Mustermann', role: 'Bauleiter / Meister', hourlyRate: 75.0 },
    { id: 'EMP-02', name: 'Sarah Weber', role: 'Elektro-Technikerin', hourlyRate: 68.0 },
    { id: 'EMP-03', name: 'Jan Becker', role: 'Monteur & Handwerker', hourlyRate: 62.0 },
    { id: 'EMP-04', name: 'Murat Demir', role: 'LKW- & Berufskraftfahrer (VO 561)', hourlyRate: 64.0 },
    { id: 'EMP-05', name: 'Elena Rostova', role: 'Objektleiterin Gebäudereinigung', hourlyRate: 58.0 }
  ];

  const currentEmpData = employees.find(e => e.name === selectedEmp) || employees[0];
  const isDriver = currentEmpData.role?.includes('LKW') || currentEmpData.role?.includes('Fahrer');

  // Handle Punch Actions
  const handlePunch = (type, newStatus) => {
    const timeStr = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    const newEntry = {
      id: punches.length + 1,
      type,
      time: timeStr,
      project: selectedProject,
      location: 'GPS Live: 49.7913° N, 9.9534° E (Toleranz: 3m)',
      status: 'Verifiziert'
    };
    setPunches([newEntry, ...punches]);
    setPunchStatus(newStatus);
    addToast(`Stempelung: ${type}`, `Um ${timeStr} Uhr für ${selectedEmp} erfolgreich gebucht.`, 'success');
  };

  // Handle Photo Capture
  const handleCapturePhoto = () => {
    setPhotoCount(prev => prev + 1);
    setShowPhotoSuccess(true);
    setTimeout(() => setShowPhotoSuccess(false), 3000);
    addToast('Bautagebuch-Foto gespeichert', 'GPS-Standortstempel & Uhrzeit wasserfest eingebettet.', 'success');
  };

  // Handle Kiosk PIN Keypad
  const handlePinPress = (num) => {
    if (pinCode.length < 4) {
      const nextPin = pinCode + num;
      setPinCode(nextPin);
      if (nextPin.length === 4) {
        // Evaluate PIN
        const emp = employees[parseInt(nextPin) % employees.length] || employees[0];
        setKioskFeedback({
          name: emp.name,
          role: emp.role,
          time: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
          type: 'Kommen gebucht'
        });
        setTimeout(() => {
          setPinCode('');
          setKioskFeedback(null);
        }, 4000);
      }
    }
  };

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-300">
      
      {/* Top App Bar & Navigation */}
      <div className="glass-panel p-4 rounded-2xl border border-brand-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900/90 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white">TimeTrack Pro Suite</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Live PWA Simulator
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Vollständige mobile Zeiterfassungs-Applikation für Baustelle, Handwerk, Logistik & Büro
            </p>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800 w-full md:w-auto overflow-x-auto">
          <button
            onClick={() => setAppMode('mobile')}
            className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              appMode === 'mobile'
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>1. Smartphone App</span>
          </button>

          <button
            onClick={() => setAppMode('kiosk')}
            className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              appMode === 'kiosk'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <MonitorCheck className="w-3.5 h-3.5" />
            <span>2. Werkstatt-Terminal</span>
          </button>

          <button
            onClick={() => setAppMode('meister')}
            className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              appMode === 'meister'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>3. Meister Live-Cockpit</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. SMARTPHONE MOBILE APP VIEW */}
      {/* ========================================================================= */}
      {appMode === 'mobile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left / Center: Interactive Smartphone Container */}
          <div className="lg:col-span-7 flex justify-center w-full">
            <div className="w-full max-w-md bg-slate-950 rounded-[40px] p-3 sm:p-4 border-4 border-slate-800 shadow-2xl shadow-brand-950/40 relative overflow-hidden">
              
              {/* Smartphone Speaker & Camera Notch */}
              <div className="w-32 h-5 bg-slate-900 rounded-full mx-auto mb-3 flex items-center justify-center gap-2 border border-slate-800">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-800"></div>
                <div className="w-8 h-1 rounded-full bg-slate-800"></div>
              </div>

              {/* Smartphone Screen Content */}
              <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-[30px] p-3.5 sm:p-5 border border-slate-800 space-y-3.5 text-white overflow-hidden">
                
                {/* Mobile Top Status Bar */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/80 pb-2">
                  <div className="flex items-center gap-1 font-mono font-bold text-white">
                    <span>{currentTime.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-emerald-400 font-bold">
                      <Radio className="w-3 h-3 animate-pulse" /> 5G / GPS
                    </span>
                    <span>100% 🔋</span>
                  </div>
                </div>

                {/* Worker Profile Switcher & Greeting */}
                <div className="bg-slate-800/70 p-3 rounded-2xl border border-slate-700/60 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div className="w-9 h-9 rounded-full bg-brand-600 flex items-center justify-center text-white font-black text-xs border border-brand-400 shadow-md shrink-0">
                        {selectedEmp.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] text-brand-300 font-semibold uppercase tracking-wider">Mitarbeiter</div>
                        <div className="text-xs font-bold text-white truncate">{selectedEmp}</div>
                        <div className="text-[10px] text-slate-400 truncate">{currentEmpData.role}</div>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider block whitespace-nowrap ${
                        punchStatus === 'working' 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : punchStatus === 'break'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : punchStatus === 'drive'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {punchStatus === 'working' && '🟢 Am Arbeiten'}
                        {punchStatus === 'break' && '🟡 In Pause'}
                        {punchStatus === 'drive' && '🔵 Fahrt'}
                        {punchStatus === 'off' && '⚪ Feierabend'}
                      </span>
                    </div>
                  </div>

                  {/* Switcher dropdown row */}
                  <div className="pt-2 border-t border-slate-700/50 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-slate-400 font-semibold shrink-0">Profil wechseln:</span>
                    <select
                      value={selectedEmp}
                      onChange={(e) => setSelectedEmp(e.target.value)}
                      className="bg-slate-900 text-slate-200 font-semibold text-[11px] rounded-lg px-2 py-1 border border-slate-700 focus:ring-1 focus:ring-brand-500 cursor-pointer w-full max-w-[200px] truncate"
                    >
                      {employees.map(e => (
                        <option key={e.id} value={e.name}>{e.name} ({e.role?.split('/')[0]})</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* GPS Location & Project Radar */}
                <div className="bg-slate-950/90 p-3 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" /> GPS-Standortverifikation:
                    </span>
                    <span className="text-[11px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800">
                      ✓ Im Baustellen-Radius
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white">
                    {selectedProject}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Gewerk: {selectedActivity}</span>
                    <span className="text-brand-400 font-mono">Toleranz: 3m</span>
                  </div>
                </div>

                {/* Live Timer Circle Widget */}
                <div className="bg-gradient-to-b from-slate-800/80 to-slate-900 p-5 rounded-3xl border border-slate-700 text-center space-y-2 relative overflow-hidden shadow-inner">
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    {punchStatus === 'working' ? 'Aktive Arbeitszeit heute' : punchStatus === 'break' ? 'Pausenzeit läuft' : 'Gesamtzeit heute'}
                  </div>
                  
                  <div className="font-mono text-4xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-white to-brand-400 animate-pulse">
                    {formatElapsed(elapsedSeconds)}
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center justify-center gap-2 pt-1">
                    <span>Start: <strong className="text-white font-mono">07:30 Uhr</strong></span>
                    <span>•</span>
                    <span>Pausen: <strong className="text-amber-400 font-mono">30 Min</strong></span>
                  </div>
                </div>

                {/* Big Punch Action Buttons */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <button
                    onClick={() => handlePunch('Arbeitsbeginn (Kommen)', 'working')}
                    className={`p-3.5 rounded-2xl font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all cursor-pointer shadow-lg ${
                      punchStatus === 'working'
                        ? 'bg-emerald-600/30 border-2 border-emerald-400 text-emerald-300 shadow-emerald-900/30'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                    }`}
                  >
                    <Play className="w-5 h-5 fill-current" />
                    <span>Kommen (Start)</span>
                  </button>

                  <button
                    onClick={() => handlePunch('Pause gebucht', punchStatus === 'break' ? 'working' : 'break')}
                    className={`p-3.5 rounded-2xl font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all cursor-pointer shadow-lg ${
                      punchStatus === 'break'
                        ? 'bg-amber-600/30 border-2 border-amber-400 text-amber-300 shadow-amber-900/30'
                        : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30'
                    }`}
                  >
                    <Coffee className="w-5 h-5" />
                    <span>{punchStatus === 'break' ? 'Pause beenden' : 'Pause (30 Min)'}</span>
                  </button>

                  <button
                    onClick={() => handlePunch('Dienstgang / Fahrt', 'drive')}
                    className={`p-3.5 rounded-2xl font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all cursor-pointer shadow-lg ${
                      punchStatus === 'drive'
                        ? 'bg-blue-600/30 border-2 border-blue-400 text-blue-300 shadow-blue-900/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <Truck className="w-5 h-5 text-blue-400" />
                    <span>Fahrt / Rüstzeit</span>
                  </button>

                  <button
                    onClick={() => handlePunch('Feierabend (Gehen)', 'off')}
                    className="p-3.5 rounded-2xl font-bold text-xs flex flex-col items-center justify-center gap-1 bg-rose-600 hover:bg-rose-500 text-white transition-all cursor-pointer shadow-lg shadow-rose-600/30"
                  >
                    <Square className="w-5 h-5 fill-current" />
                    <span>Feierabend (Stopp)</span>
                  </button>
                </div>

                {/* Driver Tachograph Mode (EU-VO 561) if Driver */}
                {isDriver && (
                  <div className="bg-slate-950 p-3.5 rounded-2xl border border-blue-500/30 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-blue-400 font-bold flex items-center gap-1">
                        <Gauge className="w-3.5 h-3.5" /> LKW Lenkzeit (VO 561/2006)
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">3h 15m / max 4h 30m</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full transition-all" style={{ width: '72%' }}></div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Restlenkzeit bis Pause: <strong className="text-amber-400">01h 15m</strong></span>
                      <span className="text-emerald-400">Tagesruhezeit OK</span>
                    </div>
                  </div>
                )}

                {/* Quick Field Tools (Photo Bautagebuch, Absence, eAU) */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <button
                    onClick={handleCapturePhoto}
                    className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 flex flex-col items-center justify-center gap-1 text-[11px] font-bold text-slate-200 transition-all cursor-pointer"
                  >
                    <Camera className="w-4 h-4 text-brand-400" />
                    <span>Foto-Beleg ({photoCount})</span>
                  </button>

                  <button
                    onClick={() => triggerRestrictedAction('Digitaler Urlaubsantrag', 'Mitarbeiter können Urlaub direkt in der Smartphone-App beantragen und erhalten sofort eine Benachrichtigung bei Genehmigung.')}
                    className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 flex flex-col items-center justify-center gap-1 text-[11px] font-bold text-slate-200 transition-all cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <span>Urlaub</span>
                  </button>

                  <button
                    onClick={() => triggerRestrictedAction('eAU Krankmeldung', 'Ärztliche AU-Bescheinigungen per Smartphone-Foto hochladen. Das Büro wird automatisch in Echtzeit informiert.')}
                    className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 flex flex-col items-center justify-center gap-1 text-[11px] font-bold text-slate-200 transition-all cursor-pointer"
                  >
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <span>Krankmeldung</span>
                  </button>
                </div>

                {/* Photo feedback notification */}
                {showPhotoSuccess && (
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Foto mit GPS-Wasserzeichen gespeichert!</span>
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* Right Column: Live Punch Log & Features Summary */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Live Today's Log */}
            <div className="glass-panel p-5 rounded-3xl border border-slate-800 shadow-xl space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-400" />
                  <h3 className="text-sm font-black text-white">Heutiges Stempel-Protokoll</h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">{punches.length} Buchungen</span>
              </div>

              <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                {punches.map(p => (
                  <div key={p.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3 text-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{p.type}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {p.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">{p.project}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{p.location}</div>
                    </div>
                    <div className="font-mono font-black text-brand-400 text-sm">
                      {p.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Clients Love This PWA */}
            <div className="glass-panel p-5 rounded-3xl border border-slate-800 shadow-xl space-y-3 bg-gradient-to-br from-slate-900 to-slate-950">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Vorteile für Ihre Mitarbeiter vor Ort
              </h3>
              
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Kein App Store Download nötig:</strong> Läuft sofort als PWA auf jedem iPhone & Android.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>100% Offline-Fähig:</strong> Stempeln funktioniert auch in Tiefgaragen oder Funklöchern ohne Netz.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Automatische GPS-Sicherheit:</strong> Kein Missbrauch – Standort wird nur beim Klick auf Stempeln geprüft.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Direkte Übergabe zur Abrechnung:</strong> Alle Zeiten stehen dem Büro sofort für Lohn & DATEV bereit.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. TABLET / KIOSK WERKSTATT-TERMINAL VIEW */}
      {/* ========================================================================= */}
      {appMode === 'kiosk' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 shadow-2xl space-y-6 max-w-3xl mx-auto bg-slate-950">
          
          <div className="text-center space-y-1 pb-4 border-b border-slate-800">
            <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Stationäres Wand-Terminal / Tablet
            </span>
            <h3 className="text-2xl font-black text-white">Werkstatt- & Hallen-Terminal</h3>
            <p className="text-xs text-slate-400">
              Mitarbeiter stempeln morgens beim Betreten der Werkstatt per 4-stelliger PIN oder RFID/NFC Chip.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Left: PIN Pad & RFID Scanner */}
            <div className="space-y-4">
              
              {/* PIN Screen Indicator */}
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center space-y-2">
                <span className="text-xs text-slate-400 font-semibold">Mitarbeiter-PIN eingeben:</span>
                <div className="flex items-center justify-center gap-3">
                  {[0, 1, 2, 3].map(idx => (
                    <div
                      key={idx}
                      className={`w-5 h-5 rounded-full border-2 transition-all ${
                        pinCode.length > idx 
                          ? 'bg-purple-500 border-purple-400 scale-110 shadow-lg shadow-purple-500/50' 
                          : 'border-slate-700 bg-slate-950'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              {/* 3x4 PIN Keypad */}
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                  <button
                    key={num}
                    onClick={() => handlePinPress(num.toString())}
                    className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-lg border border-slate-800 transition-all cursor-pointer active:scale-95 shadow-md"
                  >
                    {num}
                  </button>
                ))}
                
                <button
                  onClick={() => setPinCode('')}
                  className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-rose-400 font-bold text-xs border border-slate-800 transition-all cursor-pointer"
                >
                  Löschen
                </button>

                <button
                  onClick={() => handlePinPress('0')}
                  className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-lg border border-slate-800 transition-all cursor-pointer active:scale-95 shadow-md"
                >
                  0
                </button>

                <button
                  onClick={() => handlePinPress('5')}
                  className="p-4 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs border border-purple-500 transition-all cursor-pointer shadow-lg shadow-purple-500/30"
                >
                  OK
                </button>
              </div>

              {/* RFID Quick Simulator */}
              <button
                onClick={() => {
                  setKioskFeedback({
                    name: 'Sarah Weber',
                    role: 'Elektro-Technikerin',
                    time: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
                    type: 'RFID-Chip erkannt • Kommen gebucht'
                  });
                  setTimeout(() => setKioskFeedback(null), 4000);
                  addToast('RFID-Chip gescannt', 'Mitarbeiterin Sarah Weber erfolgreich eingestempelt.', 'success');
                }}
                className="w-full py-3 rounded-2xl bg-purple-950/80 hover:bg-purple-900/80 border border-purple-500/40 text-purple-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg"
              >
                <Key className="w-4 h-4 text-purple-400" />
                <span>🔑 RFID-Mitarbeiterchip anhalten (Simulation)</span>
              </button>

            </div>

            {/* Right: Terminal Live Status & Feedback */}
            <div className="space-y-4">
              
              {kioskFeedback ? (
                <div className="p-6 rounded-3xl bg-emerald-950/60 border-2 border-emerald-500 text-center space-y-3 animate-in zoom-in-95">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white">Guten Morgen, {kioskFeedback.name}!</h4>
                    <p className="text-xs text-emerald-400 font-semibold mt-1">{kioskFeedback.type}</p>
                    <p className="text-xs text-slate-400 font-mono mt-1">Uhrzeit: {kioskFeedback.time} Uhr</p>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto border border-purple-500/20">
                    <MonitorCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Terminal betriebsbereit</h4>
                  <p className="text-xs text-slate-400">
                    Geben Sie Ihre PIN ein oder halten Sie Ihren RFID-Schlüsselanhänger an den Leser.
                  </p>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <span className="text-slate-400 font-bold block pb-1 border-b border-slate-800">Terminal-Spezifikationen:</span>
                <div className="flex justify-between text-slate-300">
                  <span>Standort:</span>
                  <span className="font-bold text-white">Hauptwerkstatt Würzburg</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Hardware-Support:</span>
                  <span className="font-bold text-white">iPad / Android Tablet / Elo Touch</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Datenspeicherung:</span>
                  <span className="text-emerald-400 font-bold">DSGVO-Konform (Offline Puffer)</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. MEISTER / BÜRO LIVE-MONITOR COCKPIT */}
      {/* ========================================================================= */}
      {appMode === 'meister' && (
        <div className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="glass-panel p-4 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold">Mitarbeiter im Dienst</span>
              <div className="text-2xl font-black text-white mt-1">4 / 5 aktiv</div>
              <span className="text-[11px] text-emerald-400">80% Anwesenheitsquote</span>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold">Gesamtstunden heute</span>
              <div className="text-2xl font-black text-brand-400 mt-1">31.5 Std.</div>
              <span className="text-[11px] text-slate-400">Ø 7.8 Std. pro Fachkraft</span>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold">Wertschöpfung heute</span>
              <div className="text-2xl font-black text-emerald-400 mt-1">2.142,00 €</div>
              <span className="text-[11px] text-slate-400">Bereit für Rechnungsstellung</span>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold">Lohn- & DATEV Export</span>
              <button
                onClick={() => triggerRestrictedAction('DATEV Lohnexport', 'Alle Stundenzettel werden vollautomatisch für Ihren Steuerberater oder Lohnbuchhaltung aufbereitet.')}
                className="mt-2 w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span>DATEV Export ↗</span>
              </button>
            </div>
          </div>

          {/* Live Table of All Active Workers */}
          <div className="glass-panel p-5 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-black text-white">Live-Status aller Mitarbeiter</h3>
              <span className="text-xs text-slate-400 font-mono">Echtzeit-Synchronisation</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800">
                    <th className="pb-3 font-semibold">Mitarbeiter</th>
                    <th className="pb-3 font-semibold">Gewerk / Rolle</th>
                    <th className="pb-3 font-semibold">Aktueller Status</th>
                    <th className="pb-3 font-semibold">Einsatzort (GPS)</th>
                    <th className="pb-3 font-semibold">Stunden heute</th>
                    <th className="pb-3 font-semibold text-right">Aktion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {employees.map((emp, i) => {
                    const statusConfig = [
                      { status: '🟢 Arbeitet (Baustelle)', color: 'text-emerald-400', location: 'Neubau Würzburg-Nord', hours: '6.5 h' },
                      { status: '🟢 Arbeitet (Elektro)', color: 'text-emerald-400', location: 'Bürokomplex Randersacker', hours: '6.0 h' },
                      { status: '🟡 Pause (30 Min)', color: 'text-amber-400', location: 'Bürokomplex Randersacker', hours: '5.0 h' },
                      { status: '🔵 Auf Tour / LKW', color: 'text-blue-400', location: 'B27 Richtung Schweinfurt', hours: '7.0 h' },
                      { status: '🟢 Objektprüfung', color: 'text-emerald-400', location: 'Klinikum Würzburg', hours: '7.0 h' }
                    ][i % 5];

                    return (
                      <tr key={emp.id} className="hover:bg-slate-900/60 transition-colors">
                        <td className="py-3 font-bold text-white flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-slate-800 text-brand-400 font-black flex items-center justify-center text-[10px]">
                            {emp.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span>{emp.name}</span>
                        </td>
                        <td className="py-3 text-slate-300">{emp.role}</td>
                        <td className="py-3 font-bold">
                          <span className={statusConfig.color}>{statusConfig.status}</span>
                        </td>
                        <td className="py-3 text-slate-300 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-rose-400" />
                          <span>{statusConfig.location}</span>
                        </td>
                        <td className="py-3 font-mono font-bold text-white">{statusConfig.hours}</td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => {
                              setSelectedEmp(emp.name);
                              setAppMode('mobile');
                            }}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold border border-slate-700 transition-all cursor-pointer"
                          >
                            Smartphone-App öffnen
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
