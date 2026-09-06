import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { 
  Truck, 
  Plus, 
  MapPin, 
  Gauge, 
  Fuel, 
  BatteryCharging, 
  Calendar, 
  User, 
  AlertTriangle, 
  CheckCircle2, 
  Navigation,
  Trash2,
  Sparkles,
  Radio
} from 'lucide-react';

export const FuhrparkModule = () => {
  const { 
    data, 
    addItem, 
    updateItem, 
    deleteItem, 
    triggerRestrictedAction, 
    openUpgradeModal,
    maxCreationLimit,
    createdCounts 
  } = useDemo();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [newVehicle, setNewVehicle] = useState({
    plate: 'WÜ-TT 105',
    model: 'Ford Transit Custom 2.0 EcoBlue',
    type: 'Service-Transporter',
    status: 'Einsatzbereit',
    driver: 'Jan Becker',
    currentLocation: 'Betriebshof Würzburg',
    mileage: 34500,
    fuelPercent: 85,
    nextInspection: '12/2026',
    activeTour: 'Bereit für Disposition'
  });

  const handleAddVehicle = (e) => {
    e.preventDefault();
    const id = `FZ-0${(data.vehicles?.length || 0) + 1}`;
    const added = addItem('vehicles', {
      id,
      ...newVehicle
    });

    if (added) {
      setIsModalOpen(false);
    }
  };

  const handleStatusChange = (vehicleId, newStatus) => {
    updateItem('vehicles', vehicleId, { status: newStatus });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Modul 4</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Limit: {createdCounts.vehicles}/{maxCreationLimit} Fahrzeuge
            </span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">Fuhrpark, Touren & Fahrzeugverwaltung</h2>
          <p className="text-xs text-slate-400 mt-1">
            Transporter, LKWs und Service-Flotte in Echtzeit verwalten. Inklusive Tourenzuweisung, KM-Ständen und digitalem Fahrtenbuch.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => triggerRestrictedAction('OBD2 / Can-Bus Live GPS Hardware-Kopplung', 'In der Vollversion wird TeamTrack direkt mit Ihren Fahrzeug-OBD2-Steckern / Telematik-Boxen gekoppelt, um Live-KM, Tankstand und GPS vollautomatisch abzurufen.')}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
          >
            <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Live-Telematik (Demo-Simulation)</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-lg shadow-amber-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Fahrzeug anlegen</span>
          </button>
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {(data.vehicles || []).map((v) => {
          const isElectric = v.model.includes('Elektro') || v.model.includes('ID.');
          
          const statusBadges = {
            'Auf Tour': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
            'Einsatzbereit': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
            'In Werkstatt': 'bg-rose-500/10 text-rose-400 border-rose-500/30'
          };

          return (
            <div
              key={v.id}
              className="glass-card p-6 rounded-2xl border-slate-800 hover:border-amber-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                      <Truck className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-black text-white px-2 py-0.5 rounded bg-slate-900 border border-slate-700">
                          {v.plate}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">{v.type}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-200 mt-1">{v.model}</h3>
                    </div>
                  </div>

                  <select
                    value={v.status}
                    onChange={(e) => handleStatusChange(v.id, e.target.value)}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full border bg-slate-900 cursor-pointer focus:outline-none ${
                      statusBadges[v.status] || statusBadges['Einsatzbereit']
                    }`}
                  >
                    <option value="Einsatzbereit">● Einsatzbereit</option>
                    <option value="Auf Tour">● Auf Tour</option>
                    <option value="In Werkstatt">● In Werkstatt</option>
                  </select>
                </div>

                {/* Tour & Location Box */}
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5 text-brand-400" />
                      Aktuelle Tour:
                    </span>
                    <span className="font-bold text-white text-right truncate max-w-[200px]">{v.activeTour}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      Standort:
                    </span>
                    <span>{v.currentLocation}</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 my-4">
                  <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 font-medium block flex items-center gap-1">
                      <Gauge className="w-3 h-3 text-slate-400" /> KM-Stand
                    </span>
                    <span className="text-xs font-bold text-white mt-1 block">
                      {v.mileage.toLocaleString('de-DE')} km
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 font-medium block flex items-center gap-1">
                      {isElectric ? <BatteryCharging className="w-3 h-3 text-emerald-400" /> : <Fuel className="w-3 h-3 text-amber-400" />}
                      {isElectric ? 'Akku' : 'Tank'}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${v.fuelPercent > 30 ? 'bg-emerald-400' : 'bg-rose-400'}`}
                          style={{ width: `${v.fuelPercent}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-white">{v.fuelPercent}%</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 font-medium block flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" /> Nächster TÜV
                    </span>
                    <span className="text-xs font-bold text-slate-200 mt-1 block">{v.nextInspection}</span>
                  </div>
                </div>
              </div>

              {/* Driver & Action */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <User className="w-3.5 h-3.5 text-brand-400" />
                  <span>Fahrer: <strong className="text-white">{v.driver}</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => triggerRestrictedAction('Live GPS-Kartenansicht', 'In Ihrer Vollversion sehen Sie alle Firmenfahrzeuge live auf einer interaktiven Deutschland-Karte mit Routenverfolgung.')}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold"
                  >
                    GPS Karte
                  </button>

                  <button
                    onClick={() => deleteItem('vehicles', v.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Vehicle Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel max-w-lg w-full p-6 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Neues Fahrzeug anlegen</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded-lg bg-slate-800"
              >
                ✕ Schließen
              </button>
            </div>

            <form onSubmit={handleAddVehicle} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Kennzeichen:</label>
                  <input
                    type="text"
                    required
                    value={newVehicle.plate}
                    onChange={(e) => setNewVehicle({ ...newVehicle, plate: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Fahrzeugtyp:</label>
                  <input
                    type="text"
                    required
                    value={newVehicle.type}
                    onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Modell & Ausführung:</label>
                <input
                  type="text"
                  required
                  value={newVehicle.model}
                  onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Zugewiesener Fahrer:</label>
                  <input
                    type="text"
                    required
                    value={newVehicle.driver}
                    onChange={(e) => setNewVehicle({ ...newVehicle, driver: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Kilometerstand:</label>
                  <input
                    type="number"
                    required
                    value={newVehicle.mileage}
                    onChange={(e) => setNewVehicle({ ...newVehicle, mileage: parseInt(e.target.value, 10) || 0 })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Aktuelle Tour / Baustelle:</label>
                <input
                  type="text"
                  required
                  value={newVehicle.activeTour}
                  onChange={(e) => setNewVehicle({ ...newVehicle, activeTour: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold shadow-lg shadow-amber-500/20"
                >
                  Fahrzeug speichern
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
