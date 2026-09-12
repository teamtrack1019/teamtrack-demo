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
  Laptop,
  Maximize2,
  Minimize2,
  LayoutDashboard,
  Building2,
  TrendingUp,
  Filter,
  Download,
  CheckCheck,
  XCircle,
  Eye
} from 'lucide-react';

export const TimeTrackProApp = ({ onBack }) => {
  const { 
    data, 
    addItem, 
    triggerRestrictedAction, 
    openUpgradeModal,
    addToast 
  } = useDemo();

  // Fullscreen Mode State
  const [isFullscreen, setIsFullscreen] = useState(false);

  // App Modes: 'mobile' (Smartphone PWA) | 'desktop' (Desktop ERP) | 'kiosk' (Tablet-Terminal) | 'meister' (Büro Cockpit)
  const [appMode, setAppMode] = useState('desktop');

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

  // Desktop Cloud Portal Live Timesheets state
  const [portalTimesheets, setPortalTimesheets] = useState([
    { id: 'TS-201', emp: 'Max Mustermann', role: 'Bauleiter / Meister', project: 'Neubau Wohnpark Würzburg-Nord', from: '07:30', to: '16:15', breakM: 45, hours: 8.0, rate: 75.0, status: 'Genehmigt', gps: 'Würzburg Nord (100% OK)' },
    { id: 'TS-202', emp: 'Sarah Weber', role: 'Elektro-Technikerin', project: 'Sanierung Bürokomplex Randersacker', from: '08:00', to: '16:30', breakM: 30, hours: 8.0, rate: 68.0, status: 'In Prüfung', gps: 'Randersacker (100% OK)' },
    { id: 'TS-203', emp: 'Jan Becker', role: 'Monteur & Handwerker', project: 'Neubau Wohnpark Würzburg-Nord', from: '07:45', to: '15:45', breakM: 30, hours: 7.5, rate: 62.0, status: 'In Prüfung', gps: 'Würzburg Nord (100% OK)' },
    { id: 'TS-204', emp: 'Murat Demir', role: 'LKW- & Berufskraftfahrer', project: 'Material-Logistik & Transport', from: '06:30', to: '15:30', breakM: 45, hours: 8.25, rate: 64.0, status: 'Genehmigt', gps: 'B27 / A3 Schweinfurt' },
    { id: 'TS-205', emp: 'Elena Rostova', role: 'Objektleiterin', project: 'Klinikum Würzburg Unterhaltsreinigung', from: '06:00', to: '13:30', breakM: 30, hours: 7.0, rate: 58.0, status: 'Genehmigt', gps: 'Klinikum Würzburg' }
  ]);

  // Photo & Note modal state
  const [photoCount, setPhotoCount] = useState(2);
  const [showPhotoSuccess, setShowPhotoSuccess] = useState(false);

  // Kiosk PIN Pad State
  const [pinCode, setPinCode] = useState('');
  const [kioskFeedback, setKioskFeedback] = useState(null);

  // Listen for Escape key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

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

  // Handle Approve Timesheet in Desktop Portal
  const handleApproveTimesheet = (id) => {
    setPortalTimesheets(prev => prev.map(ts => ts.id === id ? { ...ts, status: 'Genehmigt' } : ts));
    addToast('Stundenzettel freigegeben', `Eintrag ${id} genehmigt und für Lohnabrechnung markiert.`, 'success');
  };

  // Handle Kiosk PIN Keypad
  const handlePinPress = (num) => {
    if (pinCode.length < 4) {
      const nextPin = pinCode + num;
      setPinCode(nextPin);
      if (nextPin.length === 4) {
        const emp = employees[parseInt(nextPin, 10) % employees.length] || employees[0];
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
    <div className={`transition-all duration-300 ${
      isFullscreen 
        ? 'fixed inset-0 z-50 bg-slate-950 p-4 sm:p-6 overflow-y-auto w-full h-full flex flex-col' 
        : 'space-y-6 w-full animate-in fade-in duration-300'
    }`}>
      
      {/* Top App Bar & Navigation */}
      <div className="glass-panel p-4 rounded-2xl border border-brand-500/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-slate-900/90 shadow-2xl shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-brand-500/30 shrink-0">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-black text-white">TimeTrack Pro Suite</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Cloud ERP & Mobil Live
              </span>
              {isFullscreen && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  ⛶ Vollbildansicht aktiv (Esc zum Beenden)
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              Umfassende Zeiterfassungs- & Personal-Suite für Baustelle, Handwerk, Logistik & Meister-Büro
            </p>
          </div>
        </div>

        {/* Action Controls & Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {/* 4 App Modes */}
          <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-xl border border-slate-800 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => setAppMode('desktop')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                appMode === 'desktop'
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>1. Desktop Cloud-Portal</span>
            </button>

            <button
              onClick={() => setAppMode('mobile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                appMode === 'mobile'
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>2. Smartphone App</span>
            </button>

            <button
              onClick={() => setAppMode('kiosk')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                appMode === 'kiosk'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <MonitorCheck className="w-3.5 h-3.5" />
              <span>3. Werkstatt-Terminal</span>
            </button>

            <button
              onClick={() => setAppMode('meister')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                appMode === 'meister'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>4. Live-Cockpit</span>
            </button>
          </div>

          {/* Fullscreen Toggle Button */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md ${
              isFullscreen 
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30' 
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
            title={isFullscreen ? 'Vollbild verlassen (Esc)' : 'Auf Vollbild vergrößern'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4 text-brand-400" />}
            <span>{isFullscreen ? 'Vollbild beenden' : '⛶ Vollbild'}</span>
          </button>

          {/* Back button if in modal or embedded */}
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
      {/* 1. DESKTOP CLOUD-PORTAL VIEW (FULL-WIDTH ERP DASHBOARD) */}
      {/* ========================================================================= */}
      {appMode === 'desktop' && (
        <div className="space-y-6 flex-1 animate-in fade-in duration-200">
          
          {/* Top KPI Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Gesamtstunden Heute</span>
                <Clock className="w-4 h-4 text-brand-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-2">38.75 Std.</div>
              <div className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +12% produktiver als Vorgewoche
              </div>
            </div>

            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Wertschöpfung Heute</span>
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2">2.592,50 €</div>
              <div className="text-[11px] text-slate-400 mt-1">
                Bereit für 1-Klick Fakturierung
              </div>
            </div>

            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Mitarbeiter im Einsatz</span>
                <User className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-2">5 / 5 Aktiv</div>
              <div className="text-[11px] text-sky-400 font-semibold mt-1">
                100% Baustellen-Besetzung
              </div>
            </div>

            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Lohnexport & DATEV</span>
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              </div>
              <button
                onClick={() => triggerRestrictedAction('DATEV Lohnexport', 'In Ihrer Vollversion werden alle geprüften Stundenzettel mit 1 Klick als DATEV-Lohnabrechnung oder Excel exportiert.')}
                className="mt-2 w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/20 cursor-pointer transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DATEV Export erstellen</span>
              </button>
            </div>
          </div>

          {/* Main ERP Layout: 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left 4 Cols: Project Controlling & Live Geofencing Radar */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Project Hours & Budget Progress */}
              <div className="glass-panel p-5 rounded-3xl border border-slate-800 shadow-xl space-y-4 bg-slate-900/80">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-brand-400" />
                    <h3 className="text-sm font-bold text-white">Projekt- & Baustellen-Controlling</h3>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Live Budget</span>
                </div>

                <div className="space-y-3.5">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-white">Neubau Wohnpark Würzburg-Nord</span>
                      <span className="text-brand-400 font-bold font-mono">15.5h / 40h</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-brand-500 h-full rounded-full" style={{ width: '38%' }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>2 Monteure vor Ort</span>
                      <span className="text-emerald-400">Im Soll-Zeitplan ✓</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-white">Sanierung Bürokomplex Randersacker</span>
                      <span className="text-brand-400 font-bold font-mono">8.0h / 25h</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '32%' }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>1 Elektrikerin vor Ort</span>
                      <span className="text-emerald-400">Pünktlich ✓</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-white">Klinikum Würzburg Wartung</span>
                      <span className="text-brand-400 font-bold font-mono">7.0h / 10h</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>1 Objektleiterin vor Ort</span>
                      <span className="text-amber-400">Abschluss heute</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live GPS Team Radar Box */}
              <div className="glass-panel p-5 rounded-3xl border border-slate-800 shadow-xl space-y-3 bg-gradient-to-br from-slate-900 via-slate-900 to-brand-950/30">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-400" />
                    <h3 className="text-sm font-bold text-white">GPS Team-Radar (Live)</h3>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Echtzeit
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></div>
                      <span className="font-bold text-white truncate">Max Mustermann</span>
                    </div>
                    <span className="text-slate-400 text-[11px] shrink-0 font-mono">Würzburg Nord</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></div>
                      <span className="font-bold text-white truncate">Sarah Weber</span>
                    </div>
                    <span className="text-slate-400 text-[11px] shrink-0 font-mono">Randersacker</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-2 h-2 rounded-full bg-blue-400 shrink-0"></div>
                      <span className="font-bold text-white truncate">Murat Demir</span>
                    </div>
                    <span className="text-blue-400 text-[11px] shrink-0 font-mono">LKW auf B27</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right 8 Cols: Interactive Timesheet Table & Approval Suite */}
            <div className="lg:col-span-8 glass-panel p-5 sm:p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4 bg-slate-900/80">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <Table className="w-4 h-4 text-brand-400" />
                    Digitale Stundenzettel & Freigabe-Center
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Alle mobil gestempelten Zeiten zur Meister-Prüfung & DATEV-Übergabe
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setPortalTimesheets(prev => prev.map(ts => ({ ...ts, status: 'Genehmigt' })));
                      addToast('Alle Zeiten freigegeben', 'Alle 5 Stundenzettel für heute wurden genehmigt.', 'success');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-brand-600/20 cursor-pointer transition-all"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Alle freigeben</span>
                  </button>
                </div>
              </div>

              {/* Table Container */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-800">
                      <th className="pb-3 font-semibold">Mitarbeiter & Rolle</th>
                      <th className="pb-3 font-semibold">Projekt / Einsatz</th>
                      <th className="pb-3 font-semibold">Zeit & Pause</th>
                      <th className="pb-3 font-semibold">Stunden</th>
                      <th className="pb-3 font-semibold">Betrag</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold text-right">Aktion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {portalTimesheets.map((ts) => (
                      <tr key={ts.id} className="hover:bg-slate-950/60 transition-colors">
                        <td className="py-3.5 font-bold text-white">
                          <div>{ts.emp}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{ts.role}</div>
                        </td>
                        <td className="py-3.5 text-slate-300">
                          <div className="font-semibold text-white">{ts.project}</div>
                          <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                            <MapPin className="w-2.5 h-2.5" /> {ts.gps}
                          </div>
                        </td>
                        <td className="py-3.5 text-slate-300 font-mono">
                          <div>{ts.from} - {ts.to}</div>
                          <div className="text-[10px] text-slate-400 font-sans">({ts.breakM} Min Pause)</div>
                        </td>
                        <td className="py-3.5 font-mono font-bold text-brand-300 text-sm">
                          {ts.hours.toFixed(1)} h
                        </td>
                        <td className="py-3.5 font-mono font-bold text-emerald-400">
                          {(ts.hours * ts.rate).toFixed(2)} €
                        </td>
                        <td className="py-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            ts.status === 'Genehmigt'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}>
                            {ts.status}
                          </span>
                        </td>
                        <td className="py-3.5 text-right">
                          {ts.status === 'Genehmigt' ? (
                            <span className="text-emerald-400 font-bold text-xs flex items-center justify-end gap-1">
                              <Check className="w-3.5 h-3.5" /> Geprüft
                            </span>
                          ) : (
                            <button
                              onClick={() => handleApproveTimesheet(ts.id)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow-sm transition-all cursor-pointer"
                            >
                              Freigeben
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bottom Table Summary Bar */}
              <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>DSGVO- & GoBD-konform protokolliert mit unveränderbarem Audit-Trail</span>
                </div>
                <div className="flex items-center gap-3 font-bold text-white">
                  <span>Gesamtsumme: <strong className="text-brand-400 font-mono text-sm">38.75 Std.</strong></span>
                  <span>= <strong className="text-emerald-400 font-mono text-sm">2.592,50 €</strong></span>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. SMARTPHONE MOBILE APP VIEW */}
      {/* ========================================================================= */}
      {appMode === 'mobile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start flex-1">
          
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
      {/* 3. TABLET / KIOSK WERKSTATT-TERMINAL VIEW */}
      {/* ========================================================================= */}
      {appMode === 'kiosk' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 shadow-2xl space-y-6 max-w-3xl mx-auto bg-slate-950 flex-1">
          
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
      {/* 4. MEISTER / BÜRO LIVE-MONITOR COCKPIT */}
      {/* ========================================================================= */}
      {appMode === 'meister' && (
        <div className="space-y-4 flex-1">
          
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
