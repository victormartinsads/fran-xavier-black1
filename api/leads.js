module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });
  const { page, name, email, phone } = req.body || {};
  if (!['black', 'imperio'].includes(page) || typeof name !== 'string' || name.trim().length < 2 || name.length > 120 || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || typeof phone !== 'string' || phone.replace(/\D/g, '').length < 10 || phone.length > 30) return res.status(400).json({ ok: false });
  const endpoint = process.env.SHEETS_WEBHOOK_URL;
  if (!endpoint) return res.status(503).json({ ok: false });
  try {
    const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ page, name: name.trim(), email: email.trim(), phone: phone.trim() }), redirect: 'follow', signal: AbortSignal.timeout(12000) });
    const result = await response.json();
    if (!response.ok || !result.ok) throw new Error('Erro ao salvar');
    return res.status(200).json({ ok: true });
  } catch (_) { return res.status(502).json({ ok: false }); }
};
