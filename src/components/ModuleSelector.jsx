import React, { useState } from 'react';
import { useDemo } from '../context/DemoContext';
import { 
  LayoutDashboard, 
  Timer, 
  Receipt, 
  Users, 
  Truck, 
  KanbanSquare,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export const ModuleSelector = () => {
  const { activeModule, setActiveModule, data } = useDemo();
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const modules = [
    {
      id: 'overview',
      name: 'Übersicht',
      shortName: 'Übersicht',
      subtitle: 'Modul-Zentrale',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'zeiterfassung',
      name: 'Zeiterfassung',
      shortName: 'Zeiten',
      subtitle: 'Stempeluhr & PWA',
      icon: Timer,
      badge: `${data.timesheets?.length || 0}`
    },
    {
      id: 'rechnungen',
      name: '1-Klick Rechnungen',
      shortName: 'Rechnungen',
      subtitle: 'Angebote & PDF',
      icon: Receipt,
      badge: `${data.invoices?.length || 0}`
    },
    {
      id: 'crm',
      name: 'CRM & Kunden',
      shortName: 'CRM',
      subtitle: 'Kundenkartei',
      icon: Users,
      badge: `${data.customers?.length || 0}`
    },
    {
      id: 'fuhrpark',
      name: 'Fuhrpark & Touren',
      shortName: 'Fuhrpark',
      subtitle: 'Logistik',
      icon: Truck,
      badge: `${data.vehicles?.length || 0}`
    },
    {
      id: 'disposition',
      name: 'Auftragsdisposition',
      shortName: 'Aufträge',
      subtitle: 'Kanban-Board',
      icon: KanbanSquare,
      badge: `${data.tasks?.length || 0}`
    },
    {
      id: 'reinigung',
      name: 'Gebäudereinigung',
      shortName: 'Reinigung',
      subtitle: 'CleanPro Suite',
      icon: Sparkles,
      badge: '4'
    }
  ];

  const currentModuleObj = modules.find(m => m.id === activeModule) || modules[0];
  const CurrentIcon = currentModuleObj.icon;

  return (
    <div className="bg-slate-900/95 border-b border-slate-800 px-3 sm:px-6 lg:px-8 py-2.5">
      <div className="max-w-7xl w-full mx-auto">
        
        {/* DESKTOP VIEW: Sleek horizontal bar (hidden on mobile/tablet) */}
        <div className="hidden lg:flex items-center gap-2 justify-between">
          {modules.map((m) => {
            const Icon = m.icon;
            const isActive = activeModule === m.id;

            return (
              <button
                key={m.id}
                onClick={() => setActiveModule(m.id)}
                className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all relative ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-600/30 to-brand-500/20 text-white border border-brand-500/40 shadow-lg shadow-brand-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="leading-tight min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold tracking-tight truncate">{m.name}</span>
                    {m.badge && (
                      <span className={`text-[9px] font-semibold px-1.5 py-0.2 rounded-full shrink-0 ${
                        isActive ? 'bg-brand-500/30 text-brand-300' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {m.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 font-normal truncate">{m.subtitle}</p>
                </div>

                {isActive && (
                  <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-400 rounded-full shadow-[0_0_8px_#308eff]"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* MOBILE & TABLET VIEW: 100% Fit Responsive Grid - NO Horizontal Scrolling! */}
        <div className="lg:hidden">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-1.5">
            {modules.map((m) => {
              const Icon = m.icon;
              const isActive = activeModule === m.id;

              return (
                <button
                  key={m.id}
                  onClick={() => setActiveModule(m.id)}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl text-center transition-all relative ${
                    isActive
                      ? 'bg-brand-600/30 text-white border border-brand-500/50 shadow-md shadow-brand-500/10 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800/80 border border-slate-800/80'
                  }`}
                >
                  <div className="relative">
                    <Icon className={`w-4 h-4 mb-1 ${isActive ? 'text-brand-400' : 'text-slate-400'}`} />
                    {m.badge && (
                      <span className="absolute -top-1.5 -right-2 text-[8px] font-bold px-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {m.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] sm:text-xs font-semibold leading-tight truncate w-full">
                    {m.shortName}
                  </span>

                  {isActive && (
                    <div className="absolute bottom-0.5 left-2 right-2 h-0.5 bg-brand-400 rounded-full shadow-[0_0_6px_#308eff]"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
