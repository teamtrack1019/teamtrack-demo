import React from 'react';
import { useDemo } from '../context/DemoContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const Toasts = () => {
  const { toasts } = useDemo();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
          info: <Info className="w-5 h-5 text-brand-400 shrink-0" />
        };

        const borderColors = {
          success: 'border-emerald-500/30 bg-slate-900/95',
          warning: 'border-amber-500/30 bg-slate-900/95',
          info: 'border-brand-500/30 bg-slate-900/95'
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-2xl shadow-black/60 backdrop-blur-xl ${borderColors[toast.type] || borderColors.info} animate-in fade-in slide-in-from-bottom-3 duration-200`}
          >
            {icons[toast.type] || icons.info}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-white tracking-tight">{toast.title}</h4>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
