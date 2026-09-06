import React, { useState, useEffect } from 'react';
import { useDemo } from '../../context/DemoContext';
import { ModuleWorkflowGuide } from '../ModuleWorkflowGuide';
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
  UserPlus,
  Briefcase, 
  DollarSign,
  Calendar,
  Phone
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

  // Employee Add Modal
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    role: 'Monteur / Fachkraft',
    hourlyRate: 65.0,
    phone: '+49 170 1234567'
  });

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

  const employeeList = (data.employees && data.employees.length > 0)
    ? data.employees
    : [
        { id: "EMP-01", name: "Max Mustermann", role: "Bauleiter / Meister", hourlyRate: 75.0, phone: "+49 171 1234567" },
        { id: "EMP-02", name: "Sarah Weber", role: "Elektro-Technikerin", hourlyRate: 68.0, phone: "+49 172 2345678" },
        { id: "EMP-03", name: "Jan Becker", role: "Monteur", hourlyRate: 62.0, phone: "+49 173 3456789" }
      ];

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!newEmployee.name.trim()) return;

    const id = `EMP-0${employeeList.length + 1}`;
    const added = addItem('employees', {
      id,
      ...newEmployee
    });

    if (added) {
      setActiveEmployee(newEmployee.name);
      setNewEntry(prev => ({
        ...prev,
        employee: newEmployee.name,
        role: newEmployee.role,
        hourlyRate: newEmployee.hourlyRate
      }));
      setNewEmployee({
        name: '',
        role: 'Monteur / Fachkraft',
        hourlyRate: 65.0,
        phone: '+49 170 1234567'
      });
      setIsEmployeeModalOpen(false);
    }
  };

  const totalHours = (data.timesheets || []).reduce((acc, curr) => acc + (curr.totalHours || 0), 0);
  const totalValue = (data.timesheets || []).reduce((acc, curr) => acc + ((curr.totalHours || 0) * (curr.hourlyRate || 0)), 0);

  const workflowSteps = [
    {
      title: '1. Mitarbeiter & Projekt wählen',
      desc: 'Wählen Sie den Mitarbeiter und das Bauvorhaben oder die Kundenbaustelle aus.',
      hint: 'Inklusive Stundensatz-Zuordnung'
    },
    {
      title: '2. Stempeluhr starten (PWA)',
      desc: 'Mitarbeiter stempeln Arbeitsbeginn per Smartphone direkt auf der Baustelle – sekundengenau.',
      hint: 'GPS-Standortprüfung aktiv'
    },
    {
      title: '3. Pausen & Feierabend buchen',
      desc: 'Bei Arbeitsende oder Pause buchen; Zeiten werden automatisch gerundet und kalkuliert.',
      hint: 'Puantaj & Überstundenprüfung'
    },
    {
      title: '4. Übergabe zur 1-Klick Rechnung',
      desc: 'Erfasste Stunden stehen sofort im Rechnungsmodul zur automatischen Abrechnung bereit.',
      hint: 'DATEV-Lohnexport bereit'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 w-full overflow-hidden">
      
      {/* Top Banner & Action */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 glass-panel p-4 sm:p-6 rounded-2xl w-full">
        <div className="w-full lg:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">Modul 1</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Limit: {createdCounts.timesheets}/{maxCreationLimit} Test-Einträge
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">Mobile Zeiterfassung & Stempeluhr</h2>
          <p className="text-xs text-slate-400 mt-1">
            Optimiert für Smartphones auf der Baustelle – Zeiten werden per 1-Klick gestempelt und automatisch für die Abrechnung vorbereitet.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
          <button
            onClick={() => triggerRestrictedAction('Excel & DATEV Export', 'In Ihrer Vollversion können alle Zeiteinträge mit 1 Klick als DATEV-Lohnabrechnung oder Excel exportiert werden.')}
            className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all w-full sm:w-auto"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Lohnexport</span>
          </button>

          <button
            onClick={() => setIsEmployeeModalOpen(true)}
            className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all w-full sm:w-auto"
            title="Neuen Mitarbeiter im System anlegen"
          >
            <UserPlus className="w-4 h-4 text-brand-400" />
            <span>+ Mitarbeiter</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-lg shadow-brand-500/20 transition-all w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Zeit erfassen</span>
          </button>
        </div>
      </div>

      {/* Module Workflow Guide */}
      <ModuleWorkflowGuide
        moduleTitle="Zeiterfassung"
        tagline="Vom Smartphone-Stempeln auf der Baustelle bis zur automatischen Abrechnung"
        steps={workflowSteps}
        benefitText="Testen Sie die Live-Stempeluhr links oder erfassen Sie manuell einen Arbeitstag."
      />

      {/* Interactive Punch Clock (Stempeluhr) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1 glass-card p-5 sm:p-6 rounded-2xl border-brand-500/30 bg-gradient-to-b from-slate-900 to-navy-950 flex flex-col justify-between w-full">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-400" />
                Live-Stempeluhr (PWA)
              </span>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                isRunning ? 'bg-emerald-500/20 text-emerald-400 animate-pulse' : 'bg-slate-800 text-slate-400'
              }`}>
                {isRunning ? '● LÄUFT' : 'BEREIT'}
              </span>
            </div>

            {/* Timer Display */}
            <div className="my-5 text-center">
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-white font-mono bg-slate-950/60 py-3.5 px-4 rounded-2xl border border-slate-800 shadow-inner">
                {formatTimer(timerSeconds)}
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                {isRunning ? 'Laufende Arbeitszeiterfassung aktiv' : 'Tippen Sie auf Start zum Erfassen'}
              </p>
            </div>

            {/* Controls */}
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold text-slate-400 block">Mitarbeiter:</label>
                  <button
                    type="button"
                    onClick={() => setIsEmployeeModalOpen(true)}
                    className="text-[10px] text-brand-400 hover:text-brand-300 font-bold flex items-center gap-1"
                    title="Neuen Mitarbeiter anlegen"
                  >
                    <UserPlus className="w-3 h-3" />
                    <span>+ Neu</span>
                  </button>
                </div>
                <select 
                  value={activeEmployee}
                  onChange={(e) => {
                    if (e.target.value === '__add_new__') {
                      setIsEmployeeModalOpen(true);
                    } else {
                      setActiveEmployee(e.target.value);
                    }
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                >
                  {employeeList.map((emp) => (
                    <option key={emp.id || emp.name} value={emp.name}>
                      {emp.name} ({emp.role || 'Mitarbeiter'}) {emp.hourlyRate ? `- ${emp.hourlyRate} €/h` : ''}
                    </option>
                  ))}
                  <option value="__add_new__" className="text-brand-400 font-bold">+ Neuen Mitarbeiter anlegen...</option>
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
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-[11px]">GPS-Prüfung:</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  {gpsVerified ? 'Im Radius (12m)' : 'Deaktiviert'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-2 gap-2">
            {!isRunning ? (
              <button
                onClick={() => setIsRunning(true)}
                className="col-span-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
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
                  <span>Buchen</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Timesheet Overview Table / Mobile Card List */}
        <div className="lg:col-span-2 glass-card p-4 sm:p-6 rounded-2xl flex flex-col justify-between w-full">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">Erfasste Arbeitszeiten</h3>
                <p className="text-xs text-slate-400">Automatische Rundung und Vorbereitung für die Abrechnung</p>
              </div>

              <div className="flex items-center gap-3 text-xs font-semibold">
                <div className="text-slate-300">
                  Gesamt: <span className="text-brand-400 font-bold">{totalHours.toFixed(1)} h</span>
                </div>
                <div className="text-slate-300">
                  Wert: <span className="text-emerald-400 font-bold">{totalValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</span>
                </div>
              </div>
            </div>

            {/* MOBILE VIEW: Cards */}
            <div className="lg:hidden mt-4 space-y-3">
              {(data.timesheets || []).map((ts) => (
                <div key={ts.id} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-[10px] font-bold">
                        {ts.employee.charAt(0)}
                      </div>
                      <span className="font-bold text-white text-xs">{ts.employee}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {ts.status}
                    </span>
                  </div>

                  <div>
                    <div className="font-semibold text-slate-200 text-xs">{ts.project}</div>
                    <div className="text-[11px] text-slate-400">{ts.task}</div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>{ts.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-white text-xs">{ts.totalHours} Std.</span>
                      <span className="text-emerald-400 font-semibold">{((ts.totalHours || 0) * (ts.hourlyRate || 0)).toFixed(2)} €</span>
                      <button
                        onClick={() => deleteItem('timesheets', ts.id)}
                        className="p-1 text-slate-500 hover:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* DESKTOP VIEW: Table */}
            <div className="hidden lg:block mt-4 overflow-x-auto">
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

          <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              DSGVO-konforme Speicherung
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel max-w-lg w-full p-4 sm:p-6 rounded-3xl border border-white/10 shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base sm:text-lg font-bold text-white">Zeiteintrag manuell anlegen</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded-lg bg-slate-800"
              >
                ✕ Schließen
              </button>
            </div>

            <form onSubmit={handleManualSubmit} className="mt-4 space-y-4 text-xs">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-300 font-semibold">Mitarbeiter:</label>
                  <button
                    type="button"
                    onClick={() => setIsEmployeeModalOpen(true)}
                    className="text-[11px] text-brand-400 hover:text-brand-300 font-bold flex items-center gap-1"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>+ Neuer Mitarbeiter</span>
                  </button>
                </div>
                <select
                  value={newEntry.employee}
                  onChange={(e) => {
                    if (e.target.value === '__add_new__') {
                      setIsEmployeeModalOpen(true);
                    } else {
                      const selected = employeeList.find(emp => emp.name === e.target.value);
                      setNewEntry({ 
                        ...newEntry, 
                        employee: e.target.value,
                        role: selected?.role || newEntry.role,
                        hourlyRate: selected?.hourlyRate || newEntry.hourlyRate
                      });
                    }
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                >
                  {employeeList.map((emp) => (
                    <option key={emp.id || emp.name} value={emp.name}>
                      {emp.name} ({emp.role || 'Mitarbeiter'}) {emp.hourlyRate ? `- ${emp.hourlyRate} €/Std.` : ''}
                    </option>
                  ))}
                  <option value="__add_new__" className="text-brand-400 font-bold">+ Neuer Mitarbeiter anlegen...</option>
                </select>
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

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Datum:</label>
                  <input
                    type="date"
                    required
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-2 text-white text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Von:</label>
                  <input
                    type="time"
                    required
                    value={newEntry.startTime}
                    onChange={(e) => setNewEntry({ ...newEntry, startTime: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-2 text-white text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Bis:</label>
                  <input
                    type="time"
                    required
                    value={newEntry.endTime}
                    onChange={(e) => setNewEntry({ ...newEntry, endTime: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-2 text-white text-[11px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Pause (Min.):</label>
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

      {/* Add Employee Modal */}
      {isEmployeeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel max-w-md w-full p-5 sm:p-6 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center border border-brand-500/30">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Neuen Mitarbeiter anlegen</h3>
                  <p className="text-[11px] text-slate-400">Personal-Stammdaten & Stundensatz</p>
                </div>
              </div>
              <button 
                onClick={() => setIsEmployeeModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded-lg bg-slate-800"
              >
                ✕ Schließen
              </button>
            </div>

            <form onSubmit={handleAddEmployee} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Vor- & Nachname:</label>
                <input
                  type="text"
                  required
                  placeholder="z.B. Mehmet Kaya oder Christian Wolf"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Rolle / Berufsbezeichnung:</label>
                  <select
                    value={newEmployee.role}
                    onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Monteur / Fachkraft">Monteur / Fachkraft</option>
                    <option value="Bauleiter / Meister">Bauleiter / Meister</option>
                    <option value="Elektro-Techniker">Elektro-Techniker</option>
                    <option value="SHK-Installateur">SHK-Installateur</option>
                    <option value="Fahrer / Logistiker">Fahrer / Logistiker</option>
                    <option value="Auszubildender">Auszubildender</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Stundensatz (€/h):</label>
                  <input
                    type="number"
                    step="0.5"
                    min="15"
                    max="250"
                    required
                    value={newEmployee.hourlyRate}
                    onChange={(e) => setNewEmployee({ ...newEmployee, hourlyRate: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Telefon / PWA-Zugang (optional):</label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="+49 170 1234567"
                    value={newEmployee.phone}
                    onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-8 pr-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/20 text-[11px] text-brand-300 leading-relaxed">
                ℹ️ Nach dem Anlegen steht der Mitarbeiter sofort in der <strong>Live-Stempeluhr</strong>, in der <strong>Disposition</strong> und im <strong>Fuhrpark</strong> zur Verfügung.
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEmployeeModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold shadow-lg shadow-brand-500/20"
                >
                  Mitarbeiter speichern
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
