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

  // Active navigation
  const [activeModule, setActiveModule] = useState('overview');

  // Modals state
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [upgradePrefillModule, setUpgradePrefillModule] = useState('');
  const [restrictionModal, setRestrictionModal] = useState({ isOpen: false, title: '', message: '', feature: '' });
  const [previewInvoice, setPreviewInvoice] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Client Isolated Storage Key
  const storageKey = `teamtrack_sandbox_${clientId.replace(/[^a-zA-Z0-9_-]/g, '_')}`;

  // State for all 5 modules
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        return JSON.parse(saved);
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
    tasks: 0
  });

  // Initialize Client, Admin & Trial from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const clientParam = params.get('client') || params.get('firma') || 'Musterkunde';
    const daysParam = parseInt(params.get('days') || params.get('tage') || '7', 10);
    const adminParam = params.get('admin') === 'true' || params.get('admin') === '1' || window.location.hostname === 'localhost';
    
    setClientId(clientParam);
    setTrialDays([3, 7, 14].includes(daysParam) ? daysParam : 7);
    setIsAdmin(adminParam);

    // Check or init trial start time in localStorage for this client
    const timeKey = `teamtrack_trial_start_${clientParam}`;
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
        setData(JSON.parse(saved));
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

  // Countdown timer effect
  useEffect(() => {
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
  }, [startTime, trialDays]);

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
    setCreatedCounts({ timesheets: 0, invoices: 0, customers: 0, vehicles: 0, tasks: 0 });
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
      message: customMessage || `Diese Funktion ("${featureName}") ist in der maßgeschneiderten Original-Version für Ihr Unternehmen uneingeschränkt freigeschaltet.`
    });
  };

  // Open upgrade modal
  const openUpgradeModal = (moduleName = '') => {
    setUpgradePrefillModule(moduleName);
    setIsUpgradeModalOpen(true);
  };

  // Open invoice PDF preview
  const openInvoicePreview = (invoice) => {
    setPreviewInvoice(invoice);
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
    if (createdCounts[moduleType] >= MAX_CREATION_LIMIT) {
      triggerRestrictedAction(
        `Maximales Kontingent (${MAX_CREATION_LIMIT} Testeinträge)`,
        `Sie haben das Demo-Limit für dieses Modul erreicht. In Ihrer eigenen Firmen-Software haben Sie unbegrenztes Kontingent und volle Datenbankanbindung.`
      );
      return false;
    }

    setData(prev => ({
      ...prev,
      [moduleType]: [item, ...prev[moduleType]]
    }));

    setCreatedCounts(prev => ({
      ...prev,
      [moduleType]: prev[moduleType] + 1
    }));

    addToast('Eintrag hinzugefügt', `Neuer Datensatz erfolgreich im Demo-System gespeichert (${createdCounts[moduleType] + 1}/${MAX_CREATION_LIMIT}).`, 'success');
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
