const WEBHOOK_URL = process.env.N8N_LEADS_WEBHOOK_URL || 'https://n8n.salesgenius.co/webhook/listingleads';

exports.handler = async (event) => {
  const baseHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: baseHeaders };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: baseHeaders, body: JSON.stringify({ message: 'Method Not Allowed' }) };
  }

  try {
    const body = JSON.parse(event.body || '{}');

    const rawName = (body.name || '').toString().trim();
    const firstName = rawName ? rawName.split(' ')[0] : (body.firstName || '').toString().trim();
    const lastName = rawName ? rawName.split(' ').slice(1).join(' ') : (body.lastName || '').toString().trim();
    const email = (body.email || '').toString().trim();
    const phone = (body.phone || '').toString().trim();
    const moveTimeline = (body.moveTimeline || body.timeframe || '').toString().trim();
    const message = (body.message || '').toString().trim();
    const source = (body.source || '').toString().trim();
    const repo = (body.repo || '').toString().trim();
    const agentEmail = (body.agentEmail || '').toString().trim();
    const propertyAddress = body.propertyAddress || undefined;

    // Validation: allow single name OR split names; always require email and phone
    if ((!rawName && !firstName) || !email || !phone) {
      return { statusCode: 400, headers: baseHeaders, body: JSON.stringify({ message: 'Missing required fields' }) };
    }

    const payload = { name: rawName || `${firstName} ${lastName}`.trim(), email, phone, moveTimeline, message, source, repo, agentEmail, propertyAddress };

    const resp = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'OpenHaus-Leads-Forwarder/1.0'
      },
      body: JSON.stringify(payload)
    });

    const text = await resp.text();
    if (!resp.ok) {
      return { statusCode: 502, headers: baseHeaders, body: JSON.stringify({ message: 'Webhook error', status: resp.status, response: text }) };
    }

    return { statusCode: 200, headers: baseHeaders, body: JSON.stringify({ message: 'Lead submitted successfully' }) };
  } catch (error) {
    return { statusCode: 500, headers: baseHeaders, body: JSON.stringify({ message: 'Failed to submit lead' }) };
  }
};


