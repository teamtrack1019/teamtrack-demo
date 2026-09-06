export const initialData = {
  // Zeiterfassung Initialdaten
  timesheets: [
    {
      id: "zt-101",
      employee: "Max Mustermann",
      role: "Bauleiter / Meister",
      project: "Neubau Wohnpark Würzburg-Nord",
      task: "Rohbau-Abnahme & Statikprüfung",
      date: "2026-09-04",
      startTime: "07:30",
      endTime: "16:15",
      breakMinutes: 45,
      totalHours: 8.0,
      hourlyRate: 75.0,
      status: "Genehmigt",
      location: "Würzburg (GPS verifiziert)"
    },
    {
      id: "zt-102",
      employee: "Sarah Weber",
      role: "Elektro-Technikerin",
      project: "Sanierung Bürokomplex Randersacker",
      task: "Verkabelung Serverraum & Unterverteilung",
      date: "2026-09-04",
      startTime: "08:00",
      endTime: "16:30",
      breakMinutes: 30,
      totalHours: 8.0,
      hourlyRate: 68.0,
      status: "Genehmigt",
      location: "Randersacker (GPS verifiziert)"
    },
    {
      id: "zt-103",
      employee: "Jan Becker",
      role: "Monteur",
      project: "Logistikzentrum Hafen",
      task: "Wartung Hebeanlage Tor 4",
      date: "2026-09-05",
      startTime: "07:00",
      endTime: "14:30",
      breakMinutes: 30,
      totalHours: 7.0,
      hourlyRate: 62.0,
      status: "In Prüfung",
      location: "Würzburg Hafen"
    }
  ],

  // Rechnungen Initialdaten
  invoices: [
    {
      id: "RE-2026-0142",
      customer: "Huber Bauunternehmung GmbH",
      contact: "Hr. Michael Huber",
      address: "Gewerbestraße 14, 97076 Würzburg",
      date: "2026-09-01",
      dueDate: "2026-09-15",
      status: "Offen", // Entwurf, Offen, Bezahlt
      items: [
        { desc: "Bauleitung & Baustellenkoordination (24 Std.)", qty: 24, unit: "Std.", price: 75.0 },
        { desc: "Anfahrtspauschale Zone 1 Würzburg", qty: 3, unit: "Psch.", price: 45.0 },
        { desc: "Materialaufwand Kleinmaterial Elektro", qty: 1, unit: "Pkt.", price: 320.0 }
      ],
      notes: "Zahlbar innerhalb von 14 Tagen ohne Abzug. Vielen Dank für Ihren Auftrag."
    },
    {
      id: "RE-2026-0141",
      customer: "Logistik Express Franken e.K.",
      contact: "Fr. Sabine Vogel",
      address: "Am Mainhafen 8, 97236 Randersacker",
      date: "2026-08-28",
      dueDate: "2026-09-11",
      status: "Bezahlt",
      items: [
        { desc: "Regelwartung Fuhrpark & Diagnosetest (4 Fahrzeuge)", qty: 4, unit: "Stk.", price: 180.0 },
        { desc: "Disposition & Routenoptimierung Monat August", qty: 1, unit: "Monat", price: 650.0 }
      ],
      notes: "Betrag dankend per Überweisung erhalten."
    },
    {
      id: "RE-2026-0140",
      customer: "Schmidt Haustechnik & Sanitär",
      contact: "Hr. Klaus Schmidt",
      address: "Kettelerstraße 22, 97080 Würzburg",
      date: "2026-08-20",
      dueDate: "2026-09-03",
      status: "Bezahlt",
      items: [
        { desc: "Schnittstellen-Einrichtung Handwerker-Portal", qty: 1, unit: "Psch.", price: 1250.0 }
      ],
      notes: "Vollständig ausgeglichen."
    }
  ],

  // CRM Kundenkartei Initialdaten
  customers: [
    {
      id: "KND-001",
      company: "Huber Bauunternehmung GmbH",
      industry: "Bauhauptgewerbe & Tiefbau",
      contactPerson: "Michael Huber (Geschäftsführer)",
      email: "m.huber@huber-bau-wue.de",
      phone: "+49 931 884210",
      city: "97076 Würzburg",
      street: "Gewerbestraße 14",
      status: "Aktiv", // Aktiv, Interessent, VIP
      totalRevenue: 28450.0,
      activeProjects: 2,
      notes: "Verlässlicher Stammkunde seit 2024. Wünscht quartalsweise Rechnungszusammenfassung."
    },
    {
      id: "KND-002",
      company: "Logistik Express Franken e.K.",
      industry: "Transport & Spedition",
      contactPerson: "Sabine Vogel (Fuhrparkleitung)",
      email: "dispo@logistik-franken.de",
      phone: "+49 931 992015",
      city: "97236 Randersacker",
      street: "Am Mainhafen 8",
      status: "VIP",
      totalRevenue: 45200.0,
      activeProjects: 3,
      notes: "Großer Fuhrpark mit 18 Fahrzeugen. Nutzt GPS-Tracking und Tourenplanung."
    },
    {
      id: "KND-003",
      company: "Schmidt Haustechnik & Sanitär",
      industry: "Handwerk / Sanitär & Heizung",
      contactPerson: "Klaus Schmidt (Inhaber)",
      email: "info@schmidt-haustechnik.de",
      phone: "+49 931 450123",
      city: "97080 Würzburg",
      street: "Kettelerstraße 22",
      status: "Aktiv",
      totalRevenue: 14800.0,
      activeProjects: 1,
      notes: "Plant Umstellung aller Monteure auf die mobile WebApp (PWA) für Baustellen."
    },
    {
      id: "KND-004",
      company: "Franken Holzbau & Bedachungen",
      industry: "Zimmerei & Dachdeckerei",
      contactPerson: "Tobias Franken",
      email: "kontakt@franken-holzbau.de",
      phone: "+49 931 771190",
      city: "97209 Veitshöchheim",
      street: "Industriepark 3",
      status: "Interessent",
      totalRevenue: 0.0,
      activeProjects: 0,
      notes: "Angebot für Zeiterfassung & 1-Klick-Abrechnung liegt zur Entscheidung vor."
    }
  ],

  // Fuhrpark Initialdaten
  vehicles: [
    {
      id: "FZ-01",
      plate: "WÜ-TT 101",
      model: "Mercedes-Benz Sprinter 316 CDI",
      type: "Werkstatt-Transporter",
      status: "Auf Tour", // Auf Tour, Einsatzbereit, In Werkstatt
      driver: "Max Mustermann",
      currentLocation: "Würzburg-Nord (Baustelle)",
      mileage: 84320,
      fuelPercent: 78,
      nextInspection: "11/2026",
      activeTour: "Tour A: Baustellenbelieferung & Werkzeugtransport"
    },
    {
      id: "FZ-02",
      plate: "WÜ-TT 102",
      model: "MAN TGE 3.180 Kasten",
      type: "Montage-Fahrzeug",
      status: "Einsatzbereit",
      driver: "Sarah Weber",
      currentLocation: "Betriebshof Randersacker",
      mileage: 42150,
      fuelPercent: 92,
      nextInspection: "04/2027",
      activeTour: "Bereit für Nachmittagsdisposition"
    },
    {
      id: "FZ-03",
      plate: "WÜ-TT 103",
      model: "Volkswagen ID. Buzz Cargo (Elektro)",
      type: "Service & Express",
      status: "Auf Tour",
      driver: "Jan Becker",
      currentLocation: "Hafen Würzburg",
      mileage: 18900,
      fuelPercent: 64,
      nextInspection: "08/2027",
      activeTour: "Eil-Ersatzteilzustellung Tor 4"
    },
    {
      id: "FZ-04",
      plate: "WÜ-TT 104",
      model: "Iveco Daily 35S18 Pritsche",
      type: "Schwertransport & Gerüst",
      status: "In Werkstatt",
      driver: "Kein Fahrer zugewiesen",
      currentLocation: "Service-Partner Würzburg",
      mileage: 126400,
      fuelPercent: 40,
      nextInspection: "09/2026",
      activeTour: "Inspektion & Bremsenservice"
    }
  ],

  // Auftragsdisposition & Kanban Initialdaten
  tasks: [
    {
      id: "DISP-201",
      title: "Elektro-Hauptverteilung installieren",
      customer: "Huber Bauunternehmung GmbH",
      project: "Wohnpark Würzburg-Nord",
      assignedTo: "Sarah Weber",
      priority: "Hoch", // Hoch, Mittel, Niedrig
      status: "in_progress", // planned, in_progress, review, done
      deadline: "2026-09-08",
      estimatedHours: 16,
      tags: ["Elektro", "Baustelle", "Dringend"]
    },
    {
      id: "DISP-202",
      title: "Materialdisposition & Anlieferung Gerüst",
      customer: "Schmidt Haustechnik & Sanitär",
      project: "Sanierung Randersacker",
      assignedTo: "Max Mustermann",
      priority: "Mittel",
      status: "planned",
      deadline: "2026-09-10",
      estimatedHours: 6,
      tags: ["Logistik", "Material"]
    },
    {
      id: "DISP-203",
      title: "Wartung Hebeanlage Tor 4 & Testlauf",
      customer: "Logistik Express Franken e.K.",
      project: "Hafen Würzburg",
      assignedTo: "Jan Becker",
      priority: "Hoch",
      status: "review",
      deadline: "2026-09-05",
      estimatedHours: 8,
      tags: ["Wartung", "Prüfprotokoll"]
    },
    {
      id: "DISP-204",
      title: "Sicherheits- und Brandschutzprüfung",
      customer: "Huber Bauunternehmung GmbH",
      project: "Bürokomplex Würzburg",
      assignedTo: "Max Mustermann",
      priority: "Niedrig",
      status: "done",
      deadline: "2026-09-02",
      estimatedHours: 4,
      tags: ["Abnahme", "Protokoll"]
    },
    {
      id: "DISP-205",
      title: "Kundenberatung Vor-Ort & Aufmaß",
      customer: "Franken Holzbau & Bedachungen",
      project: "Projektplanung 2026",
      assignedTo: "Sarah Weber",
      priority: "Mittel",
      status: "planned",
      deadline: "2026-09-12",
      estimatedHours: 3,
      tags: ["Aufmaß", "Kunde"]
    }
  ]
};
