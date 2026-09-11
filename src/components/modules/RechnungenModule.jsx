import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { ModuleWorkflowGuide } from '../ModuleWorkflowGuide';
import { VariantSelectorBar } from '../VariantSelectorBar';
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
  Calendar,
  Layers,
  FileCode2,
  Percent,
  AlertTriangle,
  Landmark,
  ArrowRight,
  ShieldCheck,
  Check
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
    createdCounts,
    addToast
  } = useDemo();

  // Active Variant State: 'a' (PDF & XRechnung) | 'b' (Abschlag & VOB) | 'c' (Mahnwesen & Bank)
  const [activeVariant, setActiveVariant] = useState('a');

  // Filter for Variante A
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

  // State for Variante B: Abschlags- & VOB-Rechnung
  const [vobProject, setVobProject] = useState({
    project: 'Neubau Wohnpark Würzburg-Nord (Bauabschnitt 2)',
    customer: 'Huber Bauunternehmung GmbH',
    totalContractNetto: 85000,
    currentProgressPercent: 65,
    retentionPercent: 5, // 5% VOB Sicherheitseinbehalt
    previousBilledNetto: 28500,
    milestones: [
      { name: '1. Abschlag: Erdarbeiten & Fundament (35%)', amount: 29750, billed: true, status: 'Bezahlt' },
      { name: '2. Abschlag: Rohbau & Mauerwerk (30%)', amount: 25500, billed: true, status: 'Aktuell fällig' },
      { name: '3. Abschlag: Dach & Fenstereinbau (20%)', amount: 17000, billed: false, status: 'In Arbeit' },
      { name: 'Schlussrechnung: Abnahme & Übergabe (15%)', amount: 12750, billed: false, status: 'Ausstehend' },
    ]
  });

  // State for Variante C: Mahnwesen & Bankabgleich
  const [bankTransactions, setBankTransactions] = useState([
    {
      id: 'tx-1',
      date: 'Heute, 09:15 Uhr',
      sender: 'Huber Bauunternehmung GmbH',
      iban: 'DE89 7905 0000 1234 5678 90',
      purpose: 'Rechnung RE-2026-0142 BV Wohnpark',
      amount: 1404.20,
      matchedInvoice: 'RE-2026-0142',
      status: 'Matched'
    },
    {
      id: 'tx-2',
      date: 'Gestern, 14:30 Uhr',
      sender: 'Bavaria Industrie & Handwerk',
      iban: 'DE44 7509 0000 9876 5432 10',
      purpose: 'Ausgleich Abschlagszahlung Metallbau',
      amount: 4850.00,
      matchedInvoice: null,
      status: 'Offen'
    }
  ]);

  const [dunningList, setDunningList] = useState([
    {
      id: 'MAHN-01',
      invoiceId: 'RE-2026-0138',
      customer: 'Kramer Tiefbau KG',
      overdueDays: 24,
      originalAmount: 3820.00,
      level: 2, // 1: Erinnerung, 2: 1. Mahnung, 3: 2. Mahnung / Letzte Mahnung
      fee: 10.00,
      interest: 18.45,
      lastSent: '04.09.2026'
    },
    {
      id: 'MAHN-02',
      invoiceId: 'RE-2026-0135',
      customer: 'Süd-Logistik Franken e.K.',
      overdueDays: 42,
      originalAmount: 1950.00,
      level: 3,
      fee: 25.00,
      interest: 32.10,
      lastSent: '28.08.2026'
    }
  ]);

  const handleMatchTransaction = (txId, invoiceId) => {
    setBankTransactions(bankTransactions.map(tx => {
      if (tx.id === txId) {
        return { ...tx, status: 'Matched', matchedInvoice: invoiceId || 'RE-2026-0142' };
      }
      return tx;
    }));
    addToast('Zahlung automatisch zugeordnet', `Die Banküberweisung wurde erfolgreich mit der Rechnung verbucht. Status auf Bezahlt gesetzt.`, 'success');
  };

  const handleEscalateDunning = (dunningId) => {
    setDunningList(dunningList.map(item => {
      if (item.id === dunningId) {
        const nextLevel = Math.min(3, item.level + 1);
        return { 
          ...item, 
          level: nextLevel,
          fee: nextLevel === 3 ? 25.00 : 10.00,
          lastSent: new Date().toLocaleDateString('de-DE')
        };
      }
      return item;
    }));
    addToast('Mahnstufe erhöht', 'Die nächste Mahnstufe inklusive Verzugszinsen und Gebühren wurde automatisch generiert.', 'info');
  };

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
      addToast('Rechnung erstellt', `Rechnung ${invNumber} wurde erfolgreich angelegt.`, 'success');
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
    addToast('1-Klick Rechnung generiert', `${invNumber} wurde aus erfassten Stunden erstellt.`, 'success');
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

  const variants = [
    {
      id: 'a',
      badge: 'A',
      label: 'Variante A',
      sub: 'PDF & XRechnung (ZUGFeRD)',
      icon: FileCode2
    },
    {
      id: 'b',
      badge: 'B',
      label: 'Variante B',
      sub: 'Abschlags- & VOB-Rechnung',
      icon: Percent
    },
    {
      id: 'c',
      badge: 'C',
      label: 'Variante C',
      sub: 'Mahnwesen & Bankabgleich',
      icon: Landmark
    }
  ];

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

      {/* Top Variant Selector Bar (Variante A, B, C) */}
      <VariantSelectorBar
        moduleName="Rechnungen & Finanzen"
        variants={variants}
        activeVariant={activeVariant}
        onSelectVariant={setActiveVariant}
      />

      {/* ======================= VARIANTE A: PDF & XRECHNUNG / ZUGFeRD ======================= */}
      {activeVariant === 'a' && (
        <div className="space-y-6">
          {/* Module Workflow Guide */}
          <ModuleWorkflowGuide
            moduleTitle="Rechnungswesen (Variante A: GoBD & XRechnung)"
            tagline="Von der Zeiterfassung zur GoBD-konformen PDF- und ZUGFeRD-XML-Rechnung in unter 60 Sekunden"
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
              <span className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 block">Inkl. 19% MwSt. & E-Rechnung</span>
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
                <div className="text-sm font-bold text-white mt-0.5">DATEV & ZUGFeRD 2.2</div>
                <span className="text-[10px] sm:text-[11px] text-emerald-400 font-semibold mt-0.5 block">100% GoBD-Konform</span>
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
                    filter === 'all' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
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

              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  E-Rechnungspflicht 2025/2026 Bereit
                </span>
              </div>
            </div>

            {/* MOBILE VIEW: Compact Card List */}
            <div className="lg:hidden mt-4 space-y-3">
              {filteredInvoices.map((inv) => {
                const subtotal = inv.items.reduce((s, it) => s + (it.qty * it.price), 0);
                const gross = subtotal * 1.19;

                return (
                  <div key={inv.id} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono font-bold text-emerald-400 text-xs">{inv.id}</span>
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
                        className="flex-1 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>PDF / XML Vorschau</span>
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
                        <td className="py-3.5 font-mono font-bold text-emerald-400">
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
                              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold transition-all"
                              title="PDF Rechnungsvorschau öffnen"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>PDF / XML</span>
                            </button>

                            <button
                              onClick={() => triggerRestrictedAction('E-Mail Rechnungsversand', 'In Ihrer Original-Software wird die Rechnung direkt per SMTP mit Ihrem Firmenbriefpapier an den Kunden versendet.')}
                              className="p-1.5 hover:text-emerald-400 text-slate-500 transition-colors"
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
        </div>
      )}

      {/* ======================= VARIANTE B: ABSCHLAGS- & VOB-RECHNUNG ======================= */}
      {activeVariant === 'b' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-amber-500/20 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  VOB/B & BGB Kumulierte Abrechnung
                </span>
                <h3 className="text-xl font-black text-white mt-1.5">
                  Abschlags- & Teilschlussrechnungen (Bau-Hakediş)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Kalkulieren Sie Baufortschritt, Sicherheitseinbehalt (5%) und ziehen Sie bisher geleistete Abschlagszahlungen automatisch ab.
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400">Gesamter Bauauftrag:</span>
                <div className="text-2xl font-black text-amber-400 font-mono">
                  {vobProject.totalContractNetto.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                </div>
              </div>
            </div>

            {/* Live Progress Slider & Calculation */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Progress Controls */}
              <div className="lg:col-span-2 space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">
                    Aktueller Baufortschritt: <span className="text-amber-400 font-mono text-sm">{vobProject.currentProgressPercent}%</span>
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Kummerter Leistungsstand: {((vobProject.totalContractNetto * vobProject.currentProgressPercent) / 100).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                  </span>
                </div>

                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={vobProject.currentProgressPercent}
                  onChange={(e) => setVobProject({ ...vobProject, currentProgressPercent: +e.target.value })}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />

                {/* Milestone breakdown */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-slate-300 block">Abschlags-Etappen (VOB-Meilensteine):</span>
                  {vobProject.milestones.map((m, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] ${
                          m.billed ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {idx + 1}
                        </div>
                        <span className="font-semibold text-slate-200">{m.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-white">
                          {m.amount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          m.status === 'Bezahlt' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                          m.status === 'Aktuell fällig' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 animate-pulse' :
                          'bg-slate-800 text-slate-400'
                        }`}>
                          {m.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Cumulative Calculation Card */}
              <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-5 rounded-2xl border border-amber-500/30 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 pb-2 border-b border-slate-800 flex items-center justify-between">
                    <span>2. Abschlagsrechnung (VOB)</span>
                    <span className="font-mono text-slate-400 text-[10px]">RE-VOB-2026-02</span>
                  </h4>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Bisheriger Leistungsstand ({vobProject.currentProgressPercent}%):</span>
                      <span className="text-white font-mono">{((vobProject.totalContractNetto * vobProject.currentProgressPercent) / 100).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</span>
                    </div>

                    <div className="flex justify-between text-slate-400">
                      <span>Abzgl. 5% Sicherheitseinbehalt:</span>
                      <span className="text-rose-400 font-mono">- {(((vobProject.totalContractNetto * vobProject.currentProgressPercent) / 100) * 0.05).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</span>
                    </div>

                    <div className="flex justify-between text-slate-400">
                      <span>Abzgl. 1. Abschlag (bereits bezahlt):</span>
                      <span className="text-rose-400 font-mono">- {vobProject.previousBilledNetto.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</span>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex justify-between font-bold text-slate-200">
                      <span>Netto-Zahlbetrag:</span>
                      <span className="font-mono text-amber-300">
                        {((((vobProject.totalContractNetto * vobProject.currentProgressPercent) / 100) * 0.95) - vobProject.previousBilledNetto).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                      </span>
                    </div>

                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>Zzgl. 19% MwSt.:</span>
                      <span className="font-mono">
                        {(((((vobProject.totalContractNetto * vobProject.currentProgressPercent) / 100) * 0.95) - vobProject.previousBilledNetto) * 0.19).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-white">Fälliger Endbetrag:</span>
                    <span className="text-lg font-black font-mono text-emerald-400">
                      {(((((vobProject.totalContractNetto * vobProject.currentProgressPercent) / 100) * 0.95) - vobProject.previousBilledNetto) * 1.19).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      addToast('VOB-Abschlagsrechnung erstellt', 'Die kumulierte Abschlagsrechnung mit Sicherheitseinbehalt wurde rechtssicher nach VOB generiert.', 'success');
                    }}
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>VOB-Abschlag jetzt generieren</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ======================= VARIANTE C: MAHNWESEN & BANKABGLEICH ======================= */}
      {activeVariant === 'c' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left: Dunning Radar (Mahnwesen) */}
            <div className="glass-panel p-6 rounded-3xl border border-rose-500/20 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    Forderungsmanagement
                  </span>
                  <h3 className="text-lg font-black text-white mt-1">
                    Automatisiertes 3-Stufen Mahnwesen
                  </h3>
                </div>
                <AlertTriangle className="w-6 h-6 text-rose-400" />
              </div>

              <p className="text-xs text-slate-400">
                Überfällige Rechnungen werden nach Fristablauf automatisch in Zahlungserinnerung, 1. oder 2. Mahnung gestuft (inkl. Verzugszinsen nach BGB § 288).
              </p>

              <div className="space-y-3">
                {dunningList.map((m) => (
                  <div key={m.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-rose-400 text-xs">{m.invoiceId}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            m.level === 1 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                            m.level === 2 ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                            'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse'
                          }`}>
                            {m.level === 1 ? 'Zahlungserinnerung' : m.level === 2 ? '1. Mahnung (+10 €)' : '2. Mahnung / Letzte Frist (+25 €)'}
                          </span>
                        </div>
                        <div className="font-bold text-white text-xs mt-1">{m.customer}</div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-rose-400 font-bold block">{m.overdueDays} Tage überfällig</span>
                        <span className="text-sm font-black font-mono text-white">
                          {(m.originalAmount + m.fee + m.interest).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                      <span>Letzter Versand: {m.lastSent}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEscalateDunning(m.id)}
                          className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <ArrowRight className="w-3 h-3" />
                          <span>Nächste Stufe</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Bank Reconciliation (Live Bankabgleich) */}
            <div className="glass-panel p-6 rounded-3xl border border-sky-500/20 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    Fintech & FinTS / EBICS
                  </span>
                  <h3 className="text-lg font-black text-white mt-1">
                    Live-Kontoauszug & Zahlungsabgleich
                  </h3>
                </div>
                <Landmark className="w-6 h-6 text-sky-400" />
              </div>

              <p className="text-xs text-slate-400">
                Eingehende Banküberweisungen werden per KI mit offenen Rechnungsnummern und Kundennamen abgeglichen.
              </p>

              <div className="space-y-3">
                {bankTransactions.map((tx) => (
                  <div key={tx.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-[11px] text-slate-400">{tx.date}</div>
                        <div className="font-bold text-white text-xs mt-0.5">{tx.sender}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{tx.purpose}</div>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-black font-mono text-emerald-400">
                          + {tx.amount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                      {tx.status === 'Matched' ? (
                        <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          Zugeordnet zu {tx.matchedInvoice} (Bezahlt)
                        </span>
                      ) : (
                        <span className="text-[11px] text-amber-400 font-bold">
                          Zahlungseingang unzugeordnet
                        </span>
                      )}

                      {tx.status !== 'Matched' && (
                        <button
                          onClick={() => handleMatchTransaction(tx.id, 'RE-2026-0142')}
                          className="px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-[11px] flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>1-Klick Abgleichen</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

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
