import React from 'react';
import { useDemo } from '../context/DemoContext';
import { 
  LayoutDashboard, 
  Timer, 
  Receipt, 
  Users, 
  Truck, 
  KanbanSquare 
} from 'lucide-react';

export const ModuleSelector = () => {
  const { activeModule, setActiveModule, data } = useDemo();

  const modules = [
    {
      id: 'overview',
      name: 'Übersicht',
      subtitle: 'Modul-Zentrale',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'zeiterfassung',
      name: 'Zeiterfassung',
      subtitle: 'Stempeluhr & PWA',
      icon: Timer,
      badge: `${data.timesheets?.length || 0} Einträge`
    },
    {
      id: 'rechnungen',
      name: '1-Klick Rechnungen',
      subtitle: 'Angebote & PDF',
      icon: Receipt,
      badge: `${data.invoices?.length || 0} Belege`
    },
    {
      id: 'crm',
      name: 'CRM & Kunden',
      subtitle: 'Kundenkartei & Akten',
      icon: Users,
      badge: `${data.customers?.length || 0} Firmen`
    },
    {
      id: 'fuhrpark',
      name: 'Fuhrpark & Touren',
      subtitle: 'Fahrzeuge & Logistik',
      icon: Truck,
      badge: `${data.vehicles?.length || 0} Einheiten`
    },
    {
      id: 'disposition',
      name: 'Auftragsdisposition',
      subtitle: 'Kanban-Board',
      icon: KanbanSquare,
      badge: `${data.tasks?.length || 0} Aufträge`
    }
  ];

  return (
    <div className="bg-slate-900/90 border-b border-slate-800 px-4 lg:px-8 py-2 overflow-x-auto h-16 flex items-center">
      <div className="max-w-7xl w-full mx-auto flex items-center gap-2 min-w-max">
        {modules.map((m) => {
          const Icon = m.icon;
          const isActive = activeModule === m.id;

          return (
            <button
              key={m.id}
              onClick={() => setActiveModule(m.id)}
              className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-left transition-all relative shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-brand-600/30 to-brand-500/20 text-white border border-brand-500/40 shadow-lg shadow-brand-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold tracking-tight">{m.name}</span>
                  {m.badge && (
                    <span className={`text-[9px] font-semibold px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-brand-500/30 text-brand-300' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {m.badge}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 font-normal">{m.subtitle}</p>
              </div>

              {isActive && (
                <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-400 rounded-full shadow-[0_0_8px_#308eff]"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
