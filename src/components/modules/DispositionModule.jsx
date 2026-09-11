import React, { useState, useRef } from 'react';
import { useDemo } from '../../context/DemoContext';
import { ModuleWorkflowGuide } from '../ModuleWorkflowGuide';
import { VariantSelectorBar } from '../VariantSelectorBar';
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
  Briefcase,
  MapPin,
  Navigation,
  FileCheck,
  Truck,
  Gauge,
  Check,
  PenTool,
  RotateCcw
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
    createdCounts,
    addToast
  } = useDemo();

  // Active Variant: 'a' (Routenplanung) | 'b' (Digitaler Lieferschein) | 'c' (Fracht & Kanban)
  const [activeVariant, setActiveVariant] = useState('a');

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

  // State for Variante A: Smart Route Dispatch
  const [tourStops, setTourStops] = useState([
    { id: 1, stopNum: 1, address: 'Gewerbestraße 14, 97076 Würzburg', customer: 'Huber Bauunternehmung', task: 'Materialanlieferung & Rohbau-Elektrik', time: '08:00 Uhr', status: 'Abgeschlossen' },
    { id: 2, stopNum: 2, address: 'Randersackerer Str. 88, 97236 Randersacker', customer: 'Bürokomplex Süd', task: 'Verkabelung Serverraum & Messung', time: '10:45 Uhr', status: 'In Anfahrt' },
    { id: 3, stopNum: 3, address: 'Hafenstraße 12, 97080 Würzburg', customer: 'Logistikzentrum Hafen', task: 'Wartung Hebeanlage Tor 4', time: '14:00 Uhr', status: 'Geplant' }
  ]);

  const handleOptimizeRoute = () => {
    addToast('Route KI-optimiert', 'Die Haltestellen wurden nach kürzester Fahrzeit und Verkehrslage neu sortiert (18 km / 35 Min. gespart).', 'success');
  };

  // State for Variante B: Digital Lieferschein & Signature
  const [deliveryNote, setDeliveryNote] = useState({
    noteId: 'LS-2026-089',
    customer: 'Huber Bauunternehmung GmbH',
    site: 'Neubau Wohnpark Würzburg-Nord',
    driver: 'Murat Demir (LKW-Tour 1)',
    date: new Date().toLocaleDateString('de-DE'),
    items: [
      { pos: '01', desc: 'Kabeltrommel NYM-J 5x2.5mm² (500m)', qty: '2 Rollen', status: 'Vollständig' },
      { pos: '02', desc: 'Unterverteiler AP 4-reihig Hager', qty: '4 Stück', status: 'Vollständig' },
      { pos: '03', desc: 'Sicherungsautomaten B16A 1-polig', qty: '48 Stück', status: 'Vollständig' }
    ],
    isSigned: false,
    signedBy: '',
    signatureTime: ''
  });

  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#38bdf8'; // sky-400
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleSignDelivery = () => {
    setDeliveryNote({
      ...deliveryNote,
      isSigned: true,
      signedBy: 'Michael Huber (Bauleiter Vor-Ort)',
      signatureTime: new Date().toLocaleTimeString('de-DE')
    });
    addToast('Lieferschein digital signiert', 'Die Unterschrift wurde rechtssicher im Lieferschein gespeichert und als PDF archiviert.', 'success');
  };

  const columns = [
    { id: 'planned', label: 'Geplant & Vorbereitung', color: 'border-slate-700 bg-slate-900/40 text-slate-300' },
    { id: 'in_progress', label: 'In Bearbeitung', color: 'border-rose-500/30 bg-rose-950/20 text-rose-300' },
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
      addToast('Auftrag erstellt', `${newTask.title} wurde in die Disposition aufgenommen.`, 'success');
    }
  };

  const moveTask = (taskId, targetStatus) => {
    updateItem('tasks', taskId, { status: targetStatus });
  };

  const variants = [
    {
      id: 'a',
      badge: 'Variante A',
      title: 'Smarte Routen- & Tourenplanung',
      subtitle: 'GPS-Reihenfolge, Anfahrts-Optimierung & Google Maps Navigation für Fahrer',
      icon: Navigation,
      color: 'sky'
    },
    {
      id: 'b',
      badge: 'Variante B',
      title: 'Digitaler Lieferschein & Signatur',
      subtitle: 'Rechtssichere digitale Unterschrift auf Tablet/Smartphone & Sofort-PDF',
      icon: FileCheck,
      color: 'emerald'
    },
    {
      id: 'c',
      badge: 'Variante C',
      title: 'Fracht- & Auslastungs-Cockpit',
      subtitle: '4-Stufen Kanban-Einsatzplanung, Kolonnen-Zuweisung & Kapazitätsradar',
      icon: KanbanSquare,
      color: 'amber'
    }
  ];

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
      title: '4. Nahtlose Übergabe an Zeiterfassung',
      desc: 'Mitarbeiter starten direkt aus dem zugewiesenen Auftrag die Zeiterfassung per Smartphone-App.',
      hint: 'GPS-validierte Arbeitszeit'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 w-full overflow-hidden">
      
      {/* Top Banner & Action */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 glass-panel p-4 sm:p-6 rounded-2xl w-full">
        <div className="w-full lg:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">Modul 4</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Limit: {createdCounts.tasks}/{maxCreationLimit} Test-Einträge
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">Disposition & Tourenplanung</h2>
          <p className="text-xs text-slate-400 mt-1">
            Planen Sie Baustellenaufträge, teilen Sie Monteure & Kolonnen ein und behalten Sie den Fortschritt im Blick.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
          <button
            onClick={() => triggerRestrictedAction('Routen-Optimierung (KI)', 'In Ihrer Vollversion optimiert der KI-Algorithmus Fahrwege und Tankkosten automatisch.')}
            className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all w-full sm:w-auto"
          >
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span>KI-Tourenplaner</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-lg shadow-brand-500/20 transition-all w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Neuer Auftrag</span>
          </button>
        </div>
      </div>

      {/* Top Variant Selector Bar */}
      <VariantSelectorBar
        variants={variants}
        activeVariant={activeVariant}
        onSelect={setActiveVariant}
      />

      {/* ======================= VARIANTE A: SMARTE ROUTEN- & TOURENPLANUNG ======================= */}
      {activeVariant === 'a' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-sky-500/20 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  GPS & Touren-Optimierung
                </span>
                <h3 className="text-xl font-black text-white mt-1.5">
                  Tages-Routen & Einsatzfolge
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Reihenfolge der Anfahrten optimieren, ETA kalkulieren und Route direkt an die Fahrer-App übermitteln.
                </p>
              </div>

              <button
                onClick={handleOptimizeRoute}
                className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Route KI-optimieren</span>
              </button>
            </div>

            {/* Tour Route Stops List */}
            <div className="space-y-3">
              {tourStops.map((stop, idx) => (
                <div key={stop.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center font-black text-sm shrink-0">
                      {stop.stopNum}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs">{stop.customer}</span>
                        <span className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                          stop.status === 'Abgeschlossen' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                          stop.status === 'In Anfahrt' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 animate-pulse' :
                          'bg-slate-800 text-slate-400'
                        }`}>
                          {stop.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{stop.address}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 font-medium mt-0.5">{stop.task}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block">Geplante Ankunft</span>
                      <span className="text-xs font-mono font-bold text-amber-400">{stop.time}</span>
                    </div>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stop.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all"
                    >
                      <Navigation className="w-3.5 h-3.5 text-sky-400" />
                      <span>Google Maps</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================= VARIANTE B: DIGITALER LIEFERSCHEIN & SIGNATUR ======================= */}
      {activeVariant === 'b' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-rose-500/20 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Paperless Delivery (Nachweis)
                </span>
                <h3 className="text-xl font-black text-white mt-1.5">
                  Digitaler Lieferschein mit Touch-Unterschrift
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Der Bauleiter oder Kunde unterschreibt den Wareneingang direkt auf dem Smartphone / Tablet.
                </p>
              </div>

              <span className="font-mono text-xs px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-rose-400 font-bold">
                {deliveryNote.noteId}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Left Col: Delivery Note Items */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex justify-between text-xs pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Kunde & Baustelle:</span>
                    <span className="font-bold text-white">{deliveryNote.customer}</span>
                    <span className="text-slate-400 block text-[11px]">{deliveryNote.site}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">Fahrer:</span>
                    <span className="font-medium text-slate-300">{deliveryNote.driver}</span>
                    <span className="text-slate-500 font-mono text-[10px] block">{deliveryNote.date}</span>
                  </div>
                </div>

                {/* Items Table */}
                <div className="space-y-2 text-xs">
                  <span className="text-xs font-bold text-slate-300 block">Gelieferte Positionen:</span>
                  {deliveryNote.items.map((it) => (
                    <div key={it.pos} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div>
                        <span className="font-mono text-[10px] text-slate-500 mr-2">{it.pos}</span>
                        <span className="text-white font-medium">{it.desc}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold font-mono text-white">{it.qty}</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          {it.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Col: Signature Canvas */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <PenTool className="w-3.5 h-3.5 text-rose-400" />
                      <span>Empfänger-Unterschrift (Vor-Ort)</span>
                    </span>
                    {!deliveryNote.isSigned && (
                      <button
                        type="button"
                        onClick={clearSignature}
                        className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" /> Löschen
                      </button>
                    )}
                  </div>

                  {!deliveryNote.isSigned ? (
                    <div className="mt-3 space-y-2">
                      <p className="text-[11px] text-slate-400">
                        Bitte unterschreiben Sie mit dem Finger oder der Maus im Feld unten:
                      </p>
                      <div className="w-full bg-slate-900 rounded-xl border border-dashed border-slate-700 overflow-hidden relative touch-none">
                        <canvas
                          ref={canvasRef}
                          width={380}
                          height={140}
                          onMouseDown={startDrawing}
                          onMouseMove={draw}
                          onMouseUp={stopDrawing}
                          onMouseLeave={stopDrawing}
                          className="w-full h-36 cursor-crosshair block"
                        />
                        {!hasDrawn && (
                          <span className="absolute inset-0 flex items-center justify-center text-xs text-slate-600 pointer-events-none">
                            Hier unterschreiben...
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-2">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Lieferschein erfolgreich signiert!</span>
                      </div>
                      <p className="text-slate-300 text-[11px]">
                        Unterzeichnet von: <strong className="text-white">{deliveryNote.signedBy}</strong> um {deliveryNote.signatureTime}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  {!deliveryNote.isSigned ? (
                    <button
                      onClick={handleSignDelivery}
                      className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20 transition-all cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Unterschrift bestätigen & abschließen</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => triggerRestrictedAction('Lieferschein PDF Download', 'In Ihrer Vollversion wird der signierte Lieferschein sofort als archivierte PDF abgelegt und per E-Mail versendet.')}
                      className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer"
                    >
                      <FileCheck className="w-4 h-4 text-emerald-400" />
                      <span>Signiertes PDF herunterladen</span>
                    </button>
                  )}
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

      {/* ======================= VARIANTE C: FRACHT- & AUSLASTUNGS-COCKPIT ======================= */}
      {activeVariant === 'c' && (
        <div className="space-y-6">
          {/* Module Workflow Guide */}
          <ModuleWorkflowGuide
            moduleTitle="Auftragsdisposition (Variante C: Kanban & Auslastung)"
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
    </div>
  )}

      {/* New Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel max-w-lg w-full p-6 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white">Neuen Auftrag anlegen / Yeni Görev Ekle</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Disposition für Kanban & Auftragsverwaltung</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-slate-800"
              >
                ✕ Schließen / Kapat
              </button>
            </div>

            <form onSubmit={handleAddTask} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Auftragsbezeichnung / Görev & İş Tanımı *</label>
                <input
                  type="text"
                  required
                  placeholder="z.B. Elektro-Hauptverteilung installieren / Örn: Görev Tanımı"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Kunde / Müşteri *</label>
                  <input
                    type="text"
                    required
                    placeholder="z.B. Müller Bau GmbH"
                    value={newTask.customer}
                    onChange={(e) => setNewTask({ ...newTask, customer: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Projekt / Baustelle / Şantiye Yeri *</label>
                  <input
                    type="text"
                    required
                    placeholder="z.B. Neubau Wohnpark"
                    value={newTask.project}
                    onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Zuständiger Mitarbeiter / Görevli Personel *</label>
                  <select
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    {[
                      ...(data.employees || []),
                      ...[
                        { id: 'EMP-01', name: 'Max Mustermann', role: 'Bauleiter / Meister' },
                        { id: 'EMP-02', name: 'Sarah Weber', role: 'Elektro-Technikerin' },
                        { id: 'EMP-03', name: 'Jan Becker', role: 'Monteur' }
                      ].filter(be => !(data.employees || []).some(de => de.name === be.name || de.id === be.id))
                    ].map(emp => (
                      <option key={emp.id || emp.name} value={emp.name}>
                        {emp.name} ({emp.role || 'Fachkraft'})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Priorität / Öncelik</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Hoch">Hoch / Yüksek Öncelik</option>
                    <option value="Mittel">Mittel / Orta Öncelik</option>
                    <option value="Niedrig">Niedrig / Normal</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Frist / Termin / Bitiş Tarihi *</label>
                  <input
                    type="date"
                    required
                    value={newTask.deadline}
                    onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Geschätzte Dauer / Tahmini Süre (Saat)</label>
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
                  Abbrechen / İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold shadow-lg shadow-rose-500/20"
                >
                  Auftrag anlegen / Görev Oluştur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
