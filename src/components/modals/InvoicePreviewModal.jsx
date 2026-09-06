import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Printer, Download, X, ShieldAlert, Sparkles, Building2 } from 'lucide-react';

export const InvoicePreviewModal = () => {
  const { previewInvoice, setPreviewInvoice, triggerRestrictedAction, openUpgradeModal } = useDemo();

  if (!previewInvoice) return null;

  const subtotal = previewInvoice.items.reduce((acc, it) => acc + (it.qty * it.price), 0);
  const vat = subtotal * 0.19;
  const grandTotal = subtotal + vat;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel max-w-3xl w-full p-6 lg:p-8 rounded-3xl border border-white/15 shadow-2xl max-h-[94vh] flex flex-col justify-between overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">PDF-Vorschau</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 font-bold border border-rose-500/20">
              Demo-Wasserzeichen aktiv
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Drucken</span>
            </button>

            <button
              onClick={() => triggerRestrictedAction('Wasserzeichenfreier PDF-Download', 'In der Vollversion werden PDF-Rechnungen ohne Wasserzeichen, auf Ihrem Firmenbriefpapier und mit ZUGFeRD / XRechnung E-Rechnungsstandard generiert.')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-brand-400" />
              <span>PDF Herunterladen</span>
            </button>

            <button
              onClick={() => setPreviewInvoice(null)}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Paper Container with Watermark */}
        <div className="flex-1 overflow-y-auto my-4 p-6 sm:p-10 bg-white text-slate-900 rounded-2xl shadow-inner watermark-overlay select-text">
          
          {/* Letterhead */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-8 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
                  TT
                </div>
                <span className="font-extrabold text-xl tracking-tight text-slate-900">Musterbetrieb GmbH</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Handwerk & Dienstleistungen • Würzburger Str. 42 • 97070 Würzburg
              </p>
            </div>

            <div className="text-right sm:text-right text-[11px] text-slate-600">
              <p className="font-bold text-slate-900">TeamTrack WebApp Demo</p>
              <p>St.-Nr.: 257/123/45678</p>
              <p>USt-IdNr.: DE 312 456 789</p>
              <p>IBAN: DE89 7905 0000 1234 5678 90</p>
            </div>
          </div>

          {/* Customer Address & Invoice Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                Empfänger:
              </span>
              <h4 className="font-bold text-sm text-slate-900">{previewInvoice.customer}</h4>
              <p className="text-xs text-slate-600">z. Hd. {previewInvoice.contact}</p>
              <p className="text-xs text-slate-600">{previewInvoice.address}</p>
            </div>

            <div className="sm:text-right space-y-1 text-xs">
              <div className="text-lg font-black text-blue-600">{previewInvoice.id}</div>
              <div><span className="text-slate-500">Rechnungsdatum:</span> <strong className="text-slate-800">{previewInvoice.date}</strong></div>
              <div><span className="text-slate-500">Fälligkeitsdatum:</span> <strong className="text-slate-800">{previewInvoice.dueDate}</strong></div>
              <div><span className="text-slate-500">Zahlungsstatus:</span> <span className="font-bold text-emerald-700">{previewInvoice.status}</span></div>
            </div>
          </div>

          {/* Items Table */}
          <div className="my-6">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b-2 border-slate-900 text-slate-900">
                  <th className="py-2 font-bold">Pos.</th>
                  <th className="py-2 font-bold">Bezeichnung / Leistung</th>
                  <th className="py-2 font-bold text-right">Menge</th>
                  <th className="py-2 font-bold text-right">Einheit</th>
                  <th className="py-2 font-bold text-right">Einzelpreis</th>
                  <th className="py-2 font-bold text-right">Gesamt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {previewInvoice.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 text-slate-500">{idx + 1}</td>
                    <td className="py-2.5 font-medium text-slate-900">{item.desc}</td>
                    <td className="py-2.5 text-right font-medium">{item.qty}</td>
                    <td className="py-2.5 text-right text-slate-500">{item.unit || 'Std.'}</td>
                    <td className="py-2.5 text-right font-medium">{(item.price || 0).toFixed(2)} €</td>
                    <td className="py-2.5 text-right font-bold text-slate-900">
                      {((item.qty || 0) * (item.price || 0)).toFixed(2)} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end pt-4 border-t border-slate-200">
            <div className="w-64 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Nettobetrag:</span>
                <span>{subtotal.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>19% MwSt.:</span>
                <span>{vat.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t-2 border-slate-900">
                <span>Gesamtbetrag (Brutto):</span>
                <span>{grandTotal.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</span>
              </div>
            </div>
          </div>

          {/* Terms Note */}
          <div className="mt-8 pt-6 border-t border-slate-200 text-[11px] text-slate-500 leading-relaxed">
            <p className="font-semibold text-slate-700">Zahlungsbedingungen & Hinweise:</p>
            <p>{previewInvoice.notes || 'Zahlbar rein netto innerhalb von 14 Tagen. Bitte geben Sie bei der Überweisung die Rechnungsnummer an.'}</p>
            <p className="mt-2 text-[10px] text-slate-400">Erstellt mit TeamTrack Softwarelösungen (team-track.de)</p>
          </div>

        </div>

        {/* Modal Bottom CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-1.5 text-amber-400">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Dieses Dokument dient ausschließlich Demonstrationszwecken.</span>
          </div>

          <button
            onClick={() => {
              setPreviewInvoice(null);
              openUpgradeModal('Rechnungswesen & DATEV');
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 text-white font-bold transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Rechnungsmodul für eigene Firma anfragen</span>
          </button>
        </div>

      </div>
    </div>
  );
};
