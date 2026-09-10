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

export default function App() {
  return (
    <DemoProvider>
      <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100 selection:bg-brand-500 selection:text-white w-full max-w-full overflow-x-hidden">
        <Header />
        <ModuleSelector />
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
    </DemoProvider>
  );
}
