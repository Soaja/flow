const failure = 'Unable to send your message. Please try again later.';
const escapeHtml = value => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character]);

export default async function contact(request, response) {
  const reply = (status, body) => {
    response.statusCode = status;
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.setHeader('Cache-Control', 'no-store');
    response.end(JSON.stringify(body));
  };
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return reply(405, { ok: false, error: 'Method not allowed.' });
  }
  let body;
  try { body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body; }
  catch { return reply(400, { ok: false, error: 'Invalid JSON body.' }); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return reply(400, { ok: false, error: 'Invalid JSON body.' });
  if (body.company !== undefined && body.company !== '') return reply(200, { ok: true });
  const fields = {};
  for (const [field, limit] of Object.entries({ name: 100, email: 200, phone: 50, inquiryType: 100, message: 5000 })) {
    const value = body[field] === undefined ? '' : body[field];
    if (typeof value !== 'string' || [...value].length > limit) return reply(400, { ok: false, error: `Invalid ${field} (maximum ${limit} characters).` });
    fields[field] = value.trim();
  }
  if (!fields.name || !fields.message) return reply(400, { ok: false, error: 'Name and message are required.' });
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/u.test(fields.email)) return reply(400, { ok: false, error: 'Enter a valid email address.' });
  if (/[\r\n]/.test(fields.name + fields.inquiryType)) return reply(400, { ok: false, error: 'Name and inquiry type must be single-line.' });
  try {
    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) throw new Error('Missing contact email configuration.');
    const rows = [['Name', fields.name], ['Email', fields.email], ['Phone', fields.phone], ['Inquiry type', fields.inquiryType], ['Message', fields.message]];
    const result = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        from: 'FLOW Website <noreply@flowsport.co>', to: process.env.CONTACT_TO_EMAIL,
        reply_to: fields.email, subject: `New inquiry: ${fields.inquiryType} — ${fields.name}`,
        html: `<h1>New website inquiry</h1>${rows.map(([label, value]) => `<p><strong>${label}</strong><br>${escapeHtml(value).replace(/\r\n|\r|\n/g, '<br>')}</p>`).join('')}`,
        text: rows.map(([label, value]) => `${label}: ${value}`).join('\n\n'),
      }),
    });
    if (!result.ok) throw new Error(`Resend ${result.status}: ${await result.text()}`);
    const receipt = await result.json();
    if (!receipt.id) throw new Error('Resend returned no email ID.');
    return reply(200, { ok: true });
  } catch (error) {
    console.error('Contact email failed:', error);
    return reply(500, { ok: false, error: failure });
  }
}
