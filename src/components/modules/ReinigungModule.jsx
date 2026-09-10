import React, { useState } from 'react';
import { ArrowLeft, RefreshCw, Sparkles } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const ReinigungModule = () => {
  const { clientId, trialDays, isAdmin, isDedicatedClient, openUpgradeModal } = useDemo();
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
    <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl bg-white relative animate-in fade-in duration-200" style={{ height: 'calc(100vh - 150px)', minHeight: '840px' }}>
      {/* Embedded 100% Unchanged Exact CleanPro Application */}
      <iframe
        key={iframeKey}
        src={reinigungUrl}
        title="CleanPro Gebäudereinigung"
        className="w-full h-full border-0 block"
        allow="camera; microphone; geolocation"
      />
    </div>
  );
};
