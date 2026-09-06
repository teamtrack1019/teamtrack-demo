import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { ModuleWorkflowGuide } from '../ModuleWorkflowGuide';
import { 
  Truck, 
  Plus, 
  MapPin, 
  Gauge, 
  Fuel, 
  BatteryCharging, 
  Calendar, 
  User, 
  AlertTriangle, 
  CheckCircle2, 
  Navigation,
  Trash2,
  Sparkles,
  Radio,
  BellRing,
  ShieldAlert,
  RotateCw,
  Clock
} from 'lucide-react';

export const FuhrparkModule = () => {
  const { 
    data, 
    addItem, 
    updateItem, 
    deleteItem, 
    triggerRestrictedAction, 
    openUpgradeModal,
    maxCreationLimit,
    createdCounts,
    addToast
  } = useDemo();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all'); // all, tuv_due, on_tour, workshop

  const [newVehicle, setNewVehicle] = useState({
    plate: 'WÜ-TT 105',
    model: 'Ford Transit Custom 2.0 EcoBlue',
    type: 'Service-Transporter',
    status: 'Einsatzbereit',
    driver: 'Jan Becker',
    currentLocation: 'Betriebshof Würzburg',
    mileage: 34500,
    fuelPercent: 85,
    nextInspection: '09/2026', // Format MM/YYYY
    activeTour: 'Bereit für Disposition'
  });

  // Calculate TÜV status helper
  const getTuvStatus = (inspectionDateStr) => {
    if (!inspectionDateStr) return { level: 'ok', text: 'TÜV gültig', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
    
    const parts = inspectionDateStr.split('/');
    if (parts.length !== 2) return { level: 'ok', text: 'TÜV gültig', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };

    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[1], 10);

    // Reference date is Sep 2026
    const currentYear = 2026;
    const currentMonth = 9;

    const diffMonths = (year - currentYear) * 12 + (month - currentMonth);

    if (diffMonths <= 0) {
      return {
        level: 'urgent',
        isDue: true,
        text: '🚨 TÜV JETZT FÄLLIG!',
        badgeText: 'TÜV fällig (Diesen Monat)',
        color: 'text-rose-400 bg-rose-500/15 border-rose-500/40 animate-pulse font-black'
      };
    } else if (diffMonths <= 3) {
      return {
        level: 'warning',
        isDue: true,
        text: `⏳ TÜV in ${diffMonths} Mon. (${inspectionDateStr})`,
        badgeText: `TÜV in ${diffMonths} Monaten`,
        color: 'text-amber-400 bg-amber-500/15 border-amber-500/30 font-bold'
      };
    } else {
      return {
        level: 'ok',
        isDue: false,
        text: `✓ TÜV bis ${inspectionDateStr}`,
        badgeText: `TÜV bis ${inspectionDateStr}`,
        color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
      };
    }
  };

  const handleRenewTuv = (vehicle) => {
    const nextYear = 2028;
    const newDate = `09/${nextYear}`;
    updateItem('vehicles', vehicle.id, { nextInspection: newDate });
    addToast('TÜV erfolgreich erneuert', `Hauptuntersuchung für Fahrzeug ${vehicle.plate} wurde um 2 Jahre bis ${newDate} verlängert.`, 'success');
  };

  const handleAddVehicle = (e) => {
    e.preventDefault();
    const id = `FZ-0${(data.vehicles?.length || 0) + 1}`;
    const added = addItem('vehicles', {
      id,
      ...newVehicle
    });

    if (added) {
      setIsModalOpen(false);
    }
  };

  const handleStatusChange = (vehicleId, newStatus) => {
    updateItem('vehicles', vehicleId, { status: newStatus });
  };

  // Vehicles with TÜV due in 0-3 months
  const dueTuvVehicles = (data.vehicles || []).filter(v => getTuvStatus(v.nextInspection).isDue);

  const filteredVehicles = (data.vehicles || []).filter(v => {
    if (filter === 'all') return true;
    if (filter === 'tuv_due') return getTuvStatus(v.nextInspection).isDue;
    if (filter === 'on_tour') return v.status === 'Auf Tour';
    if (filter === 'workshop') return v.status === 'In Werkstatt';
    return true;
  });

  const workflowSteps = [
    {
      title: '1. Fahrzeug & Fahrer anlegen',
      desc: 'Erfassen Sie Transporter, PKW oder LKW mit Kennzeichen, KM-Stand, Modell und festem Fahrer.',
      hint: 'Digitale Fahrzeugakte'
    },
    {
      title: '2. Baustellen-Touren zuweisen',
      desc: 'Weisen Sie jedem Fahrzeug aktuelle Tages-Touren und Baustellen zu, um die Flottenauslastung zu steuern.',
      hint: 'Live-Status (Bereit / Tour / Werkstatt)'
    },
    {
      title: '3. Automatische TÜV-Überwachung',
      desc: 'Das System warnt rechtzeitig (rot/gelb), wenn eine Hauptuntersuchung in den nächsten Monaten fällig wird.',
      hint: '1-Klick HU/TÜV Erneuerung'
    },
    {
      title: '4. Telematik & Tankdaten koppeln',
      desc: 'In der Vollversion fließen KM-Stände, GPS-Routen und Tankstände vollautomatisch per OBD2-Stecker ein.',
      hint: 'Fahrtenbuch 100% finanzamtskonform'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 w-full overflow-hidden">
      
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 glass-panel p-4 sm:p-6 rounded-2xl w-full">
        <div className="w-full lg:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Modul 4</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Limit: {createdCounts.vehicles}/{maxCreationLimit} Fahrzeuge
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">Fuhrpark, Touren & TÜV-Überwachung</h2>
          <p className="text-xs text-slate-400 mt-1">
            Fahrzeuge, KM-Stände und Inspektionsfristen überwachen. Mit automatischer TÜV-Fälligkeitserkennung und Warnsystem.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
          <button
            onClick={() => triggerRestrictedAction('OBD2 & Live Telematik', 'In der Vollversion liest TeamTrack KM-Stände, Reifendruck, Fehlercodes und Tankfüllungen live über die Bordelektronik (OBD2/CAN-Bus) aus.')}
            className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all w-full sm:w-auto"
          >
            <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Live-Telematik</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-lg shadow-amber-500/20 transition-all w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Fahrzeug anlegen</span>
          </button>
        </div>
      </div>

      {/* Module Workflow Guide */}
      <ModuleWorkflowGuide
        moduleTitle="Fuhrpark & Flotte"
        tagline="Fahrzeugverwaltung, Tourenplanung und automatische TÜV/HU-Terminüberwachung"
        steps={workflowSteps}
        benefitText="Testen Sie die 1-Klick TÜV-Erneuerung direkt in den Fahrzeugkarten oder filtern Sie nach TÜV-Fälligkeit."
      />

      {/* TÜV Smart Alert Widget */}
      {dueTuvVehicles.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-950/40 via-amber-950/30 to-slate-900 border border-rose-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/30 mt-0.5">
              <BellRing className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-rose-400">TÜV-Fälligkeitsalarm</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                  {dueTuvVehicles.length} Fahrzeuge betroffen
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Bei folgenden Fahrzeugen steht die Hauptuntersuchung an: <strong className="text-white">{dueTuvVehicles.map(v => `${v.plate} (${v.nextInspection})`).join(', ')}</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => setFilter(filter === 'tuv_due' ? 'all' : 'tuv_due')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === 'tuv_due'
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-800 text-rose-300 hover:bg-slate-700 border border-rose-500/30'
              }`}
            >
              {filter === 'tuv_due' ? 'Alle anzeigen' : 'Nur fällige filtern'}
            </button>
            <button
              onClick={() => triggerRestrictedAction('Automatische TÜV SMS/E-Mail Benachrichtigung', 'In Ihrer Vollversion erhalten Fuhrparkleiter und Fahrer 60 & 30 Tage vor Ablauf automatisch eine Erinnerung per WhatsApp/SMS/E-Mail.')}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 whitespace-nowrap"
            >
              Auto-Erinnerung
            </button>
          </div>
        </div>
      )}

      {/* LKW & Fahrer Compliance Bar */}
      <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">Fahrer-Compliance & Lenkzeiten (VO EG 561/2006)</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                100% BALM / BAG Konform
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Automatische 4,5-Std. Lenkzeit- & 45-Min. Pausenüberwachung für alle LKW- & Transporter-Fahrten aktiv.
            </p>
          </div>
        </div>

        <button
          onClick={() => triggerRestrictedAction('BALM / BAG Prüfbericht Export', 'Generiert einen lückenlosen, behördlich anerkannten Prüfbericht aller Lenk- und Ruhezeiten für Straßenkontrollen und Betriebsprüfungen.')}
          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center gap-1.5"
        >
          <span>📋 BALM-Prüfbericht Export</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: `Alle (${data.vehicles?.length || 0})` },
          { id: 'tuv_due', label: `⚠️ TÜV fällig (${dueTuvVehicles.length})` },
          { id: 'on_tour', label: 'Auf Tour' },
          { id: 'workshop', label: 'In Werkstatt' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filter === tab.id
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {filteredVehicles.map((v) => {
          const isElectric = v.model.includes('Elektro') || v.model.includes('ID.');
          const tuvInfo = getTuvStatus(v.nextInspection);
          
          const statusBadges = {
            'Auf Tour': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
            'Einsatzbereit': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
            'In Werkstatt': 'bg-rose-500/10 text-rose-400 border-rose-500/30'
          };

          return (
            <div
              key={v.id}
              className={`glass-card p-4 sm:p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                tuvInfo.level === 'urgent' ? 'border-rose-500/40 bg-gradient-to-b from-slate-900 via-rose-950/10 to-slate-950' : 'border-slate-800 hover:border-amber-500/30'
              }`}
            >
              <div>
                {/* TÜV Due Warning Strip */}
                {tuvInfo.isDue && (
                  <div className={`mb-3 px-3 py-1.5 rounded-xl border flex items-center justify-between text-xs ${tuvInfo.color}`}>
                    <div className="flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{tuvInfo.text}</span>
                    </div>
                    <button
                      onClick={() => handleRenewTuv(v)}
                      className="px-2 py-0.5 rounded bg-slate-950/80 hover:bg-white hover:text-slate-900 text-[10px] font-bold transition-colors"
                      title="TÜV Prüfung als durchgeführt markieren (+2 Jahre)"
                    >
                      +2 J. Erneuern
                    </button>
                  </div>
                )}

                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                      <Truck className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-mono text-xs sm:text-sm font-black text-white px-2 py-0.5 rounded bg-slate-900 border border-slate-700">
                          {v.plate}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">{v.type}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-200 mt-1 leading-snug">{v.model}</h3>
                    </div>
                  </div>

                  <select
                    value={v.status}
                    onChange={(e) => handleStatusChange(v.id, e.target.value)}
                    className={`text-[10px] sm:text-[11px] font-bold px-2 py-1 rounded-full border bg-slate-900 cursor-pointer focus:outline-none shrink-0 ${
                      statusBadges[v.status] || statusBadges['Einsatzbereit']
                    }`}
                  >
                    <option value="Einsatzbereit">● Bereit</option>
                    <option value="Auf Tour">● Auf Tour</option>
                    <option value="In Werkstatt">● Werkstatt</option>
                  </select>
                </div>

                {/* Tour & Location Box */}
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-slate-400 font-medium flex items-center gap-1.5 shrink-0">
                      <Navigation className="w-3.5 h-3.5 text-brand-400" />
                      Aktuelle Tour:
                    </span>
                    <span className="font-bold text-white text-right truncate">{v.activeTour}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400 flex items-center gap-1.5 shrink-0">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      Standort:
                    </span>
                    <span className="truncate">{v.currentLocation}</span>
                  </div>
                </div>

                {/* Metrics with TÜV Badge */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 my-3 sm:my-4">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/80">
                    <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium block flex items-center gap-1">
                      <Gauge className="w-3 h-3 text-slate-400" /> KM-Stand
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-white mt-1 block truncate">
                      {v.mileage.toLocaleString('de-DE')} km
                    </span>
                  </div>

                  <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/80">
                    <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium block flex items-center gap-1">
                      {isElectric ? <BatteryCharging className="w-3 h-3 text-emerald-400" /> : <Fuel className="w-3 h-3 text-amber-400" />}
                      {isElectric ? 'Akku' : 'Tank'}
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${v.fuelPercent > 30 ? 'bg-emerald-400' : 'bg-rose-400'}`}
                          style={{ width: `${v.fuelPercent}%` }}
                        ></div>
                      </div>
                      <span className="text-[11px] font-bold text-white">{v.fuelPercent}%</span>
                    </div>
                  </div>

                  <div className={`p-2 sm:p-2.5 rounded-xl border ${tuvInfo.level === 'urgent' ? 'bg-rose-500/10 border-rose-500/30' : 'bg-slate-900/50 border-slate-800/80'}`}>
                    <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium block flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" /> TÜV / HU
                    </span>
                    <span className={`text-[11px] sm:text-xs font-black mt-1 block truncate ${tuvInfo.level === 'urgent' ? 'text-rose-400' : tuvInfo.level === 'warning' ? 'text-amber-400' : 'text-slate-200'}`}>
                      {v.nextInspection}
                    </span>
                  </div>
                </div>
              </div>

              {/* Driver & Action */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs gap-2">
                <div className="flex items-center gap-1.5 text-slate-300 truncate">
                  <User className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                  <span className="truncate">Fahrer: <strong className="text-white">{v.driver}</strong></span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => triggerRestrictedAction('Live GPS-Kartenansicht', 'In Ihrer Vollversion sehen Sie alle Firmenfahrzeuge live auf einer interaktiven Deutschland-Karte mit Routenverfolgung.')}
                    className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold"
                  >
                    GPS
                  </button>

                  <button
                    onClick={() => deleteItem('vehicles', v.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Vehicle Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel max-w-lg w-full p-4 sm:p-6 rounded-3xl border border-white/10 shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base sm:text-lg font-bold text-white">Neues Fahrzeug anlegen</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded-lg bg-slate-800"
              >
                ✕ Schließen
              </button>
            </div>

            <form onSubmit={handleAddVehicle} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Kennzeichen:</label>
                  <input
                    type="text"
                    required
                    value={newVehicle.plate}
                    onChange={(e) => setNewVehicle({ ...newVehicle, plate: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Fahrzeugtyp:</label>
                  <input
                    type="text"
                    required
                    value={newVehicle.type}
                    onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Modell & Ausführung:</label>
                <input
                  type="text"
                  required
                  value={newVehicle.model}
                  onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Fahrer:</label>
                  <select
                    value={newVehicle.driver}
                    onChange={(e) => setNewVehicle({ ...newVehicle, driver: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    {[
                      ...(data.employees || []),
                      ...[
                        { id: 'EMP-01', name: 'Max Mustermann' },
                        { id: 'EMP-02', name: 'Sarah Weber' },
                        { id: 'EMP-03', name: 'Jan Becker' }
                      ].filter(be => !(data.employees || []).some(de => de.name === be.name || de.id === be.id))
                    ].map(emp => (
                      <option key={emp.id || emp.name} value={emp.name}>
                        {emp.name}
                      </option>
                    ))}
                    <option value="Kein Fahrer zugewiesen">Kein Fahrer zugewiesen</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">KM-Stand:</label>
                  <input
                    type="number"
                    required
                    value={newVehicle.mileage}
                    onChange={(e) => setNewVehicle({ ...newVehicle, mileage: parseInt(e.target.value, 10) || 0 })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nächster TÜV (MM/JJJJ):</label>
                  <input
                    type="text"
                    required
                    placeholder="09/2026"
                    value={newVehicle.nextInspection}
                    onChange={(e) => setNewVehicle({ ...newVehicle, nextInspection: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Aktuelle Tour / Baustelle:</label>
                <input
                  type="text"
                  required
                  value={newVehicle.activeTour}
                  onChange={(e) => setNewVehicle({ ...newVehicle, activeTour: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold shadow-lg shadow-amber-500/20"
                >
                  Fahrzeug speichern
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
