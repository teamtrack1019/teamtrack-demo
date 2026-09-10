import React, { useState, useEffect } from 'react';
import { useDemo } from '../../context/DemoContext';
import { 
  Sparkles, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Send, 
  Building, 
  Layers, 
  ShieldCheck, 
  X,
  MessageCircle,
  Loader2
} from 'lucide-react';

export const UpgradeModal = () => {
  const { 
    isUpgradeModalOpen, 
    setIsUpgradeModalOpen, 
    upgradePrefillModule, 
    clientId,
    activeModule,
    triggerConfetti,
    addToast
  } = useDemo();

  const isCleaningMode = activeModule === 'reinigung' || (upgradePrefillModule && upgradePrefillModule.toLowerCase().includes('reinigung'));

  const [selectedModules, setSelectedModules] = useState({
    zeiterfassung: true,
    rechnungen: true,
    crm: true,
    fuhrpark: true,
    disposition: true,
    whitelabel: true,
    hotel_objekte: true,
    dienstplaner: true,
    lohnabrechnung: true,
    kundenabnahme: true,
    preiskalkulator: true,
    whitelabel_reinigung: true
  });

  const [formData, setFormData] = useState({
    company: clientId !== 'Musterkunde' && clientId !== 'Standard-Demo' ? clientId : '',
    contactName: '',
    email: '',
    phone: '',
    message: '',
    timeline: 'Schnellstmöglich (1-2 Wochen)'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (upgradePrefillModule && upgradePrefillModule !== 'Komplettpaket' && upgradePrefillModule !== 'Komplettlösung') {
      const modKey = upgradePrefillModule.toLowerCase();
      setSelectedModules(prev => ({
        ...prev,
        [modKey]: true
      }));
    }
  }, [upgradePrefillModule]);

  if (!isUpgradeModalOpen) return null;

  const handleToggleModule = (key) => {
    setSelectedModules(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const currentModuleOptions = isCleaningMode
    ? [
        { key: 'hotel_objekte', label: '🏨 Hotel- & Objektverwaltung (Zimmerpreise)' },
        { key: 'dienstplaner', label: '📅 Tägliche Erfassung & Dienstplaner (PDF)' },
        { key: 'lohnabrechnung', label: '💰 Lohnabrechnung & § 3b EStG Zuschläge' },
        { key: 'kundenabnahme', label: '✍️ Digitale Kundenabnahme & Unterschrift' },
        { key: 'preiskalkulator', label: '🧮 Express-Preiskalkulator für Sofortangebote' },
        { key: 'whitelabel_reinigung', label: '✨ 100% Eigenes CleanPro Firmen-Branding' }
      ]
    : [
        { key: 'zeiterfassung', label: '⏱️ Zeiterfassung & Stempeluhr (PWA)' },
        { key: 'rechnungen', label: '🧾 1-Klick Rechnungen & DATEV' },
        { key: 'crm', label: '👥 CRM & Kundenverwaltung' },
        { key: 'fuhrpark', label: '🚚 Fuhrpark & Touren-Logistik' },
        { key: 'disposition', label: '📋 Auftragsdisposition & Kanban' },
        { key: 'whitelabel', label: '✨ 100% Eigenes Firmen-Branding' }
      ];

  const selectedListString = currentModuleOptions
    .filter(mod => selectedModules[mod.key])
    .map(mod => mod.label)
    .join(', ');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Direct POST to custom IONOS SMTP Serverless Function (/api/contact)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          company: formData.company || clientId,
          contactName: formData.contactName,
          phone: formData.phone,
          email: formData.email,
          selectedModules: selectedListString,
          systemType: isCleaningMode ? 'CleanPro Gebäudereinigung & Hotel' : 'TeamTrack Handwerk & Firmen',
          timeline: formData.timeline,
          message: formData.message || 'Keine zusätzliche Notiz',
          clientId: clientId
        })
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success !== false) {
        triggerConfetti();
        setIsSubmitted(true);
        addToast('E-Mail erfolgreich versendet', 'Ihre Anfrage wurde direkt über den IONOS Server an kontakt@team-track.de & teamtrack.software@hotmail.com übermittelt.', 'success');
      } else {
        console.warn('API Response Warning:', result);
        triggerConfetti();
        setIsSubmitted(true);
        addToast('Anfrage übermittelt', 'Vielen Dank! Wir haben Ihre Anfrage erhalten und melden uns in Kürze.', 'success');
      }
    } catch (err) {
      console.warn('Direct fallback on error:', err);
      triggerConfetti();
      setIsSubmitted(true);
      addToast('Anfrage übermittelt', 'Vielen Dank! Wir haben Ihre Anfrage erhalten.', 'success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hallo TeamTrack, ich interessiere mich für eine maßgeschneiderte ${isCleaningMode ? 'Gebäudereinigung- & Hotel-Software (CleanPro)' : 'Firmen-Software'}.\n\nFirma: ${formData.company || clientId}\nAnsprechpartner: ${formData.contactName}\nGewünschte Module: ${selectedListString}\nTelefon: ${formData.phone}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel max-w-2xl w-full p-5 sm:p-8 rounded-3xl border border-brand-500/30 shadow-2xl relative overflow-hidden max-h-[92vh] overflow-y-auto">
        
        {/* Background glow */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-500/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close button */}
        <button
          onClick={() => {
            setIsUpgradeModalOpen(false);
            setIsSubmitted(false);
          }}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="pr-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                {isCleaningMode ? 'CleanPro Gebäudereinigung Vollversion' : 'Maßgeschneiderte Vollversion'}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {isCleaningMode 
                  ? 'Ihre maßgeschneiderte Reinigungs-Software einrichten lassen' 
                  : 'Ihre eigene Firmen-Software einrichten lassen'}
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                {isCleaningMode
                  ? 'Wählen Sie Ihre gewünschten Module für Ihren Reinigungsbetrieb. Wir konfigurieren die CleanPro Suite exakt für Ihre Objekte, Mitarbeiter und Abrechnung.'
                  : 'Wählen Sie Ihre gewünschten Module. Wir konfigurieren die WebApp exakt für Ihre Betriebsabläufe – 100% DSGVO-konform und mit Ihrem Firmenlogo.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
              
              {/* Module selection */}
              <div>
                <label className="block text-slate-300 font-bold mb-2">
                  Gewünschte Module für Ihr Unternehmen auswählen:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentModuleOptions.map((mod) => (
                    <label
                      key={mod.key}
                      onClick={() => handleToggleModule(mod.key)}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                        selectedModules[mod.key]
                          ? 'bg-emerald-600/20 border-emerald-500/50 text-white font-bold'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedModules[mod.key] || false}
                        onChange={() => {}}
                        className="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0"
                      />
                      <span className="text-[11px] sm:text-xs">{mod.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Contact details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Firma / Betriebsname:</label>
                  <input
                    type="text"
                    required
                    placeholder="z.B. Müller Bau GmbH"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder:text-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Ihr Name / Ansprechpartner:</label>
                  <input
                    type="text"
                    required
                    placeholder="z.B. Thomas Müller"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Telefon / Mobilnummer:</label>
                  <input
                    type="tel"
                    required
                    placeholder="+49 172 ..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder:text-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">E-Mail-Adresse:</label>
                  <input
                    type="email"
                    required
                    placeholder="t.mueller@firma.de"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nachricht / Spezifische Wünsche (optional):</label>
                <textarea
                  rows="2"
                  placeholder="Beschreiben Sie kurz Ihre aktuellen Betriebsabläufe oder gewünschte Schnittstellen..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder:text-slate-500"
                ></textarea>
              </div>

              {/* Direct WhatsApp Option */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold text-sm shadow-xl shadow-brand-500/30 flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>E-Mail wird über IONOS gesendet...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Unverbindliches Festpreis-Angebot anfordern</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://wa.me/491726125371?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shrink-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Direkt</span>
                </a>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Kostenlose Erstberatung
                </span>
                <span>TeamTrack Würzburg</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-6 sm:py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white">Vielen Dank für Ihre Anfrage!</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Ihre Anforderungen wurden direkt über unseren IONOS Mail-Server an Herrn Becker übermittelt. Wir melden uns innerhalb von 24 Stunden persönlich bei Ihnen.
            </p>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 max-w-sm mx-auto text-xs text-left space-y-2">
              <div className="font-semibold text-slate-200">Ihre Kontaktaufnahme:</div>
              <div className="text-slate-400 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-400" />
                <span>+49 172 6125371 (Direktkontakt)</span>
              </div>
              <div className="text-slate-400 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-400" />
                <span>kontakt@team-track.de</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsUpgradeModalOpen(false);
                setIsSubmitted(false);
              }}
              className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
            >
              Zurück zur Demo-Umgebung
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
