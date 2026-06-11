const nodemailer = require('nodemailer');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

const PDF_URL = 'https://drive.google.com/file/d/1rX_J4MyBuP3mB3Zi_oKQS2fcZBfoEc41/view?usp=drive_link';
const PDF_DOWNLOAD = 'https://drive.google.com/uc?export=download&id=1rX_J4MyBuP3mB3Zi_oKQS2fcZBfoEc41';

function emailHtml(nombre) {
  const saludo = nombre ? `Hola, ${nombre}` : 'Hola';
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Tu Kit SOS del Sistema Nervioso · MARED</title>
</head>
<body style="margin:0;padding:0;background:#050F0C;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#050F0C;padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#071A14;border-radius:16px;overflow:hidden;border:1px solid rgba(0,200,150,0.15);">

      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,#0D2B20 0%,#071A14 100%);padding:40px 40px 32px;text-align:center;border-bottom:1px solid rgba(0,200,150,0.12);">
          <p style="margin:0 0 8px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#00C896;">SISTEMA MARED™</p>
          <h1 style="margin:0;font-size:28px;font-weight:300;color:#E8F5F0;line-height:1.2;">Tu Kit SOS está aquí</h1>
          <p style="margin:12px 0 0;font-size:14px;color:#9BBFB0;line-height:1.6;">Lo prometimos — y aquí está. 🎉</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:40px;">
          <p style="margin:0 0 24px;font-size:16px;color:#E8F5F0;line-height:1.75;">${saludo},</p>
          <p style="margin:0 0 24px;font-size:16px;color:#9BBFB0;line-height:1.75;">Gracias por ser parte del universo MARED. Tu <strong style="color:#E8F5F0;">Kit SOS del Sistema Nervioso</strong> está listo para descargarse.</p>

          <!-- CTA button -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center" style="padding:8px 0 32px;">
                <a href="${PDF_DOWNLOAD}" style="display:inline-block;background:#FF2680;color:#fff;text-decoration:none;padding:18px 44px;border-radius:50px;font-size:15px;font-weight:700;letter-spacing:0.04em;">
                  Descargar mi Kit SOS →
                </a>
              </td>
            </tr>
          </table>

          <p style="margin:0 0 8px;font-size:13px;color:#4A7A6A;">¿El botón no funciona? Copia y pega este enlace en tu navegador:</p>
          <p style="margin:0 0 32px;font-size:12px;word-break:break-all;"><a href="${PDF_URL}" style="color:#00C896;">${PDF_URL}</a></p>

          <!-- Divider -->
          <div style="border-top:1px solid rgba(0,200,150,0.12);margin:0 0 32px;"></div>

          <p style="margin:0 0 12px;font-size:15px;color:#E8F5F0;font-weight:600;">¿Qué hay en tu Kit?</p>
          <ul style="margin:0 0 32px;padding:0 0 0 20px;color:#9BBFB0;font-size:14px;line-height:2;">
            <li>Técnicas de regulación inmediata (úsalas hoy mismo)</li>
            <li>Protocolo SOS para momentos de crisis</li>
            <li>Introducción al Método 3C de MARED</li>
            <li>Plan de primeros pasos hacia el Reset Nervioso</li>
          </ul>

          <p style="margin:0 0 24px;font-size:15px;color:#9BBFB0;line-height:1.75;">Si quieres ir más profundo y hacer el proceso completo de 21 días con todo el protocolo, el ebook <strong style="color:#E8F5F0;">Reset Nervioso™</strong> está disponible por solo $37 USD.</p>

          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center" style="padding:0 0 8px;">
                <a href="https://mared-reset-nervioso.vercel.app/#precio" style="display:inline-block;background:transparent;color:#00C896;text-decoration:none;padding:14px 36px;border-radius:50px;font-size:14px;font-weight:600;border:1.5px solid #00C896;">
                  Ver Reset Nervioso™ completo
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#050F0C;padding:24px 40px;text-align:center;border-top:1px solid rgba(0,200,150,0.08);">
          <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#4A7A6A;">MARED · Reset Nervioso™</p>
          <p style="margin:0;font-size:11px;color:#2a5a4a;line-height:1.6;">Este mensaje fue enviado porque solicitaste el Kit SOS en nuestra página.<br>Si crees que es un error, ignora este correo.</p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, firstName = '', tag = 'Comunidad MARED' } = req.body || {};

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  const nombre = firstName?.trim() || '';

  try {
    // 1. Save to Supabase
    const { error: dbError } = await supabase
      .from('leads')
      .insert([{ email: email.toLowerCase().trim(), nombre, etiqueta: tag }]);

    if (dbError) {
      if (dbError.code !== '23505') {
        console.error('Supabase error:', JSON.stringify(dbError));
        throw new Error('DB error: ' + dbError.message);
      }
    }

    // 2. Send email with PDF
    await transporter.sendMail({
      from: `MARED Reset Nervioso <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Tu Kit SOS del Sistema Nervioso esta aqui - MARED',
      html: emailHtml(nombre)
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Subscribe error:', err);
    return res.status(500).json({ error: 'Error interno. Intenta de nuevo.' });
  }
};
