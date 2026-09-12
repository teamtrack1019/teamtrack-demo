import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { ModuleWorkflowGuide } from '../ModuleWorkflowGuide';
import { VariantSelectorBar } from '../VariantSelectorBar';
import { CrmTrackProApp } from '../crm/CrmTrackProApp';
import { 
  Users, 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  Building2, 
  Briefcase, 
  Trash2, 
  MessageSquare, 
  ExternalLink,
  ShieldCheck,
  Filter,
  DollarSign,
  KanbanSquare,
  Globe,
  ArrowRight,
  CheckCircle,
  FileText,
  Send,
  Sparkles,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

export const CrmModule = () => {
  const { 
    data, 
    addItem, 
    deleteItem, 
    triggerRestrictedAction, 
    openUpgradeModal,
    maxCreationLimit,
    createdCounts,
    addToast
  } = useDemo();

  const [showFullCrm, setShowFullCrm] = useState(false);

  // Active Variant: 'a' (360° Kundenakte) | 'b' (Kanban Pipeline) | 'c' (Kundenportal)
  const [activeVariant, setActiveVariant] = useState('a');

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for Variante B: Kanban Sales Pipeline
  const [pipelineStages, setPipelineStages] = useState([
    {
      id: 'leads',
      name: 'Neuer Lead & Anfrage',
      color: 'border-slate-700 bg-slate-900/40 text-slate-300',
      deals: [
        { id: 'DEAL-101', customer: 'Logistikzentrum Mainfranken', title: 'Hallenbeleuchtung & Notstrom', value: 24500, prob: '20%', contact: 'Hr. Schmidt' },
        { id: 'DEAL-102', customer: 'Praxis Dr. Sommer', title: 'Komplettrenovierung & Bodenbelag', value: 12800, prob: '30%', contact: 'Fr. Sommer' }
      ]
    },
    {
      id: 'contact',
      name: 'Erstgespräch & Aufmaß',
      color: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-300',
      deals: [
        { id: 'DEAL-103', customer: 'Bavaria Industrie & Handwerk', title: 'Industriezaun & Zufahrtstor', value: 38000, prob: '50%', contact: 'Stefan Bayer' }
      ]
    },
    {
      id: 'offer',
      name: 'Angebot versendet',
      color: 'border-amber-500/30 bg-amber-950/20 text-amber-300',
      deals: [
        { id: 'DEAL-104', customer: 'Huber Bauunternehmung GmbH', title: 'Elektroinstallation Bauabschnitt 2', value: 54000, prob: '75%', contact: 'Michael Huber' }
      ]
    },
    {
      id: 'won',
      name: 'Gewonnen & Beauftragt',
      color: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300',
      deals: [
        { id: 'DEAL-105', customer: 'Kramer Tiefbau KG', title: 'Baustromverteiler & Wartung', value: 18500, prob: '100%', contact: 'Hr. Kramer' }
      ]
    }
  ]);

  const moveDeal = (dealId, targetStageId) => {
    let movingDeal = null;
    const newStages = pipelineStages.map(stage => {
      const remaining = stage.deals.filter(d => {
        if (d.id === dealId) {
          movingDeal = d;
          return false;
        }
        return true;
      });
      return { ...stage, deals: remaining };
    });

    if (movingDeal) {
      const updated = newStages.map(stage => {
        if (stage.id === targetStageId) {
          return { ...stage, deals: [...stage.deals, movingDeal] };
        }
        return stage;
      });
      setPipelineStages(updated);
      addToast('Angebots-Pipeline aktualisiert', `Auftrag ${dealId} in nächste Phase verschoben.`, 'info');
    }
  };

  // State for Variante C: Kunden-Self-Service-Portal
  const [customerTickets, setCustomerTickets] = useState([
    {
      id: 'TCK-881',
      title: 'Zusätzlicher Steckdosenanschluss Serverraum',
      date: '10.09.2026',
      status: 'In Bearbeitung',
      priority: 'Normal'
    },
    {
      id: 'TCK-882',
      title: 'Abnahmebeleg für Bauabschnitt 1 anfordern',
      date: '08.09.2026',
      status: 'Erledigt',
      priority: 'Niedrig'
    }
  ]);

  const [newTicketText, setNewTicketText] = useState('');

  const handleCreateCustomerTicket = (e) => {
    e.preventDefault();
    if (!newTicketText.trim()) return;
    const newT = {
      id: `TCK-${Math.floor(880 + Math.random() * 100)}`,
      title: newTicketText,
      date: new Date().toLocaleDateString('de-DE'),
      status: 'Eingegangen',
      priority: 'Dringend'
    };
    setCustomerTickets([newT, ...customerTickets]);
    setNewTicketText('');
    addToast('Service-Ticket übermittelt', 'Ihr Auftraggeber hat das Ticket direkt im TeamTrack-Portal empfangen.', 'success');
  };

  const [newCustomer, setNewCustomer] = useState({
    company: 'Bavaria Industrie & Handwerk GmbH',
    industry: 'Metallbau & Konstruktion',
    contactPerson: 'Stefan Bayer (Betriebsleiter)',
    email: 'info@bavaria-metall.de',
    phone: '+49 931 662030',
    city: '97082 Würzburg',
    street: 'Grombühlstraße 19',
    status: 'Aktiv',
    totalRevenue: 0.0,
    activeProjects: 1,
    notes: 'Neu eingetragener Testkunde in der Demo-Umgebung.'
  });

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const id = `KND-00${(data.customers?.length || 0) + 1}`;
    const added = addItem('customers', {
      id,
      ...newCustomer
    });

    if (added) {
      setIsModalOpen(false);
      addToast('Kunde angelegt', `${newCustomer.company} wurde zur Kundenkartei hinzugefügt.`, 'success');
    }
  };

  const filteredCustomers = (data.customers || []).filter(c => {
    const matchesSearch = c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const variants = [
    {
      id: 'a',
      badge: 'A',
      label: 'Variante A',
      sub: '360° Digitale Kundenakte',
      icon: Users
    },
    {
      id: 'b',
      badge: 'B',
      label: 'Variante B',
      sub: 'Kanban Angebots-Pipeline',
      icon: KanbanSquare
    },
    {
      id: 'c',
      badge: 'C',
      label: 'Variante C',
      sub: 'Kunden-Self-Service-Portal',
      icon: Globe
    }
  ];

  const totalPipelineValue = pipelineStages.reduce((acc, stage) => {
    return acc + stage.deals.reduce((s, d) => s + d.value, 0);
  }, 0);

  const workflowSteps = [
    {
      title: '1. Kunde & Ansprechpartner anlegen',
      desc: 'Erfassen Sie Firmendaten, Branche, Direktansprechpartner und Kontaktdaten zentral in einer Kartei.',
      hint: 'DSGVO-konforme Datenhaltung'
    },
    {
      title: '2. Historie & Umsätze verfolgen',
      desc: 'Sehen Sie sofort alle bisherigen Projekte, offene Rechnungen und aufgelaufene Gesamtumsätze des Kunden.',
      hint: 'Echtzeit-Umsatzüberblick'
    },
    {
      title: '3. 1-Klick Schnellkontakt & Route',
      desc: 'Rufen Sie den Kunden direkt aus der App an, senden Sie E-Mails oder öffnen Sie Google Maps zur Anfahrt.',
      hint: 'Perfekt für Bauleiter unterwegs'
    },
    {
      title: '4. Modulübergreifend verknüpfen',
      desc: 'Kunden stehen in Zeiterfassung, Rechnungsmodul und Disposition sofort automatisch zur Auswahl bereit.',
      hint: '100% vernetzter Datenfluss'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-400">Modul 3</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Limit: {createdCounts.customers}/{maxCreationLimit} Firmen
            </span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">CRM & Digitale Kundenverwaltung</h2>
          <p className="text-xs text-slate-400 mt-1">
            Zentrale Kundenkartei für Handwerker & Logistiker: Ansprechpartner, Projektstatus, Dokumente und Umsatzzahlen auf einen Blick.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setShowFullCrm(!showFullCrm)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer w-full sm:w-auto ${
              showFullCrm
                ? 'bg-slate-800 text-indigo-300 border border-indigo-500/40'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{showFullCrm ? 'Zurück zur Modul-Übersicht' : 'Vollständige CRM 360° Suite öffnen'}</span>
          </button>

          <button
            onClick={() => triggerRestrictedAction('CRM Excel/CSV Export', 'In Ihrer Vollversion können alle Kundendaten, Leads und Notizen DSGVO-konform exportiert oder aus Alt-Systemen importiert werden.')}
            className="flex-1 md:flex-none px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
          >
            Kundenliste exportieren
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-lg shadow-violet-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Kunde anlegen</span>
          </button>
        </div>
      </div>

      {showFullCrm ? (
        <CrmTrackProApp onBack={() => setShowFullCrm(false)} />
      ) : (
        <>
          {/* Top Variant Selector Bar */}
          <VariantSelectorBar
            moduleName="CRM & Kundenverwaltung"
            variants={variants}
            activeVariant={activeVariant}
            onSelectVariant={setActiveVariant}
          />

      {/* ======================= VARIANTE A: 360° DIGITALE KUNDENAKTE ======================= */}
      {activeVariant === 'a' && (
        <div className="space-y-6">
          {/* Module Workflow Guide */}
          <ModuleWorkflowGuide
            moduleTitle="Kundenverwaltung (Variante A: 360° Kundenakte)"
            tagline="Alle Kundendaten, Ansprechpartner, Projekte und Umsätze an einem zentralen Ort"
            steps={workflowSteps}
            benefitText="Klicken Sie auf eine Kundenkartei, um Details einzusehen oder legen Sie einen neuen Kunden an."
          />

          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 glass-card p-4 rounded-xl">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Kunde, Ansprechpartner, Ort suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs text-slate-400">Status:</span>
              {['all', 'aktiv', 'vip', 'interessent'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                    statusFilter === st ? 'bg-violet-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {st === 'all' ? 'Alle' : st}
                </button>
              ))}
            </div>
          </div>

          {/* Customer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCustomers.map((cust) => {
              const statusColors = {
                VIP: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
                Aktiv: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
                Interessent: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
              };

              return (
                <div
                  key={cust.id}
                  className="glass-card p-5 rounded-2xl flex flex-col justify-between border-slate-800 hover:border-violet-500/30 transition-all group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 font-semibold">{cust.id}</span>
                        <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors">
                          {cust.company}
                        </h3>
                        <p className="text-xs text-violet-400 font-medium">{cust.industry}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[cust.status] || statusColors.Aktiv}`}>
                        {cust.status}
                      </span>
                    </div>

                    <div className="space-y-2 py-3 border-y border-slate-800/80 text-xs">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{cust.contactPerson}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{cust.street}, {cust.city}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-mono">{cust.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{cust.email}</span>
                      </div>
                    </div>

                    {cust.notes && (
                      <div className="mt-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 italic">
                        "{cust.notes}"
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Bisheriger Umsatz:</span>
                      <span className="text-sm font-bold text-emerald-400">
                        {(cust.totalRevenue || 0).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => triggerRestrictedAction('Direktanruf & WhatsApp Connect', `In Ihrer Vollversion startet dieser Button direkt einen WhatsApp-Chat oder Anruf mit ${cust.contactPerson}.`)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-emerald-600/20 text-slate-300 hover:text-emerald-400 border border-slate-700 transition-all cursor-pointer"
                        title="Anruf / WhatsApp"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => deleteItem('customers', cust.id)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-rose-600/20 text-slate-500 hover:text-rose-400 border border-slate-700 transition-all cursor-pointer"
                        title="Löschen"
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

      {/* ======================= VARIANTE B: KANBAN ANGEBOTS-PIPELINE ======================= */}
      {activeVariant === 'b' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-violet-500/20 shadow-2xl space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  Sales & Lead-Pipeline
                </span>
                <h3 className="text-xl font-black text-white mt-1.5">
                  Interaktive Angebots- & Auftrags-Pipeline
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Verschieben Sie Angebote mit 1-Klick von der Anfrage bis zur Beauftragung.
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400">Aktives Pipeline-Volumen:</span>
                <div className="text-2xl font-black text-violet-400 font-mono">
                  {totalPipelineValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                </div>
              </div>
            </div>

            {/* Kanban Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {pipelineStages.map((stage, sIdx) => (
                <div key={stage.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80 mb-3">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-violet-400"></span>
                        {stage.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-bold">
                        {stage.deals.length}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {stage.deals.map((deal) => (
                        <div key={deal.id} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-violet-500/40 transition-all space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-violet-400 font-bold">{deal.id}</span>
                            <span className="text-[10px] px-2 py-0.2 rounded bg-slate-800 text-slate-300 font-mono font-bold">
                              WSK: {deal.prob}
                            </span>
                          </div>

                          <div className="font-bold text-white text-xs">{deal.customer}</div>
                          <p className="text-[11px] text-slate-400 leading-tight">{deal.title}</p>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 font-medium">
                            <span className="text-[10px] text-slate-500">{deal.contact}</span>
                            <span className="font-bold font-mono text-emerald-400">
                              {deal.value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                            </span>
                          </div>

                          {/* Move to next stage button */}
                          {sIdx < pipelineStages.length - 1 && (
                            <button
                              onClick={() => moveDeal(deal.id, pipelineStages[sIdx + 1].id)}
                              className="w-full mt-1.5 py-1.5 rounded-lg bg-slate-800 hover:bg-violet-600 text-slate-300 hover:text-white font-bold text-[10px] flex items-center justify-center gap-1 transition-all cursor-pointer"
                            >
                              <span>Weiter zu: {pipelineStages[sIdx + 1].name.split('&')[0]}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-900 text-[10px] text-slate-500 text-right">
                    Summe: {stage.deals.reduce((s, d) => s + d.value, 0).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================= VARIANTE C: KUNDEN-SELF-SERVICE-PORTAL ======================= */}
      {activeVariant === 'c' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-sky-500/20 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  Kunden-Login & Self-Service
                </span>
                <h3 className="text-xl font-black text-white mt-1.5">
                  Kunden-Portal Vorschau (Auftraggeber-Sicht)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  So sieht Ihr Kunde (z. B. Huber Bauunternehmung) seine Rechnungen, Freigaben und Service-Tickets in Echtzeit.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-xs">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-slate-300 font-bold">Angemeldet als: Huber Bauunternehmung</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left 2 Cols: Tickets & Service-Anfragen */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-sky-400" />
                    <span>Neues Service-Ticket / Mängelmeldung aufgeben</span>
                  </h4>

                  <form onSubmit={handleCreateCustomerTicket} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Beschreiben Sie Ihre Anfrage (z. B. Zusätzliche Steckdose im OG gewünscht)..."
                      value={newTicketText}
                      onChange={(e) => setNewTicketText(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Ticket absenden</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Ticket History */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-800">
                    Aktuelle Service-Vorgänge
                  </h4>

                  <div className="space-y-2.5">
                    {customerTickets.map((t) => (
                      <div key={t.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sky-400 font-bold text-[10px]">{t.id}</span>
                            <span className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                              t.status === 'Erledigt' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                              t.status === 'In Bearbeitung' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                              'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                            }`}>
                              {t.status}
                            </span>
                          </div>
                          <div className="font-bold text-white mt-1">{t.title}</div>
                        </div>

                        <span className="text-[11px] text-slate-400 font-mono">{t.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Col: Client Document Vault */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Meine Rechnungen & Belege</span>
                </h4>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-emerald-400 font-bold block">RE-2026-0142</span>
                      <span className="text-white font-semibold">1.404,20 €</span>
                    </div>
                    <span className="px-2 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-[11px] font-bold border border-slate-700 cursor-pointer">
                      PDF Download
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-emerald-400 font-bold block">RE-2026-0139</span>
                      <span className="text-white font-semibold">3.820,00 €</span>
                    </div>
                    <span className="px-2 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-[11px] font-bold border border-slate-700 cursor-pointer">
                      PDF Download
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300">
                  ✓ 100% DSGVO-konformes Portal mit SSL-Verschlüsselung und eigenem Firmenlogo für Ihren Kunden.
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
      </>
    )}

      {/* New Customer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel max-w-lg w-full p-6 rounded-3xl border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white">Neuen Kunden anlegen / Yeni Müşteri Ekle</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Stammdaten & Kontakt für Kundenverwaltung</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-slate-800"
              >
                ✕ Schließen / Kapat
              </button>
            </div>

            <form onSubmit={handleAddCustomer} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Firmenname / Şirket Adı *</label>
                <input
                  type="text"
                  required
                  placeholder="z.B. Müller Bau GmbH / Örn: Şirket Adı"
                  value={newCustomer.company}
                  onChange={(e) => setNewCustomer({ ...newCustomer, company: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Branche / Sektör *</label>
                  <input
                    type="text"
                    required
                    placeholder="z.B. Handwerk & Bau"
                    value={newCustomer.industry}
                    onChange={(e) => setNewCustomer({ ...newCustomer, industry: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Status / Müşteri Durumu</label>
                  <select
                    value={newCustomer.status}
                    onChange={(e) => setNewCustomer({ ...newCustomer, status: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Aktiv">Aktiv / Aktif Müşteri</option>
                    <option value="VIP">VIP Müşteri</option>
                    <option value="Interessent">Interessent / Aday Müşteri</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Ansprechpartner & Position / Yetkili Kişi *</label>
                <input
                  type="text"
                  required
                  placeholder="Herr / Frau Name (Pozisyon)"
                  value={newCustomer.contactPerson}
                  onChange={(e) => setNewCustomer({ ...newCustomer, contactPerson: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Telefon / Mobil *</label>
                  <input
                    type="text"
                    required
                    placeholder="+49 170 1234567"
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">E-Mail / E-Posta *</label>
                  <input
                    type="email"
                    required
                    placeholder="info@firma.de"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Straße & Nr. / Cadde & No *</label>
                  <input
                    type="text"
                    required
                    placeholder="Musterstr. 10"
                    value={newCustomer.street}
                    onChange={(e) => setNewCustomer({ ...newCustomer, street: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">PLZ & Ort / Posta Kodu & Şehir *</label>
                  <input
                    type="text"
                    required
                    placeholder="10115 Berlin"
                    value={newCustomer.city}
                    onChange={(e) => setNewCustomer({ ...newCustomer, city: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Notizen & Wünsche / Müşteri Notları</label>
                <textarea
                  rows="2"
                  placeholder="Notizen zum Kunden, Wünsche und Anforderungen..."
                  value={newCustomer.notes}
                  onChange={(e) => setNewCustomer({ ...newCustomer, notes: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                ></textarea>
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
                  className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold shadow-lg shadow-violet-500/20"
                >
                  Kunde anlegen / Müşteri Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
