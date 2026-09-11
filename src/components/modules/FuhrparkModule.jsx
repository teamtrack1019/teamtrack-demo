import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { ModuleWorkflowGuide } from '../ModuleWorkflowGuide';
import { VariantSelectorBar } from '../VariantSelectorBar';
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
  Clock,
  QrCode,
  Wrench,
  Camera,
  FileSpreadsheet,
  Receipt,
  Car
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

  // Active Variant: 'a' (Fuhrpark & TÜV) | 'b' (Werkzeug & QR) | 'c' (Tank & Schaden)
  const [activeVariant, setActiveVariant] = useState('a');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all'); // all, tuv_due, on_tour, workshop

  // State for Variante B: Werkzeug & QR-Tracker
  const [tools, setTools] = useState([
    { id: 'WZ-801', name: 'Hilti TE 70-ATC/AVR Kombihammer', category: 'Bohr- & Meißelgeräte', assignedTo: 'Max Mustermann', vehicle: 'WÜ-TT 101', status: 'Im Einsatz', qrCode: 'QR-HLT-801' },
    { id: 'WZ-802', name: 'Bosch Professional GLL 3-80 360° Laser', category: 'Messtechnik & Laser', assignedTo: 'Sarah Weber', vehicle: 'WÜ-TT 102', status: 'Im Einsatz', qrCode: 'QR-BSH-802' },
    { id: 'WZ-803', name: 'REMS Amigo 2 Elektrische Gewindeschneidkluppe', category: 'Rohr- & Sanitärwerkzeug', assignedTo: 'Lager / Bereitstellung', vehicle: 'Werkstatt Würzburg', status: 'Verfügbar', qrCode: 'QR-RMS-803' },
    { id: 'WZ-804', name: 'Rothenberger RP 50-S Dichtheits-Prüfpumpe', category: 'Prüf- & Messtechnik', assignedTo: 'Jan Becker', vehicle: 'WÜ-TT 103', status: 'Im Einsatz', qrCode: 'QR-RTB-804' }
  ]);

  const handleAssignTool = (toolId, newOwner) => {
    setTools(tools.map(t => {
      if (t.id === toolId) {
        return { ...t, assignedTo: newOwner, status: newOwner.includes('Lager') ? 'Verfügbar' : 'Im Einsatz' };
      }
      return t;
    }));
    addToast('Werkzeug umgebucht', `Gerät wurde an ${newOwner} übergeben und digital verbucht.`, 'success');
  };

  // State for Variante C: Schaden & Tankkarten-Logbuch
  const [fuelReceipts, setFuelReceipts] = useState([
    { id: 'TB-991', date: '11.09.2026', vehicle: 'WÜ-TT 101 (Ford Transit)', driver: 'Max Mustermann', liters: 62.4, totalCost: 104.83, station: 'Aral Würzburg', card: 'DKV Card #4401' },
    { id: 'TB-992', date: '09.09.2026', vehicle: 'WÜ-TT 102 (Mercedes Sprinter)', driver: 'Sarah Weber', liters: 74.0, totalCost: 124.32, station: 'Shell Randersacker', card: 'UTA Card #8820' },
    { id: 'TB-993', date: '06.09.2026', vehicle: 'WÜ-TT 104 (MAN TGE 4x4)', driver: 'Murat Demir', liters: 68.5, totalCost: 115.08, station: 'TotalEnergies Hafen', card: 'DKV Card #4401' }
  ]);

  const [damageReports, setDamageReports] = useState([
    { id: 'SCH-01', date: '08.09.2026', vehicle: 'WÜ-TT 103 (VW Caddy)', driver: 'Jan Becker', desc: 'Kratzer & kleine Delle Stoßstange hinten rechts beim Rückwärts-Rangieren.', status: 'Werkstatt gemeldet', costEst: 450.00 }
  ]);

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
      addToast('Fahrzeug registriert', `${newVehicle.plate} (${newVehicle.model}) wurde angelegt.`, 'success');
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

  const variants = [
    {
      id: 'a',
      badge: 'A',
      label: 'Variante A',
      sub: 'Fuhrpark & TÜV/Service-Radar',
      icon: Truck
    },
    {
      id: 'b',
      badge: 'B',
      label: 'Variante B',
      sub: 'Werkzeug- & QR-Tracker',
      icon: QrCode
    },
    {
      id: 'c',
      badge: 'C',
      label: 'Variante C',
      sub: 'Schaden & Tankkarten-Logbuch',
      icon: Fuel
    }
  ];

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

      {/* Top Variant Selector Bar */}
      <VariantSelectorBar
        moduleName="Fuhrpark & Geräteverwaltung"
        variants={variants}
        activeVariant={activeVariant}
        onSelectVariant={setActiveVariant}
      />

      {/* ======================= VARIANTE A: FUHRPARK & TÜV/SERVICE-RADAR ======================= */}
      {activeVariant === 'a' && (
        <div className="space-y-6">
          {/* Module Workflow Guide */}
          <ModuleWorkflowGuide
            moduleTitle="Fuhrpark & Flotte (Variante A: TÜV-Radar)"
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

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-amber-400 font-mono font-bold text-[11px]">
                Fahrerkarte: Gültig
              </span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === 'all' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Alle Fahrzeuge ({data.vehicles?.length || 0})
            </button>
            <button
              onClick={() => setFilter('tuv_due')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === 'tuv_due' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              TÜV fällig ({dueTuvVehicles.length})
            </button>
            <button
              onClick={() => setFilter('on_tour')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === 'on_tour' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Auf Tour ({(data.vehicles || []).filter(v => v.status === 'Auf Tour').length})
            </button>
            <button
              onClick={() => setFilter('workshop')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === 'workshop' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              In Werkstatt ({(data.vehicles || []).filter(v => v.status === 'In Werkstatt').length})
            </button>
          </div>

          {/* Vehicle Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredVehicles.map((v) => {
              const tuvInfo = getTuvStatus(v.nextInspection);
              const statusColors = {
                'Einsatzbereit': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
                'Auf Tour': 'bg-sky-500/10 text-sky-400 border-sky-500/30',
                'In Werkstatt': 'bg-rose-500/10 text-rose-400 border-rose-500/30'
              };

              return (
                <div
                  key={v.id}
                  className="glass-card p-4 sm:p-5 rounded-2xl flex flex-col justify-between border-slate-800 hover:border-slate-700 transition-all space-y-4 group"
                >
                  <div>
                    {/* Top Row: Plate & Status */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-sm text-white px-2 py-0.5 rounded bg-slate-900 border border-slate-700">
                            {v.plate}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">{v.id}</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-200 mt-1.5">{v.model}</h4>
                        <span className="text-[11px] text-slate-400">{v.type}</span>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <select
                          value={v.status}
                          onChange={(e) => handleStatusChange(v.id, e.target.value)}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border bg-slate-950 cursor-pointer ${statusColors[v.status] || statusColors.Einsatzbereit}`}
                        >
                          <option value="Einsatzbereit">Einsatzbereit</option>
                          <option value="Auf Tour">Auf Tour</option>
                          <option value="In Werkstatt">In Werkstatt</option>
                        </select>

                        {tuvInfo.isDue && (
                          <button
                            onClick={() => handleRenewTuv(v)}
                            className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold border border-emerald-500/40 flex items-center gap-1 transition-all mt-1"
                            title="TÜV um 2 Jahre verlängern"
                          >
                            <RotateCw className="w-2.5 h-2.5" />
                            <span>1-Klick TÜV +2J</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Telemetry Metrics */}
                    <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800 text-xs">
                      <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/80">
                        <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium block flex items-center gap-1">
                          <Gauge className="w-3 h-3 text-slate-400" /> KM-Stand
                        </span>
                        <span className="text-[11px] sm:text-xs font-bold text-white mt-1 block truncate font-mono">
                          {v.mileage?.toLocaleString('de-DE')} km
                        </span>
                      </div>

                      <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/80">
                        <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium block flex items-center gap-1">
                          <Fuel className="w-3 h-3 text-slate-400" /> Tank
                        </span>
                        <div className="flex items-center gap-1.5 mt-1">
                          <div className="flex-1 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${v.fuelPercent < 25 ? 'bg-rose-500' : 'bg-emerald-400'}`}
                              style={{ width: `${v.fuelPercent}%` }}
                            />
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
                      <User className="w-3.5 h-3.5 text-amber-400 shrink-0" />
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
        </div>
      )}

      {/* ======================= VARIANTE B: WERKZEUG- & QR-TRACKER ======================= */}
      {activeVariant === 'b' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-amber-500/20 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Geräte & Betriebsmittel
                </span>
                <h3 className="text-xl font-black text-white mt-1.5">
                  Digitaler Werkzeug- & QR-Code-Tracker
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Kein Werkzeugverlust mehr: Jeder Bohrhammer, Laser und jedes Prüfgerät ist einem Mitarbeiter oder Fahrzeug zugewiesen.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => triggerRestrictedAction('Kamera QR-Code Live-Scan', 'In Ihrer Smartphone-App öffnen Mitarbeiter die Kamera, scannen den QR-Aufkleber auf dem Werkzeug und übernehmen es in 1 Sekunde.')}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Kamera-Scan</span>
                </button>
              </div>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tools.map((t) => (
                <div key={t.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
                        <Wrench className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-amber-400">{t.id}</span>
                          <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 font-mono">
                            {t.qrCode}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white mt-0.5">{t.name}</h4>
                        <span className="text-[11px] text-slate-400">{t.category}</span>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      t.status === 'Verfügbar' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}>
                      {t.status}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Aktueller Standort / Besitzer:</span>
                      <span className="font-bold text-slate-200">{t.assignedTo}</span>
                      <span className="text-[10px] text-slate-400 block font-mono">({t.vehicle})</span>
                    </div>

                    {/* Quick Re-assign dropdown */}
                    <div className="flex items-center gap-1.5">
                      <select
                        value={t.assignedTo}
                        onChange={(e) => handleAssignTool(t.id, e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-[11px] text-white cursor-pointer font-medium"
                      >
                        <option value="Max Mustermann">Max Mustermann</option>
                        <option value="Sarah Weber">Sarah Weber</option>
                        <option value="Jan Becker">Jan Becker</option>
                        <option value="Lager / Bereitstellung">Lager / Bereitstellung</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================= VARIANTE C: SCHADEN & TANKKARTEN-LOGBUCH ======================= */}
      {activeVariant === 'c' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left Col: Fuel Cards & Receipts */}
            <div className="glass-panel p-6 rounded-3xl border border-amber-500/20 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    DKV & UTA Schnittstelle
                  </span>
                  <h3 className="text-lg font-black text-white mt-1">
                    Tankkarten & Kraftstoff-Abrechnung
                  </h3>
                </div>
                <Fuel className="w-6 h-6 text-amber-400" />
              </div>

              <p className="text-xs text-slate-400">
                Automatische Erfassung von Tankbelegen, Literpreisen und Durchschnittsverbrauch pro Fahrzeug.
              </p>

              <div className="space-y-2.5">
                {fuelReceipts.map((r) => (
                  <div key={r.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-amber-400 font-bold text-[10px]">{r.id}</span>
                        <span className="text-white font-bold">{r.vehicle}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {r.driver} • {r.station} ({r.card})
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">{r.date}</div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-black font-mono text-white">
                        {r.totalCost.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{r.liters} Liter Diesel</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col: Damage & Incident Reports */}
            <div className="glass-panel p-6 rounded-3xl border border-rose-500/20 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    Schaden & Unfall-Protokoll
                  </span>
                  <h3 className="text-lg font-black text-white mt-1">
                    Schadensmeldungen mit Fotobeweis
                  </h3>
                </div>
                <ShieldAlert className="w-6 h-6 text-rose-400" />
              </div>

              <p className="text-xs text-slate-400">
                Fahrer melden Parkkratzer, Steinschlag oder Unfälle sofort per Smartphone-Kamera direkt an die Fuhrparkleitung.
              </p>

              <div className="space-y-3">
                {damageReports.map((d) => (
                  <div key={d.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-rose-400 font-bold text-[10px]">{d.id}</span>
                          <span className="font-bold text-white">{d.vehicle}</span>
                          <span className="px-2 py-0.2 rounded-full text-[9px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                            {d.status}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1">Gemeldet von: {d.driver} ({d.date})</div>
                      </div>

                      <span className="font-mono font-bold text-rose-300">
                        ca. {d.costEst.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                      </span>
                    </div>

                    <p className="text-slate-300 text-[11px] bg-slate-900 p-2.5 rounded-xl border border-slate-800 italic">
                      "{d.desc}"
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => triggerRestrictedAction('Schadensbericht aufnehmen', 'In Ihrer Vollversion öffnet dieser Button das 3-Schritt Schadensprotokoll mit Kamera-Upload und Versicherungs-Export.')}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer"
              >
                <Camera className="w-4 h-4 text-rose-400" />
                <span>+ Neue Schadensmeldung erfassen</span>
              </button>
            </div>

          </div>
        </div>
      )}

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
