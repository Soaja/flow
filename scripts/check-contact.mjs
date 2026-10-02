import assert from 'node:assert/strict';
import contact from '../api/contact.js';

const originalFetch = globalThis.fetch;
const originalError = console.error;
const originalKey = process.env.RESEND_API_KEY;
const originalRecipient = process.env.CONTACT_TO_EMAIL;
const valid = { name: 'A <B>', email: 'sender@example.com', phone: '+381', inquiryType: 'Creative & Campaigns', message: '<script>alert("test")</script>\nSecond line', company: '' };
let calls = 0;
let payload;
const invoke = async (body, method = 'POST') => {
  const response = { headers: {}, setHeader(key, value) { this.headers[key] = value; }, end(value) { this.body = JSON.parse(value); } };
  await contact({ method, body }, response);
  return response;
};
try {
  process.env.RESEND_API_KEY = 'test-only';
  process.env.CONTACT_TO_EMAIL = 'recipient@example.com';
  globalThis.fetch = async (url, options) => {
    calls++;
    assert.equal(url, 'https://api.resend.com/emails');
    payload = JSON.parse(options.body);
    return { ok: true, json: async () => ({ id: 'test-id' }) };
  };
  assert.equal((await invoke(valid, 'GET')).statusCode, 405);
  assert.equal((await invoke('{')).statusCode, 400);
  for (const body of [null, [], { ...valid, name: '' }, { ...valid, message: '' }, { ...valid, email: 'bad' }, { ...valid, name: 'a\nb' }, { ...valid, phone: 123 }]) assert.equal((await invoke(body)).statusCode, 400);
  for (const [field, limit] of Object.entries({ name: 100, email: 200, phone: 50, inquiryType: 100, message: 5000 })) assert.equal((await invoke({ ...valid, [field]: 'x'.repeat(limit + 1) })).statusCode, 400);
  assert.deepEqual((await invoke({ company: 'bot' })).body, { ok: true });
  assert.equal(calls, 0);
  assert.deepEqual((await invoke(JSON.stringify(valid))).body, { ok: true });
  assert.equal(payload.to, 'recipient@example.com');
  assert.equal(payload.reply_to, valid.email);
  assert.equal(payload.subject, `New inquiry: ${valid.inquiryType} — ${valid.name}`);
  assert.ok(!payload.html.includes('<script>'));
  assert.ok(payload.html.includes('&lt;script&gt;'));
  assert.ok(payload.html.includes('Creative &amp; Campaigns'));
  assert.ok(payload.text.includes(valid.message));
  let logged = 0;
  console.error = () => logged++;
  for (const mock of [async () => ({ ok: false, status: 401, text: async () => 'private provider error' }), async () => { throw new Error('network failure'); }, async () => ({ ok: true, json: async () => ({}) })]) {
    globalThis.fetch = mock;
    const result = await invoke(valid);
    assert.equal(result.statusCode, 500);
    assert.deepEqual(result.body, { ok: false, error: 'Unable to send your message. Please try again later.' });
  }
  delete process.env.RESEND_API_KEY;
  assert.equal((await invoke(valid)).statusCode, 500);
  assert.equal(logged, 4);
  console.log('PASS contact validation, honeypot, email payload escaping, provider failures and missing configuration (mocked; no email sent)');
} finally {
  globalThis.fetch = originalFetch;
  console.error = originalError;
  if (originalKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = originalKey;
  if (originalRecipient === undefined) delete process.env.CONTACT_TO_EMAIL; else process.env.CONTACT_TO_EMAIL = originalRecipient;
}
