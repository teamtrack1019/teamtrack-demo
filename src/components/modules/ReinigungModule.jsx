import React, { useState } from 'react';
import { ArrowLeft, RefreshCw, Sparkles } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const ReinigungModule = () => {
  const { clientId, trialDays, isAdmin, setActiveModule, openUpgradeModal } = useDemo();
  const [iframeKey, setIframeKey] = useState(0);

  // Listen for modal trigger requests from inside CleanPro iframe
  React.useEffect(() => {
    const handleMessage = (e) => {
      if (e.data && e.data.type === 'OPEN_UPGRADE_MODAL') {
        openUpgradeModal('Gebäudereinigung');
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [openUpgradeModal]);

  // Forward query parameters so client name & trial countdown work inside CleanPro
  const currentParams = new URLSearchParams(window.location.search);
  if (!currentParams.get('client') && clientId) {
    currentParams.set('client', clientId);
  }
  if (!currentParams.get('days') && trialDays) {
    currentParams.set('days', trialDays);
  }
  if (isAdmin) {
    currentParams.set('admin', 'true');
  }

  const queryString = currentParams.toString();
  const reinigungUrl = `/reinigung/index.html${queryString ? `?${queryString}` : ''}`;

  return (
    <div className="w-full h-screen min-h-screen flex flex-col bg-slate-50 overflow-hidden relative">
      {/* Admin Floating Switcher (ONLY for Admin, completely hidden for customers) */}
      {isAdmin && (
        <div className="absolute top-2.5 right-4 z-50 flex items-center gap-2">
          <button
            onClick={() => setActiveModule('overview')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white text-xs font-bold border border-slate-700 shadow-xl transition-all"
            title="Zurück zum TeamTrack Multi-Modul Portal"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-brand-400" />
            <span className="hidden sm:inline">TeamTrack Suite</span>
          </button>
        </div>
      )}

      {/* Embedded 100% Unchanged Exact CleanPro Application */}
      <iframe
        key={iframeKey}
        src={reinigungUrl}
        title="CleanPro Gebäudereinigung"
        className="w-full h-full flex-1 border-0"
        allow="camera; microphone; geolocation"
      />
    </div>
  );
};
