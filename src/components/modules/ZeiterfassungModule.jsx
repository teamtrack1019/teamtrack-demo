import React, { useState, useEffect } from 'react';
import { useDemo } from '../../context/DemoContext';
import { 
  Play, 
  Square, 
  Pause, 
  RotateCcw, 
  MapPin, 
  Plus, 
  Trash2, 
  FileSpreadsheet, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  User, 
  Briefcase, 
  DollarSign,
  AlertCircle
} from 'lucide-react';

export const ZeiterfassungModule = () => {
  const { 
    data, 
    addItem, 
    deleteItem, 
    triggerRestrictedAction, 
    openUpgradeModal,
    maxCreationLimit,
    createdCounts
  } = useDemo();

  // Live Timer State
  const [isRunning, setIsRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [activeProject, setActiveProject] = useState('Neubau Wohnpark Würzburg-Nord');
  const [activeEmployee, setActiveEmployee] = useState('Max Mustermann');
  const [activeTask, setActiveTask] = useState('Montage & Installation');
  const [gpsVerified, setGpsVerified] = useState(true);

  // Manual Add Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    employee: 'Max Mustermann',
    role: 'Bauleiter / Monteur',
    project: 'Neubau Wohnpark Würzburg-Nord',
    task: 'Rohbau-Abnahme',
    date: new Date().toISOString().split('T')[0],
    startTime: '08:00',
    endTime: '16:30',
    breakMinutes: 30,
    hourlyRate: 70.0,
    location: 'Würzburg-Nord (GPS verifiziert)'
  });

  // Ticking effect
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTimer = (totalSec) => {
    const h = Math.floor(totalSec / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSec % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSec % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleStopAndSave = () => {
    if (timerSeconds < 10) {
      alert('Bitte lassen Sie den Timer für einen realistischen Zeiteintrag mindestens 10 Sekunden laufen.');
      return;
    }

    const hours = +(timerSeconds / 3600).toFixed(2);
    const added = addItem('timesheets', {
      id: `zt-${Date.now().toString().slice(-4)}`,
      employee: activeEmployee,
      role: 'Fachkraft',
      project: activeProject,
      task: activeTask,
      date: new Date().toISOString().split('T')[0],
      startTime: 'Live-Erfassung',
      endTime: 'Jetzt',
      breakMinutes: 0,
      totalHours: hours > 0.05 ? hours : 0.5,
      hourlyRate: 72.0,
      status: 'Genehmigt',
      location: gpsVerified ? 'Baustelle Vor-Ort (GPS OK)' : 'Manuell erfasst'
    });

    if (added) {
      setIsRunning(false);
      setTimerSeconds(0);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    const startHour = parseFloat(newEntry.startTime.split(':')[0]) + parseFloat(newEntry.startTime.split(':')[1]) / 60;
    const endHour = parseFloat(newEntry.endTime.split(':')[0]) + parseFloat(newEntry.endTime.split(':')[1]) / 60;
    const breakHours = (parseFloat(newEntry.breakMinutes) || 0) / 60;
    const calcHours = Math.max(0, +(endHour - startHour - breakHours).toFixed(2));

    const added = addItem('timesheets', {
      id: `zt-${Date.now().toString().slice(-4)}`,
      ...newEntry,
      totalHours: calcHours || 8.0,
      status: 'Genehmigt'
    });

    if (added) {
      setIsModalOpen(false);
    }
  };

  const totalHours = (data.timesheets || []).reduce((acc, curr) => acc + (curr.totalHours || 0), 0);
  const totalValue = (data.timesheets || []).reduce((acc, curr) => acc + ((curr.totalHours || 0) * (curr.hourlyRate || 0)), 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner & Action */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">Modul 1</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Limit: {createdCounts.timesheets}/{maxCreationLimit} Test-Einträge
            </span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">Mobile Zeiterfassung & Stempeluhr</h2>
          <p className="text-xs text-slate-400 mt-1">
            Optimiert für Smartphones auf der Baustelle – Zeiten werden per 1-Klick gestempelt und automatisch für die Abrechnung vorbereitet.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => triggerRestrictedAction('Excel & DATEV Export', 'In Ihrer Vollversion können alle Zeiteinträge mit 1 Klick als DATEV-Lohnabrechnung oder Excel exportiert werden.')}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Lohnexport (Demo gesperrt)</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-lg shadow-brand-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Zeit manuell eintragen</span>
          </button>
        </div>
      </div>

      {/* Interactive Punch Clock (Stempeluhr) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 glass-card p-6 rounded-2xl border-brand-500/30 bg-gradient-to-b from-slate-900 to-navy-950 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-400" />
                Live-Stempeluhr (PWA)
              </span>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                isRunning ? 'bg-emerald-500/20 text-emerald-400 animate-pulse' : 'bg-slate-800 text-slate-400'
              }`}>
                {isRunning ? '● AUFZEICHNUNG LÄUFT' : 'BEREIT'}
              </span>
            </div>

            {/* Timer Display */}
            <div className="my-6 text-center">
              <div className="text-5xl font-black tracking-tight text-white font-mono bg-slate-950/60 py-4 px-6 rounded-2xl border border-slate-800 shadow-inner">
                {formatTimer(timerSeconds)}
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                {isRunning ? 'Laufende Arbeitszeiterfassung aktiv' : 'Drücken Sie "Start", um die Stempeluhr zu starten'}
              </p>
            </div>

            {/* Controls */}
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Mitarbeiter:</label>
                <select 
                  value={activeEmployee}
                  onChange={(e) => setActiveEmployee(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="Max Mustermann">Max Mustermann (Bauleiter)</option>
                  <option value="Sarah Weber">Sarah Weber (Elektro-Technikerin)</option>
                  <option value="Jan Becker">Jan Becker (Monteur)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Baustelle / Projekt:</label>
                <select 
                  value={activeProject}
                  onChange={(e) => setActiveProject(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="Neubau Wohnpark Würzburg-Nord">Neubau Wohnpark Würzburg-Nord</option>
                  <option value="Sanierung Bürokomplex Randersacker">Sanierung Bürokomplex Randersacker</option>
                  <option value="Logistikzentrum Hafen">Logistikzentrum Hafen</option>
                </select>
              </div>

              {/* GPS Simulation Pill */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[11px]">GPS-Standortprüfung:</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  {gpsVerified ? 'Im Radius (12m)' : 'Deaktiviert'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-2 gap-2">
            {!isRunning ? (
              <button
                onClick={() => setIsRunning(true)}
                className="col-span-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Stempeluhr starten</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsRunning(false)}
                  className="py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause</span>
                </button>
                <button
                  onClick={handleStopAndSave}
                  className="py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <Square className="w-3.5 h-3.5 fill-white" />
                  <span>Stopp & Buchen</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Timesheet Overview Table */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">Erfasste Arbeitszeiten (Musterprotokoll)</h3>
                <p className="text-xs text-slate-400">Automatische Rundung und Vorbereitung für die 1-Klick-Abrechnung</p>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold">
                <div className="text-slate-300">
                  Gesamtzeit: <span className="text-brand-400 font-bold">{totalHours.toFixed(1)} Std.</span>
                </div>
                <div className="text-slate-300">
                  Wert: <span className="text-emerald-400 font-bold">{totalValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800/80">
                    <th className="pb-3 font-semibold">Mitarbeiter</th>
                    <th className="pb-3 font-semibold">Projekt & Tätigkeit</th>
                    <th className="pb-3 font-semibold">Datum</th>
                    <th className="pb-3 font-semibold text-right">Stunden</th>
                    <th className="pb-3 font-semibold text-right">Stundensatz</th>
                    <th className="pb-3 font-semibold text-center">Status</th>
                    <th className="pb-3 font-semibold text-right">Aktion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {(data.timesheets || []).map((ts) => (
                    <tr key={ts.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 font-medium text-white">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-[10px] font-bold">
                            {ts.employee.charAt(0)}
                          </div>
                          <span>{ts.employee}</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="font-semibold text-slate-200">{ts.project}</div>
                        <div className="text-[11px] text-slate-400">{ts.task}</div>
                      </td>
                      <td className="py-3 text-slate-300">{ts.date}</td>
                      <td className="py-3 text-right font-bold text-white">{ts.totalHours} h</td>
                      <td className="py-3 text-right text-slate-300">{(ts.hourlyRate || 0).toFixed(2)} €</td>
                      <td className="py-3 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {ts.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => deleteItem('timesheets', ts.id)}
                          className="p-1 hover:text-rose-400 text-slate-500 transition-colors"
                          title="Eintrag löschen"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              DSGVO-konforme Speicherung auf deutschem Cloud-Server
            </span>
            <button
              onClick={() => openUpgradeModal('Zeiterfassung')}
              className="text-brand-400 hover:text-brand-300 font-bold hover:underline"
            >
              Zeiterfassung für Ihre Firma anfragen →
            </button>
          </div>
        </div>
      </div>

      {/* Manual Entry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel max-w-lg w-full p-6 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Zeiteintrag manuell anlegen</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded-lg bg-slate-800"
              >
                ✕ Schließen
              </button>
            </div>

            <form onSubmit={handleManualSubmit} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Mitarbeiter:</label>
                <input
                  type="text"
                  required
                  value={newEntry.employee}
                  onChange={(e) => setNewEntry({ ...newEntry, employee: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Projekt / Baustelle:</label>
                <input
                  type="text"
                  required
                  value={newEntry.project}
                  onChange={(e) => setNewEntry({ ...newEntry, project: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tätigkeitsbeschreibung:</label>
                <input
                  type="text"
                  required
                  value={newEntry.task}
                  onChange={(e) => setNewEntry({ ...newEntry, task: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Datum:</label>
                  <input
                    type="date"
                    required
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Von:</label>
                  <input
                    type="time"
                    required
                    value={newEntry.startTime}
                    onChange={(e) => setNewEntry({ ...newEntry, startTime: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Bis:</label>
                  <input
                    type="time"
                    required
                    value={newEntry.endTime}
                    onChange={(e) => setNewEntry({ ...newEntry, endTime: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Pause (Minuten):</label>
                  <input
                    type="number"
                    value={newEntry.breakMinutes}
                    onChange={(e) => setNewEntry({ ...newEntry, breakMinutes: parseInt(e.target.value, 10) || 0 })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Stundensatz (€):</label>
                  <input
                    type="number"
                    value={newEntry.hourlyRate}
                    onChange={(e) => setNewEntry({ ...newEntry, hourlyRate: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
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
                  className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold shadow-lg shadow-brand-500/20"
                >
                  Eintrag buchen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
