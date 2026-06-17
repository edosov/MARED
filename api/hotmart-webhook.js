const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
const COMPRADORES_GROUP = '190492666845201435';
const LEADS_GROUP = '190492666326156301';
const BASE = 'https://connect.mailerlite.com/api';

async function mlFetch(path, method = 'GET', body = null) {
  const opts = {
    method,
    headers: {
      'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };
  if (body) opts.body = JSON.stringify(body);
  const r = await fetch(`${BASE}${path}`, opts);
  if (!r.ok && r.status !== 404) {
    const text = await r.text();
    throw new Error(`MailerLite ${method} ${path}: ${r.status} ${text}`);
  }
  return r.status === 204 ? {} : r.json();
}

async function getSubscriberId(email) {
  const data = await mlFetch(`/subscribers/${encodeURIComponent(email)}`);
  return data?.data?.id || null;
}

async function processApprovedPurchase(email, name) {
  // 1. Add/update subscriber in MailerLite
  await mlFetch('/subscribers', 'POST', {
    email: email.toLowerCase().trim(),
    fields: { name: name || '' },
    groups: [COMPRADORES_GROUP],
  });

  // 2. Remove from leads group if present
  const id = await getSubscriberId(email.toLowerCase().trim());
  if (id) {
    await mlFetch(`/subscribers/${id}/groups/${LEADS_GROUP}`, 'DELETE');
  }
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, service: 'MARED Hotmart Webhook' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body || {};
    const event = body.event || body.type || '';
    const data = body.data || {};

    const email = data?.buyer?.email || data?.purchase?.buyer?.email || '';
    const name = data?.buyer?.name || data?.purchase?.buyer?.name || '';
    const status = data?.purchase?.status || '';

    console.log(`Hotmart webhook: event=${event} status=${status} email=${email}`);

    const isApproved =
      event === 'PURCHASE_COMPLETE' ||
      event === 'PURCHASE_APPROVED' ||
      status === 'APPROVED' ||
      status === 'COMPLETE';

    if (email && isApproved) {
      await processApprovedPurchase(email, name);
      console.log(`Processed buyer: ${email} → Compradores`);
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err.message);
    return res.status(200).json({ received: true, warning: err.message });
  }
};
