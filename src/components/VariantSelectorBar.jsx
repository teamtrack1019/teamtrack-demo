import React from 'react';
import { Layers } from 'lucide-react';

export const VariantSelectorBar = ({
  moduleName,
  variants, // array of { id: 'a'|'b'|'c', label: 'Variante A', sub: 'Live-Stempeluhr', badge: 'A', icon: LucideIcon }
  activeVariant,
  onSelectVariant
}) => {
  return (
    <div className="bg-slate-900/90 backdrop-blur border border-slate-800 rounded-2xl p-2.5 sm:p-3 shadow-xl mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        
        {/* Title / Info */}
        <div className="flex items-center gap-2.5 px-2">
          <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                {moduleName}
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
                3 Modell-Varianten
              </span>
            </div>
            <div className="text-xs font-bold text-white">
              Wählen Sie Ihre passende Arbeitsweise (A, B, C):
            </div>
          </div>
        </div>

        {/* Variant Switcher Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800/80 flex-1 max-w-2xl">
          {variants.map((v) => {
            const isActive = activeVariant === v.id;
            const Icon = v.icon;

            return (
              <button
                key={v.id}
                type="button"
                onClick={() => onSelectVariant(v.id)}
                className={`group relative px-3 py-2 rounded-lg text-left transition-all duration-200 cursor-pointer flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-slate-800 text-white shadow-lg border border-slate-700/80 ring-1 ring-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                {/* Variant Badge */}
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 group-hover:border-slate-700'
                  }`}
                >
                  {v.badge || v.id.toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    {Icon && <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />}
                    <span className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                      {v.label}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 truncate leading-tight mt-0.5">
                    {v.sub}
                  </p>
                </div>

                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping absolute right-2 top-2 hidden sm:block"></span>
                )}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
