import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { ModuleWorkflowGuide } from '../ModuleWorkflowGuide';
import { 
  KanbanSquare, 
  Plus, 
  Calendar, 
  User, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Sparkles, 
  Tag, 
  ArrowRight,
  ArrowLeft,
  Briefcase
} from 'lucide-react';

export const DispositionModule = () => {
  const { 
    data, 
    addItem, 
    updateItem, 
    deleteItem, 
    triggerRestrictedAction, 
    openUpgradeModal,
    maxCreationLimit,
    createdCounts 
  } = useDemo();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: 'Netzwerk & USV-Installation Bürokomplex',
    customer: 'Huber Bauunternehmung GmbH',
    project: 'Bürokomplex Würzburg',
    assignedTo: 'Sarah Weber',
    priority: 'Hoch',
    status: 'planned',
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    estimatedHours: 12,
    tags: ['IT-Infrastruktur', 'Baustelle']
  });

  const columns = [
    { id: 'planned', label: 'Geplant & Vorbereitung', color: 'border-slate-700 bg-slate-900/40 text-slate-300' },
    { id: 'in_progress', label: 'In Bearbeitung', color: 'border-brand-500/30 bg-brand-950/20 text-brand-300' },
    { id: 'review', label: 'Qualitätskontrolle / Abnahme', color: 'border-amber-500/30 bg-amber-950/20 text-amber-300' },
    { id: 'done', label: 'Abgeschlossen & Abrechenbar', color: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300' }
  ];

  const handleAddTask = (e) => {
    e.preventDefault();
    const id = `DISP-${(data.tasks?.length || 0) + 206}`;
    const added = addItem('tasks', {
      id,
      ...newTask
    });

    if (added) {
      setIsModalOpen(false);
    }
  };

  const moveTask = (taskId, targetStatus) => {
    updateItem('tasks', taskId, { status: targetStatus });
  };

  const workflowSteps = [
    {
      title: '1. Auftrag & Frist anlegen',
      desc: 'Erstellen Sie Baustellenaufträge mit Kunde, Projektname, Priorität (Dringend/Normal) und Zieldatum.',
      hint: 'Inkl. Zeitbudget-Schätzung'
    },
    {
      title: '2. Monteuren & Teams zuweisen',
      desc: 'Teilen Sie Fachkräfte oder Kolonnen per Klick ein, damit jeder Mitarbeiter seinen Tageseinsatz sieht.',
      hint: 'Vermeidet Doppelbelegungen'
    },
    {
      title: '3. 4-Stufen Kanban steuern',
      desc: 'Verschieben Sie Aufträge mit den Pfeilen von „Geplant“ über „In Bearbeitung“ bis zur „Qualitätskontrolle“.',
      hint: '1-Klick Statuswechsel'
    },
    {
      title: '4. Abschluss & Übergabe zur Rechnung',
      desc: 'Sobald ein Auftrag auf „Abgeschlossen“ steht, wird er sofort für die Rechnungsstellung freigegeben.',
      hint: 'Lückenloser Projektablauf'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Modul 5</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Limit: {createdCounts.tasks}/{maxCreationLimit} Aufträge
            </span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">Auftragsdisposition & Kanban-Board</h2>
          <p className="text-xs text-slate-400 mt-1">
            Teams, Baustellen und Einsatzpläne flexibel koordinieren. Verschieben Sie Aufträge per 1-Klick durch alle Arbeitsphasen.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => triggerRestrictedAction('Einsatzplan PDF & Kalender-Sync (iCal/Outlook)', 'In Ihrer Vollversion synchronisiert sich der Dispositionsplan automatisch mit den Outlook/Google-Kalendern Ihrer Mitarbeiter.')}
            className="flex-1 md:flex-none px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
          >
            Kalender-Sync
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Auftrag erstellen</span>
          </button>
        </div>
      </div>

      {/* Module Workflow Guide */}
      <ModuleWorkflowGuide
        moduleTitle="Auftragsdisposition"
        tagline="Einsatzplanung, Kolonnenzuweisung und 4-Phasen-Projektfortschritt"
        steps={workflowSteps}
        benefitText="Nutzen Sie die Pfeiltasten auf den Auftrags-Karten, um den Status live im Kanban zu verschieben."
      />

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {columns.map((col, colIdx) => {
          const columnTasks = (data.tasks || []).filter(t => t.status === col.id);

          return (
            <div
              key={col.id}
              className={`rounded-2xl border p-4 flex flex-col min-h-[500px] ${col.color}`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
                <span className="text-xs font-bold tracking-tight">{col.label}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-900 font-bold">
                  {columnTasks.length}
                </span>
              </div>

              {/* Tasks List */}
              <div className="space-y-3 flex-1">
                {columnTasks.map((task) => {
                  const priorityColors = {
                    Hoch: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
                    Mittel: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
                    Niedrig: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  };

                  return (
                    <div
                      key={task.id}
                      className="glass-card p-4 rounded-xl border-slate-800 hover:border-slate-600 transition-all space-y-2.5 group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-mono text-slate-400 font-semibold">{task.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${priorityColors[task.priority] || priorityColors.Mittel}`}>
                          {task.priority}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-white leading-snug">
                        {task.title}
                      </h4>

                      <div className="text-[11px] text-slate-400">
                        <div className="font-medium text-slate-300">{task.customer}</div>
                        <div className="text-[10px] text-brand-400">{task.project}</div>
                      </div>

                      {/* Tags */}
                      {task.tags && task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {task.tags.map((tg, i) => (
                            <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400">
                              #{tg}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3 h-3 text-slate-400" />
                          <span className="text-slate-300 font-medium">{task.assignedTo}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{task.deadline}</span>
                        </div>
                      </div>

                      {/* Status Shifter Controls */}
                      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
                        {colIdx > 0 ? (
                          <button
                            onClick={() => moveTask(task.id, columns[colIdx - 1].id)}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] flex items-center gap-1"
                            title="Eine Stufe zurück"
                          >
                            <ArrowLeft className="w-3 h-3" />
                            <span>Zurück</span>
                          </button>
                        ) : <div></div>}

                        <button
                          onClick={() => deleteItem('tasks', task.id)}
                          className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                          title="Löschen"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>

                        {colIdx < columns.length - 1 ? (
                          <button
                            onClick={() => moveTask(task.id, columns[colIdx + 1].id)}
                            className="p-1 rounded bg-brand-600 hover:bg-brand-500 text-white text-[10px] flex items-center gap-1 font-bold"
                            title="Nächste Stufe"
                          >
                            <span>Weiter</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ) : (
                          <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Fertig
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {columnTasks.length === 0 && (
                  <div className="h-32 flex items-center justify-center border-2 border-dashed border-slate-800 rounded-xl text-xs text-slate-600">
                    Keine Aufträge in dieser Phase
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* New Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel max-w-lg w-full p-6 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Neuen Auftrag / Aufgabe planen</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded-lg bg-slate-800"
              >
                ✕ Schließen
              </button>
            </div>

            <form onSubmit={handleAddTask} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Auftragsbezeichnung:</label>
                <input
                  type="text"
                  required
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Kunde:</label>
                  <input
                    type="text"
                    required
                    value={newTask.customer}
                    onChange={(e) => setNewTask({ ...newTask, customer: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Projekt / Baustelle:</label>
                  <input
                    type="text"
                    required
                    value={newTask.project}
                    onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Zugewiesener Mitarbeiter:</label>
                  <input
                    type="text"
                    required
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Priorität:</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Hoch">Hoch</option>
                    <option value="Mittel">Mittel</option>
                    <option value="Niedrig">Niedrig</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Frist / Deadline:</label>
                  <input
                    type="date"
                    required
                    value={newTask.deadline}
                    onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Geschätzte Dauer (Std.):</label>
                  <input
                    type="number"
                    value={newTask.estimatedHours}
                    onChange={(e) => setNewTask({ ...newTask, estimatedHours: parseInt(e.target.value, 10) || 0 })}
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
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold shadow-lg shadow-rose-500/20"
                >
                  Auftrag anlegen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
