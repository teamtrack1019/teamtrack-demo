import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { 
  ShieldCheck, 
  X, 
  Shield, 
  FileText, 
  Info, 
  PhoneCall, 
  Phone, 
  Mail, 
  MapPin, 
  ExternalLink,
  Lock,
  Building,
  CheckCircle2,
  AlertTriangle,
  Scale,
  FileCode,
  HardDrive,
  Eye,
  UserCheck
} from 'lucide-react';

export const LegalModal = () => {
  const { isLegalModalOpen, closeLegalModal, legalTab, setLegalTab } = useDemo();

  if (!isLegalModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel max-w-4xl w-full h-[90vh] rounded-3xl border border-brand-500/30 shadow-2xl flex flex-col overflow-hidden text-slate-200 relative">
        
        {/* Modal Header */}
        <div className="px-5 sm:px-8 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center border border-brand-500/30 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                Rechtliche Angaben, AGB & Datenschutz
              </h3>
              <p className="text-[11px] text-slate-400">
                TeamTrack Softwareentwicklung & IT-Beratung • 97236 Randersacker
              </p>
            </div>
          </div>

          <button
            onClick={closeLegalModal}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 sm:px-8 py-2.5 border-b border-slate-800 bg-slate-900 flex items-center gap-2 overflow-x-auto text-xs font-bold shrink-0">
          <button
            type="button"
            onClick={() => setLegalTab('impressum')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              legalTab === 'impressum'
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20 font-black'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>Impressum (§ 5 DDG)</span>
          </button>

          <button
            type="button"
            onClick={() => setLegalTab('datenschutz')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              legalTab === 'datenschutz'
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20 font-black'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Datenschutzerklärung (DSGVO / TDDDG)</span>
          </button>

          <button
            type="button"
            onClick={() => setLegalTab('agb')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              legalTab === 'agb'
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20 font-black'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>AGB & Demo-Bedingungen</span>
          </button>

          <button
            type="button"
            onClick={() => setLegalTab('kontakt')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              legalTab === 'kontakt'
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20 font-black'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Kontakt & Beratung</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-8 flex-1 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
          
          {/* TAB 1: IMPRESSUM */}
          {legalTab === 'impressum' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-brand-500/10 border border-brand-500/25 flex items-center gap-3">
                <Building className="w-5 h-5 text-brand-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-sm">Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)</h4>
                  <p className="text-xs text-brand-300">Offizielle Betreiberin dieser Website & Demo-Plattform</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Diensteanbieter / Betreiber:</span>
                  <p className="font-black text-white text-base">TeamTrack Softwareentwicklung & IT-Beratung</p>
                  <p className="text-slate-300">Inhaberin: <strong className="text-white">Huriye Ünalsoy</strong></p>
                  <p className="text-slate-300">Balthasar-Neumann-Straße 38<br />97236 Randersacker (bei Würzburg)<br />Deutschland</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Kontakt & Kommunikation:</span>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                    <a href="tel:+491726125371" className="text-white hover:text-brand-300 font-mono font-bold">+49 172 6125371</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <a href="tel:+491724690446" className="text-slate-300 hover:text-white font-mono">+49 172 4690446</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                    <a href="mailto:kontakt@team-track.de" className="text-emerald-300 hover:underline">kontakt@team-track.de</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-brand-400 shrink-0" />
                    <a href="https://team-track.de" target="_blank" rel="noopener noreferrer" className="text-brand-300 hover:underline">www.team-track.de</a>
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm">Steuerliche Angaben & Berufsbezeichnung</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong>Umsatzsteuer:</strong> Gemäß § 19 UStG (Kleinunternehmerregelung) wird keine Umsatzsteuer berechnet bzw. Umsatzsteuer-Identifikationsnummer nach Zuteilung.<br />
                  <strong>Berufsbezeichnung:</strong> Freiberufliche Softwareentwicklung & IT-Beratung (verliehen in der Bundesrepublik Deutschland).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm">EU-Streitschlichtung & Verbraucherstreitbeilegung</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:underline">https://ec.europa.eu/consumers/odr/</a>.<br />
                  Unsere E-Mail-Adresse lautet: <span className="text-slate-200 font-mono">kontakt@team-track.de</span>.<br />
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen (§ 36 VSBG), da unser Angebot sich ausschließlich an Gewerbetreibende und Unternehmen (B2B) richtet.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm">Haftung für Inhalte & Externe Links</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: DATENSCHUTZERKLÄRUNG */}
          {legalTab === 'datenschutz' && (
            <div className="space-y-6 animate-in fade-in duration-150 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-3">
                <Lock className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-sm">Ausführliche Datenschutzerklärung nach EU-DSGVO, BDSG & TDDDG</h4>
                  <p className="text-xs text-emerald-300">Rechtssicher • Deutsche Server • Keine Werbe-Tracker • Privacy by Design</p>
                </div>
              </div>

              {/* 1. Verantwortlicher */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-mono">1</span>
                  Verantwortliche Stelle (Art. 4 Nr. 7 DSGVO)
                </h4>
                <p className="text-slate-300">
                  Verantwortlich für die Datenverarbeitung auf dieser Website und der interaktiven Demo-Plattform ist:<br />
                  <strong className="text-white">TeamTrack Softwareentwicklung & IT-Beratung</strong><br />
                  Inhaberin: <strong>Huriye Ünalsoy</strong><br />
                  Balthasar-Neumann-Straße 38, 97236 Randersacker, Deutschland<br />
                  Telefon: <a href="tel:+491726125371" className="text-brand-300 font-mono">+49 172 6125371</a> • E-Mail: <a href="mailto:kontakt@team-track.de" className="text-emerald-300 hover:underline">kontakt@team-track.de</a>
                </p>
              </div>

              {/* 2. Datenerfassung */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-mono">2</span>
                  Datenerfassung auf dieser Demo- und Sandbox-Plattform
                </h4>
                <div className="space-y-3 text-slate-300 leading-relaxed">
                  <div>
                    <strong className="text-white block mb-0.5">a) Technische Server-Log-Dateien (Art. 6 Abs. 1 lit. f DSGVO):</strong>
                    Beim Aufrufen unserer Plattform erfasst der Hosting-Provider automatisch Informationen, die Ihr Browser übermittelt (Browsertyp/-version, Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage, anonymisierte IP-Adresse). Die Speicherung erfolgt zur Gewährleistung des sicheren und störungsfreien Serverbetriebs und zur Gefahrenabwehr bei Cyber-Angriffen.
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5">b) Sandbox-Nutzung & Lokaler Speicher (HTML5 LocalStorage gem. § 25 Abs. 2 Nr. 2 TDDDG):</strong>
                    Diese Demo-Plattform speichert Ihre Test-Eingaben (z.B. Test-Stempelungen, angelegte Test-Kunden oder Fahrzeuge) <strong>ausschließlich lokal im Speicher Ihres eigenen Endgerätes (LocalStorage)</strong>. Diese Daten werden zu keinem Zeitpunkt an unsere Server oder an fremde Dritte übermittelt.
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5">c) Kontakt- & Upgrade-Anfragen (Art. 6 Abs. 1 lit. b und f DSGVO):</strong>
                    Wenn Sie das Kontakt- oder Vollversion-Anfrageformular ausfüllen, werden Ihre freiwillig gemachten Angaben (Firmenname, Ansprechpartner, Telefonnummer, E-Mail-Adresse sowie gewünschter Modulumfang) per verschlüsselter Verbindung über unseren deutschen Mailserver an uns übermittelt. Diese Daten verarbeiten und speichern wir ausschließlich zur Bearbeitung Ihrer Anfrage und zur Angebotserstellung. Eine Weitergabe an Dritte erfolgt nicht.
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5">d) Kein Einsatz von Werbe- oder Tracking-Cookies:</strong>
                    Wir verzichten bewusst auf den Einsatz von Werbe-Trackern, Social-Media-Pixeln oder invasiven Analyse-Tools (wie Google Analytics oder Meta Pixel). Es werden keine Profile über Ihr Nutzungsverhalten erstellt.
                  </div>
                </div>
              </div>

              {/* 3. Speicherdauer & Löschung */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-mono">3</span>
                  Speicherdauer und Datenlöschung
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  Ihre übermittelten Anfragedaten werden gelöscht, sobald der Zweck der Speicherung entfällt (z.B. nach abgeschlossener Bearbeitung Ihrer Anfrage oder wenn kein Vertrag zustande kommt), sofern dem keine gesetzlichen Aufbewahrungsfristen (z.B. nach HGB oder AO) entgegenstehen. Lokale Sandbox-Daten können Sie jederzeit selbst über die Browser-Einstellungen („Browserdaten / Cache löschen“) entfernen.
                </p>
              </div>

              {/* 4. Auftragsverarbeitung */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-mono">4</span>
                  Auftragsverarbeitung (AVV gemäß Art. 28 DSGVO) für Kunden-Software
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  Wenn TeamTrack für Ihr Unternehmen eine maßgeschneiderte Vollversion (z.B. Mitarbeiter-Zeiterfassung, Disposition, Fuhrpark- und Auftragsverwaltung) implementiert und hostet, schließen wir mit Ihnen einen standardisierten Vertrag zur Auftragsverarbeitung (AV-Vertrag nach Art. 28 Abs. 3 DSGVO) inklusive umfassender Technisch-Organisatorischer Maßnahmen (TOMs nach Art. 32 DSGVO). Ihr Unternehmen bleibt dabei die alleinige verantwortliche Stelle im Sinne des Datenschutzrechts.
                </p>
              </div>

              {/* 5. Betroffenenrechte */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-mono">5</span>
                  Ihre Rechte als betroffene Person nach der DSGVO
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  Sie haben nach der DSGVO folgende unentgeltliche Rechte gegenüber der verantwortlichen Stelle:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px]">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <strong className="text-white block mb-0.5">• Art. 15 DSGVO (Auskunftsrecht):</strong>
                    Recht auf Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <strong className="text-white block mb-0.5">• Art. 16 DSGVO (Berichtigung):</strong>
                    Recht auf unverzügliche Berichtigung unrichtiger Daten.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <strong className="text-white block mb-0.5">• Art. 17 DSGVO (Löschung):</strong>
                    Recht auf Löschung („Recht auf Vergessenwerden“).
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <strong className="text-white block mb-0.5">• Art. 18 DSGVO (Einschränkung):</strong>
                    Recht auf Einschränkung der Verarbeitung.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <strong className="text-white block mb-0.5">• Art. 20 DSGVO (Datenübertragbarkeit):</strong>
                    Recht auf Erhalt Ihrer Daten in strukturiertem, maschinenlesbarem Format.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <strong className="text-white block mb-0.5">• Art. 21 DSGVO (Widerspruchsrecht):</strong>
                    Recht auf jederzeitigen Widerspruch gegen die Verarbeitung.
                  </div>
                </div>
              </div>

              {/* 6. Aufsichtsbehörde */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-mono">6</span>
                  Zuständige Datenschutz-Aufsichtsbehörde
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  Im Falle datenschutzrechtlicher Verstöße steht dem Betroffenen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu (Art. 77 DSGVO). Die für uns örtlich zuständige Aufsichtsbehörde ist:<br />
                  <strong className="text-white">Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)</strong><br />
                  Promenade 18, 91522 Ansbach, Deutschland<br />
                  Postfach 1349, 91504 Ansbach • Telefon: +49 (0) 981 180093-0 • Website: <a href="https://www.baylda.bayern.de" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:underline">www.baylda.bayern.de</a>
                </p>
              </div>

              {/* 7. TLS Verschlüsselung */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-mono">7</span>
                  SSL- bzw. TLS-Verschlüsselung
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine lückenlose 256-Bit SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: AGB & SANDBOX-NUTZUNGSBEDINGUNGEN */}
          {legalTab === 'agb' && (
            <div className="space-y-6 animate-in fade-in duration-150 text-xs">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center gap-3">
                <FileText className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-sm">Allgemeine Geschäfts- und Demo-Nutzungsbedingungen (B2B)</h4>
                  <p className="text-xs text-amber-300">Gültig für Individual-Softwareentwicklung, IT-Dienstleistungen und diese interaktive Sandbox</p>
                </div>
              </div>

              {/* § 1 Geltungsbereich */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm">§ 1 Geltungsbereich und Vertragspartner</h4>
                <p className="text-slate-300 leading-relaxed">
                  (1) Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle gegenwärtigen und zukünftigen Verträge, Lieferungen und sonstigen Leistungen zwischen <strong>TeamTrack Softwareentwicklung & IT-Beratung, Inhaberin: Huriye Ünalsoy, Balthasar-Neumann-Straße 38, 97236 Randersacker</strong> (nachfolgend „TeamTrack“ oder „Anbieter“) und ihren gewerblichen Kunden (nachfolgend „Auftraggeber“ oder „Kunde“).<br />
                  (2) Das Leistungsangebot von TeamTrack richtet sich <strong>ausschließlich an Unternehmer im Sinne des § 14 BGB</strong>, juristische Personen des öffentlichen Rechts oder öffentlich-rechtliche Sondervermögen. Verträge mit Verbrauchern (§ 13 BGB) werden nicht geschlossen.<br />
                  (3) Abweichende oder entgegenstehende Bedingungen des Auftraggebers werden nicht anerkannt, es sei denn, TeamTrack stimmt ihrer Geltung ausdrücklich schriftlich zu.
                </p>
              </div>

              {/* § 2 Demo- & Sandbox-Bedingungen */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-brand-500/40 space-y-2">
                <h4 className="font-bold text-brand-300 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-400" />
                  § 2 Besondere Bestimmungen für die interaktive Demo- & Sandbox-Plattform
                </h4>
                <div className="text-slate-300 leading-relaxed space-y-2">
                  <p>
                    (1) Die unter <em>team-track.de</em> bzw. verlinkten Subdomains bereitgestellte Web-Applikation ist eine <strong>kostenlose, unverbindliche Demonstrations- und Test-Sandbox</strong>. Sie dient ausschließlich dazu, Interessenten vor einer Beauftragung die Benutzeroberfläche, Ergonomie und Funktionsweise der Softwaremodule (u.a. Zeiterfassung, Fuhrpark, Auftragsverwaltung) zu demonstrieren.
                  </p>
                  <p>
                    (2) <strong>Fiktive Beispieldaten:</strong> Sämtliche in der Demo enthaltenen Vorlagen (z.B. Mitarbeiter-Namen wie „Max Mustermann“, „Can Demir“, Kunden wie „Müller Logistik GmbH“, Fahrzeug-Kennzeichen, Stundensätze, Arbeitszeiten und GPS-Orte) sind <strong>vollständig frei erfundene Musterdaten</strong>. Etwaige Ähnlichkeiten mit real existierenden Personen, Unternehmen oder Vorgängen sind rein zufällig.
                  </p>
                  <p>
                    (3) <strong>Lokale Speicherung im Browser:</strong> Wenn Sie in der Demo-Umgebung neue Daten erfassen, Stempelungen durchführen oder Daten ändern, werden diese Daten <strong>ausschließlich lokal im LocalStorage Ihres Browsers</strong> verarbeitet. Es findet kein serverseitiges Speichern von Echtdaten statt. TeamTrack übernimmt keine Gewährleistung für den Erhalt oder die Wiederherstellung von Test-Eingaben.
                  </p>
                </div>
              </div>

              {/* § 3 Leistungsumfang & White-Label */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm">§ 3 Leistungsumfang & White-Label Bereitstellung</h4>
                <p className="text-slate-300 leading-relaxed">
                  (1) TeamTrack erstellt für Auftraggeber schlüsselfertige Individual-Softwarelösungen auf Basis moderner Web-Technologien. Der genaue Leistungsumfang, die zu programmierenden Module und Schnittstellen ergeben sich aus dem jeweiligen Einzelvertrag bzw. Angebot.<br />
                  (2) Die Software wird im unternehmenseigenen <strong>White-Label-Design</strong> des Auftraggebers (Firmenlogo, Farbwelt, eigene Firmen-Domain / Subdomain) bereitgestellt.<br />
                  (3) Nach Abschluss der Implementierung erfolgt die Bereitstellung wahlweise auf zertifizierten deutschen Cloud-Servern oder als On-Premise-Bereitstellung nach schriftlicher Vereinbarung.
                </p>
              </div>

              {/* § 4 Preise & Zahlungsbedingungen */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm">§ 4 Preise, Zahlungsbedingungen & Kleinunternehmerstatus</h4>
                <p className="text-slate-300 leading-relaxed">
                  (1) Es gelten die im individuellen Angebot vereinbarten Festpreise oder Vergütungssätze.<br />
                  (2) Gemäß § 19 UStG (Kleinunternehmerregelung) wird keine Umsatzsteuer berechnet, solange die gesetzlichen Umsatzgrenzen nicht überschritten sind. Andernfalls verstehen sich alle Preise rein netto zuzüglich der jeweils geltenden gesetzlichen Mehrwertsteuer.<br />
                  (3) Rechnungen sind sofort nach Rechnungsstellung ohne Abzug zur Zahlung fällig, sofern nicht schriftlich andere Zahlungsziele vereinbart wurden.
                </p>
              </div>

              {/* § 5 Gesetzliche Vorschriften & Haftungsausschluss */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/40 space-y-2">
                <h4 className="font-bold text-amber-300 text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  § 5 Gesetzliche Aufzeichnungs- und Einhaltungspflichten (ArbZG, MiLoG, FPersV, VO EG 561/2006)
                </h4>
                <div className="text-slate-300 leading-relaxed space-y-2">
                  <p>
                    (1) Die von TeamTrack angebotenen und in dieser Demo simulierten Module (wie mobile Arbeitszeiterfassung, automatische Pausenberechnung, Nachtzuschläge, LKW-Lenkzeitenassistent nach VO (EG) Nr. 561/2006 sowie TÜV- und UVV-Prüfungsfristen) stellen <strong>rein technische Hilfs- und Dokumentationswerkzeuge</strong> dar.
                  </p>
                  <p>
                    (2) <strong>Verantwortung des Arbeitgebers:</strong> Die alleinige rechtliche, organisatorische und tatsächliche Verantwortung für die Einhaltung aller einschlägigen gesetzlichen Bestimmungen – insbesondere des <em>Arbeitszeitgesetzes (ArbZG)</em>, des <em>Mindestlohngesetzes (MiLoG)</em>, des <em>Fahrpersonalgesetzes (FPersG)</em>, der <em>Fahrpersonalverordnung (FPersV)</em> sowie der <em>Verordnung (EG) Nr. 561/2006 über Lenk- und Ruhezeiten</em> – verbleibt uneingeschränkt beim Auftraggeber (Arbeitgeber / Unternehmer).
                  </p>
                  <p>
                    (3) <strong>Haftungsausschluss für Bußgelder & Kontrollen:</strong> TeamTrack haftet unter keinen Umständen für behördliche Bußgelder, Strafen, Nachforderungen der Sozialversicherungsträger oder Prüfungen durch BALM/BAG, Gewerbeaufsichtsämter oder Zollbehörden, die auf fehlerhaften, unvollständigen oder manipulierten Eingaben der Mitarbeiter oder auf unterlassenen Kontrollpflichten des Arbeitgebers beruhen.
                  </p>
                </div>
              </div>

              {/* § 6 Urheberrecht & Nutzungsrechte */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm">§ 6 Urheberrecht, Lizenz und Nutzungsrechte</h4>
                <p className="text-slate-300 leading-relaxed">
                  (1) Sämtliche Urheberrechte an den Softwaremodulen, Layouts, Datenbankstrukturen und Quellcodes verbleiben bei TeamTrack.<br />
                  (2) Mit vollständiger Bezahlung der vereinbarten Vergütung erhält der Auftraggeber das einfache, zeitlich unbeschränkte und nicht ausschließliche Recht, die individualisierte Software für seinen eigenen internen Geschäftsbetrieb zu nutzen.<br />
                  (3) Eine Weiterveräußerung, Vermietung, Unterlizenzierung oder Veröffentlichung des Quellcodes an unberechtigte Dritte ist ohne vorherige schriftliche Zustimmung von TeamTrack untersagt.
                </p>
              </div>

              {/* § 7 Haftungsbeschränkung */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm">§ 7 Haftungsbeschränkung</h4>
                <p className="text-slate-300 leading-relaxed">
                  (1) TeamTrack haftet unbeschränkt bei Vorsatz, grober Fahrlässigkeit sowie bei Verletzung von Leben, Körper oder Gesundheit.<br />
                  (2) Bei leichter Fahrlässigkeit haftet TeamTrack nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten), deren Erfüllung die ordnungsgemäße Durchführung des Vertrages überhaupt erst ermöglicht. In diesem Fall ist die Haftung auf den bei Vertragsschluss vorhersehbaren, vertragstypischen Schaden begrenzt.<br />
                  (3) Eine Haftung für mittelbare Schäden, entgangenen Gewinn oder Betriebsunterbrechungen ist ausgeschlossen, soweit gesetzlich zulässig.
                </p>
              </div>

              {/* § 8 Schlussbestimmungen */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm">§ 8 Schlussbestimmungen, Anwendbares Recht und Gerichtsstand</h4>
                <p className="text-slate-300 leading-relaxed">
                  (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts (CISG).<br />
                  (2) Ausschließlicher Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit diesem Vertrag ist <strong>Würzburg</strong>, sofern der Auftraggeber Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist.<br />
                  (3) Sollten einzelne Bestimmungen dieses Vertrages ganz oder teilweise unwirksam sein oder werden, so wird die Wirksamkeit der übrigen Bestimmungen hierdurch nicht berührt (Salvatorische Klausel).
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: KONTAKT & BERATUNG */}
          {legalTab === 'kontakt' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center gap-3">
                <PhoneCall className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-sm">Direkter Kontakt & Unverbindliche Beratung</h4>
                  <p className="text-xs text-cyan-300">Sprechen Sie direkt mit dem Entwickler über Ihre maßgeschneiderte Firmen-Software</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Telefonische Direktabstimmung:</span>
                  <div className="space-y-2">
                    <a href="tel:+491726125371" className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-brand-500 transition-all">
                      <Phone className="w-4 h-4 text-brand-400" />
                      <div>
                        <span className="font-mono font-bold text-white text-xs block">+49 172 6125371</span>
                        <span className="text-[10px] text-slate-400">Hauptkontakt / WhatsApp</span>
                      </div>
                    </a>

                    <a href="tel:+491724690446" className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-brand-500 transition-all">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <div>
                        <span className="font-mono text-slate-300 text-xs block">+49 172 4690446</span>
                        <span className="text-[10px] text-slate-400">Zweitnummer</span>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">E-Mail & Anschrift:</span>
                  <div className="space-y-2">
                    <a href="mailto:kontakt@team-track.de" className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500 transition-all">
                      <Mail className="w-4 h-4 text-emerald-400" />
                      <div>
                        <span className="font-bold text-emerald-300 text-xs block">kontakt@team-track.de</span>
                        <span className="text-[10px] text-slate-400">Antwort innerhalb von 24h</span>
                      </div>
                    </a>

                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                      <div className="text-xs text-slate-300">
                        <span>Balthasar-Neumann-Straße 38</span><br />
                        <span className="text-[10px] text-slate-400">97236 Randersacker / Würzburg</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-white block">Reguläre Bürozeiten:</span>
                  <span className="text-slate-400 text-xs">Montag – Samstag: 08:00 – 20:00 Uhr • 24/7 Notfall-Support für Vertragskunden</span>
                </div>

                <a
                  href="https://wa.me/491726125371"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  <span>📲 Direkt per WhatsApp schreiben</span>
                </a>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-8 py-3.5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span className="text-[11px]">Stand: September 2026 • 100% DSGVO- & B2B-konform</span>
          <button
            onClick={closeLegalModal}
            className="px-5 py-2 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-white transition-all cursor-pointer"
          >
            Schließen
          </button>
        </div>

      </div>
    </div>
  );
};
