# TeamTrack Demo- & Sandbox-Portal

Interaktives, mandantentrennendes Demo-Portal für **TeamTrack** (`https://team-track.de`).

---

## 🌟 Funktionen & Highlights

- **100% Deutsche Sprache:** Sämtliche Inhalte, Begriffe und Formulare sind auf B2B / Handwerk / Logistik in Deutschland zugeschnitten.
- **Vollständige Mandantentrennung (Session-Isolation):**
  - Jeder Kunde erhält über einen personalisierten Link eine eigene, isolierte Testumgebung.
  - Änderungen von Kunde A sind für Kunde B unsichtbar.
- **Konfigurierbare Testlaufzeit:** 3, 7 oder 14 Tage Live-Countdown mit automatischer Schutzsperre bei Ablauf.
- **5 Interaktive Kernmodule:**
  1. **⏱️ Zeiterfassung:** Live-Stempeluhr (PWA), Pausenzeiten, GPS-Verifikation und Stundensatzauswertung.
  2. **🧾 1-Klick Rechnungen & Angebote:** Automatische Rechnungsgenerierung, MwSt. (19%), rechtssichere DIN 5008 PDF-Vorschau mit **"DEMO-VERSION"** Wasserzeichen.
  3. **👥 CRM & Kundenkartei:** Kundenakten, Ansprechpartner, Umsatzzahlen und Direktkontakt.
  4. **🚚 Fuhrpark & Touren:** Fahrzeugüberwachung, KM-Stände, Tank/Akku-Füllstand und Tourenzuweisung.
  5. **📋 Auftragsdisposition & Kanban:** Interaktives Board für Baustellen- und Teamkoordination.
- **Schutz vor kommerziellem Missbrauch:**
  - Kontingentsbegrenzung (max. 5 Testeinträge pro Modul).
  - Wasserzeichen auf Belegen.
  - Gesperrte Live-APIs (DATEV, SMS/Mail-Versand, Telematik) mit Upgrade-Hinweisen.
- **1-Klick Lead-Generierung:** Direkte Übergabe an WhatsApp (`+49 172 6125371`) und E-Mail (`kontakt@team-track.de`).

---

## 🚀 Lokaler Start (Development)

1. Abhängigkeiten installieren:
   ```bash
   npm install
   ```

2. Entwicklungsserver starten:
   ```bash
   npm run dev
   ```

3. Browser öffnen unter: `http://localhost:3000`

---

## 🔗 Kundenlinks generieren (Multi-Client)

Sie können Interessenten personalisierte Links senden. Das System initialisiert automatisch eine frische, getrennte Sandbox für diesen Kunden:

- **7 Tage Test für Firma Müller:**
  `http://localhost:3000/?client=Mueller-Bau-GmbH&days=7`
- **14 Tage Test für Schmidt Haustechnik:**
  `http://localhost:3000/?client=Schmidt-Haustechnik&days=14`
- **3 Tage Express-Test:**
  `http://localhost:3000/?client=Logistik-Franken&days=3`

*(Im Portal befindet sich im Header ein Button **"Kundenlink erstellen"**, mit dem Sie diese Links per 1-Klick erzeugen und kopieren können).*

---

## 🌐 Online-Veröffentlichung (Vercel / GitHub)

1. Neues Repository auf GitHub erstellen und Code pushen:
   ```bash
   git init
   git add .
   git commit -m "Initial TeamTrack Demo Portal"
   git branch -M main
   git remote add origin https://github.com/IHR-USERNAME/team-track-demo.git
   git push -u origin main
   ```
2. Auf [vercel.com](https://vercel.com) gehen -> **"Add New Project"** -> Repository auswählen -> **"Deploy"** klicken.
3. Vercel stellt das Portal sofort unter `https://team-track-demo.vercel.app` (oder Ihrer eigenen Subdomain wie `https://demo.team-track.de`) bereit!
