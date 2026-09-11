import React from 'react';
import { Layers, CheckCircle2 } from 'lucide-react';

export const VariantSelectorBar = ({
  moduleName,
  variants = [],
  activeVariant = 'a',
  onSelectVariant,
  onSelect
}) => {
  // Support both prop naming styles
  const handleSelect = (variantId) => {
    if (typeof onSelectVariant === 'function') {
      onSelectVariant(variantId);
    } else if (typeof onSelect === 'function') {
      onSelect(variantId);
    }
  };

  return (
    <div className="bg-slate-900/95 backdrop-blur border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-2xl space-y-4">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              {moduleName && (
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  {moduleName} •
                </span>
              )}
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold uppercase tracking-wider">
                3 Modell-Varianten
              </span>
            </div>
            <h3 className="text-sm font-bold text-white mt-0.5">
              Wählen Sie Ihre passende Arbeitsweise (Variante A, B oder C):
            </h3>
          </div>
        </div>

        <div className="text-xs text-slate-400 hidden sm:block">
          Klicken zum Wechseln der Ansicht
        </div>
      </div>

      {/* 3 Variant Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
        {variants.map((v) => {
          const isActive = activeVariant === v.id;
          const Icon = v.icon;
          
          // Clean single-letter badge ('A', 'B', 'C')
          const letterBadge = (v.badge && v.badge.length <= 2) 
            ? v.badge 
            : (v.id ? v.id.toUpperCase() : 'A');

          // Full title and subtitle
          const title = v.title || v.label || `Variante ${letterBadge}`;
          const subtitle = v.subtitle || v.sub || '';

          return (
            <button
              key={v.id}
              type="button"
              onClick={() => handleSelect(v.id)}
              className={`group relative p-3.5 sm:p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 border ${
                isActive
                  ? 'bg-gradient-to-b from-slate-800/90 to-slate-900/90 text-white shadow-xl shadow-cyan-500/10 border-cyan-500 ring-2 ring-cyan-500/40'
                  : 'bg-slate-950/60 hover:bg-slate-900/80 text-slate-400 hover:text-slate-200 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Card Header: Badge + Icon + Status */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-all ${
                      isActive
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/40 font-mono font-bold'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 group-hover:border-slate-700 group-hover:text-slate-200'
                    }`}
                  >
                    {letterBadge}
                  </div>

                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-300'
                  }`}>
                    Variante {letterBadge}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {Icon && (
                    <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-400'
                    }`} />
                  )}
                  {isActive && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                      <span>Aktiv</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body: Title & Description */}
              <div>
                <div className={`text-sm font-bold leading-snug transition-colors ${
                  isActive ? 'text-white' : 'text-slate-200 group-hover:text-white'
                }`}>
                  {title}
                </div>
                {subtitle && (
                  <p className={`text-xs leading-relaxed mt-1 line-clamp-2 transition-colors ${
                    isActive ? 'text-slate-300' : 'text-slate-400 group-hover:text-slate-300'
                  }`}>
                    {subtitle}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
};
