import nodemailer from 'nodemailer'

export const esc = (value = '') =>
  String(value).replace(
    /[&<>'"]/g,
    (char) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      })[char]
  )

export function getTransport() {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD

  if (!user || !pass) throw new Error('Email service is not configured.')

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
  })
}

const palettes = {
  blue: {
    glow: '#58a6ff',
    second: '#8b72ff',
    soft: '#9fd8ff',
    badge: 'rgba(88,166,255,.12)'
  },
  violet: {
    glow: '#8b72ff',
    second: '#58a6ff',
    soft: '#c9bcff',
    badge: 'rgba(139,114,255,.13)'
  },
  emerald: {
    glow: '#58d6b2',
    second: '#58a6ff',
    soft: '#9ff3da',
    badge: 'rgba(88,214,178,.12)'
  }
}

export function emailShell({
  eyebrow,
  title,
  intro,
  rows,
  footer = 'Anayat Ullah · Full Stack Developer',
  tone = 'blue',
  status = 'Portfolio message'
}) {
  const palette = palettes[tone] || palettes.blue

  const renderedRows = rows
    .filter((row) => row.value !== undefined && row.value !== null && String(row.value).trim())
    .map(
      (row) => `
        <tr>
          <td style="padding:0 0 10px">
            <div style="border:1px solid rgba(132,171,229,.14);border-radius:14px;background:#0a1728;padding:14px 16px">
              <div style="font-size:10px;line-height:1.2;text-transform:uppercase;letter-spacing:.12em;color:#7188a6;margin-bottom:7px;font-weight:700">${esc(row.label)}</div>
              <div style="font-size:15px;line-height:1.65;color:#edf5ff;word-break:break-word">${esc(row.value)}</div>
            </div>
          </td>
        </tr>`
    )
    .join('')

  return `<!doctype html>
  <html>
    <body style="margin:0;padding:0;background:#040914;color:#edf5ff;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#040914;margin:0;padding:0">
        <tr>
          <td align="center" style="padding:30px 12px">
            <table role="presentation" width="680" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:680px;border-collapse:separate;background:#081423;border:1px solid #1b3352;border-radius:24px;overflow:hidden;box-shadow:0 24px 80px rgba(0,0,0,.38)">
              <tr>
                <td style="height:5px;background:linear-gradient(90deg,${palette.glow},${palette.second},${palette.glow})"></td>
              </tr>
              <tr>
                <td style="padding:28px 30px 12px;background:radial-gradient(circle at 90% 0%,${palette.badge},transparent 34%)">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td style="vertical-align:middle">
                        <div style="width:48px;height:48px;border-radius:15px;background:linear-gradient(145deg,${palette.glow},${palette.second});color:white;font-size:20px;font-weight:800;line-height:48px;text-align:center;box-shadow:0 10px 30px rgba(72,121,255,.24)">AU</div>
                      </td>
                      <td align="right" style="vertical-align:middle">
                        <span style="display:inline-block;padding:8px 11px;border:1px solid rgba(135,178,238,.18);border-radius:999px;background:${palette.badge};color:${palette.soft};font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase">${esc(status)}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 30px 4px">
                  <div style="font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:${palette.soft};font-weight:800;margin-bottom:12px">${esc(eyebrow)}</div>
                  <h1 style="font-size:30px;line-height:1.18;margin:0 0 12px;color:#ffffff;letter-spacing:-.025em">${esc(title)}</h1>
                  <p style="font-size:14px;color:#91a8c3;line-height:1.75;margin:0">${esc(intro)}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:24px 30px 12px">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse">
                    ${renderedRows}
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 30px 28px">
                  <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(132,171,229,.25),transparent);margin-bottom:18px"></div>
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td style="font-size:11px;line-height:1.6;color:#6f849f">${esc(footer)}</td>
                      <td align="right" style="font-size:10px;line-height:1.6;color:#526984">Secure portfolio notification</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`
}

export function validateSpam(body) {
  if (body.website) return 'spam'

  const started = Number(body.startedAt || 0)
  if (started && Date.now() - started < 1200) return 'too-fast'

  return null
}
