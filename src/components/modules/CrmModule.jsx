import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { ModuleWorkflowGuide } from '../ModuleWorkflowGuide';
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
  DollarSign
} from 'lucide-react';

export const CrmModule = () => {
  const { 
    data, 
    addItem, 
    deleteItem, 
    triggerRestrictedAction, 
    openUpgradeModal,
    maxCreationLimit,
    createdCounts 
  } = useDemo();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    }
  };

  const filteredCustomers = (data.customers || []).filter(c => {
    const matchesSearch = c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

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

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => triggerRestrictedAction('CRM Excel/CSV Export', 'In Ihrer Vollversion können alle Kundendaten, Leads und Notizen DSGVO-konform exportiert oder aus Alt-Systemen importiert werden.')}
            className="flex-1 md:flex-none px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
          >
            Kundenliste exportieren
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-lg shadow-violet-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Kunde anlegen</span>
          </button>
        </div>
      </div>

      {/* Module Workflow Guide */}
      <ModuleWorkflowGuide
        moduleTitle="Kundenverwaltung (CRM)"
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
                    className="p-2 rounded-lg bg-slate-800 hover:bg-emerald-600/20 text-slate-300 hover:text-emerald-400 border border-slate-700 transition-all"
                    title="Anruf / WhatsApp"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => deleteItem('customers', cust.id)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-rose-600/20 text-slate-500 hover:text-rose-400 border border-slate-700 transition-all"
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

      {/* New Customer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel max-w-lg w-full p-6 rounded-3xl border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Neuen Kunden anlegen</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded-lg bg-slate-800"
              >
                ✕ Schließen
              </button>
            </div>

            <form onSubmit={handleAddCustomer} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Firmenname:</label>
                <input
                  type="text"
                  required
                  value={newCustomer.company}
                  onChange={(e) => setNewCustomer({ ...newCustomer, company: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Branche:</label>
                  <input
                    type="text"
                    required
                    value={newCustomer.industry}
                    onChange={(e) => setNewCustomer({ ...newCustomer, industry: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Status:</label>
                  <select
                    value={newCustomer.status}
                    onChange={(e) => setNewCustomer({ ...newCustomer, status: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Aktiv">Aktiv</option>
                    <option value="VIP">VIP</option>
                    <option value="Interessent">Interessent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Ansprechpartner & Position:</label>
                <input
                  type="text"
                  required
                  value={newCustomer.contactPerson}
                  onChange={(e) => setNewCustomer({ ...newCustomer, contactPerson: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Telefon:</label>
                  <input
                    type="text"
                    required
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">E-Mail:</label>
                  <input
                    type="email"
                    required
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Straße & Nr.:</label>
                  <input
                    type="text"
                    required
                    value={newCustomer.street}
                    onChange={(e) => setNewCustomer({ ...newCustomer, street: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">PLZ & Ort:</label>
                  <input
                    type="text"
                    required
                    value={newCustomer.city}
                    onChange={(e) => setNewCustomer({ ...newCustomer, city: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Notiz / Besonderheiten:</label>
                <textarea
                  rows="2"
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
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold shadow-lg shadow-violet-500/20"
                >
                  Kunde speichern
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
