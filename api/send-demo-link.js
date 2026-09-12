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
    customerEmail,
    clientName,
    moduleName,
    days,
    demoUrl,
    bullets = []
  } = req.body || {};

  if (!customerEmail || !customerEmail.includes('@')) {
    return res.status(400).json({ success: false, message: 'Gültige E-Mail-Adresse erforderlich' });
  }

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

    const displayClient = clientName || 'Ihr Unternehmen';
    const effectiveDays = days || 7;
    const effectiveModuleName = moduleName || 'Komplett-Suite';
    const effectiveUrl = demoUrl || 'https://demo.team-track.de';

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b1120; color: #f1f5f9; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #0f172a; border-radius: 20px; border: 1px solid rgba(56, 189, 248, 0.3); padding: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.6); }
          .header { border-bottom: 1px solid #1e293b; padding-bottom: 20px; margin-bottom: 24px; text-align: center; }
          .badge { background-color: rgba(14, 165, 233, 0.15); color: #38bdf8; font-size: 11px; font-weight: 800; padding: 6px 14px; border-radius: 20px; text-transform: uppercase; border: 1px solid rgba(56, 189, 248, 0.3); display: inline-block; letter-spacing: 0.05em; }
          h2 { color: #ffffff; margin-top: 14px; font-size: 22px; font-weight: 800; }
          .greeting { color: #cbd5e1; font-size: 15px; line-height: 1.6; margin-bottom: 20px; }
          .highlight-box { background: linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(30, 41, 59, 0.8) 100%); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 16px; padding: 20px; margin: 24px 0; text-align: center; }
          .btn-primary { display: inline-block; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff !important; padding: 14px 28px; text-decoration: none; border-radius: 12px; font-weight: 800; font-size: 15px; box-shadow: 0 4px 20px rgba(2, 132, 199, 0.5); }
          .direct-link { margin-top: 14px; font-size: 12px; color: #94a3b8; word-break: break-all; }
          .direct-link a { color: #38bdf8; text-decoration: underline; }
          .features { background-color: #1e293b; border-radius: 14px; padding: 18px 20px; margin: 24px 0; border: 1px solid #334155; }
          .features h4 { margin: 0 0 10px 0; color: #f8fafc; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; }
          .features ul { margin: 0; padding-left: 20px; color: #cbd5e1; font-size: 13px; line-height: 1.7; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #1e293b; font-size: 12px; color: #64748b; line-height: 1.6; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="badge">TeamTrack Demo-Zugang</span>
            <h2>Willkommen zu Ihrer persönlichen Test-Umgebung</h2>
            <p style="color: #94a3b8; font-size: 13px; margin-top: 4px;">Bereitgestellt für <strong>${displayClient}</strong> (${effectiveDays} Tage gültig)</p>
          </div>

          <div class="greeting">
            Sehr geehrte Damen und Herren,<br>
            liebes Team von <strong>${displayClient}</strong>,<br><br>
            vielen Dank für Ihr Interesse an TeamTrack! Wir haben für Ihr Unternehmen eine 100% isolierte und vorkonfigurierte Test-Umgebung für den Bereich <strong>"${effectiveModuleName}"</strong> eingerichtet.
          </div>

          <div class="highlight-box">
            <div style="font-size: 13px; color: #38bdf8; font-weight: bold; margin-bottom: 12px;">IHR TEST-ZUGANG IST BEREIT:</div>
            <a href="${effectiveUrl}" class="btn-primary" target="_blank">
              👉 Hier klicken: Zu Ihrer persönlichen Demo 🚀
            </a>
            <div class="direct-link">
              Direktlink (klickbar):<br>
              <a href="${effectiveUrl}" target="_blank">${effectiveUrl}</a>
            </div>
          </div>

          <div class="features">
            <h4>Enthaltene Module & Highlights:</h4>
            <ul>
              ${bullets.map(b => `<li>${b.replace(/^[•\s-]+/, '')}</li>`).join('')}
            </ul>
          </div>

          <p style="font-size: 13px; color: #94a3b8; line-height: 1.6;">
            Sie können alle Funktionen in den nächsten <strong>${effectiveDays} Tagen</strong> unverbindlich und ohne Risiko testen. Bei Fragen oder für eine kurze persönliche Einführung stehen wir Ihnen jederzeit gerne zur Seite.
          </p>

          <div class="footer">
            <strong>TeamTrack Softwareentwicklung & IT-Lösungen</strong><br>
            E-Mail: <a href="mailto:kontakt@team-track.de" style="color: #38bdf8; text-decoration: none;">kontakt@team-track.de</a> • Web: <a href="https://team-track.de" style="color: #38bdf8; text-decoration: none;">https://team-track.de</a><br>
            97236 Randersacker / Würzburg, Deutschland
          </div>
        </div>
      </body>
      </html>
    `;

    const textContent = `
Ihr persönlicher TeamTrack Demo-Zugang für ${displayClient}
===========================================================

Sehr geehrte Damen und Herren,
liebes Team von ${displayClient},

vielen Dank für Ihr Interesse an TeamTrack! Wir haben für Sie eine persönliche Test-Umgebung für "${effectiveModuleName}" eingerichtet.

👉 Hier klicken für Ihren Demo-Zugang:
${effectiveUrl}

Enthaltene Module:
${bullets.join('\n')}

Gültigkeit: ${effectiveDays} Tage
Support: kontakt@team-track.de / https://team-track.de

Mit freundlichen Grüßen,
TeamTrack Softwareentwicklung
    `.trim();

    const mailOptions = {
      from: '"TeamTrack Software" <kontakt@team-track.de>',
      to: customerEmail.trim(),
      bcc: ['kontakt@team-track.de', 'teamtrack.software@hotmail.com'],
      replyTo: 'kontakt@team-track.de',
      subject: `Ihr persönlicher ${effectiveModuleName} Demo-Zugang für ${displayClient} (${effectiveDays} Tage)`,
      text: textContent,
      html: htmlContent,
      headers: {
        'X-Priority': '1 (Highest)',
        'X-MSMail-Priority': 'High',
        'Importance': 'High'
      }
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: `E-Mail erfolgreich an ${customerEmail} gesendet!` });
  } catch (error) {
    console.error('SMTP Demo Link Mail Error:', error);
    return res.status(500).json({ success: false, error: error.message || 'E-Mail Versand fehlgeschlagen' });
  }
}
