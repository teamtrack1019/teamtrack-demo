import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const {
    company,
    contactName,
    email,
    phone,
    selectedModules,
    timeline,
    message,
    clientId
  } = req.body || {};

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ionos.de',
      port: 465,
      secure: true, // SSL
      auth: {
        user: process.env.SMTP_USER || 'kontakt@team-track.de',
        pass: process.env.SMTP_PASS || process.env.IONOS_PASSWORD || ''
      }
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #060a14; color: #f1f5f9; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #0f172a; border-radius: 16px; border: 1px solid #308eff; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
          .header { border-bottom: 1px solid #1e293b; padding-bottom: 20px; margin-bottom: 25px; }
          .badge { background-color: rgba(48, 142, 255, 0.2); color: #38bdf8; font-size: 11px; font-weight: bold; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; border: 1px solid rgba(48, 142, 255, 0.4); display: inline-block; }
          h2 { color: #ffffff; margin-top: 12px; font-size: 22px; font-weight: 800; }
          .item { margin-bottom: 16px; background-color: #1e293b; padding: 12px 16px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.05); }
          .label { color: #94a3b8; font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; }
          .value { color: #ffffff; font-size: 15px; margin-top: 4px; font-weight: 600; }
          .highlight { background-color: #172554; padding: 16px; border-radius: 10px; border-left: 4px solid #308eff; margin-top: 20px; }
          .btn { display: inline-block; background-color: #308eff; color: #ffffff !important; padding: 12px 24px; text-decoration: none; border-radius: 10px; font-weight: bold; margin-top: 25px; font-size: 14px; box-shadow: 0 4px 15px rgba(48, 142, 255, 0.4); }
          .footer { margin-top: 30px; padding-top: 15px; border-top: 1px solid #1e293b; font-size: 11px; color: #64748b; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="badge">TeamTrack Demo-Portal</span>
            <h2>⚡ Neue Anfrage für maßgeschneiderte WebApp</h2>
            <p style="color: #94a3b8; font-size: 13px; margin-top: 5px;">Eingegangen über die interaktive Demo-Umgebung (${clientId || 'Demo'})</p>
          </div>

          <div class="item">
            <div class="label">Firma / Unternehmen:</div>
            <div class="value"><strong style="color: #60a5fa; font-size: 16px;">${company || 'Nicht angegeben'}</strong></div>
          </div>

          <div class="item">
            <div class="label">Ansprechpartner:</div>
            <div class="value">${contactName || 'Nicht angegeben'}</div>
          </div>

          <div class="item">
            <div class="label">Telefon / Mobilnummer:</div>
            <div class="value"><a href="tel:${phone}" style="color: #38bdf8; text-decoration: none;">${phone || 'Nicht angegeben'}</a></div>
          </div>

          <div class="item">
            <div class="label">E-Mail-Adresse:</div>
            <div class="value"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email || 'Nicht angegeben'}</a></div>
          </div>

          <div class="item">
            <div class="label">Ausgewählte Module:</div>
            <div class="value" style="color: #4ade80;">${selectedModules || 'Alle Kernmodule'}</div>
          </div>

          <div class="item">
            <div class="label">Geplanter Zeitrahmen:</div>
            <div class="value">${timeline || 'Schnellstmöglich'}</div>
          </div>

          ${message ? `
          <div class="highlight">
            <div class="label" style="color: #93c5fd;">Nachricht / Spezifische Kundenwünsche:</div>
            <div class="value" style="font-style: italic; margin-top: 5px; color: #f8fafc;">"${message}"</div>
          </div>
          ` : ''}

          <div style="text-align: center;">
            <a href="mailto:${email}?subject=Ihre%20Anfrage%20f%C3%BCr%20eine%20TeamTrack%20WebApp" class="btn">
              ✉️ Direkt per E-Mail antworten
            </a>
          </div>

          <div class="footer">
            TeamTrack Softwareentwicklung & IT-Beratung • 97236 Randersacker / Würzburg<br>
            Diese Nachricht wurde automatisch über Ihren IONOS SMTP-Server (smtp.ionos.de) versendet.
          </div>
        </div>
      </body>
      </html>
    `;

    const textContent = `
NEUE ANFRAGE ÜBER DAS TEAMTRACK DEMO-PORTAL
============================================
Firma: ${company || 'Nicht angegeben'}
Ansprechpartner: ${contactName || 'Nicht angegeben'}
Telefon: ${phone || 'Nicht angegeben'}
E-Mail: ${email || 'Nicht angegeben'}
Ausgewählte Module: ${selectedModules || 'Alle Kernmodule'}
Zeitrahmen: ${timeline || 'Schnellstmöglich'}
Nachricht: ${message || 'Keine zusätzliche Notiz'}
Client-ID: ${clientId || 'Demo'}
--------------------------------------------
Versendet über IONOS SMTP (smtp.ionos.de)
    `.trim();

    const recipients = ['kontakt@team-track.de', 'teamtrack.software@hotmail.com'];

    const mailOptions = {
      from: '"TeamTrack Demo Portal" <kontakt@team-track.de>',
      to: recipients,
      replyTo: email || 'kontakt@team-track.de',
      subject: `⚡ Neue WebApp-Anfrage von ${company || contactName || 'Interessent'}`,
      text: textContent,
      html: htmlContent,
      headers: {
        'X-Priority': '1 (Highest)',
        'X-MSMail-Priority': 'High',
        'Importance': 'High'
      }
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'E-Mail erfolgreich versendet' });
  } catch (error) {
    console.error('SMTP Mail Error:', error);
    return res.status(500).json({ success: false, error: error.message || 'SMTP Versand fehlgeschlagen' });
  }
}
