import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { 
  Timer, 
  Receipt, 
  Users, 
  Truck, 
  KanbanSquare, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Smartphone, 
  CheckCircle2, 
  Lock,
  Building,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const OverviewHub = () => {
  const { setActiveModule, openUpgradeModal, data, clientId, isAdmin } = useDemo();

  const totalInvoiced = (data.invoices || []).reduce((acc, inv) => {
    const sub = inv.items.reduce((s, it) => s + (it.qty * it.price), 0);
    return acc + sub * 1.19;
  }, 0);

  const totalTrackedHours = (data.timesheets || []).reduce((acc, ts) => acc + (ts.totalHours || 0), 0);
  const activeVehicles = (data.vehicles || []).filter(v => v.status === 'Auf Tour').length;
  const openTasks = (data.tasks || []).filter(t => t.status !== 'done').length;

  const moduleCards = [
    {
      id: 'zeiterfassung',
      title: 'Zeiterfassung & Stempeluhr',
      category: 'Mobile PWA für Baustelle & Büro',
      desc: 'Mitarbeiter stempeln Arbeitszeiten sekundengenau per Smartphone oder Tablet. Inklusive GPS-Verifikation und Stundensatz-Kalkulation.',
      icon: Timer,
      color: 'from-blue-600 to-cyan-500',
      stat: `${totalTrackedHours.toFixed(1)} Std. erfasst`,
      features: ['Live-Stempeluhr mit Pausenfunktion', 'GPS-Standortprüfung für Baustellen', 'Puantaj & Überstunden-Kalkulation']
    },
    {
      id: 'rechnungen',
      title: '1-Klick Rechnungen & Angebote',
      category: 'Finanzen & DATEV Integration',
      desc: 'Wandeln Sie erfasste Arbeitszeiten und Material direkt in professionelle PDF-Rechnungen um – mit 19% MwSt. und DATEV-Schnittstelle.',
      icon: Receipt,
      color: 'from-emerald-600 to-teal-500',
      stat: `${totalInvoiced.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })} Gesamt`,
      features: ['Rechnungserstellung in unter 1 Minute', 'Rechtskonforme PDF-Belege & Rabatte', 'DATEV & SevDesk Anbindung']
    },
    {
      id: 'crm',
      title: 'CRM & Kundenverwaltung',
      category: 'Kundenakten & Kontakthistorie',
      desc: 'Behalten Sie alle Kunden, Ansprechpartner, Umsätze und offene Aufträge an einem zentralen Ort im Blick. Kein Zettelchaos mehr.',
      icon: Users,
      color: 'from-violet-600 to-indigo-500',
      stat: `${data.customers?.length || 0} Kundenstamm`,
      features: ['Digitale Kundenakten & Historie', '1-Klick Anruf & WhatsApp Start', 'Umsatzübersicht & Zahlungsstatus']
    },
    {
      id: 'fuhrpark',
      title: 'Fuhrpark & Touren-Logistik',
      category: 'Fahrzeuge, KM-Stände & Disposition',
      desc: 'Verwalten Sie Transporter, LKWs und Service-Fahrzeuge. Überwachen Sie Tankstände, Servicefristen und weisen Sie Touren zu.',
      icon: Truck,
      color: 'from-amber-600 to-orange-500',
      stat: `${activeVehicles} von ${data.vehicles?.length || 0} auf Tour`,
      features: ['Fahrzeugstatus & KM-Überwachung', 'Fahrer- und Tourenzuweisung', 'TÜV & Inspektions-Erinnerung']
    },
    {
      id: 'disposition',
      title: 'Auftragsdisposition & Kanban',
      category: 'Team-Planung & Arbeitsabläufe',
      desc: 'Koordinieren Sie Aufträge, Baustellen-Teams und Fristen über ein intuitives Kanban-Board mit Statusverfolgung in Echtzeit.',
      icon: KanbanSquare,
      color: 'from-rose-600 to-pink-500',
      stat: `${openTasks} offene Aufträge`,
      features: ['Interaktives Drag-and-Drop Board', 'Fristen & Prioritäten (Hoch, Mittel)', 'Mitarbeiter-Kapazitätsplanung']
    },
    {
      id: 'reinigung',
      title: 'Gebäudereinigung & CleanPro Suite',
      category: 'Hotel- & Objektreinigung, Dienstplaner',
      desc: 'Komplettsystem für Reinigungsfirmen: Zimmerkategorien, Objektleiter-Modus, Wochen-Dienstplaner mit PDF, §3b EStG Lohnzuschläge & digitale Kundenabnahme.',
      icon: Sparkles,
      color: 'from-emerald-600 to-teal-500',
      stat: `Vollversion Aktiv`,
      features: ['Hotel-Objekte & Zimmerabrechnung', 'Dienstplaner & §3b EStG Lohnzuschlag', 'Touch-Unterschrift & Express-Kalkulator']
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-navy-900 to-slate-950 border border-brand-500/20 p-6 lg:p-10 shadow-2xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-10 bottom-0 opacity-10 hidden xl:block pointer-events-none">
          <Zap className="w-96 h-96 text-brand-400" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            {isAdmin ? 'Live Demo- & Präsentationssystem (Admin)' : `Interaktive Testumgebung für ${clientId}`}
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Willkommen in Ihrer individuellen <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-cyan-300">TeamTrack WebApp</span>
          </h1>

          <p className="mt-3 text-slate-300 text-sm lg:text-base leading-relaxed">
            Testen Sie alle 5 Kernmodule praxisnah und interaktiv. Erfassen Sie Testzeiten, erstellen Sie Musterrechnungen und planen Sie Fuhrpark und Aufträge. 
            Ihre Änderungen werden in Ihrer persönlichen Sandbox isoliert gespeichert.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveModule('zeiterfassung')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold shadow-lg shadow-brand-500/25 transition-all"
            >
              <span>Erstes Modul testen</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => openUpgradeModal('Komplettlösung')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-sm font-semibold transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Original-System für meine Firma</span>
            </button>
          </div>
        </div>

        {/* Live Sandbox Quick Stats */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-800">
            <span className="text-xs text-slate-400 block font-medium">Erfasste Stunden</span>
            <span className="text-xl font-bold text-white mt-1 block">{totalTrackedHours.toFixed(1)} Std.</span>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-800">
            <span className="text-xs text-slate-400 block font-medium">Muster-Umsatz</span>
            <span className="text-xl font-bold text-emerald-400 mt-1 block">
              {totalInvoiced.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
            </span>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-800">
            <span className="text-xs text-slate-400 block font-medium">Fuhrpark aktiv</span>
            <span className="text-xl font-bold text-amber-400 mt-1 block">{activeVehicles} Einheiten</span>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-800">
            <span className="text-xs text-slate-400 block font-medium">Offene Aufträge</span>
            <span className="text-xl font-bold text-cyan-400 mt-1 block">{openTasks} Dispositionen</span>
          </div>
        </div>
      </div>

      {/* 5 Modules Grid */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-white">Wählen Sie ein Modul zur Live-Erprobung</h2>
            <p className="text-xs text-slate-400 mt-0.5">Klicken Sie auf ein Modul, um Beispieldaten zu bearbeiten oder neue Einträge anzulegen.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {moduleCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => setActiveModule(card.id)}
                className="glass-card rounded-2xl p-6 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-500/5 to-transparent rounded-bl-full pointer-events-none group-hover:from-brand-500/15 transition-all"></div>
                
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {card.stat}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">{card.category}</span>
                  <h3 className="text-lg font-bold text-white mt-1 group-hover:text-brand-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {card.desc}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-1.5">
                    {card.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 flex items-center justify-between text-xs font-bold text-brand-400 group-hover:text-brand-300">
                  <span>Modul jetzt testen</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}

          {/* White-Label Info Card */}
          <div className="glass-card rounded-2xl p-6 flex flex-col justify-between border-dashed border-brand-500/30 bg-brand-950/20">
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-brand-400 mb-4">
                <Building className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">100% White-Label</span>
              <h3 className="text-lg font-bold text-white mt-1">Ihr eigenes Firmen-Branding</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                In der Vollversion läuft die Software komplett unter Ihrer eigenen Internet-Domain (z.B. <code className="text-brand-300">portal.ihre-firma.de</code>), mit Ihrem Unternehmenslogo und Firmenfarben.
              </p>
            </div>

            <button
              onClick={() => openUpgradeModal('White-Label Portal')}
              className="mt-6 w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all"
            >
              <span>White-Label Angebot anfragen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Advantage & Trust Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
          <Smartphone className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-white">Mobile WebApp (PWA)</h4>
            <p className="text-xs text-slate-400 mt-0.5">Keine Installation über App-Stores nötig. Funktioniert sofort auf jedem Smartphone und Tablet auf der Baustelle.</p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-white">100% DSGVO & Deutsche Server</h4>
            <p className="text-xs text-slate-400 mt-0.5">Ihre Daten bleiben in Deutschland geschützt. Höchste Sicherheitsstandards und tägliche Datensicherungen.</p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-white">Direkter Entwickler-Kontakt</h4>
            <p className="text-xs text-slate-400 mt-0.5">Keine Agentur-Bürokratie. Sie sprechen direkt mit dem Entwickler, der Ihren Code schreibt und pflegt.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
