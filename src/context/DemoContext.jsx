import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from '../data/initialData';
import confetti from 'canvas-confetti';

const DemoContext = createContext();

const MAX_CREATION_LIMIT = 5; // Demo-Kontingent pro Modul

export const DemoProvider = ({ children }) => {
  // Parse URL Parameters (?client=FirmaX&days=7&admin=true)
  const [clientId, setClientId] = useState('Standard-Demo');
  const [trialDays, setTrialDays] = useState(7);
  const [isAdmin, setIsAdmin] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [remainingTime, setRemainingTime] = useState({ days: 7, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  // Active navigation with Browser & Mouse History Support
  const [activeModule, setActiveModuleState] = useState('overview');

  const setActiveModule = (newModule, pushHistory = true) => {
    setActiveModuleState(newModule);
    try {
      const url = new URL(window.location.href);
      if (newModule === 'overview') {
        url.searchParams.delete('module');
      } else {
        url.searchParams.set('module', newModule);
      }
      if (pushHistory) {
        window.history.pushState({ module: newModule }, '', url.toString());
      }
    } catch (e) {
      console.error('History pushState error:', e);
    }
  };

  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [upgradePrefillModule, setUpgradePrefillModule] = useState('');
  const [restrictionModal, setRestrictionModal] = useState({ isOpen: false, title: '', message: '', feature: '' });
  const [previewInvoice, setPreviewInvoice] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState('impressum'); // 'impressum', 'datenschutz', 'agb', 'kontakt'

  const openLegalModal = (tab = 'impressum') => {
    setLegalTab(tab);
    setIsLegalModalOpen(true);
    try {
      window.history.pushState({ modal: 'legal', module: activeModule }, '', window.location.href);
    } catch (e) {}
  };

  const closeLegalModal = () => {
    setIsLegalModalOpen(false);
  };

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Client Isolated Storage Key
  const storageKey = `teamtrack_sandbox_${clientId.replace(/[^a-zA-Z0-9_-]/g, '_')}`;

  // Listen to browser Back/Forward (popstate) and Mouse Back buttons
  useEffect(() => {
    const handlePopState = (event) => {
      // 1. If any modal is open, close it first
      if (isUpgradeModalOpen) {
        setIsUpgradeModalOpen(false);
        return;
      }
      if (isLegalModalOpen) {
        setIsLegalModalOpen(false);
        return;
      }
      if (isShareModalOpen) {
        setIsShareModalOpen(false);
        return;
      }
      if (previewInvoice) {
        setPreviewInvoice(null);
        return;
      }
      if (restrictionModal.isOpen) {
        setRestrictionModal({ isOpen: false, title: '', message: '', feature: '' });
        return;
      }

      // 2. Otherwise navigate to the previous module from URL or history state
      const params = new URLSearchParams(window.location.search);
      const modFromUrl = params.get('module') || params.get('modul') || (event.state && event.state.module) || 'overview';
      if (['overview', 'zeiterfassung', 'rechnungen', 'crm', 'fuhrpark', 'disposition', 'reinigung'].includes(modFromUrl.toLowerCase())) {
        setActiveModuleState(modFromUrl.toLowerCase());
      }
    };

    const handleMouseUp = (e) => {
      // Button 3 is standard mouse Back side-button, Button 4 is Forward
      if (e.button === 3) {
        e.preventDefault();
        window.history.back();
      } else if (e.button === 4) {
        e.preventDefault();
        window.history.forward();
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isUpgradeModalOpen, isLegalModalOpen, isShareModalOpen, previewInvoice, restrictionModal]);

  // State for all 5 modules
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        const baseEmployees = initialData.employees || [];
        const savedEmployees = parsed.employees || [];
        const mergedEmployees = [
          ...savedEmployees,
          ...baseEmployees.filter(be => !savedEmployees.some(se => se.name === be.name || se.id === be.id))
        ];

        const baseAbsences = initialData.absences || [];
        const savedAbsences = parsed.absences || [];
        const mergedAbsences = [
          ...savedAbsences,
          ...baseAbsences.filter(ba => !savedAbsences.some(sa => sa.id === ba.id))
        ];

        return {
          ...JSON.parse(JSON.stringify(initialData)),
          ...parsed,
          employees: mergedEmployees,
          absences: mergedAbsences
        };
      }
    } catch (e) {
      console.error('Failed to load sandbox data', e);
    }
    return JSON.parse(JSON.stringify(initialData));
  });

  // Track counts of newly added items for quota enforcement
  const [createdCounts, setCreatedCounts] = useState({
    timesheets: 0,
    invoices: 0,
    customers: 0,
    vehicles: 0,
    tasks: 0,
    employees: 0,
    absences: 0
  });

  const [isDedicatedClient, setIsDedicatedClient] = useState(false);

  // Initialize Client, Admin & Trial from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const clientParam = params.get('client') || params.get('firma');
    const daysParam = parseInt(params.get('days') || params.get('tage') || '7', 10);
    const hasAdminQuery = params.get('admin') === 'true' || params.get('admin') === '1';
    const isExplicitNonAdmin = params.get('admin') === 'false' || params.get('admin') === '0';
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    // Determine admin status:
    // 1. Explicit ?admin=true or localhost -> admin
    // 2. Direct visit without client param -> admin (the owner's main page)
    // 3. Saved admin flag in localStorage (unless explicit ?client=... without admin is clicked)
    let adminState = false;
    if (isExplicitNonAdmin) {
      adminState = false;
      localStorage.setItem('teamtrack_is_admin', 'false');
    } else if (hasAdminQuery || isLocal || !clientParam) {
      adminState = true;
      if (hasAdminQuery) localStorage.setItem('teamtrack_is_admin', 'true');
    } else {
      // Client link provided (e.g. ?client=MusterFirma)
      adminState = false;
    }

    setIsAdmin(adminState);

    const effectiveClientId = clientParam || (adminState ? 'Live-Demo' : 'Musterkunde');
    setClientId(effectiveClientId);
    setTrialDays([3, 7, 14].includes(daysParam) ? daysParam : 7);

    // Initial module selection from URL (?module=reinigung)
    const moduleParam = params.get('module') || params.get('modul');
    const initialMod = (moduleParam && ['overview', 'zeiterfassung', 'rechnungen', 'crm', 'fuhrpark', 'disposition', 'reinigung'].includes(moduleParam.toLowerCase()))
      ? moduleParam.toLowerCase()
      : 'overview';
    setActiveModuleState(initialMod);
    try {
      window.history.replaceState({ module: initialMod }, '', window.location.href);
    } catch (e) {}

    // Is this a dedicated customer link specifically for cleaning?
    const isDedicated = !adminState && (moduleParam?.toLowerCase() === 'reinigung' || params.get('only') === 'reinigung');
    setIsDedicatedClient(isDedicated);

    // Check or init trial start time in localStorage for this client
    const timeKey = `teamtrack_trial_start_${effectiveClientId}`;
    let savedStart = localStorage.getItem(timeKey);
    if (!savedStart) {
      savedStart = Date.now().toString();
      localStorage.setItem(timeKey, savedStart);
    }
    setStartTime(parseInt(savedStart, 10));
  }, []);

  // Reload data if clientId changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        const baseEmployees = initialData.employees || [];
        const savedEmployees = parsed.employees || [];
        
        const mergedEmployees = [
          ...savedEmployees,
          ...baseEmployees.filter(be => !savedEmployees.some(se => se.name === be.name || se.id === be.id))
        ];

        const baseAbsences = initialData.absences || [];
        const savedAbsences = parsed.absences || [];
        const mergedAbsences = [
          ...savedAbsences,
          ...baseAbsences.filter(ba => !savedAbsences.some(sa => sa.id === ba.id))
        ];

        setData({
          ...JSON.parse(JSON.stringify(initialData)),
          ...parsed,
          employees: mergedEmployees,
          absences: mergedAbsences
        });
      } else {
        setData(JSON.parse(JSON.stringify(initialData)));
      }
    } catch (e) {
      console.error(e);
    }
  }, [storageKey]);

  // Persist state to isolated localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save sandbox data', e);
    }
  }, [data, storageKey]);

  // Countdown timer effect (only for customer trial links, not admin)
  useEffect(() => {
    if (isAdmin) {
      setIsExpired(false);
      return;
    }

    const updateCountdown = () => {
      const totalDurationMs = trialDays * 24 * 60 * 60 * 1000;
      const elapsedMs = Date.now() - startTime;
      const remainingMs = totalDurationMs - elapsedMs;

      if (remainingMs <= 0) {
        setIsExpired(true);
        setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const d = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
        const h = Math.floor((remainingMs / (1000 * 60 * 60)) % 24);
        const m = Math.floor((remainingMs / 1000 / 60) % 60);
        const s = Math.floor((remainingMs / 1000) % 60);
        setRemainingTime({ days: d, hours: h, minutes: m, seconds: s });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [startTime, trialDays, isAdmin]);

  // Toast trigger
  const addToast = (title, message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  // Reset sandbox for current client
  const resetSandbox = () => {
    const fresh = JSON.parse(JSON.stringify(initialData));
    setData(fresh);
    setCreatedCounts({ timesheets: 0, invoices: 0, customers: 0, vehicles: 0, tasks: 0, employees: 0 });
    try {
      localStorage.setItem(storageKey, JSON.stringify(fresh));
    } catch (e) {
      console.error(e);
    }
    addToast('Demo zurückgesetzt', 'Alle Daten wurden auf den ursprünglichen Auslieferungszustand zurückgesetzt.', 'success');
  };

  // Trigger restricted action modal
  const triggerRestrictedAction = (featureName, customMessage = '') => {
    setRestrictionModal({
      isOpen: true,
      title: '🔒 Demo-Beschränkung',
      feature: featureName,
      message: customMessage || `Diese Funktion ("${featureName}") ist in der individuellen Vollversion für Ihr Unternehmen uneingeschränkt freigeschaltet.`
    });
  };

  // Open upgrade modal
  const openUpgradeModal = (moduleName = '') => {
    setUpgradePrefillModule(moduleName);
    setIsUpgradeModalOpen(true);
    try {
      window.history.pushState({ modal: 'upgrade', module: activeModule }, '', window.location.href);
    } catch (e) {}
  };

  // Open invoice PDF preview
  const openInvoicePreview = (invoice) => {
    setPreviewInvoice(invoice);
    try {
      window.history.pushState({ modal: 'invoice', module: activeModule }, '', window.location.href);
    } catch (e) {}
  };

  // Celebrate with confetti on inquiry
  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Generic add with quota check
  const addItem = (moduleType, item) => {
    const currentCount = createdCounts[moduleType] || 0;
    if (!isAdmin && currentCount >= MAX_CREATION_LIMIT) {
      triggerRestrictedAction(
        `Maximales Kontingent (${MAX_CREATION_LIMIT} Testeinträge)`,
        `Sie haben das Demo-Limit für diesen Bereich erreicht. In Ihrer eigenen Firmen-Software haben Sie unbegrenztes Kontingent und volle Datenbankanbindung.`
      );
      return false;
    }

    setData(prev => ({
      ...prev,
      [moduleType]: [item, ...(prev[moduleType] || [])]
    }));

    setCreatedCounts(prev => ({
      ...prev,
      [moduleType]: currentCount + 1
    }));

    addToast(
      'Eintrag hinzugefügt', 
      isAdmin 
        ? 'Neuer Datensatz erfolgreich im System gespeichert (Admin-Modus).'
        : `Neuer Datensatz erfolgreich im Demo-System gespeichert (${currentCount + 1}/${MAX_CREATION_LIMIT}).`, 
      'success'
    );
    return true;
  };

  // Generic update item
  const updateItem = (moduleType, id, updatedFields) => {
    setData(prev => ({
      ...prev,
      [moduleType]: prev[moduleType].map(item => item.id === id ? { ...item, ...updatedFields } : item)
    }));
    addToast('Aktualisiert', 'Datensatz erfolgreich aktualisiert.', 'info');
  };

  // Generic delete item
  const deleteItem = (moduleType, id) => {
    setData(prev => ({
      ...prev,
      [moduleType]: prev[moduleType].filter(item => item.id !== id)
    }));
    addToast('Gelöscht', 'Datensatz aus der Demo-Sitzung entfernt.', 'warning');
  };

  return (
    <DemoContext.Provider
      value={{
        clientId,
        setClientId,
        trialDays,
        isAdmin,
        isDedicatedClient,
        remainingTime,
        isExpired,
        activeModule,
        setActiveModule,
        data,
        addItem,
        updateItem,
        deleteItem,
        resetSandbox,
        triggerRestrictedAction,
        isUpgradeModalOpen,
        setIsUpgradeModalOpen,
        upgradePrefillModule,
        openUpgradeModal,
        restrictionModal,
        setRestrictionModal,
        previewInvoice,
        setPreviewInvoice,
        openInvoicePreview,
        isShareModalOpen,
        setIsShareModalOpen,
        isLegalModalOpen,
        setIsLegalModalOpen,
        legalTab,
        setLegalTab,
        openLegalModal,
        closeLegalModal,
        toasts,
        addToast,
        triggerConfetti,
        maxCreationLimit: MAX_CREATION_LIMIT,
        createdCounts
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
