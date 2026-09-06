import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { ModuleWorkflowGuide } from '../ModuleWorkflowGuide';
import { 
  Receipt, 
  Plus, 
  FileText, 
  Download, 
  Send, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Eye, 
  Sparkles,
  Building,
  Calendar
} from 'lucide-react';

export const RechnungenModule = () => {
  const { 
    data, 
    addItem, 
    updateItem, 
    deleteItem, 
    openInvoicePreview, 
    triggerRestrictedAction, 
    openUpgradeModal,
    maxCreationLimit,
    createdCounts
  } = useDemo();

  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    customer: 'Huber Bauunternehmung GmbH',
    contact: 'Michael Huber',
    address: 'Gewerbestraße 14, 97076 Würzburg',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'Offen',
    notes: 'Zahlbar innerhalb von 14 Tagen rein netto auf das angegebene Geschäftskonto.',
    items: [
      { desc: 'Bauleitung & Baustellenkoordination', qty: 12, unit: 'Std.', price: 75.0 },
      { desc: 'Material & Entsorgungspauschale', qty: 1, unit: 'Psch.', price: 280.0 }
    ]
  });

  const handleAddItemRow = () => {
    setNewInvoice({
      ...newInvoice,
      items: [...newInvoice.items, { desc: 'Neue Position', qty: 1, unit: 'Stk.', price: 100.0 }]
    });
  };

  const handleUpdateItemRow = (idx, field, val) => {
    const updated = [...newInvoice.items];
    updated[idx][field] = val;
    setNewInvoice({ ...newInvoice, items: updated });
  };

  const handleRemoveItemRow = (idx) => {
    if (newInvoice.items.length <= 1) return;
    setNewInvoice({
      ...newInvoice,
      items: newInvoice.items.filter((_, i) => i !== idx)
    });
  };

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    const invNumber = `RE-2026-0${140 + (data.invoices?.length || 0) + 1}`;
    const added = addItem('invoices', {
      id: invNumber,
      ...newInvoice
    });

    if (added) {
      setIsModalOpen(false);
    }
  };

  // 1-Click Generation from timesheets
  const handleAutoGenerateFromTimesheets = () => {
    const unbilledHours = (data.timesheets || []).reduce((acc, ts) => acc + (ts.totalHours || 0), 0);
    const avgRate = 70.0;
    const invNumber = `RE-2026-AUTO-${Date.now().toString().slice(-3)}`;
    
    addItem('invoices', {
      id: invNumber,
      customer: 'Huber Bauunternehmung GmbH',
      contact: 'Michael Huber',
      address: 'Gewerbestraße 14, 97076 Würzburg',
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Offen',
      items: [
        { desc: `Automatische Abrechnung Zeiterfassung (${unbilledHours.toFixed(1)} Std.)`, qty: unbilledHours || 16, unit: 'Std.', price: avgRate },
        { desc: 'Fahrtkosten & Anfahrt Würzburg-Nord', qty: 2, unit: 'Psch.', price: 45.0 }
      ],
      notes: '1-Klick generiert aus verifizierten Baustellen-Stempelzeiten.'
    });
  };

  const filteredInvoices = (data.invoices || []).filter(inv => {
    if (filter === 'all') return true;
    return inv.status.toLowerCase() === filter.toLowerCase();
  });

  const totalSum = (data.invoices || []).reduce((acc, inv) => {
    const sub = inv.items.reduce((s, it) => s + (it.qty * it.price), 0);
    return acc + sub * 1.19;
  }, 0);

  const openSum = (data.invoices || []).filter(i => i.status === 'Offen').reduce((acc, inv) => {
    const sub = inv.items.reduce((s, it) => s + (it.qty * it.price), 0);
    return acc + sub * 1.19;
  }, 0);

  const workflowSteps = [
    {
      title: '1. Zeiten & Material importieren',
      desc: 'Wählen Sie einen Kunden oder importieren Sie verifizierte Arbeitszeiten mit dem „1-Klick aus Zeiten“-Button.',
      hint: 'Nahtlose Übergabe aus Modul 1'
    },
    {
      title: '2. Zahlungsziel & MwSt. prüfen',
      desc: 'Positionen, Mengen, 19% MwSt. und Fälligkeitsfristen werden automatisch fehlerfrei berechnet.',
      hint: 'Skonto & Rabatte hinterlegbar'
    },
    {
      title: '3. PDF-Vorschau mit Firmenlogo',
      desc: 'Klicken Sie auf das Auge-Symbol, um den offiziellen Beleg inklusive Briefkopf und Bankdaten zu prüfen.',
      hint: 'Rechtssicher nach GoBD'
    },
    {
      title: '4. DATEV-Export & Rechnungsversand',
      desc: 'Beleg per E-Mail an den Kunden senden und mit einem Klick an Ihren Steuerberater übermitteln.',
      hint: 'DATEV & SevDesk bereit'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 w-full overflow-hidden">
      
      {/* Header Bar (Stacking on mobile, side-by-side on desktop) */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 glass-panel p-4 sm:p-6 rounded-2xl w-full">
        <div className="w-full lg:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Modul 2</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Limit: {createdCounts.invoices}/{maxCreationLimit} Belege
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">1-Klick Rechnungen & Angebote</h2>
          <p className="text-xs text-slate-400 mt-1">
            Zeiten & Material mit einem Klick in rechtssichere PDF-Rechnungen umwandeln. Inklusive MwSt.-Berechnung und DATEV-Schnittstelle.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
          <button
            onClick={handleAutoGenerateFromTimesheets}
            className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all w-full sm:w-auto"
            title="1-Klick Rechnung aus Zeiterfassung erstellen"
          >
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span>1-Klick aus Zeiten</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Rechnung erstellen</span>
          </button>
        </div>
      </div>

      {/* Module Workflow Guide */}
      <ModuleWorkflowGuide
        moduleTitle="Rechnungswesen"
        tagline="Von der Zeiterfassung zur GoBD-konformen PDF-Rechnung in unter 60 Sekunden"
        steps={workflowSteps}
        benefitText="Klicken Sie oben auf „1-Klick aus Zeiten“ oder öffnen Sie die PDF-Vorschau eines Belegs."
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="glass-card p-4 rounded-xl">
          <span className="text-xs text-slate-400 font-medium">Gesamtfakturierung</span>
          <div className="text-xl sm:text-2xl font-black text-white mt-1">
            {totalSum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </div>
          <span className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 block">Inkl. 19% MwSt.</span>
        </div>

        <div className="glass-card p-4 rounded-xl border-amber-500/20">
          <span className="text-xs text-slate-400 font-medium">Offene Forderungen</span>
          <div className="text-xl sm:text-2xl font-black text-amber-400 mt-1">
            {openSum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </div>
          <span className="text-[10px] sm:text-[11px] text-amber-400/80 mt-0.5 block">Fälligkeitsüberwachung aktiv</span>
        </div>

        <div className="glass-card p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Schnittstellen</span>
            <div className="text-sm font-bold text-white mt-0.5">DATEV & SevDesk</div>
            <span className="text-[10px] sm:text-[11px] text-emerald-400 font-semibold mt-0.5 block">100% Exportbereit</span>
          </div>
          <button
            onClick={() => triggerRestrictedAction('DATEV Schnittstellen-Sync', 'In Ihrer Vollversion synchronisiert TeamTrack Rechnungen automatisch mit Ihrem Steuerberater (DATEV Belegtransfer).')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 font-medium shrink-0"
          >
            DATEV
          </button>
        </div>
      </div>

      {/* Invoice List & Filter Tabs */}
      <div className="glass-card p-4 sm:p-6 rounded-2xl w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === 'all' ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Alle ({data.invoices?.length || 0})
            </button>
            <button
              onClick={() => setFilter('offen')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === 'offen' ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Offen
            </button>
            <button
              onClick={() => setFilter('bezahlt')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === 'bezahlt' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Bezahlt
            </button>
          </div>

          <span className="text-[11px] text-slate-400">
            Tippen Sie auf <strong className="text-brand-400">"PDF"</strong> für Beleg mit Demo-Wasserzeichen.
          </span>
        </div>

        {/* MOBILE VIEW: Compact Card List (No horizontal overflow!) */}
        <div className="lg:hidden mt-4 space-y-3">
          {filteredInvoices.map((inv) => {
            const subtotal = inv.items.reduce((s, it) => s + (it.qty * it.price), 0);
            const gross = subtotal * 1.19;

            return (
              <div key={inv.id} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono font-bold text-brand-400 text-xs">{inv.id}</span>
                  <button
                    onClick={() => updateItem('invoices', inv.id, { status: inv.status === 'Bezahlt' ? 'Offen' : 'Bezahlt' })}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      inv.status === 'Bezahlt'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}
                  >
                    {inv.status}
                  </button>
                </div>

                <div>
                  <div className="font-bold text-white text-xs">{inv.customer}</div>
                  <div className="text-[11px] text-slate-400">{inv.contact}</div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>{inv.date}</span>
                  </div>
                  <div className="font-bold text-white text-xs">
                    {gross.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => openInvoicePreview(inv)}
                    className="flex-1 py-1.5 rounded-lg bg-brand-600/20 hover:bg-brand-600 text-brand-300 hover:text-white border border-brand-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>PDF Vorschau</span>
                  </button>

                  <button
                    onClick={() => deleteItem('invoices', inv.id)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* DESKTOP VIEW: Full Wide Table */}
        <div className="hidden lg:block mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800/80">
                <th className="pb-3 font-semibold">Belegnummer</th>
                <th className="pb-3 font-semibold">Kunde & Anschrift</th>
                <th className="pb-3 font-semibold">Rechnungsdatum</th>
                <th className="pb-3 font-semibold">Fällig bis</th>
                <th className="pb-3 font-semibold text-right">Netto</th>
                <th className="pb-3 font-semibold text-right">Brutto (19%)</th>
                <th className="pb-3 font-semibold text-center">Status</th>
                <th className="pb-3 font-semibold text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {filteredInvoices.map((inv) => {
                const subtotal = inv.items.reduce((s, it) => s + (it.qty * it.price), 0);
                const gross = subtotal * 1.19;

                return (
                  <tr key={inv.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 font-mono font-bold text-brand-400">
                      {inv.id}
                    </td>
                    <td className="py-3.5">
                      <div className="font-semibold text-white">{inv.customer}</div>
                      <div className="text-[11px] text-slate-400">{inv.contact}</div>
                    </td>
                    <td className="py-3.5 text-slate-300">{inv.date}</td>
                    <td className="py-3.5 text-slate-300">{inv.dueDate}</td>
                    <td className="py-3.5 text-right font-medium text-slate-300">
                      {subtotal.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </td>
                    <td className="py-3.5 text-right font-bold text-white">
                      {gross.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </td>
                    <td className="py-3.5 text-center">
                      <button
                        onClick={() => updateItem('invoices', inv.id, { status: inv.status === 'Bezahlt' ? 'Offen' : 'Bezahlt' })}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
                          inv.status === 'Bezahlt'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}
                        title="Klicken, um Status zu wechseln"
                      >
                        {inv.status}
                      </button>
                    </td>
                    <td className="py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openInvoicePreview(inv)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-600/20 hover:bg-brand-600/40 text-brand-300 border border-brand-500/30 text-[11px] font-bold transition-all"
                          title="PDF Rechnungsvorschau öffnen"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </button>

                        <button
                          onClick={() => triggerRestrictedAction('E-Mail Rechnungsversand', 'In Ihrer Original-Software wird die Rechnung direkt per SMTP / Mailgun mit Ihrem Firmenbriefpapier an den Kunden versendet.')}
                          className="p-1.5 hover:text-brand-400 text-slate-500 transition-colors"
                          title="Per E-Mail senden (Demo gesperrt)"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => deleteItem('invoices', inv.id)}
                          className="p-1.5 hover:text-rose-400 text-slate-500 transition-colors"
                          title="Löschen"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Invoice Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel max-w-2xl w-full p-4 sm:p-6 rounded-3xl border border-white/10 shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base sm:text-lg font-bold text-white">Neue Rechnung erstellen</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded-lg bg-slate-800"
              >
                ✕ Schließen
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Kundenname / Firma:</label>
                  <input
                    type="text"
                    required
                    value={newInvoice.customer}
                    onChange={(e) => setNewInvoice({ ...newInvoice, customer: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Ansprechpartner:</label>
                  <input
                    type="text"
                    required
                    value={newInvoice.contact}
                    onChange={(e) => setNewInvoice({ ...newInvoice, contact: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Rechnungsadresse:</label>
                <input
                  type="text"
                  required
                  value={newInvoice.address}
                  onChange={(e) => setNewInvoice({ ...newInvoice, address: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Rechnungsdatum:</label>
                  <input
                    type="date"
                    required
                    value={newInvoice.date}
                    onChange={(e) => setNewInvoice({ ...newInvoice, date: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Fälligkeitsdatum:</label>
                  <input
                    type="date"
                    required
                    value={newInvoice.dueDate}
                    onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              {/* Positionen */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-slate-300 font-bold">Rechnungspositionen:</label>
                  <button
                    type="button"
                    onClick={handleAddItemRow}
                    className="text-brand-400 hover:text-brand-300 text-xs font-semibold flex items-center gap-1"
                  >
                    + Position
                  </button>
                </div>

                <div className="space-y-2">
                  {newInvoice.items.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:grid sm:grid-cols-12 gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                      <div className="sm:col-span-6">
                        <input
                          type="text"
                          required
                          placeholder="Beschreibung"
                          value={item.desc}
                          onChange={(e) => handleUpdateItemRow(idx, 'desc', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                        />
                      </div>
                      <div className="flex items-center gap-2 sm:col-span-5">
                        <input
                          type="number"
                          step="0.1"
                          required
                          placeholder="Menge"
                          value={item.qty}
                          onChange={(e) => handleUpdateItemRow(idx, 'qty', parseFloat(e.target.value) || 0)}
                          className="w-20 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white text-right"
                        />
                        <input
                          type="number"
                          step="0.01"
                          required
                          placeholder="Einzelpreis €"
                          value={item.price}
                          onChange={(e) => handleUpdateItemRow(idx, 'price', parseFloat(e.target.value) || 0)}
                          className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white text-right"
                        />
                      </div>
                      <div className="sm:col-span-1 text-right sm:text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveItemRow(idx)}
                          className="text-rose-400 hover:text-rose-300 font-bold p-1"
                        >
                          ✕ Entfernen
                        </button>
                      </div>
                    </div>
                  ))}
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
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/20"
                >
                  Rechnung erstellen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
