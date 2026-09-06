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
  AlertTriangle
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
                Rechtliche Angaben & Datenschutz
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
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
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
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              legalTab === 'datenschutz'
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20 font-black'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Datenschutzerklärung (DSGVO)</span>
          </button>

          <button
            type="button"
            onClick={() => setLegalTab('agb')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              legalTab === 'agb'
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20 font-black'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>AGB & Sandbox-Nutzung</span>
          </button>

          <button
            type="button"
            onClick={() => setLegalTab('kontakt')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
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
                <p className="text-xs text-slate-400">
                  Umsatzsteuer: Gemäß § 19 UStG (Kleinunternehmerregelung) wird keine Umsatzsteuer berechnet bzw. Umsatzsteuer-ID nach Zuteilung.<br />
                  Berufsbezeichnung: Freiberufliche Softwareentwicklung & IT-Beratung (verliehen in der Bundesrepublik Deutschland).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm">EU-Streitschlichtung & Verbraucherstreitbeilegung</h4>
                <p className="text-xs text-slate-400">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:underline">https://ec.europa.eu/consumers/odr/</a>.<br />
                  Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen (§ 36 VSBG).
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: DATENSCHUTZERKLÄRUNG */}
          {legalTab === 'datenschutz' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-3">
                <Lock className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-sm">Datenschutzerklärung nach DSGVO & BDSG</h4>
                  <p className="text-xs text-emerald-300">100% DSGVO-konform • Deutsche Serverstandorte • Keine Werbe-Cookies</p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">1. Verantwortliche Stelle (Art. 4 Nr. 7 DSGVO)</h4>
                  <p className="text-slate-300">
                    TeamTrack Softwareentwicklung & IT-Beratung<br />
                    Inhaberin: Huriye Ünalsoy<br />
                    Balthasar-Neumann-Straße 38, 97236 Randersacker, Deutschland<br />
                    E-Mail: kontakt@team-track.de • Telefon: +49 172 6125371
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm mb-1">2. Datenerfassung auf dieser Demo-Plattform</h4>
                  <p className="text-slate-300 leading-relaxed">
                    <strong>Server-Log-Dateien (Art. 6 Abs. 1 lit. f DSGVO):</strong> Bei Aufruf der Plattform erhebt der Hosting-Provider technisch erforderliche Verbindungsdaten (anonymisierte IP-Adresse, Zugriffszeit, Browsertyp), um die Stabilität und Abwehr von Cyberangriffen zu gewährleisten.<br /><br />
                    <strong>Kontakt- & Upgradeformular (Art. 6 Abs. 1 lit. b/f DSGVO):</strong> Wenn Sie über das Anfrageformular ein Angebot oder eine Vollversion anfordern, werden Ihre übermittelten Daten (Firma, Ansprechpartner, Telefon, E-Mail, Modulwünsche) verschlüsselt über unseren IONOS SMTP-Server übermittelt und ausschließlich zur Bearbeitung Ihrer Anfrage verarbeitet.<br /><br />
                    <strong>Keine Werbe-Cookies / Kein Drittanbieter-Tracking:</strong> Diese Website setzt keine zustimmungspflichtigen Tracking- oder Werbe-Cookies ein. Es werden lediglich technisch notwendige Session-Zustände (z.B. Test-Sandbox Daten im LocalStorage Ihres Browsers) lokal gespeichert (§ 25 Abs. 2 TDDDG).
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm mb-1">3. Auftragsverarbeitung (AVV gem. Art. 28 DSGVO) bei Vollversionen</h4>
                  <p className="text-slate-300 leading-relaxed">
                    Sofern TeamTrack für Kunden maßgeschneiderte WebApps (Zeiterfassung, CRM, Fuhrpark, Disposition) bereitstellt, agiert TeamTrack als Auftragsverarbeiter gemäß Art. 28 DSGVO. Hierzu wird ein standardisierter, rechtssicherer AV-Vertrag geschlossen. Der Auftraggeber verbleibt als alleinige verantwortliche Stelle im Sinne des Datenschutzrechts.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm mb-1">4. Technische & Organisatorische Maßnahmen (TOMs gem. Art. 32 DSGVO)</h4>
                  <p className="text-slate-300 leading-relaxed">
                    • Lückenlose Transportverschlüsselung (TLS 1.3 / SSL)<br />
                    • Strikte Mandantentrennung & isolierte Datenschemata<br />
                    • Tägliche verschlüsselte Sicherungskopien in ISO 27001 zertifizierten deutschen Rechenzentren (Frankfurt am Main).
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm mb-1">5. Betroffenenrechte & Aufsichtsbehörde</h4>
                  <p className="text-slate-300 leading-relaxed">
                    Sie haben jederzeit das Recht auf unentgeltliche Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO) und Löschung (Art. 17 DSGVO).<br />
                    Zuständige Aufsichtsbehörde: <strong>Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)</strong>, Promenade 18, 91522 Ansbach • Web: www.baylda.bayern.de
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AGB & SANDBOX-NUTZUNGSBEDINGUNGEN */}
          {legalTab === 'agb' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center gap-3">
                <FileText className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-sm">Allgemeine Geschäfts- & Demo-Nutzungsbedingungen (B2B)</h4>
                  <p className="text-xs text-amber-300">Gültig für Individual-Software, IT-Beratung und diese interaktive Sandbox-Umgebung</p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">§ 1 Geltungsbereich & B2B-Vertragspartner</h4>
                  <p className="text-slate-300">
                    Diese Bedingungen gelten ausschließlich gegenüber Unternehmern (§ 14 BGB) und gewerblichen Kunden. Vertragspartner ist TeamTrack Softwareentwicklung & IT-Beratung, Inhaberin: Huriye Ünalsoy, 97236 Randersacker.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-brand-500/30">
                  <h4 className="font-bold text-brand-300 text-sm mb-1">§ 2 Besondere Nutzungsbedingungen für diese Demo- & Sandbox-Plattform</h4>
                  <p className="text-slate-300 leading-relaxed">
                    (1) Diese interaktive Web-Umgebung dient ausschließlich zu Demonstrations-, Test- und Evaluierungszwecken der Software-Funktionen von TeamTrack.<br />
                    (2) Sämtliche in der Demo standardmäßig angezeigten Kunden, Projekte, Fahrzeuge, Mitarbeiter, Zeiten und Beträge sind <strong>frei erfundene Beispieldaten</strong>.<br />
                    (3) Vom Nutzer eingegebene Testdaten werden clientseitig im Browser (LocalStorage) isoliert gespeichert. TeamTrack übernimmt keine Gewähr für die dauerhafte Speicherung oder Verfügbarkeit von Testdaten im Demo-Modus.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm mb-1">§ 3 Leistungsumfang & White-Label-Bereitstellung</h4>
                  <p className="text-slate-300 leading-relaxed">
                    Bei Beauftragung einer Vollversion wird die Software exakt nach den betrieblichen Anforderungen des Auftraggebers programmiert und im White-Label-Design (Firmenlogo, Farben, Domain) schlüsselfertig übergeben.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <h4 className="font-bold text-white text-sm mb-1">§ 4 Gesetzliche Einhaltungspflichten & Haftungsausschluss (ArbZG, FPersV, VO EG 561/2006)</h4>
                  <p className="text-slate-300 leading-relaxed">
                    Die bereitgestellten Software-Module (z.B. mobile Zeiterfassung, Pausenprüfungen, LKW-Lenkzeitenassistent nach VO EG 561/2006, TÜV-Warnsystem) stellen <strong>rein technische Hilfsmittel</strong> zur betrieblichen Unterstützung dar. Die alleinige rechtliche und tatsächliche Verantwortung für die Einhaltung sämtlicher gesetzlicher Arbeits-, Lenk- und Ruhezeitvorschriften (ArbZG, FPersV), arbeitsschutzrechtlicher Fürsorgepflichten und versicherungsrechtlicher Obliegenheiten verbleibt uneingeschränkt beim Auftraggeber (Arbeitgeber / Unternehmer). TeamTrack übernimmt keine Haftung für behördliche Bußgelder oder Schäden infolge fehlerhafter Dateneingaben oder unterlassener betrieblicher Kontrollen seitens des Nutzers.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm mb-1">§ 5 Urheberrecht, Datenschutz & Gerichtsstand</h4>
                  <p className="text-slate-300 leading-relaxed">
                    Nach vollständiger Vergütung erhält der Auftraggeber das vereinbarte Nutzungsrecht für seinen Geschäftsbetrieb. Es gilt deutsches Recht. Gerichtsstand ist <strong>Würzburg</strong>.
                  </p>
                </div>
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
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 transition-all"
                >
                  <span>📲 Direkt per WhatsApp schreiben</span>
                </a>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-8 py-3.5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span className="text-[11px]">Stand: September 2026 • 100% DSGVO-konform</span>
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
