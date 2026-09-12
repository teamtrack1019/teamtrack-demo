import React from 'react';
import { DemoProvider, useDemo } from './context/DemoContext';
import { Header } from './components/Header';
import { ModuleSelector } from './components/ModuleSelector';
import { OverviewHub } from './components/modules/OverviewHub';
import { ZeiterfassungModule } from './components/modules/ZeiterfassungModule';
import { RechnungenModule } from './components/modules/RechnungenModule';
import { CrmModule } from './components/modules/CrmModule';
import { FuhrparkModule } from './components/modules/FuhrparkModule';
import { DispositionModule } from './components/modules/DispositionModule';
import { ReinigungModule } from './components/modules/ReinigungModule';
import { UpgradeModal } from './components/modals/UpgradeModal';
import { RestrictionModal } from './components/modals/RestrictionModal';
import { InvoicePreviewModal } from './components/modals/InvoicePreviewModal';
import { ExpiredModal } from './components/modals/ExpiredModal';
import { ShareLinkModal } from './components/modals/ShareLinkModal';
import { LegalModal } from './components/modals/LegalModal';
import { Toasts } from './components/Toasts';
import { Footer } from './components/Footer';

const MainContent = () => {
  const { activeModule } = useDemo();

  return (
    <main className="max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 flex-1 overflow-hidden">
      {activeModule === 'overview' && <OverviewHub />}
      {activeModule === 'zeiterfassung' && <ZeiterfassungModule />}
      {activeModule === 'rechnungen' && <RechnungenModule />}
      {activeModule === 'crm' && <CrmModule />}
      {activeModule === 'fuhrpark' && <FuhrparkModule />}
      {activeModule === 'disposition' && <DispositionModule />}
      {activeModule === 'reinigung' && <ReinigungModule />}
    </main>
  );
};

const AppContent = () => {
  const { isDedicatedClient, lockedModule, clientId } = useDemo();

  const moduleNames = {
    zeiterfassung: 'Mobile Zeiterfassung & Stempeluhr',
    rechnungen: '1-Klick Rechnungen & XRechnung / ZUGFeRD',
    crm: 'CRM & Kundenkartei',
    fuhrpark: 'Fuhrpark & Werkzeug-Radar',
    disposition: 'Auftragsdisposition & Tourenplanung',
    reinigung: 'CleanPro Gebäudereinigung & Hotel-Dashboard'
  };

  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100 selection:bg-brand-500 selection:text-white w-full max-w-full overflow-x-hidden">
      <Header />
      
      {/* If locked to single module, show clean isolation badge; otherwise show full 6-module switcher */}
      {!isDedicatedClient ? (
        <ModuleSelector />
      ) : (
        <div className="bg-slate-900/90 border-b border-brand-500/20 py-2.5 px-3 sm:px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
              <span className="text-slate-300">
                Exklusiver Modul-Zugang für <strong className="text-white font-bold">{clientId}</strong>:
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 font-bold hidden sm:inline">
                {moduleNames[lockedModule] || lockedModule}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-semibold hidden md:inline">
              🔒 100% isolierte Mandanten-Umgebung
            </span>
          </div>
        </div>
      )}

      <MainContent />
      <Footer />
      
      {/* Interactive Modals & System Components */}
      <UpgradeModal />
      <RestrictionModal />
      <InvoicePreviewModal />
      <ExpiredModal />
      <ShareLinkModal />
      <LegalModal />
      <Toasts />
    </div>
  );
};

export default function App() {
  return (
    <DemoProvider>
      <AppContent />
    </DemoProvider>
  );
}
