// CleanPro - Reinigungsfirma Application Logic (German Standard Edition)

// Storage Keys
const STORAGE_KEY = 'cleanpro_bookings_data';
const EMPLOYEES_STORAGE_KEY = 'cleanpro_employees_data';
const TIMESHEETS_STORAGE_KEY = 'cleanpro_timesheets_data';

// Default Demo Employees
const initialEmployees = [
  {
    id: 'EMP-1001',
    firstName: 'Thomas',
    lastName: 'Schneider',
    number: 'EMP-1001',
    role: 'Objektleiter',
    type: 'Vollzeit',
    location: 'Grand Hotel Central Berlin',
    wage: '22.50',
    startDate: '2024-01-15',
    phone: '+49 170 1122334',
    email: 't.schneider@cleanpro.de',
    status: 'Aktiv',
    notes: 'Objektleitung Hotelbereich, Ersthelfer, Desinfektionsschein'
  },
  {
    id: 'EMP-1002',
    firstName: 'Sabine',
    lastName: 'Becker',
    number: 'EMP-1002',
    role: 'Vorarbeiter',
    type: 'Vollzeit',
    location: 'Plaza Hotel Hamburg',
    wage: '18.00',
    startDate: '2024-03-01',
    phone: '+49 171 2233445',
    email: 's.becker@cleanpro.de',
    status: 'Aktiv',
    notes: 'Schichtleitung Etage 1-5, HACCP geschult'
  },
  {
    id: 'EMP-1003',
    firstName: 'Anna',
    lastName: 'Wagner',
    number: 'EMP-1003',
    role: 'Reinigungskraft',
    type: 'Minijob',
    location: 'Maritim Resort München',
    wage: '14.50',
    startDate: '2024-05-10',
    phone: '+49 172 3344556',
    email: 'a.wagner@cleanpro.de',
    status: 'Aktiv',
    notes: 'Zimmer- & Suitenreinigung'
  },
  {
    id: 'EMP-1004',
    firstName: 'Michael',
    lastName: 'Weber',
    number: 'EMP-1004',
    role: 'Spezialreiniger',
    type: 'Vollzeit',
    location: 'Mobile Touren',
    wage: '19.00',
    startDate: '2023-11-01',
    phone: '+49 173 4455667',
    email: 'm.weber@cleanpro.de',
    status: 'Aktiv',
    notes: 'Fenster- & Fassadenreinigung, Führerschein Klasse B'
  },
  {
    id: 'EMP-1005',
    firstName: 'Laura',
    lastName: 'Hoffmann',
    number: 'EMP-1005',
    role: 'Reinigungskraft',
    type: 'Teilzeit',
    location: 'Bürokomplex Süd',
    wage: '15.00',
    startDate: '2024-06-15',
    phone: '+49 174 5566778',
    email: 'l.hoffmann@cleanpro.de',
    status: 'Urlaub',
    notes: 'Büro- & Praxisreinigung'
  },
  {
    id: 'EMP-1006',
    firstName: 'Elena',
    lastName: 'Rossi',
    number: 'EMP-1006',
    role: 'Zimmermädchen',
    type: 'Minijob',
    location: 'Grand Hotel Central Berlin',
    wage: '14.50',
    startDate: '2024-07-01',
    phone: '+49 175 6677889',
    email: 'e.rossi@cleanpro.de',
    status: 'Aktiv',
    notes: 'Zimmerreinigung Frühschicht'
  },
  {
    id: 'EMP-1007',
    firstName: 'Maria',
    lastName: 'Santos',
    number: 'EMP-1007',
    role: 'Reinigungskraft',
    type: 'Teilzeit',
    location: 'Plaza Hotel Hamburg',
    wage: '14.80',
    startDate: '2024-04-12',
    phone: '+49 176 7788990',
    email: 'm.santos@cleanpro.de',
    status: 'Aktiv',
    notes: 'Zimmerreinigung Spätschicht'
  },
  {
    id: 'EMP-1008',
    firstName: 'Stefan',
    lastName: 'Lehmann',
    number: 'EMP-1008',
    role: 'Spezialreiniger',
    type: 'Vollzeit',
    location: 'Mobile Touren',
    wage: '17.50',
    startDate: '2023-09-01',
    phone: '+49 177 8899001',
    email: 's.lehmann@cleanpro.de',
    status: 'Krank',
    notes: 'Baureinigung & Industrieanlagen'
  }
];

// Initial Demo Bookings
const initialDemoBookings = [
  {
    id: 'CP-1001',
    customer: 'Sandra Müller',
    email: 'sandra.m@web.de',
    phone: '+49 171 4589231',
    address: 'Sonnenallee 42, 80331 München',
    service: 'Wohnungsreinigung',
    sqm: 90,
    rooms: 3,
    extras: ['Fenster', 'Backofen'],
    date: '2026-09-12',
    time: '10:00',
    totalPrice: 195,
    status: 'pending',
    createdAt: new Date().toISOString()
  },
  {
    id: 'CP-1002',
    customer: 'TechStart GmbH (Herr Weber)',
    email: 'office@techstart.io',
    phone: '+49 89 9876543',
    address: 'Leopoldstraße 150, 80804 München',
    service: 'Büro- & Praxisreinigung',
    sqm: 240,
    rooms: 8,
    extras: ['Fenster'],
    date: '2026-09-14',
    time: '18:00',
    totalPrice: 477,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  }
];

// Initial Demo Timesheets
const initialTimesheets = [
  {
    id: 'TS-101',
    date: '2026-09-09',
    empName: 'Thomas Schneider (EMP-1001)',
    location: 'Grand Hotel Central Berlin',
    hours: 8.0,
    overtime: 1.5,
    note: 'Objektkontrolle & Abnahme Etagenreinigung'
  },
  {
    id: 'TS-102',
    date: '2026-09-09',
    empName: 'Elena Rossi (EMP-1006)',
    location: 'Grand Hotel Central Berlin',
    hours: 6.0,
    overtime: 0.0,
    note: '14 Zimmer (10 EZ, 4 DZ) gereinigt'
  },
  {
    id: 'TS-103',
    date: '2026-09-09',
    empName: 'Michael Weber (EMP-1004)',
    location: 'Bürokomplex Süd',
    hours: 7.5,
    overtime: 1.0,
    note: 'Glasfronten außen mit Steiger gereinigt'
  },
  {
    id: 'TS-104',
    date: '2026-09-08',
    empName: 'Sabine Becker (EMP-1002)',
    location: 'Plaza Hotel Hamburg',
    hours: 8.0,
    overtime: 0.5,
    note: 'Schichteinteilung & Materialprüfung'
  }
];

let currentService = 'wohnung';

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDemoBookings));
  }
  if (!localStorage.getItem(EMPLOYEES_STORAGE_KEY)) {
    localStorage.setItem(EMPLOYEES_STORAGE_KEY, JSON.stringify(initialEmployees));
  }
  if (!localStorage.getItem(TIMESHEETS_STORAGE_KEY)) {
    localStorage.setItem(TIMESHEETS_STORAGE_KEY, JSON.stringify(initialTimesheets));
  }
  if (!localStorage.getItem(HOTELS_STORAGE_KEY)) {
    localStorage.setItem(HOTELS_STORAGE_KEY, JSON.stringify(initialHotels));
  }
  if (!localStorage.getItem(ROSTER_STORAGE_KEY)) {
    localStorage.setItem(ROSTER_STORAGE_KEY, JSON.stringify(initialRoster));
  }
  if (!localStorage.getItem(SUBCONTRACTORS_STORAGE_KEY)) {
    localStorage.setItem(SUBCONTRACTORS_STORAGE_KEY, JSON.stringify(initialSubcontractors));
  }
  if (!localStorage.getItem(LEAVE_STORAGE_KEY)) {
    localStorage.setItem(LEAVE_STORAGE_KEY, JSON.stringify(initialLeaveRequests));
  }
  if (!localStorage.getItem(AUDIT_STORAGE_KEY)) {
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(initialAuditLog));
  }
  
  // Set min date for booking to today
  const dateInput = document.getElementById('custDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  calculatePrice();
  updateFullPrice();
  renderAdminTable();
  renderEmployeesTable();
  renderTimesheetsTable();
  populateEmployeeDropdowns();
  populateHotelDropdowns();
  applyRolePermissions();
  
  if (window.lucide) lucide.createIcons();
});

