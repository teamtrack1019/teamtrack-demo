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
    <div className={
      isDedicatedClient 
        ? "w-full h-screen min-h-screen flex flex-col bg-slate-50 overflow-hidden relative"
        : "w-full h-[calc(100vh-170px)] min-h-[750px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-white relative animate-in fade-in duration-200"
    }>
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