// View Switcher (Landing vs Admin vs Hotel vs Mitarbeiter)
function switchView(view) {
  const publicView = document.getElementById('publicView');
  const adminView = document.getElementById('adminView');
  const hotelView = document.getElementById('hotelView');
  const mitarbeiterView = document.getElementById('mitarbeiterView');

  if (publicView) publicView.classList.add('hidden');
  if (adminView) adminView.classList.add('hidden');
  if (hotelView) hotelView.classList.add('hidden');
  if (mitarbeiterView) mitarbeiterView.classList.add('hidden');

  if (view === 'admin') {
    if (adminView) adminView.classList.remove('hidden');
    renderAdminTable();
  } else if (view === 'hotel') {
    if (hotelView) hotelView.classList.remove('hidden');
    initHotelModule();
  } else if (view === 'mitarbeiter') {
    if (mitarbeiterView) mitarbeiterView.classList.remove('hidden');
    renderEmployeesTable();
    renderTimesheetsTable();
  } else {
    if (publicView) publicView.classList.remove('hidden');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (window.lucide) lucide.createIcons();
}

// Scroll to Booking Form
function scrollToBooking() {
  switchView('landing');
  const calcSec = document.getElementById('calculator');
  if (calcSec) {
    calcSec.scrollIntoView({ behavior: 'smooth' });
  }
}

// Quick Calculator logic
function calculatePrice() {
  const service = document.getElementById('quickService')?.value || 'wohnung';
  const sqm = parseInt(document.getElementById('quickSqm')?.value) || 80;
  const freq = document.getElementById('quickFreq')?.value || 'einmalig';

  let baseRate = 1.6; // Euro per sqm
  if (service === 'buero') baseRate = 1.8;
  if (service === 'bau') baseRate = 2.6;
  if (service === 'fenster') baseRate = 1.4;
  if (service === 'umzug') baseRate = 2.4;

  let total = sqm * baseRate;

  // Minimum fee
  if (total < 79) total = 79;

  // Frequency Discounts
  if (freq === 'woechentlich') total *= 0.85;
  if (freq === 'zweiwoechentlich') total *= 0.90;
  if (freq === 'monatlich') total *= 0.95;

  const displayEl = document.getElementById('quickPriceDisplay');
  if (displayEl) {
    displayEl.textContent = `€ ${total.toFixed(2).replace('.', ',')}`;
  }
}

// Select Service Card in Booking Form
function selectServiceCard(service, element) {
  currentService = service;
  document.querySelectorAll('.service-card').forEach(card => {
    card.classList.remove('border-emerald-500', 'bg-emerald-50/50');
    card.classList.add('border-slate-200');
  });
  if (element) {
    element.classList.remove('border-slate-200');
    element.classList.add('border-emerald-500', 'bg-emerald-50/50');
  }
  updateFullPrice();
}

function prefillService(service) {
  currentService = service;
  scrollToBooking();
  const cards = document.querySelectorAll('.service-card');
  if (service === 'wohnung' && cards[0]) selectServiceCard('wohnung', cards[0]);
  if (service === 'buero' && cards[1]) selectServiceCard('buero', cards[1]);
  if (service === 'bau' && cards[2]) selectServiceCard('bau', cards[2]);
}

// Full Calculator Logic
function updateFullPrice() {
  const sqm = parseInt(document.getElementById('calcSqm')?.value) || 80;
  const rooms = parseInt(document.getElementById('calcRooms')?.value) || 3;

  const sqmText = document.getElementById('sqmValueText');
  const roomsText = document.getElementById('roomsValueText');
  if (sqmText) sqmText.textContent = `${sqm} m²`;
  if (roomsText) roomsText.textContent = `${rooms} Zimmer`;

  let ratePerSqm = 1.5;
  if (currentService === 'buero') ratePerSqm = 1.8;
  if (currentService === 'bau') ratePerSqm = 2.5;

  let total = (sqm * ratePerSqm) + (rooms * 8);

  // Extras
  if (document.getElementById('extraFenster')?.checked) total += 45;
  if (document.getElementById('extraOfen')?.checked) total += 35;
  if (document.getElementById('extraKuehlschrank')?.checked) total += 25;
  if (document.getElementById('extraBalkon')?.checked) total += 30;

  if (total < 89) total = 89;

  const finalDisplay = document.getElementById('finalTotalDisplay');
  if (finalDisplay) {
    finalDisplay.textContent = `€ ${total.toFixed(2).replace('.', ',')}`;
  }
  return total;
}

// Handle New Booking Submission
function handleBookingSubmit(e) {
  e.preventDefault();
  
  const customer = document.getElementById('custName').value.trim();
  const email = document.getElementById('custEmail').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const address = document.getElementById('custAddress').value.trim();
  const date = document.getElementById('custDate').value;
  const time = document.getElementById('custTime').value;
  const sqm = parseInt(document.getElementById('calcSqm').value) || 80;
  const rooms = parseInt(document.getElementById('calcRooms').value) || 3;
  const totalPrice = updateFullPrice();

  const extras = [];
  if (document.getElementById('extraFenster')?.checked) extras.push('Fenster');
  if (document.getElementById('extraOfen')?.checked) extras.push('Backofen');
  if (document.getElementById('extraKuehlschrank')?.checked) extras.push('Kühlschrank');
  if (document.getElementById('extraBalkon')?.checked) extras.push('Balkon');

  let serviceName = 'Wohnungsreinigung';
  if (currentService === 'buero') serviceName = 'Büro- & Praxisreinigung';
  if (currentService === 'bau') serviceName = 'Baureinigung';

  const newBooking = {
    id: 'CP-' + Math.floor(1000 + Math.random() * 9000),
    customer,
    email,
    phone,
    address,
    service: serviceName,
    sqm,
    rooms,
    extras,
    date,
    time,
    totalPrice,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  // Save to LocalStorage
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  existing.unshift(newBooking);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

  // Show Modal Summary
  document.getElementById('modalSummaryContent').innerHTML = `
    <div><strong>Buchungs-ID:</strong> ${newBooking.id}</div>
    <div><strong>Kunde:</strong> ${newBooking.customer}</div>
    <div><strong>Service:</strong> ${newBooking.service} (${newBooking.sqm} m²)</div>
    <div><strong>Termin:</strong> ${newBooking.date} um ${newBooking.time} Uhr</div>
    <div><strong>Gesamtbetrag:</strong> € ${newBooking.totalPrice.toFixed(2).replace('.', ',')}</div>
  `;

  document.getElementById('successModal').classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

function closeSuccessModal() {
  document.getElementById('successModal').classList.add('hidden');
  document.getElementById('bookingForm').reset();
  updateFullPrice();
}

// Render Admin Dashboard Table & Stats
function renderAdminTable() {
  const bookings = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const tableBody = document.getElementById('bookingsTableBody');
  const emptyState = document.getElementById('emptyTableState');
  const searchQuery = (document.getElementById('tableSearch')?.value || '').toLowerCase();
  const statusFilter = document.getElementById('statusFilter')?.value || 'all';

  if (!tableBody) return;

  // Filter Bookings
  const filtered = bookings.filter(b => {
    const matchesSearch = b.customer.toLowerCase().includes(searchQuery) ||
                          b.address.toLowerCase().includes(searchQuery) ||
                          b.phone.toLowerCase().includes(searchQuery) ||
                          b.id.toLowerCase().includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate Metrics
  const totalCount = bookings.length;
  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  const employees = JSON.parse(localStorage.getItem(EMPLOYEES_STORAGE_KEY) || '[]');
  const activeEmployeesCount = employees.filter(e => e.status === 'Aktiv').length;

  document.getElementById('statTotalBookings').textContent = totalCount;
  document.getElementById('statPendingBookings').textContent = pendingCount;
  document.getElementById('statRevenue').textContent = `€ ${totalRevenue.toFixed(2).replace('.', ',')}`;
  document.getElementById('bookingsCountBadge').textContent = `${filtered.length} Einträge`;
  
  const adminEmpStat = document.getElementById('adminActiveEmpStat');
  if (adminEmpStat) {
    adminEmpStat.textContent = `${employees.length} Mitarbeiter (${activeEmployeesCount} aktiv)`;
  }

  tableBody.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }
  emptyState.classList.add('hidden');

  filtered.forEach(b => {
    let statusBadge = '<span class="px-2 py-1 text-[11px] font-bold rounded-md bg-amber-100 text-amber-800">Ausstehend</span>';
    if (b.status === 'confirmed') {
      statusBadge = '<span class="px-2 py-1 text-[11px] font-bold rounded-md bg-blue-100 text-blue-800">Bestätigt</span>';
    } else if (b.status === 'completed') {
      statusBadge = '<span class="px-2 py-1 text-[11px] font-bold rounded-md bg-emerald-100 text-emerald-800">Abgeschlossen</span>';
    }

    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50/80 transition-colors';
    tr.innerHTML = `
      <td class="p-4">
        <div class="font-bold text-slate-900 text-sm">${b.customer}</div>
        <div class="text-slate-500 text-xs">${b.phone}</div>
        <div class="text-slate-400 text-[11px] truncate max-w-xs">${b.address}</div>
      </td>
      <td class="p-4">
        <div class="font-semibold text-slate-800">${b.service}</div>
        <div class="text-slate-500 text-[11px]">${b.sqm} m² | ${b.rooms} Zimmer</div>
        ${b.extras && b.extras.length > 0 ? `<div class="text-emerald-600 text-[10px] font-medium">+ ${b.extras.join(', ')}</div>` : ''}
      </td>
      <td class="p-4">
        <div class="font-bold text-slate-800">${b.date}</div>
        <div class="text-slate-500 text-[11px]">${b.time} Uhr</div>
      </td>
      <td class="p-4 font-bold text-emerald-700 text-sm">
        € ${b.totalPrice.toFixed(2).replace('.', ',')}
      </td>
      <td class="p-4">
        ${statusBadge}
      </td>
      <td class="p-4 text-right">
        <div class="flex items-center justify-end gap-1.5">
          ${b.status === 'pending' ? `
            <button onclick="updateStatus('${b.id}', 'confirmed')" title="Bestätigen" class="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"><i data-lucide="check" class="w-4 h-4"></i></button>
          ` : ''}
          ${b.status === 'confirmed' ? `
            <button onclick="updateStatus('${b.id}', 'completed')" title="Als erledigt markieren" class="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100"><i data-lucide="check-check" class="w-4 h-4"></i></button>
          ` : ''}
          <button onclick="deleteBooking('${b.id}')" title="Löschen" class="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
        </div>
      </td>
    `;
    tableBody.appendChild(tr);
  });

  if (window.lucide) lucide.createIcons();
}

// Update Booking Status
function updateStatus(id, newStatus) {
  const bookings = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const index = bookings.findIndex(b => b.id === id);
  if (index !== -1) {
    bookings[index].status = newStatus;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    renderAdminTable();
  }
}

// Delete Booking
function deleteBooking(id) {
  if (confirm('Möchten Sie diese Buchung wirklich löschen?')) {
    let bookings = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    bookings = bookings.filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    renderAdminTable();
  }
}

// Export Bookings CSV
function exportBookingsCSV() {
  const bookings = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  if (bookings.length === 0) {
    alert('Keine Daten zum Exportieren vorhanden.');
    return;
  }

  let csvContent = 'data:text/csv;charset=utf-8,ID;Kunde;Telefon;Email;Adresse;Service;Flaeche;Datum;Uhrzeit;Preis;Status\n';
  bookings.forEach(b => {
    csvContent += `"${b.id}";"${b.customer}";"${b.phone}";"${b.email}";"${b.address}";"${b.service}";"${b.sqm}m2";"${b.date}";"${b.time}";"${b.totalPrice}";"${b.status}"\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `CleanPro_Buchungen_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ==================== MITARBEITERVERWALTUNG LOGIC ====================

// Render Employees Table & KPI Cards
function renderEmployeesTable() {
  const employees = JSON.parse(localStorage.getItem(EMPLOYEES_STORAGE_KEY) || '[]');
  const tableBody = document.getElementById('employeesTableBody');
  const emptyState = document.getElementById('empEmptyState');
  const searchQuery = (document.getElementById('empSearchInput')?.value || '').toLowerCase();
  const typeFilter = document.getElementById('empTypeFilter')?.value || 'all';
  const statusFilter = document.getElementById('empStatusFilter')?.value || 'all';

  // KPI Calculations
  const totalCount = employees.length;
  const activeCount = employees.filter(e => e.status === 'Aktiv').length;
  const awayCount = employees.filter(e => e.status === 'Urlaub' || e.status === 'Krank').length;
  
  // Approximate monthly payroll calculation
  let totalPayroll = 0;
  employees.forEach(e => {
    const rate = parseFloat(e.wage) || 15.0;
    if (e.type === 'Vollzeit') totalPayroll += rate * 160;
    else if (e.type === 'Teilzeit') totalPayroll += rate * 100;
    else if (e.type === 'Minijob') totalPayroll += Math.min(538, rate * 35);
    else totalPayroll += rate * 120;
  });

  if (document.getElementById('empStatTotal')) document.getElementById('empStatTotal').textContent = totalCount;
  if (document.getElementById('empStatActive')) document.getElementById('empStatActive').textContent = activeCount;
  if (document.getElementById('empStatAway')) document.getElementById('empStatAway').textContent = awayCount;
  if (document.getElementById('empStatPayroll')) document.getElementById('empStatPayroll').textContent = `€ ${totalPayroll.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  if (!tableBody) return;

  // Filter Employees
  const filtered = employees.filter(e => {
    const fullName = `${e.firstName} ${e.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchQuery) ||
                          e.number.toLowerCase().includes(searchQuery) ||
                          (e.location || '').toLowerCase().includes(searchQuery) ||
                          (e.role || '').toLowerCase().includes(searchQuery);
    const matchesType = typeFilter === 'all' || e.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  tableBody.innerHTML = '';

  if (filtered.length === 0) {
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }
  if (emptyState) emptyState.classList.add('hidden');

  filtered.forEach(e => {
    let statusBadge = '<span class="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-100 text-emerald-800 flex items-center gap-1 w-fit"><span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Aktiv</span>';
    if (e.status === 'Urlaub') {
      statusBadge = '<span class="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-blue-100 text-blue-800 flex items-center gap-1 w-fit"><span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span> Im Urlaub</span>';
    } else if (e.status === 'Krank') {
      statusBadge = '<span class="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-amber-100 text-amber-800 flex items-center gap-1 w-fit"><span class="w-1.5 h-1.5 rounded-full bg-amber-600"></span> Krank</span>';
    } else if (e.status === 'Inaktiv') {
      statusBadge = '<span class="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-slate-200 text-slate-700 flex items-center gap-1 w-fit"><span class="w-1.5 h-1.5 rounded-full bg-slate-500"></span> Inaktiv</span>';
    }

    const initials = `${e.firstName.charAt(0)}${e.lastName.charAt(0)}`.toUpperCase();

    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50/80 transition-colors';
    tr.innerHTML = `
      <td class="p-4">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center text-xs shadow-sm">
            ${initials}
          </div>
          <div>
            <div class="font-bold text-slate-900 text-sm">${e.firstName} ${e.lastName}</div>
            <div class="text-emerald-700 font-semibold text-[11px]">${e.number}</div>
            <div class="text-slate-400 text-[11px]">${e.phone || 'Kein Telefon'}</div>
          </div>
        </div>
      </td>
      <td class="p-4">
        <div class="font-bold text-slate-800 text-xs">${e.role}</div>
        <div class="text-slate-400 text-[11px] mt-0.5 truncate max-w-xs">${e.notes || 'Keine Notizen'}</div>
      </td>
      <td class="p-4">
        <div class="font-semibold text-slate-800 text-xs">${e.type}</div>
        <div class="text-slate-400 text-[11px]">Seit: ${e.startDate || '-'}</div>
      </td>
      <td class="p-4">
        <div class="font-bold text-slate-800 text-xs flex items-center gap-1.5">
          <i data-lucide="building" class="w-3.5 h-3.5 text-slate-400"></i> ${e.location || 'Zentrale'}
        </div>
      </td>
      <td class="p-4 font-bold text-emerald-700 text-xs">
        € ${parseFloat(e.wage || 15).toFixed(2).replace('.', ',')} / Std.
      </td>
      <td class="p-4">
        ${statusBadge}
      </td>
      <td class="p-4 text-right">
        <div class="flex items-center justify-end gap-1.5">
          <button onclick="openEmployeeModal('${e.id}')" title="Bearbeiten" class="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200">
            <i data-lucide="edit-3" class="w-4 h-4"></i>
          </button>
          <button onclick="generateSingleEmployeeContract('${e.id}')" title="Arbeitsvertrag PDF" class="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
            <i data-lucide="file-text" class="w-4 h-4"></i>
          </button>
          <button onclick="openTimeModal('${e.id}')" title="Stunden erfassen" class="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100">
            <i data-lucide="clock" class="w-4 h-4"></i>
          </button>
          <button onclick="deleteEmployee('${e.id}')" title="Mitarbeiter löschen" class="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      </td>
    `;
    tableBody.appendChild(tr);
  });

  if (window.lucide) lucide.createIcons();
}

// Switch Sub-tabs inside Mitarbeiterbereich
function switchEmpSubTab(tab) {
  const listTab = document.getElementById('emp-subtab-list');
  const timesheetTab = document.getElementById('emp-subtab-timesheet');
  const btnList = document.getElementById('btn-emp-sub-list');
  const btnTime = document.getElementById('btn-emp-sub-timesheet');

  if (tab === 'list') {
    if (listTab) listTab.classList.remove('hidden');
    if (timesheetTab) timesheetTab.classList.add('hidden');
    if (btnList) btnList.className = 'px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow-sm flex items-center gap-2';
    if (btnTime) btnTime.className = 'px-4 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-2';
    renderEmployeesTable();
  } else {
    if (listTab) listTab.classList.add('hidden');
    if (timesheetTab) timesheetTab.classList.remove('hidden');
    if (btnList) btnList.className = 'px-4 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-2';
    if (btnTime) btnTime.className = 'px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow-sm flex items-center gap-2';
    renderTimesheetsTable();
  }
  if (window.lucide) lucide.createIcons();
}

// Open Employee Add / Edit Modal
function openEmployeeModal(empId = null) {
  const modal = document.getElementById('employeeModal');
  const title = document.getElementById('empModalTitle');
  const form = document.getElementById('employeeForm');
  
  form.reset();
  document.getElementById('empModalId').value = '';

  if (empId) {
    const employees = JSON.parse(localStorage.getItem(EMPLOYEES_STORAGE_KEY) || '[]');
    const emp = employees.find(e => e.id === empId);
    if (emp) {
      title.textContent = `Mitarbeiter bearbeiten: ${emp.firstName} ${emp.lastName}`;
      document.getElementById('empModalId').value = emp.id;
      document.getElementById('empFirstName').value = emp.firstName || '';
      document.getElementById('empLastName').value = emp.lastName || '';
      document.getElementById('empNumber').value = emp.number || '';
      document.getElementById('empRole').value = emp.role || 'Reinigungskraft';
      document.getElementById('empType').value = emp.type || 'Vollzeit';
      document.getElementById('empLocation').value = emp.location || 'Grand Hotel Central Berlin';
      document.getElementById('empStatus').value = emp.status || 'Aktiv';
      document.getElementById('empWage').value = emp.wage || '15.00';
      document.getElementById('empStartDate').value = emp.startDate || '';
      document.getElementById('empPhone').value = emp.phone || '';
      document.getElementById('empEmail').value = emp.email || '';
      document.getElementById('empNotes').value = emp.notes || '';
    }
  } else {
    title.textContent = 'Neuen Mitarbeiter anlegen';
    document.getElementById('empNumber').value = 'EMP-' + Math.floor(1000 + Math.random() * 9000);
    document.getElementById('empStartDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('empWage').value = '15.00';
  }

  modal.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

function closeEmployeeModal() {
  document.getElementById('employeeModal').classList.add('hidden');
}

// Save Employee (Create or Update)
function saveEmployee(e) {
  e.preventDefault();
  
  const id = document.getElementById('empModalId').value || ('EMP-' + Math.floor(1000 + Math.random() * 9000));
  const firstName = document.getElementById('empFirstName').value.trim();
  const lastName = document.getElementById('empLastName').value.trim();
  const number = document.getElementById('empNumber').value.trim();
  const role = document.getElementById('empRole').value;
  const type = document.getElementById('empType').value;
  const location = document.getElementById('empLocation').value;
  const status = document.getElementById('empStatus').value;
  const wage = document.getElementById('empWage').value.trim() || '15.00';
  const startDate = document.getElementById('empStartDate').value;
  const phone = document.getElementById('empPhone').value.trim();
  const email = document.getElementById('empEmail').value.trim();
  const notes = document.getElementById('empNotes').value.trim();

  let employees = JSON.parse(localStorage.getItem(EMPLOYEES_STORAGE_KEY) || '[]');
  const existingIdx = employees.findIndex(emp => emp.id === id);

  const empData = {
    id,
    firstName,
    lastName,
    number,
    role,
    type,
    location,
    status,
    wage,
    startDate,
    phone,
    email,
    notes
  };

  if (existingIdx !== -1) {
    employees[existingIdx] = empData;
  } else {
    employees.unshift(empData);
  }

  localStorage.setItem(EMPLOYEES_STORAGE_KEY, JSON.stringify(employees));
  closeEmployeeModal();
  renderEmployeesTable();
  populateEmployeeDropdowns();
  alert(`Mitarbeiter "${firstName} ${lastName}" erfolgreich gespeichert!`);
}

// Delete Employee
function deleteEmployee(empId) {
  if (confirm('Möchten Sie diesen Mitarbeiter wirklich aus dem System entfernen?')) {
    let employees = JSON.parse(localStorage.getItem(EMPLOYEES_STORAGE_KEY) || '[]');
    employees = employees.filter(e => e.id !== empId);
    localStorage.setItem(EMPLOYEES_STORAGE_KEY, JSON.stringify(employees));
    renderEmployeesTable();
    populateEmployeeDropdowns();
  }
}

// Export Employees CSV
function exportEmployeesCSV() {
  const employees = JSON.parse(localStorage.getItem(EMPLOYEES_STORAGE_KEY) || '[]');
  if (employees.length === 0) {
    alert('Keine Mitarbeiterdaten zum Exportieren vorhanden.');
    return;
  }

  let csvContent = 'data:text/csv;charset=utf-8,Personalnummer;Vorname;Nachname;Position;Anstellung;Objekt;Stundenlohn;Status;Telefon;Email;Eintrittsdatum\n';
  employees.forEach(e => {
    csvContent += `"${e.number}";"${e.firstName}";"${e.lastName}";"${e.role}";"${e.type}";"${e.location}";"${e.wage} EUR";"${e.status}";"${e.phone}";"${e.email}";"${e.startDate}"\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `CleanPro_Mitarbeiterliste_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Populate Employee Dropdowns across the App
function populateEmployeeDropdowns() {
  const employees = JSON.parse(localStorage.getItem(EMPLOYEES_STORAGE_KEY) || '[]');
  
  // 1. Hotel Daily Employee Select
  const hotelDailyEmpSelect = document.getElementById('hotel-daily-employee');
  if (hotelDailyEmpSelect) {
    hotelDailyEmpSelect.innerHTML = employees.map(e => 
      `<option value="${e.firstName} ${e.lastName} (${e.number})">${e.firstName} ${e.lastName} (${e.number}) - ${e.role}</option>`
    ).join('');
  }

  // 2. HR Document Employee Select
  const hrEmpSelect = document.getElementById('hr-doc-employee');
  if (hrEmpSelect) {
    hrEmpSelect.innerHTML = employees.map(e => 
      `<option value="${e.firstName} ${e.lastName}">${e.firstName} ${e.lastName} (Personalnummer: ${e.number})</option>`
    ).join('');
  }

  // 3. Time Tracker Modal Select
  const timeEmpSelect = document.getElementById('timeEmpSelect');
  if (timeEmpSelect) {
    timeEmpSelect.innerHTML = employees.map(e => 
      `<option value="${e.firstName} ${e.lastName} (${e.number})">${e.firstName} ${e.lastName} (${e.number})</option>`
    ).join('');
  }

  // 4. Payroll Employee Select
  const payrollEmpSelect = document.getElementById('payrollEmployeeSelect');
  if (payrollEmpSelect) {
    payrollEmpSelect.innerHTML = employees.map(e => 
      `<option value="${e.id}">${e.firstName} ${e.lastName} (${e.number}) - ${e.role}</option>`
    ).join('');
  }

  // 5. Leave Request Employee Select
  const leaveEmpSelect = document.getElementById('leaveEmpSelect');
  if (leaveEmpSelect) {
    leaveEmpSelect.innerHTML = employees.map(e => 
      `<option value="${e.firstName} ${e.lastName} (${e.number})">${e.firstName} ${e.lastName} (${e.number})</option>`
    ).join('');
  }

  // 6. Registration Employee Select
  const regEmpSelect = document.getElementById('regEmpSelect');
  if (regEmpSelect) {
    regEmpSelect.innerHTML = employees.map(e => 
      `<option value="${e.firstName} ${e.lastName} (${e.number})">${e.firstName} ${e.lastName} (${e.number}) - ${e.type}</option>`
    ).join('');
  }
}

// ==================== TIME TRACKING LOGIC ====================

function openTimeModal(empId = null) {
  const modal = document.getElementById('timeModal');
  const dateInput = document.getElementById('timeDate');
  if (dateInput) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }
  
  if (empId) {
    const employees = JSON.parse(localStorage.getItem(EMPLOYEES_STORAGE_KEY) || '[]');
    const emp = employees.find(e => e.id === empId);
    if (emp) {
      const select = document.getElementById('timeEmpSelect');
      if (select) {
        select.value = `${emp.firstName} ${emp.lastName} (${emp.number})`;
      }
    }
  }

  modal.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

function closeTimeModal() {
  document.getElementById('timeModal').classList.add('hidden');
}

function saveTimeEntry(e) {
  e.preventDefault();
  
  const empName = document.getElementById('timeEmpSelect').value;
  const date = document.getElementById('timeDate').value;
  const location = document.getElementById('timeLocation').value;
  const hours = parseFloat(document.getElementById('timeHours').value) || 8.0;
  const overtime = parseFloat(document.getElementById('timeOvertime').value) || 0.0;
  const note = document.getElementById('timeNote').value.trim() || 'Reguläre Schicht';

  const newEntry = {
    id: 'TS-' + Math.floor(100 + Math.random() * 900),
    empName,
    date,
    location,
    hours,
    overtime,
    note
  };

  let timesheets = JSON.parse(localStorage.getItem(TIMESHEETS_STORAGE_KEY) || '[]');
  timesheets.unshift(newEntry);
  localStorage.setItem(TIMESHEETS_STORAGE_KEY, JSON.stringify(timesheets));

  logAuditEvent('Arbeitszeiterfassung verbucht', getCurrentUserLabel(), `${empName} - ${hours} Std. (${location})`);
  closeTimeModal();
  renderTimesheetsTable();
  alert('Arbeitszeiteintrag erfolgreich verbucht!');
}

function renderTimesheetsTable() {
  const tableBody = document.getElementById('timesheetsTableBody');
  if (!tableBody) return;

  const timesheets = JSON.parse(localStorage.getItem(TIMESHEETS_STORAGE_KEY) || '[]');
  tableBody.innerHTML = '';

  timesheets.forEach(t => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50/80 transition-colors';
    tr.innerHTML = `
      <td class="p-3.5 font-bold text-slate-900">${t.date}</td>
      <td class="p-3.5 font-semibold text-emerald-800">${t.empName}</td>
      <td class="p-3.5 text-slate-700">${t.location}</td>
      <td class="p-3.5 font-bold text-slate-900">${t.hours} Std.</td>
      <td class="p-3.5 font-semibold text-amber-600">${t.overtime > 0 ? `+${t.overtime} Std.` : '-'}</td>
      <td class="p-3.5 text-slate-500 text-xs">${t.note}</td>
    `;
    tableBody.appendChild(tr);
  });
}

// Direct Contract PDF from Employee Table
function generateSingleEmployeeContract(empId) {
  const employees = JSON.parse(localStorage.getItem(EMPLOYEES_STORAGE_KEY) || '[]');
  const emp = employees.find(e => e.id === empId);
  if (!emp) return;

  const hrSelect = document.getElementById('hr-doc-employee');
  if (hrSelect) hrSelect.value = `${emp.firstName} ${emp.lastName}`;

  const hrWage = document.getElementById('hr-doc-salary');
  if (hrWage) {
    if (emp.type === 'Minijob') hrWage.value = '538.00';
    else if (emp.type === 'Vollzeit') hrWage.value = (parseFloat(emp.wage) * 160).toFixed(2);
    else hrWage.value = (parseFloat(emp.wage) * 100).toFixed(2);
  }

  generateHRDocumentPDF();
}

// ==================== ENTERPRISE DATA STORAGE & INITIALIZATION ====================

const HOTELS_STORAGE_KEY = 'cleanpro_hotels_data';
const ROSTER_STORAGE_KEY = 'cleanpro_roster_data';
const SUBCONTRACTORS_STORAGE_KEY = 'cleanpro_subcontractors_data';
const LEAVE_STORAGE_KEY = 'cleanpro_leave_data';
const TICKETS_STORAGE_KEY = 'cleanpro_tickets';
const AUDIT_STORAGE_KEY = 'cleanpro_audit_log';
const USER_ROLE_KEY = 'cleanpro_user_role';

const initialHotels = [
  {
    id: 'HOTEL-101',
    name: 'Grand Hotel Central Berlin',
    leader: 'Thomas Schneider',
    ezPrice: 12.50,
    dzPrice: 18.00,
    suitePrice: 35.00,
    hourlyRate: 25.00,
    roomsCleaned: 705,
    extraHours: 12.0,
    surcharges: 450.00,
    monthlyTotal: 11110.00
  },
  {
    id: 'HOTEL-102',
    name: 'Plaza Hotel Hamburg',
    leader: 'Sabine Becker',
    ezPrice: 13.00,
    dzPrice: 19.50,
    suitePrice: 38.00,
    hourlyRate: 26.00,
    roomsCleaned: 520,
    extraHours: 8.5,
    surcharges: 320.00,
    monthlyTotal: 8940.00
  },
  {
    id: 'HOTEL-103',
    name: 'Maritim Resort München',
    leader: 'Michael Weber',
    ezPrice: 14.00,
    dzPrice: 21.00,
    suitePrice: 42.00,
    hourlyRate: 28.00,
    roomsCleaned: 840,
    extraHours: 16.0,
    surcharges: 680.00,
    monthlyTotal: 17620.90
  }
];

const initialRoster = [
  {
    hotel: 'Grand Hotel Central Berlin',
    week: 'KW 37 (07.09.2026 - 13.09.2026)',
    leader: 'Thomas Schneider',
    schedule: [
      { empName: 'Elena Rossi (EMP-1006)', shifts: ['Früh (06-14)', 'Früh (06-14)', 'Früh (06-14)', 'Früh (06-14)', 'Früh (06-14)', 'Frei', 'Frei'] },
      { empName: 'Thomas Schneider (EMP-1001)', shifts: ['Tag (08-16)', 'Tag (08-16)', 'Tag (08-16)', 'Tag (08-16)', 'Tag (08-16)', 'Bereitschaft', 'Frei'] },
      { empName: 'Michael Weber (EMP-1004)', shifts: ['Frei', 'Spät (14-22)', 'Spät (14-22)', 'Spät (14-22)', 'Spät (14-22)', 'Früh (06-14)', 'Frei'] },
      { empName: 'Anna Wagner (EMP-1003)', shifts: ['Frei', 'Frei', 'Früh (06-14)', 'Früh (06-14)', 'Früh (06-14)', 'Früh (06-14)', 'Sonntag (08-16)'] }
    ]
  }
];

const initialSubcontractors = [
  {
    id: 'SUB-101',
    name: 'CleanStar Express GmbH',
    contact: 'Viktor Bauer',
    hotel: 'Grand Hotel Central Berlin',
    staffCount: 6,
    rates: 'EZ €11.50 / DZ €16.50 / Std. €22.00',
    phone: '+49 30 9876541',
    email: 'info@cleanstar-express.de',
    lastInvoice: '€ 4.280,00'
  },
  {
    id: 'SUB-102',
    name: 'Nordic Facility Partner',
    contact: 'Jonas Lindholm',
    hotel: 'Plaza Hotel Hamburg',
    staffCount: 4,
    rates: 'EZ €12.00 / DZ €17.50 / Std. €23.50',
    phone: '+49 40 1234567',
    email: 'hamburg@nordic-facility.de',
    lastInvoice: '€ 3.150,00'
  }
];

const initialLeaveRequests = [
  {
    id: 'UR-101',
    empName: 'Laura Hoffmann (EMP-1005)',
    type: 'Erholungsurlaub',
    startDate: '2026-09-14',
    endDate: '2026-09-25',
    days: 10,
    notes: 'Jahresurlaub mit Familie',
    status: 'Genehmigt'
  },
  {
    id: 'UR-102',
    empName: 'Anna Wagner (EMP-1003)',
    type: 'Erholungsurlaub',
    startDate: '2026-09-21',
    endDate: '2026-09-28',
    days: 6,
    notes: 'Erholungsurlaub nach Schichtturnus',
    status: 'Ausstehend'
  },
  {
    id: 'UR-103',
    empName: 'Stefan Lehmann (EMP-1008)',
    type: 'Sonderurlaub',
    startDate: '2026-09-18',
    endDate: '2026-09-19',
    days: 2,
    notes: 'Wohnungswechsel / Umzug',
    status: 'Ausstehend'
  }
];

const initialAuditLog = [
  {
    timestamp: '2026-09-10 09:15:22',
    user: 'Super-Admin (Zentrale)',
    action: 'Dienstplan KW 37 freigegeben',
    target: 'Grand Hotel Central Berlin',
    status: 'Erfolgreich'
  },
  {
    timestamp: '2026-09-09 17:40:10',
    user: 'Thomas Schneider (Objektleiter)',
    action: 'Tageserfassung gebucht (45 EZ, 82 DZ)',
    target: 'Grand Hotel Central Berlin',
    status: 'Erfolgreich'
  },
  {
    timestamp: '2026-09-09 14:12:05',
    user: 'Admin (Betriebsleiter)',
    action: 'Lohnabrechnung August generiert',
    target: 'Personalstamm',
    status: 'Erfolgreich'
  }
];

// ==================== ROLE-BASED ACCESS CONTROL (RBAC) ====================

function getUserRole() {
  return localStorage.getItem(USER_ROLE_KEY) || 'superadmin';
}

function getCurrentUserLabel() {
  const role = getUserRole();
  if (role === 'superadmin') return 'Super-Admin (Zentrale)';
  if (role === 'admin') return 'Admin (Betriebsleiter)';
  if (role === 'objektleiter') return 'Thomas Schneider (Objektleiter)';
  if (role === 'vorarbeiter') return 'Sabine Becker (Vorarbeiter)';
  return 'Super-Admin';
}

function openRoleModal() {
  const modal = document.getElementById('roleModal');
  if (modal) {
    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  }
}

function closeRoleModal() {
  const modal = document.getElementById('roleModal');
  if (modal) modal.classList.add('hidden');
}

function setUserRole(role) {
  localStorage.setItem(USER_ROLE_KEY, role);
  closeRoleModal();
  applyRolePermissions();
  logAuditEvent('Benutzerrolle gewechselt', getCurrentUserLabel(), `Aktive Rolle: ${role}`);
  alert(`Rolle erfolgreich auf "${getCurrentUserLabel()}" gewechselt!`);
}

function applyRolePermissions() {
  const role = getUserRole();
  const headerBadge = document.getElementById('headerRoleBadge');
  const bannerBadge = document.getElementById('currentRoleDisplay');
  const dailyBadge = document.getElementById('dailyModeBadge');

  let label = 'Super-Admin';
  if (role === 'admin') label = 'Admin';
  if (role === 'objektleiter') label = 'Objektleiter';
  if (role === 'vorarbeiter') label = 'Vorarbeiter';

  if (headerBadge) headerBadge.textContent = label;
  if (bannerBadge) bannerBadge.textContent = `Rolle: ${label}`;
  if (dailyBadge) dailyBadge.textContent = `${label}-Modus`;

  const isRestricted = (role === 'objektleiter' || role === 'vorarbeiter');

  // Hide admin-only tabs and buttons
  document.querySelectorAll('.role-admin-only').forEach(el => {
    if (isRestricted) {
      el.classList.add('hidden');
    } else {
      el.classList.remove('hidden');
    }
  });

  // Price masking for Objektleiter / Vorarbeiter
  document.querySelectorAll('.price-sensitive').forEach(el => {
    if (!el.getAttribute('data-original-text') || el.getAttribute('data-original-text').includes('Gesperrt')) {
      if (el.id === 'kpiRevenueTotal') {
        el.setAttribute('data-original-text', '€ 37.670,90');
      } else if (el.classList.contains('hotel-price-tag')) {
        el.setAttribute('data-original-text', el.textContent.trim());
      } else {
        el.setAttribute('data-original-text', el.textContent.trim());
      }
    }

    if (isRestricted) {
      el.textContent = '*** € (Gesperrt)';
    } else {
      const orig = el.getAttribute('data-original-text');
      if (orig && !orig.includes('Gesperrt')) {
        el.textContent = orig;
      } else {
        if (el.id === 'kpiRevenueTotal') el.textContent = '€ 37.670,90';
        else el.textContent = 'Umsatz (€)';
      }
    }
  });

  // Handle revenue chart bars visually
  document.querySelectorAll('.chart-bar-revenue').forEach(bar => {
    if (isRestricted) {
      bar.classList.add('opacity-30');
      bar.setAttribute('title', 'Umsatzentwicklung (Nur für Admin/Geschäftsführung)');
    } else {
      bar.classList.remove('opacity-30');
    }
  });

  // Handle chart hover tooltip revenue numbers
  document.querySelectorAll('.chart-tooltip-rev').forEach(el => {
    const raw = el.getAttribute('data-amount') || '€ 0,00';
    if (isRestricted) {
      el.textContent = '*** € (Gesperrt)';
    } else {
      el.textContent = raw;
    }
  });

  // Filter Hotel selection for Objektleiter / Vorarbeiter
  const dailyHotelSelect = document.getElementById('hotel-daily-object');
  if (dailyHotelSelect) {
    if (role === 'objektleiter') {
      dailyHotelSelect.value = 'Grand Hotel Central Berlin';
      Array.from(dailyHotelSelect.options).forEach(opt => {
        opt.disabled = (opt.value !== 'Grand Hotel Central Berlin');
      });
    } else if (role === 'vorarbeiter') {
      dailyHotelSelect.value = 'Plaza Hotel Hamburg';
      Array.from(dailyHotelSelect.options).forEach(opt => {
        opt.disabled = (opt.value !== 'Plaza Hotel Hamburg');
      });
    } else {
      Array.from(dailyHotelSelect.options).forEach(opt => {
        opt.disabled = false;
      });
    }
  }

  renderHotelsTable();
  renderRosterGrid();
}

// ==================== HOTEL & ENTERPRISE MODULE INITIALIZATION ====================

function initHotelModule() {
  if (!localStorage.getItem(HOTELS_STORAGE_KEY)) {
    localStorage.setItem(HOTELS_STORAGE_KEY, JSON.stringify(initialHotels));
  }
  if (!localStorage.getItem(ROSTER_STORAGE_KEY)) {
    localStorage.setItem(ROSTER_STORAGE_KEY, JSON.stringify(initialRoster));
  }
  if (!localStorage.getItem(SUBCONTRACTORS_STORAGE_KEY)) {
    localStorage.setItem(SUBCONTRACTORS_STORAGE_KEY, JSON.stringify(initialSubcontractors));
  }
  if (!localStorage.getItem(LEAVE_STORAGE_KEY)) {
    localStorage.setItem(LEAVE_STORAGE_KEY, JSON.stringify(initialLeaveRequests));
  }
  if (!localStorage.getItem(TICKETS_STORAGE_KEY)) {
    localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify([
      { id: 'T-101', empName: 'Thomas Schneider', title: 'Neuen Mitarbeiter für Maritim Hotel anmelden', date: '2026-09-08', status: 'Offen' },
      { id: 'T-102', empName: 'Sabine Becker', title: 'Reinigungsmittel & Mikrofasertücher nachbestellen', date: '2026-09-05', status: 'Erledigt' }
    ]));
  }
  if (!localStorage.getItem(AUDIT_STORAGE_KEY)) {
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(initialAuditLog));
  }

  const dateInput = document.getElementById('hotel-daily-date');
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }
  const hrDate = document.getElementById('hr-doc-date');
  if (hrDate && !hrDate.value) {
    hrDate.value = new Date().toISOString().split('T')[0];
  }
  const leaveStart = document.getElementById('leaveStartDate');
  if (leaveStart && !leaveStart.value) {
    leaveStart.value = new Date().toISOString().split('T')[0];
  }
  const leaveEnd = document.getElementById('leaveEndDate');
  if (leaveEnd && !leaveEnd.value) {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    leaveEnd.value = nextWeek.toISOString().split('T')[0];
  }

  populateEmployeeDropdowns();
  populateHotelDropdowns();
  renderHotelsTable();
  renderHotelsMasterList();
  renderRosterGrid();
  renderSubcontractorsTable();
  renderLeaveTable();
  renderTicketsList();
  renderAuditLog();
  calculatePayroll();
  applyRolePermissions();
  initSignaturePad();

  if (window.lucide) lucide.createIcons();
}

function switchHotelTab(tabName) {
  const tabs = ['overview', 'daily', 'roster', 'payroll', 'master', 'subcontractor', 'leave', 'service_confirm', 'hr', 'tickets', 'audit'];
  tabs.forEach(t => {
    const el = document.getElementById(`hotel-tab-${t}`);
    const btn = document.getElementById(`btn-hotel-tab-${t}`);
    if (el) {
      if (t === tabName) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    }
    if (btn) {
      if (t === tabName) {
        btn.className = 'hotel-tab-btn px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-white flex items-center gap-1.5 transition-all whitespace-nowrap shadow-sm';
      } else {
        btn.className = 'hotel-tab-btn px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 transition-all whitespace-nowrap';
      }
    }
  });

  if (tabName === 'payroll') {
    updatePayrollInputs();
    calculatePayroll();
  }
  if (tabName === 'service_confirm') {
    setTimeout(initSignaturePad, 100);
  }

  if (window.lucide) lucide.createIcons();
}

// ==================== STAMMDATEN: HOTELS & ZIMMERPREISE ====================

function populateHotelDropdowns() {
  const hotels = JSON.parse(localStorage.getItem(HOTELS_STORAGE_KEY) || '[]');
  const dailySelect = document.getElementById('hotel-daily-object');
  const rosterSelect = document.getElementById('rosterHotelSelect');
  const signSelect = document.getElementById('signHotelSelect');
  const subHotelSelect = document.getElementById('subFormHotel');

  const optionsHtml = hotels.map(h => `<option value="${h.name}">${h.name}</option>`).join('');

  if (dailySelect) dailySelect.innerHTML = optionsHtml;
  if (rosterSelect) rosterSelect.innerHTML = optionsHtml;
  if (signSelect) signSelect.innerHTML = optionsHtml;
  if (subHotelSelect) subHotelSelect.innerHTML = optionsHtml;
}

function renderHotelsTable() {
  const tableBody = document.getElementById('hotelsTableBody');
  if (!tableBody) return;

  const hotels = JSON.parse(localStorage.getItem(HOTELS_STORAGE_KEY) || '[]');
  const role = getUserRole();
  const isRestricted = (role === 'objektleiter' || role === 'vorarbeiter');

  let filtered = hotels;
  if (role === 'objektleiter') {
    filtered = hotels.filter(h => h.name.includes('Berlin'));
  } else if (role === 'vorarbeiter') {
    filtered = hotels.filter(h => h.name.includes('Hamburg'));
  }

  tableBody.innerHTML = '';

  filtered.forEach(h => {
    const revenueDisplay = isRestricted ? '*** € (Gesperrt)' : `€ ${h.monthlyTotal.toLocaleString('de-DE', { minimumFractionDigits: 2 })}`;
    const surchargeDisplay = isRestricted ? '*** €' : `+ € ${h.surcharges.toFixed(2).replace('.', ',')}`;

    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50/80 transition-colors';
    tr.innerHTML = `
      <td class="p-4 font-bold text-slate-900">
        <div class="flex items-center gap-2">
          <i data-lucide="building" class="w-4 h-4 text-emerald-600"></i>
          <span>${h.name}</span>
        </div>
      </td>
      <td class="p-4 font-semibold text-slate-700">${h.leader}</td>
      <td class="p-4 font-bold text-slate-900">${h.roomsCleaned} Zimmer</td>
      <td class="p-4 font-semibold text-amber-600">${h.extraHours} Std.</td>
      <td class="p-4 font-semibold text-purple-700">${surchargeDisplay}</td>
      <td class="p-4 font-extrabold text-emerald-700 text-sm">${revenueDisplay}</td>
      <td class="p-4 text-right">
        <div class="flex items-center justify-end gap-1.5">
          <button onclick="generateHotelMonthlyReport('${h.name}')" title="Monatsrechnung PDF" class="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold text-[11px] flex items-center gap-1">
            <i data-lucide="file-text" class="w-3.5 h-3.5"></i> PDF
          </button>
          <button onclick="openHotelModal('${h.id}')" title="Bearbeiten" class="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 role-admin-only ${isRestricted ? 'hidden' : ''}">
            <i data-lucide="edit" class="w-4 h-4"></i>
          </button>
        </div>
      </td>
    `;
    tableBody.appendChild(tr);
  });

  const kpiHotelCount = document.getElementById('kpiHotelCount');
  if (kpiHotelCount) kpiHotelCount.textContent = `${hotels.length} Hotels`;

  if (window.lucide) lucide.createIcons();
}

function renderHotelsMasterList() {
  const container = document.getElementById('hotelsMasterList');
  if (!container) return;

  const hotels = JSON.parse(localStorage.getItem(HOTELS_STORAGE_KEY) || '[]');
  
  container.innerHTML = hotels.map(h => `
    <div class="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-emerald-300 transition-all">
      <div>
        <div class="flex items-center gap-2">
          <span class="font-bold text-base text-slate-900">${h.name}</span>
          <span class="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-bold">Objektleiter: ${h.leader}</span>
        </div>
        <div class="flex flex-wrap gap-4 mt-2 text-xs text-slate-600 font-medium">
          <span>Einzelzimmer: <strong class="text-slate-900">€ ${parseFloat(h.ezPrice).toFixed(2)}</strong></span>
          <span>Doppelzimmer: <strong class="text-slate-900">€ ${parseFloat(h.dzPrice).toFixed(2)}</strong></span>
          <span>Suiten: <strong class="text-slate-900">€ ${parseFloat(h.suitePrice).toFixed(2)}</strong></span>
          <span>Stundensatz: <strong class="text-emerald-700">€ ${parseFloat(h.hourlyRate).toFixed(2)} / Std.</strong></span>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="openHotelModal('${h.id}')" class="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold flex items-center gap-1.5">
          <i data-lucide="edit-3" class="w-3.5 h-3.5"></i> Bearbeiten
        </button>
        <button onclick="deleteHotelObject('${h.id}')" class="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1.5">
          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Löschen
        </button>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

function openHotelModal(hotelId = null) {
  const modal = document.getElementById('hotelModal');
  const form = document.getElementById('hotelForm');
  form.reset();

  if (hotelId) {
    const hotels = JSON.parse(localStorage.getItem(HOTELS_STORAGE_KEY) || '[]');
    const h = hotels.find(item => item.id === hotelId);
    if (h) {
      document.getElementById('hotelFormName').value = h.name;
      document.getElementById('hotelFormLeader').value = h.leader;
      document.getElementById('hotelFormEz').value = h.ezPrice;
      document.getElementById('hotelFormDz').value = h.dzPrice;
      document.getElementById('hotelFormSuite').value = h.suitePrice;
      document.getElementById('hotelFormHourly').value = h.hourlyRate;
      form.setAttribute('data-edit-id', hotelId);
    }
  } else {
    form.removeAttribute('data-edit-id');
  }

  modal.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

function closeHotelModal() {
  document.getElementById('hotelModal').classList.add('hidden');
}

function saveHotelObject(e) {
  e.preventDefault();
  const form = document.getElementById('hotelForm');
  const editId = form.getAttribute('data-edit-id');
  const name = document.getElementById('hotelFormName').value.trim();
  const leader = document.getElementById('hotelFormLeader').value.trim();
  const ezPrice = parseFloat(document.getElementById('hotelFormEz').value) || 12.50;
  const dzPrice = parseFloat(document.getElementById('hotelFormDz').value) || 18.00;
  const suitePrice = parseFloat(document.getElementById('hotelFormSuite').value) || 35.00;
  const hourlyRate = parseFloat(document.getElementById('hotelFormHourly').value) || 25.00;

  let hotels = JSON.parse(localStorage.getItem(HOTELS_STORAGE_KEY) || '[]');

  if (editId) {
    const index = hotels.findIndex(h => h.id === editId);
    if (index !== -1) {
      hotels[index] = { ...hotels[index], name, leader, ezPrice, dzPrice, suitePrice, hourlyRate };
    }
    logAuditEvent('Hotel-Stammdaten aktualisiert', getCurrentUserLabel(), `${name} (${leader})`);
  } else {
    const newHotel = {
      id: 'HOTEL-' + Math.floor(100 + Math.random() * 900),
      name,
      leader,
      ezPrice,
      dzPrice,
      suitePrice,
      hourlyRate,
      roomsCleaned: 0,
      extraHours: 0,
      surcharges: 0,
      monthlyTotal: 0
    };
    hotels.push(newHotel);
    logAuditEvent('Neues Hotel angelegt', getCurrentUserLabel(), `${name}`);
  }

  localStorage.setItem(HOTELS_STORAGE_KEY, JSON.stringify(hotels));
  closeHotelModal();
  populateHotelDropdowns();
  renderHotelsTable();
  renderHotelsMasterList();
  alert(`Hotel "${name}" erfolgreich gespeichert!`);
}

function deleteHotelObject(hotelId) {
  if (confirm('Möchten Sie dieses Hotel-Objekt wirklich entfernen?')) {
    let hotels = JSON.parse(localStorage.getItem(HOTELS_STORAGE_KEY) || '[]');
    const deleted = hotels.find(h => h.id === hotelId);
    hotels = hotels.filter(h => h.id !== hotelId);
    localStorage.setItem(HOTELS_STORAGE_KEY, JSON.stringify(hotels));
    logAuditEvent('Hotel-Objekt gelöscht', getCurrentUserLabel(), deleted ? deleted.name : hotelId);
    populateHotelDropdowns();
    renderHotelsTable();
    renderHotelsMasterList();
  }
}

// ==================== TÄGLICHE ERFASSUNG ====================

function saveHotelDailyEntry(e) {
  if (e) e.preventDefault();

  const hotel = document.getElementById('hotel-daily-object').value;
  const emp = document.getElementById('hotel-daily-employee').value;
  const dateVal = document.getElementById('hotel-daily-date').value;
  const ez = parseInt(document.getElementById('hotel-daily-ez').value) || 0;
  const dz = parseInt(document.getElementById('hotel-daily-dz').value) || 0;
  const suite = parseInt(document.getElementById('hotel-daily-suite').value) || 0;
  const extraHours = parseFloat(document.getElementById('hotel-daily-extra').value) || 0;
  const absence = document.getElementById('hotel-daily-absence').value;
  const note = document.getElementById('hotel-daily-note').value.trim();

  let hotels = JSON.parse(localStorage.getItem(HOTELS_STORAGE_KEY) || '[]');
  const hIndex = hotels.findIndex(h => h.name === hotel);
  const totalRooms = ez + dz + suite;

  if (hIndex !== -1) {
    hotels[hIndex].roomsCleaned = (hotels[hIndex].roomsCleaned || 0) + totalRooms;
    hotels[hIndex].extraHours = (hotels[hIndex].extraHours || 0) + extraHours;
    const addedRevenue = (ez * hotels[hIndex].ezPrice) + (dz * hotels[hIndex].dzPrice) + (suite * hotels[hIndex].suitePrice) + (extraHours * hotels[hIndex].hourlyRate);
    hotels[hIndex].monthlyTotal = (hotels[hIndex].monthlyTotal || 0) + addedRevenue;
    localStorage.setItem(HOTELS_STORAGE_KEY, JSON.stringify(hotels));
  }

  logAuditEvent('Tägliche Zimmererfassung verbucht', getCurrentUserLabel(), `${hotel} - ${emp} (${totalRooms} Zimmer, ${extraHours}h Extrastunden)`);
  renderHotelsTable();

  alert(`Tageserfassung Erfolgreich Gespeichert!\n\nObjekt: ${hotel}\nMitarbeiter: ${emp}\nDatum: ${dateVal}\nZimmer: ${ez} EZ, ${dz} DZ, ${suite} Suites (${totalRooms} gesamt)\nExtrastunden: ${extraHours} Std.\nAbwesenheitsstatus: ${absence}\nHinweis: ${note || 'Keine Notiz'}`);
}

// ==================== DIENSTPLAN & SCHICHTPLANER ====================

function renderRosterGrid() {
  const tableBody = document.getElementById('rosterTableBody');
  if (!tableBody) return;

  const rosters = JSON.parse(localStorage.getItem(ROSTER_STORAGE_KEY) || '[]');
  const selectedHotel = document.getElementById('rosterHotelSelect')?.value || 'Grand Hotel Central Berlin';
  const roster = rosters.find(r => r.hotel === selectedHotel) || rosters[0];

  if (!roster || !roster.schedule) return;

  tableBody.innerHTML = '';

  roster.schedule.forEach((row, rowIndex) => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50 transition-colors';
    
    let cellsHtml = `<td class="p-3 font-bold text-slate-900 text-xs">${row.empName}</td>`;
    row.shifts.forEach((shift, dayIndex) => {
      let bgClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      if (shift.includes('Frei')) bgClass = 'bg-slate-100 text-slate-500 border-slate-200';
      if (shift.includes('Spät')) bgClass = 'bg-blue-50 text-blue-800 border-blue-200';
      if (shift.includes('Sonntag')) bgClass = 'bg-amber-50 text-amber-800 border-amber-200';
      if (shift.includes('Bereitschaft')) bgClass = 'bg-purple-50 text-purple-800 border-purple-200';

      cellsHtml += `
        <td class="p-2 text-center">
          <input type="text" value="${shift}" onchange="updateRosterCell(${rowIndex}, ${dayIndex}, this.value)" class="w-full text-center text-[11px] font-semibold rounded-lg px-1.5 py-1 border ${bgClass}">
        </td>
      `;
    });

    tr.innerHTML = cellsHtml;
    tableBody.appendChild(tr);
  });
}

function updateRosterCell(rowIndex, dayIndex, newValue) {
  let rosters = JSON.parse(localStorage.getItem(ROSTER_STORAGE_KEY) || '[]');
  const selectedHotel = document.getElementById('rosterHotelSelect')?.value || 'Grand Hotel Central Berlin';
  const rosterIndex = rosters.findIndex(r => r.hotel === selectedHotel);

  if (rosterIndex !== -1 && rosters[rosterIndex].schedule[rowIndex]) {
    rosters[rosterIndex].schedule[rowIndex].shifts[dayIndex] = newValue;
    localStorage.setItem(ROSTER_STORAGE_KEY, JSON.stringify(rosters));
  }
}

function saveRosterPlan() {
  const hotel = document.getElementById('rosterHotelSelect').value;
  const week = document.getElementById('rosterWeek').value;
  const leader = document.getElementById('rosterLeader').value;

  logAuditEvent('Dienstplan gespeichert & aktualisiert', getCurrentUserLabel(), `${hotel} (${week})`);
  alert(`Dienstplan für "${hotel}" (${week}) erfolgreich im System gespeichert!`);
}

function exportRosterPDF() {
  const hotel = document.getElementById('rosterHotelSelect')?.value || 'Grand Hotel Central Berlin';
  const week = document.getElementById('rosterWeek')?.value || 'KW 37 (07.09.2026 - 13.09.2026)';
  const leader = document.getElementById('rosterLeader')?.value || 'Thomas Schneider';

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF('landscape');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(18);
  pdf.setTextColor(6, 78, 59);
  pdf.text('DIENSTPLAN & SCHICHTÜBERSICHT', 20, 20);

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(51, 65, 85);
  pdf.text(`Hotel-Objekt: ${hotel}`, 20, 30);
  pdf.text(`Planungszeitraum: ${week}`, 20, 36);
  pdf.text(`Objektleitung: ${leader}`, 180, 30);
  pdf.text(`Ausdruck vom: ${new Date().toLocaleDateString('de-DE')}`, 180, 36);

  pdf.setDrawColor(16, 185, 129);
  pdf.setLineWidth(0.5);
  pdf.line(20, 42, 275, 42);

  // Table Headers
  const days = ['Mitarbeiter', 'Mo (07.09)', 'Di (08.09)', 'Mi (09.09)', 'Do (10.09)', 'Fr (11.09)', 'Sa (12.09)', 'So (13.09)'];
  const colWidths = [65, 30, 30, 30, 30, 30, 30, 30];
  let startX = 20;
  let startY = 50;

  pdf.setFillColor(15, 23, 42);
  pdf.rect(startX, startY, 255, 10, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9);

  let currentX = startX;
  days.forEach((day, i) => {
    pdf.text(day, currentX + 3, startY + 7);
    currentX += colWidths[i];
  });

  // Table Rows
  const rosters = JSON.parse(localStorage.getItem(ROSTER_STORAGE_KEY) || '[]');
  const roster = rosters.find(r => r.hotel === hotel) || rosters[0];

  startY += 10;
  pdf.setTextColor(15, 23, 42);
  pdf.setFont('helvetica', 'normal');

  if (roster && roster.schedule) {
    roster.schedule.forEach((row, rIdx) => {
      currentX = startX;
      pdf.setFillColor(rIdx % 2 === 0 ? 248 : 255, rIdx % 2 === 0 ? 250 : 255, rIdx % 2 === 0 ? 252 : 255);
      pdf.rect(startX, startY, 255, 12, 'F');
      pdf.setDrawColor(226, 232, 240);
      pdf.rect(startX, startY, 255, 12, 'S');

      pdf.setFont('helvetica', 'bold');
      pdf.text(row.empName, currentX + 3, startY + 8);
      currentX += colWidths[0];

      pdf.setFont('helvetica', 'normal');
      row.shifts.forEach((s, sIdx) => {
        pdf.text(s, currentX + 3, startY + 8);
        currentX += colWidths[sIdx + 1];
      });
      startY += 12;
    });
  }

  // Signature Block
  startY += 15;
  pdf.setDrawColor(200, 200, 200);
  pdf.rect(20, startY, 100, 20);
  pdf.setFontSize(8);
  pdf.text('Datum, Unterschrift Objektleitung', 22, startY + 25);

  pdf.rect(175, startY, 100, 20);
  pdf.text('Datum, Unterschrift Betriebsleitung / Admin', 177, startY + 25);

  pdf.save(`Dienstplan_${hotel.replace(/\s+/g, '_')}_${week.split(' ')[0]}.pdf`);
}

// ==================== LOHN- & GEHALTSABRECHNUNG (PAYROLL) ====================

function updatePayrollInputs() {
  const empId = document.getElementById('payrollEmployeeSelect')?.value;
  if (!empId) return;

  const employees = JSON.parse(localStorage.getItem(EMPLOYEES_STORAGE_KEY) || '[]');
  const emp = employees.find(e => e.id === empId);

  if (emp) {
    const baseWageInput = document.getElementById('payrollBaseWage');
    const taxClassSelect = document.getElementById('payrollTaxClass');
    const nameDisplay = document.getElementById('payrollEmpNameDisplay');

    if (baseWageInput) baseWageInput.value = parseFloat(emp.wage || 15).toFixed(2);
    if (nameDisplay) nameDisplay.textContent = `${emp.firstName} ${emp.lastName} (${emp.number})`;

    if (taxClassSelect) {
      if (emp.type === 'Minijob') taxClassSelect.value = 'minijob';
      else taxClassSelect.value = 'klasse1';
    }
  }
  calculatePayroll();
}

function calculatePayroll() {
  const regHours = parseFloat(document.getElementById('payrollRegHours')?.value) || 0;
  const sunHours = parseFloat(document.getElementById('payrollSundayHours')?.value) || 0;
  const holHours = parseFloat(document.getElementById('payrollHolidayHours')?.value) || 0;
  const baseRate = parseFloat(document.getElementById('payrollBaseWage')?.value) || 15.0;
  const taxClass = document.getElementById('payrollTaxClass')?.value || 'klasse1';

  const basePay = regHours * baseRate;
  const sundayBonus = sunHours * baseRate * 0.5; // 50% steuerfrei nach § 3b EStG
  const holidayBonus = holHours * baseRate * 1.0; // 100% steuerfrei nach § 3b EStG
  const grossTotal = basePay + sundayBonus + holidayBonus;

  let deductions = 0;
  if (taxClass === 'minijob') {
    deductions = 0.00; // Pauschal versteuert durch Arbeitgeber
  } else if (taxClass === 'klasse3') {
    deductions = basePay * 0.16; // Geringere Steuerklasse
  } else {
    deductions = basePay * 0.21; // Steuerklasse 1 (Lohnsteuer + SV ca. 21%)
  }

  const netPay = grossTotal - deductions;

  const dBase = document.getElementById('payrollDisplayBase');
  const dSun = document.getElementById('payrollDisplaySunday');
  const dHol = document.getElementById('payrollDisplayHoliday');
  const dGross = document.getElementById('payrollDisplayGross');
  const dDeduct = document.getElementById('payrollDisplayDeductions');
  const dNet = document.getElementById('payrollDisplayNet');

  if (dBase) dBase.textContent = `€ ${basePay.toFixed(2).replace('.', ',')}`;
  if (dSun) dSun.textContent = `€ ${sundayBonus.toFixed(2).replace('.', ',')}`;
  if (dHol) dHol.textContent = `€ ${holidayBonus.toFixed(2).replace('.', ',')}`;
  if (dGross) dGross.textContent = `€ ${grossTotal.toFixed(2).replace('.', ',')}`;
  if (dDeduct) dDeduct.textContent = `- € ${deductions.toFixed(2).replace('.', ',')}`;
  if (dNet) dNet.textContent = `€ ${netPay.toFixed(2).replace('.', ',')}`;

  return { basePay, sundayBonus, holidayBonus, grossTotal, deductions, netPay, regHours, sunHours, holHours, baseRate };
}

function calculateAndGeneratePayrollPDF() {
  const empSelect = document.getElementById('payrollEmployeeSelect');
  const empId = empSelect?.value;
  const employees = JSON.parse(localStorage.getItem(EMPLOYEES_STORAGE_KEY) || '[]');
  const emp = employees.find(e => e.id === empId) || employees[0];
  const month = document.getElementById('payrollMonth')?.value || 'September 2026';
  const data = calculatePayroll();

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(18);
  pdf.setTextColor(15, 23, 42);
  pdf.text('LOHN- & GEHALTSABRECHNUNG', 20, 25);

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(100, 116, 139);
  pdf.text('CleanPro Gebäudereinigung GmbH • Personal- & Lohnbuchhaltung', 20, 32);
  pdf.text(`Abrechnungsmonat: ${month}`, 140, 25);
  pdf.text(`Ausstellungsdatum: ${new Date().toLocaleDateString('de-DE')}`, 140, 32);

  pdf.setDrawColor(226, 232, 240);
  pdf.line(20, 38, 190, 38);

  // Employee details box
  pdf.setFillColor(248, 250, 252);
  pdf.rect(20, 44, 170, 28, 'F');
  pdf.rect(20, 44, 170, 28, 'S');

  pdf.setTextColor(15, 23, 42);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(11);
  pdf.text(`Mitarbeiter: ${emp.firstName} ${emp.lastName}`, 25, 52);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.text(`Personalnummer: ${emp.number}`, 25, 60);
  pdf.text(`Tätigkeit: ${emp.role} (${emp.type})`, 25, 66);
  pdf.text(`Einsatzort: ${emp.location}`, 105, 60);
  pdf.text(`Stundenlohn: ${parseFloat(emp.wage || 15).toFixed(2)} €/Std.`, 105, 66);

  // Earnings Table
  let startY = 82;
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(11);
  pdf.text('Vergütungsbestandteile & Zuschläge (§ 3b EStG):', 20, startY);

  startY += 6;
  pdf.setFillColor(15, 23, 42);
  pdf.rect(20, startY, 170, 8, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(9);
  pdf.text('Bezeichnung', 25, startY + 5.5);
  pdf.text('Stunden', 95, startY + 5.5);
  pdf.text('Satz', 125, startY + 5.5);
  pdf.text('Gesamtbetrag', 160, startY + 5.5);

  startY += 8;
  pdf.setTextColor(15, 23, 42);
  pdf.setFont('helvetica', 'normal');

  // Row 1: Regular
  pdf.rect(20, startY, 170, 8, 'S');
  pdf.text('Grundvergütung (Regulär)', 25, startY + 5.5);
  pdf.text(`${data.regHours} Std.`, 95, startY + 5.5);
  pdf.text(`${data.baseRate.toFixed(2)} €`, 125, startY + 5.5);
  pdf.text(`${data.basePay.toFixed(2)} €`, 160, startY + 5.5);
  startY += 8;

  // Row 2: Sunday
  pdf.rect(20, startY, 170, 8, 'S');
  pdf.text('Sonntagszuschlag (+50% steuerfrei)', 25, startY + 5.5);
  pdf.text(`${data.sunHours} Std.`, 95, startY + 5.5);
  pdf.text(`${(data.baseRate * 0.5).toFixed(2)} €`, 125, startY + 5.5);
  pdf.text(`${data.sundayBonus.toFixed(2)} €`, 160, startY + 5.5);
  startY += 8;

  // Row 3: Holiday
  pdf.rect(20, startY, 170, 8, 'S');
  pdf.text('Feiertagszuschlag (+100% steuerfrei)', 25, startY + 5.5);
  pdf.text(`${data.holHours} Std.`, 95, startY + 5.5);
  pdf.text(`${(data.baseRate * 1.0).toFixed(2)} €`, 125, startY + 5.5);
  pdf.text(`${data.holidayBonus.toFixed(2)} €`, 160, startY + 5.5);
  startY += 8;

  // Gross & Deductions
  startY += 5;
  pdf.setFont('helvetica', 'bold');
  pdf.text(`Gesamt-Brutto: ${data.grossTotal.toFixed(2)} €`, 130, startY + 6);
  startY += 10;
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(225, 29, 72);
  pdf.text(`Abzüge Steuern & Sozialabgaben: - ${data.deductions.toFixed(2)} €`, 115, startY + 6);
  startY += 12;

  // Net Payout Box
  pdf.setFillColor(16, 185, 129);
  pdf.rect(20, startY, 170, 14, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(13);
  pdf.text(`NETTO-AUSZAHLUNG: ${data.netPay.toFixed(2)} €`, 25, startY + 9.5);

  startY += 30;
  pdf.setTextColor(100, 116, 139);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.text('Der Auszahlungsbetrag wird per SEPA-Überweisung zum Monatsletzten auf das hinterlegte Bankkonto angewiesen.', 20, startY);

  logAuditEvent('Lohnabrechnung PDF exportiert', getCurrentUserLabel(), `${emp.firstName} ${emp.lastName} (${month})`);
  pdf.save(`Lohnabrechnung_${emp.lastName}_${month.replace(/\s+/g, '_')}.pdf`);
}

// ==================== SUBUNTERNEHMER-VERWALTUNG ====================

function renderSubcontractorsTable() {
  const tableBody = document.getElementById('subcontractorsTableBody');
  if (!tableBody) return;

  const subs = JSON.parse(localStorage.getItem(SUBCONTRACTORS_STORAGE_KEY) || '[]');
  tableBody.innerHTML = '';

  subs.forEach(s => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50/80 transition-colors';
    tr.innerHTML = `
      <td class="p-4">
        <div class="font-bold text-slate-900 text-sm">${s.name}</div>
        <div class="text-slate-400 text-[11px]">${s.email} | ${s.phone}</div>
      </td>
      <td class="p-4 font-semibold text-slate-800">${s.contact}</td>
      <td class="p-4 font-bold text-emerald-800">${s.hotel}</td>
      <td class="p-4 font-bold text-slate-900">${s.staffCount} Reinigungskräfte</td>
      <td class="p-4 font-semibold text-slate-700 text-xs">${s.rates}</td>
      <td class="p-4 text-right">
        <div class="flex items-center justify-end gap-1.5">
          <button onclick="generateSubcontractorPDF('${s.id}')" title="Gutschrift PDF erstellen" class="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold text-[11px] flex items-center gap-1">
            <i data-lucide="file-text" class="w-3.5 h-3.5"></i> Gutschrift
          </button>
          <button onclick="deleteSubcontractor('${s.id}')" title="Löschen" class="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      </td>
    `;
    tableBody.appendChild(tr);
  });

  if (window.lucide) lucide.createIcons();
}

function openSubcontractorModal() {
  const modal = document.getElementById('subcontractorModal');
  const form = document.getElementById('subcontractorForm');
  form.reset();
  modal.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

function closeSubcontractorModal() {
  document.getElementById('subcontractorModal').classList.add('hidden');
}

function saveSubcontractor(e) {
  e.preventDefault();
  const name = document.getElementById('subFormName').value.trim();
  const contact = document.getElementById('subFormContact').value.trim();
  const hotel = document.getElementById('subFormHotel').value;
  const staffCount = parseInt(document.getElementById('subFormStaff').value) || 1;
  const rates = document.getElementById('subFormRates').value.trim();

  let subs = JSON.parse(localStorage.getItem(SUBCONTRACTORS_STORAGE_KEY) || '[]');
  const newSub = {
    id: 'SUB-' + Math.floor(100 + Math.random() * 900),
    name,
    contact,
    hotel,
    staffCount,
    rates,
    phone: '+49 170 ' + Math.floor(1000000 + Math.random() * 9000000),
    email: 'info@' + name.toLowerCase().replace(/[^a-z0-9]/g, '') + '.de',
    lastInvoice: '€ 0,00'
  };

  subs.unshift(newSub);
  localStorage.setItem(SUBCONTRACTORS_STORAGE_KEY, JSON.stringify(subs));
  logAuditEvent('Subunternehmer angelegt', getCurrentUserLabel(), `${name} (${hotel})`);

  closeSubcontractorModal();
  renderSubcontractorsTable();
  alert(`Subunternehmer "${name}" erfolgreich registriert!`);
}

function deleteSubcontractor(subId) {
  if (confirm('Möchten Sie diesen Subunternehmer wirklich löschen?')) {
    let subs = JSON.parse(localStorage.getItem(SUBCONTRACTORS_STORAGE_KEY) || '[]');
    subs = subs.filter(s => s.id !== subId);
    localStorage.setItem(SUBCONTRACTORS_STORAGE_KEY, JSON.stringify(subs));
    renderSubcontractorsTable();
  }
}

function generateSubcontractorPDF(subId) {
  const subs = JSON.parse(localStorage.getItem(SUBCONTRACTORS_STORAGE_KEY) || '[]');
  const sub = subs.find(s => s.id === subId) || subs[0];

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(18);
  pdf.setTextColor(6, 78, 59);
  pdf.text('LEISTUNGSGUTSCHRIFT / ABRECHNUNGSBELEG', 20, 25);

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(51, 65, 85);
  pdf.text(`Gutschriftsempfänger: ${sub.name}`, 20, 36);
  pdf.text(`Ansprechpartner: ${sub.contact}`, 20, 42);
  pdf.text(`Einsatzobjekt: ${sub.hotel}`, 20, 48);
  pdf.text(`Abrechnungsnummer: GS-${Math.floor(10000 + Math.random() * 90000)}`, 140, 36);
  pdf.text(`Datum: ${new Date().toLocaleDateString('de-DE')}`, 140, 42);

  pdf.line(20, 54, 190, 54);

  pdf.setFont('helvetica', 'bold');
  pdf.text('Vergütete Fremdleistungen & Zimmerkontingente:', 20, 64);

  pdf.setFont('helvetica', 'normal');
  pdf.text('• Bereitstellung Reinigungspersonal (5 Kräfte)', 25, 74);
  pdf.text('• 220 Einzelzimmer Reinigung x 11,50 € = 2.530,00 €', 25, 82);
  pdf.text('• 95 Doppelzimmer Reinigung x 16,50 € = 1.567,50 €', 25, 90);
  pdf.text('• Sonderreinigung 8 Std. x 22,00 € = 176,00 €', 25, 98);

  pdf.line(20, 108, 190, 108);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Auszahlungsbetrag Netto: 4.273,50 €', 120, 116);
  pdf.text('19% USt. nach § 13b UStG: Reverse Charge', 120, 122);
  pdf.setFontSize(12);
  pdf.text('Gesamt-Gutschriftsbetrag: 4.273,50 €', 105, 132);

  logAuditEvent('Gutschrift für Subunternehmer generiert', getCurrentUserLabel(), `${sub.name}`);
  pdf.save(`Gutschrift_${sub.name.replace(/\s+/g, '_')}.pdf`);
}

// ==================== URLAUBSVERWALTUNG ====================

function renderLeaveTable() {
  const tableBody = document.getElementById('leaveTableBody');
  if (!tableBody) return;

  const leaves = JSON.parse(localStorage.getItem(LEAVE_STORAGE_KEY) || '[]');
  tableBody.innerHTML = '';

  leaves.forEach(l => {
    let badgeClass = 'bg-amber-100 text-amber-800';
    if (l.status === 'Genehmigt') badgeClass = 'bg-emerald-100 text-emerald-800';
    if (l.status === 'Abgelehnt') badgeClass = 'bg-rose-100 text-rose-800';

    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50/80 transition-colors';
    tr.innerHTML = `
      <td class="p-4 font-bold text-slate-900">${l.empName}</td>
      <td class="p-4 font-semibold text-slate-700">${l.type}</td>
      <td class="p-4 font-bold text-slate-800">${l.startDate} bis ${l.endDate}</td>
      <td class="p-4 font-bold text-slate-900">${l.days} Arbeitstage</td>
      <td class="p-4">
        <span class="px-2.5 py-1 rounded-full text-xs font-bold ${badgeClass}">
          ${l.status}
        </span>
      </td>
      <td class="p-4 text-right">
        <div class="flex items-center justify-end gap-1.5">
          ${l.status === 'Ausstehend' ? `
            <button onclick="approveLeave('${l.id}')" title="Genehmigen" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs">
              Genehmigen
            </button>
            <button onclick="rejectLeave('${l.id}')" title="Ablehnen" class="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-xs">
              Ablehnen
            </button>
          ` : `<span class="text-xs text-slate-400 font-medium">Bearbeitet</span>`}
        </div>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

function openLeaveModal() {
  const modal = document.getElementById('leaveModal');
  const form = document.getElementById('leaveForm');
  form.reset();
  modal.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

function closeLeaveModal() {
  document.getElementById('leaveModal').classList.add('hidden');
}

function saveLeaveRequest(e) {
  e.preventDefault();
  const empName = document.getElementById('leaveEmpSelect').value;
  const type = document.getElementById('leaveType').value;
  const startDate = document.getElementById('leaveStartDate').value;
  const endDate = document.getElementById('leaveEndDate').value;
  const notes = document.getElementById('leaveNotes').value.trim();

  const d1 = new Date(startDate);
  const d2 = new Date(endDate);
  const days = Math.max(1, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)) + 1);

  let leaves = JSON.parse(localStorage.getItem(LEAVE_STORAGE_KEY) || '[]');
  const newLeave = {
    id: 'UR-' + Math.floor(100 + Math.random() * 900),
    empName,
    type,
    startDate,
    endDate,
    days,
    notes,
    status: 'Ausstehend'
  };

  leaves.unshift(newLeave);
  localStorage.setItem(LEAVE_STORAGE_KEY, JSON.stringify(leaves));
  logAuditEvent('Urlaubsantrag eingereicht', getCurrentUserLabel(), `${empName} (${days} Tage)`);

  closeLeaveModal();
  renderLeaveTable();
  alert(`Urlaubsantrag für "${empName}" erfolgreich eingereicht!`);
}

function approveLeave(leaveId) {
  let leaves = JSON.parse(localStorage.getItem(LEAVE_STORAGE_KEY) || '[]');
  const index = leaves.findIndex(l => l.id === leaveId);
  if (index !== -1) {
    leaves[index].status = 'Genehmigt';
    localStorage.setItem(LEAVE_STORAGE_KEY, JSON.stringify(leaves));
    logAuditEvent('Urlaubsantrag genehmigt', getCurrentUserLabel(), `${leaves[index].empName}`);
    renderLeaveTable();
  }
}

function rejectLeave(leaveId) {
  let leaves = JSON.parse(localStorage.getItem(LEAVE_STORAGE_KEY) || '[]');
  const index = leaves.findIndex(l => l.id === leaveId);
  if (index !== -1) {
    leaves[index].status = 'Abgelehnt';
    localStorage.setItem(LEAVE_STORAGE_KEY, JSON.stringify(leaves));
    logAuditEvent('Urlaubsantrag abgelehnt', getCurrentUserLabel(), `${leaves[index].empName}`);
    renderLeaveTable();
  }
}

// ==================== DIGITALE ABNAHME & SIGNATURE PAD ====================

let isSigning = false;
let sigCtx = null;

function initSignaturePad() {
  const canvas = document.getElementById('signatureCanvas');
  if (!canvas) return;

  sigCtx = canvas.getContext('2d');
  sigCtx.strokeStyle = '#0f172a';
  sigCtx.lineWidth = 2.5;
  sigCtx.lineCap = 'round';

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function startDraw(e) {
    isSigning = true;
    const pos = getPos(e);
    sigCtx.beginPath();
    sigCtx.moveTo(pos.x, pos.y);
  }

  function moveDraw(e) {
    if (!isSigning) return;
    e.preventDefault();
    const pos = getPos(e);
    sigCtx.lineTo(pos.x, pos.y);
    sigCtx.stroke();
  }

  function endDraw() {
    isSigning = false;
  }

  canvas.onmousedown = startDraw;
  canvas.onmousemove = moveDraw;
  canvas.onmouseup = endDraw;
  canvas.onmouseleave = endDraw;

  canvas.ontouchstart = startDraw;
  canvas.ontouchmove = moveDraw;
  canvas.ontouchend = endDraw;
}

function clearSignatureCanvas() {
  const canvas = document.getElementById('signatureCanvas');
  if (canvas && sigCtx) {
    sigCtx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function generateServiceConfirmationPDF(e) {
  if (e) e.preventDefault();

  const hotel = document.getElementById('signHotelSelect')?.value || 'Grand Hotel Central Berlin';
  const leader = document.getElementById('signLeader')?.value || 'Thomas Schneider';
  const clientName = document.getElementById('signClientName')?.value || 'Hoteldirektion';
  const description = document.getElementById('signDescription')?.value || 'Tägliche Zimmerreinigung mangelfrei erbracht.';

  const canvas = document.getElementById('signatureCanvas');
  const signatureDataUrl = canvas ? canvas.toDataURL('image/png') : null;

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(18);
  pdf.setTextColor(6, 78, 59);
  pdf.text('DIGITALE LEISTUNGSBESTÄTIGUNG', 20, 25);
  pdf.setFontSize(14);
  pdf.setTextColor(15, 23, 42);
  pdf.text('& KUNDENABNAHME', 20, 32);

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(100, 116, 139);
  pdf.text(`Auftragnehmer: CleanPro Reinigungsfirma GmbH`, 20, 42);
  pdf.text(`Kunde / Hotel-Objekt: ${hotel}`, 20, 48);
  pdf.text(`Datum der Abnahme: ${new Date().toLocaleDateString('de-DE')}`, 140, 42);
  pdf.text(`Protokoll-ID: AB-${Math.floor(10000 + Math.random() * 90000)}`, 140, 48);

  pdf.setDrawColor(16, 185, 129);
  pdf.setLineWidth(0.5);
  pdf.line(20, 54, 190, 54);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(11);
  pdf.setTextColor(15, 23, 42);
  pdf.text('Erbrachte Leistungen & Qualitätsabnahme:', 20, 64);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.text(pdf.splitTextToSize(description, 170), 20, 72);

  pdf.text(`Verantwortlicher CleanPro Objektleiter: ${leader}`, 20, 95);
  pdf.text(`Kundenvertreter / Abnahmeberechtigter: ${clientName}`, 20, 102);

  pdf.text('Hiermit bestätigt der Hotelkunde die vertragsgemäße und mangelfreie Durchführung der oben genannten Reinigungsleistungen.', 20, 115, { maxWidth: 170 });

  // Signature areas
  pdf.setDrawColor(200, 200, 200);
  pdf.rect(20, 130, 75, 30);
  pdf.setFontSize(8);
  pdf.text('Unterschrift Objektleiter (CleanPro)', 20, 165);
  pdf.setFontSize(12);
  pdf.text(leader, 25, 148);

  pdf.rect(115, 130, 75, 30);
  pdf.setFontSize(8);
  pdf.text('Kunden-Unterschrift (Digital erfasst)', 115, 165);

  if (signatureDataUrl) {
    pdf.addImage(signatureDataUrl, 'PNG', 117, 132, 70, 25);
  } else {
    pdf.setFontSize(12);
    pdf.text(clientName, 120, 148);
  }

  logAuditEvent('Digitale Kundenabnahme signiert & exportiert', getCurrentUserLabel(), `${hotel} (${clientName})`);
  pdf.save(`Abnahme_${hotel.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
}

// ==================== HR DOKUMENTE & VERTRAEGE ====================

function generateHRDocumentPDF() {
  const empName = document.getElementById('hr-doc-employee')?.value || 'Thomas Schneider';
  const docType = document.getElementById('hr-doc-type')?.value || 'arbeitsvertrag';
  const dateVal = document.getElementById('hr-doc-date')?.value || new Date().toISOString().split('T')[0];
  const salary = document.getElementById('hr-doc-salary')?.value || '538.00';

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(18);
  pdf.setTextColor(30, 58, 138);

  let titleText = 'ARBEITSVERTRAG';
  if (docType === 'kuendigung') titleText = 'KÜNDIGUNGSBESTÄTIGUNG';
  if (docType === 'beschaeftigung') titleText = 'BESCHÄFTIGUNGSBESTÄTIGUNG';
  if (docType === 'unterweisung') titleText = 'SICHERHEITSUNTERWEISUNG & ARBEITSSCHUTZ';

  pdf.text(titleText, 20, 25);
  pdf.setLineWidth(0.5);
  pdf.setDrawColor(37, 99, 235);
  pdf.line(20, 28, 190, 28);

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(15, 23, 42);

  pdf.text(`Ausgestellt am: ${dateVal}`, 140, 20);
  pdf.text('Arbeitgeber: CleanPro Reinigungs- & Personalmanagement GmbH', 20, 40);
  pdf.text(`Mitarbeiter: ${empName}`, 20, 47);
  pdf.text('Bereich: Professionelle Gebäudereinigung & Hotelreinigung', 20, 54);

  pdf.setFont('helvetica', 'bold');
  pdf.text('VERTRAGSDETAILS & BESTÄTIGUNG:', 20, 70);

  pdf.setFont('helvetica', 'normal');
  let bodyText = `Hiermit wird bestätigt, dass Frau/Herr ${empName} ordnungsgemäß als Mitarbeiter im Bereich Gebäudereinigung registriert ist. Der monatliche Grundlohn beträgt ${salary} EUR. Alle gesetzlichen Bestimmungen, tarifvertraglichen Regelungen und Datenschutzrichtlinien (DSGVO) werden vollumfänglich eingehalten.`;

  pdf.text(pdf.splitTextToSize(bodyText, 170), 20, 80);

  // Digital Signature Area
  pdf.setDrawColor(200, 200, 200);
  pdf.rect(20, 120, 80, 25);
  pdf.setFontSize(8);
  pdf.text('Unterschrift Arbeitgeber / CleanPro Admin', 20, 148);

  pdf.rect(110, 120, 80, 25);
  pdf.text('Unterschrift Mitarbeiter / Arbeitnehmer', 110, 148);

  pdf.setFontSize(14);
  pdf.text('CleanPro Geschäftsführung', 25, 135);
  pdf.text(empName.split(' ')[0] || empName, 115, 135);

  logAuditEvent('HR-Dokument generiert', getCurrentUserLabel(), `${titleText} - ${empName}`);
  pdf.save(`${titleText}_${empName.replace(/\s+/g, '_')}.pdf`);
}

function openPayrollRegistrationModal() {
  const modal = document.getElementById('payrollRegistrationModal');
  if (modal) {
    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  }
}

function closePayrollRegistrationModal() {
  const modal = document.getElementById('payrollRegistrationModal');
  if (modal) modal.classList.add('hidden');
}

function sendPayrollRegistration() {
  const emp = document.getElementById('regEmpSelect')?.value || 'Mitarbeiter';
  const email = document.getElementById('regEmailRecipient')?.value || 'lohnabrechnung@steuerberater-partner.de';

  logAuditEvent('Personalanmeldung an Lohnbüro übermittelt', getCurrentUserLabel(), `${emp} -> ${email}`);
  closePayrollRegistrationModal();
  alert(`Personalanmeldung für "${emp}" wurde erfolgreich per verschlüsselter Datenschnittstelle an "${email}" gesendet!`);
}

// ==================== MONATSRECHNUNG HOTEL ====================

function generateHotelMonthlyReport(hotelName) {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(18);
  pdf.setTextColor(16, 185, 129);
  pdf.text('MONATSRECHNUNG - HOTELREINIGUNG', 20, 25);

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(15, 23, 42);
  pdf.text(`Kunde / Objekt: ${hotelName}`, 20, 40);
  pdf.text('Abrechnungsmonat: September 2026', 20, 47);
  pdf.text(`Rechnungsdatum: ${new Date().toLocaleDateString('de-DE')}`, 140, 40);

  pdf.line(20, 52, 190, 52);

  pdf.setFont('helvetica', 'bold');
  pdf.text('Leistungsübersicht:', 20, 62);
  pdf.setFont('helvetica', 'normal');
  pdf.text('• Einzelzimmer (EZ): 450 Reinigung(en) x 12.50 € = 5.625,00 €', 25, 72);
  pdf.text('• Doppelzimmer (DZ): 220 Reinigung(en) x 18.00 € = 3.960,00 €', 25, 80);
  pdf.text('• Suiten: 35 Reinigung(en) x 35.00 € = 1.225,00 €', 25, 88);
  pdf.text('• Extrastunden / Sonderreinigung: 12.0 Std x 25.00 € = 300,00 €', 25, 96);

  pdf.line(20, 105, 190, 105);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Gesamtbetrag Netto: 11.110,00 €', 120, 115);
  pdf.text('19% MwSt: 2.110,90 €', 120, 122);
  pdf.setFontSize(12);
  pdf.text('Rechnungsbetrag Brutto: 13.220,90 €', 110, 132);

  logAuditEvent('Monatsrechnung für Hotel generiert', getCurrentUserLabel(), `${hotelName}`);
  pdf.save(`Monatsrechnung_${hotelName.replace(/\s+/g, '_')}.pdf`);
}

// ==================== TICKET-SYSTEM ====================

function renderTicketsList() {
  const container = document.getElementById('tickets-list-container');
  if (!container) return;

  const tickets = JSON.parse(localStorage.getItem(TICKETS_STORAGE_KEY) || '[]');
  const kpiTicketCount = document.getElementById('kpiTicketCount');
  if (kpiTicketCount) {
    const openCount = tickets.filter(t => t.status === 'Offen').length;
    kpiTicketCount.textContent = `${openCount} Anträge`;
  }

  let html = tickets.map(t => {
    const badgeBg = t.status === 'Offen' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800';
    return `
    <div class="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-all">
      <div>
        <strong class="text-xs font-bold text-slate-900">[${t.id}] ${t.title}</strong><br>
        <span class="text-[11px] text-slate-500">Erstellt von: ${t.empName} | Datum: ${t.date}</span>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="toggleTicketStatus('${t.id}')" class="px-2.5 py-1 rounded-full text-[10px] font-bold ${badgeBg} hover:opacity-80 transition-opacity">
          ${t.status} (Umschalten)
        </button>
      </div>
    </div>`;
  }).join('');

  container.innerHTML = html || '<p class="text-xs text-slate-400">Keine Tickets vorhanden.</p>';
}

function openCreateTicketModal() {
  const title = prompt('Bitte Thema / Anliegen für das Ticket eingeben (z.B. Materialbestellung oder Mitarbeiteranmeldung):');
  if (!title) return;

  let tickets = JSON.parse(localStorage.getItem(TICKETS_STORAGE_KEY) || '[]');
  const newTicket = {
    id: 'T-' + Math.floor(100 + Math.random() * 900),
    empName: getCurrentUserLabel(),
    title: title,
    date: new Date().toISOString().split('T')[0],
    status: 'Offen'
  };

  tickets.unshift(newTicket);
  localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(tickets));
  logAuditEvent('Neues Ticket erstellt', getCurrentUserLabel(), title);
  renderTicketsList();
  alert('Ticket erfolgreich erstellt und an die Zentrale übermittelt!');
}

function toggleTicketStatus(ticketId) {
  let tickets = JSON.parse(localStorage.getItem(TICKETS_STORAGE_KEY) || '[]');
  const index = tickets.findIndex(t => t.id === ticketId);
  if (index !== -1) {
    tickets[index].status = tickets[index].status === 'Offen' ? 'Erledigt' : 'Offen';
    localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(tickets));
    logAuditEvent('Ticket-Status geändert', getCurrentUserLabel(), `[${ticketId}] -> ${tickets[index].status}`);
    renderTicketsList();
  }
}

// ==================== AUDIT-LOG / DSGVO ÄNDERUNGSPROTOKOLL ====================

function logAuditEvent(action, user, target, status = 'Erfolgreich') {
  let log = JSON.parse(localStorage.getItem(AUDIT_STORAGE_KEY) || '[]');
  const now = new Date();
  const timestamp = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]}`;

  const entry = {
    timestamp,
    user: user || getCurrentUserLabel(),
    action,
    target,
    status
  };

  log.unshift(entry);
  if (log.length > 100) log = log.slice(0, 100);
  localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(log));
  renderAuditLog();
}

function renderAuditLog() {
  const tableBody = document.getElementById('auditTableBody');
  if (!tableBody) return;

  const log = JSON.parse(localStorage.getItem(AUDIT_STORAGE_KEY) || '[]');
  tableBody.innerHTML = '';

  log.forEach(item => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50 transition-colors';
    tr.innerHTML = `
      <td class="p-3 font-mono text-[11px] text-slate-500">${item.timestamp}</td>
      <td class="p-3 font-bold text-slate-900">${item.user}</td>
      <td class="p-3 font-semibold text-emerald-800">${item.action}</td>
      <td class="p-3 text-slate-700">${item.target}</td>
      <td class="p-3"><span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">${item.status}</span></td>
    `;
    tableBody.appendChild(tr);
  });
}

// ==================== PDF PREVIEW MODAL ====================

function openPdfPreviewModal(title, textPreview, onDownloadCallback) {
  const modal = document.getElementById('pdfPreviewModal');
  const titleEl = document.getElementById('previewTitle');
  const contentEl = document.getElementById('previewContent');
  const downloadBtn = document.getElementById('previewDownloadBtn');

  if (titleEl) titleEl.textContent = title;
  if (contentEl) contentEl.innerHTML = textPreview;
  if (downloadBtn) {
    downloadBtn.onclick = () => {
      if (onDownloadCallback) onDownloadCallback();
      closePdfPreviewModal();
    };
  }

  if (modal) {
    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  }
}

function closePdfPreviewModal() {
  const modal = document.getElementById('pdfPreviewModal');
  if (modal) modal.classList.add('hidden');
}

// ==================== MOBILE NAVIGATION TOGGLE ====================

function toggleMobileNav() {
  const dropdown = document.getElementById('mobileNavDropdown');
  if (!dropdown) return;
  const isHidden = dropdown.classList.contains('hidden');
  if (isHidden) {
    dropdown.classList.remove('hidden');
  } else {
    dropdown.classList.add('hidden');
  }
}

// ==================== TRIAL & CLIENT URL PARAMETER INIT ====================

function initCleanProTrialParams() {
  const params = new URLSearchParams(window.location.search);
  const clientParam = params.get('client') || params.get('firma');
  const daysParam = parseInt(params.get('days') || params.get('tage') || '7', 10);
  const isAdmin = params.get('admin') === 'true' || params.get('admin') === '1' || window.location.hostname === 'localhost';

  const pill = document.getElementById('cleanProTrialPill');
  const clientNameEl = document.getElementById('cleanProClientName');
  const timerDisplay = document.getElementById('cleanProTimerDisplay');

  if (!pill) return;

  if (clientParam || isAdmin) {
    pill.classList.remove('hidden');
    pill.classList.add('flex');

    if (clientNameEl) {
      clientNameEl.textContent = clientParam ? `Mandant: ${clientParam}` : 'Admin-Modus';
    }

    if (isAdmin) {
      if (timerDisplay) {
        timerDisplay.textContent = '∞ Unbegrenzt';
        timerDisplay.className = 'font-bold text-emerald-300';
      }
    } else {
      const storageKey = `cleanpro_trial_start_${clientParam || 'default'}`;
      let startTime = localStorage.getItem(storageKey);
      if (!startTime) {
        startTime = Date.now().toString();
        localStorage.setItem(storageKey, startTime);
      }
      const startMs = parseInt(startTime, 10);
      const totalMs = daysParam * 24 * 60 * 60 * 1000;

      const updateTimer = () => {
        const remaining = totalMs - (Date.now() - startMs);
        if (remaining <= 0) {
          if (timerDisplay) timerDisplay.textContent = '0T 00:00:00';
        } else {
          const d = Math.floor(remaining / (1000 * 60 * 60 * 24));
          const h = Math.floor((remaining / (1000 * 60 * 60)) % 24);
          const m = Math.floor((remaining / 1000 / 60) % 60);
          const s = Math.floor((remaining / 1000) % 60);
          if (timerDisplay) {
            timerDisplay.textContent = `${d}T ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
          }
        }
      };
      updateTimer();
      setInterval(updateTimer, 1000);
    }
  }
}

// Trigger Upgrade modal in parent React application
function triggerCleanProUpgrade() {
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({ type: 'OPEN_UPGRADE_MODAL', module: 'Gebäudereinigung' }, '*');
  } else {
    // Standalone fallback: redirect to contact section or booking
    window.location.href = '#calculator';
  }
}

// Run on load
document.addEventListener('DOMContentLoaded', () => {
  initCleanProTrialParams();
});
setTimeout(() => {
  initCleanProTrialParams();
}, 200);


