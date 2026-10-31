import { createServer as httpServer } from 'node:http';
import { isIP } from 'node:net';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { createHandler, origins } from './handler.mjs';

export function createRelayServer({ handler, now = Date.now, perMinute = 5, perHour = 40, perDay = 100 }) {
  const clients = new Map();
  const sent = [];
  let active = 0;
  let reserved = 0;
  const server = httpServer({ maxHeaderSize: 8192 }, async (req, res) => {
    const finish = (status, body = { ok: false }) => {
      res.writeHead(status, { 'content-type': 'application/json', 'cache-control': 'no-store',
        ...(origins.has(req.headers.origin) ? { 'access-control-allow-origin': req.headers.origin, vary: 'Origin' } : {}),
        ...(status === 429 ? { 'retry-after': '60' } : {}),
      });
      res.end(JSON.stringify(body));
    };
    if (req.url !== '/api/studio-inquiry') return finish(404);
    if (!['GET', 'POST', 'OPTIONS'].includes(req.method)) return finish(405);
    if (req.method !== 'GET' && !origins.has(req.headers.origin)) return finish(403);
    const forwarded = req.headers['x-forwarded-for'];
    const ip = typeof forwarded === 'string' && isIP(forwarded) ? forwarded : req.socket.remoteAddress;
    const time = now();
    for (const [key, value] of clients) if (time - value.start >= 60000) clients.delete(key);
    if (!clients.has(ip) && clients.size >= 4096) return finish(429);
    const client = clients.get(ip) ?? { start: time, get: 0, post: 0 };
    clients.set(ip, client);
    if (req.method === 'GET' && ++client.get > 20) return finish(429);
    if (req.method === 'POST' && ++client.post > perMinute) return finish(429);
    while (sent.length && time - sent[0] >= 86400000) sent.shift();
    if (req.method === 'POST' && (sent.length + reserved >= perDay || sent.filter(at => time - at < 3600000).length + reserved >= perHour)) return finish(429);
    if (active >= 2) return finish(503);
    if (Number(req.headers['content-length']) > 16000) return finish(413);
    active++;
    if (req.method === 'POST') reserved++;
    try {
      const chunks = [];
      let bytes = 0;
      for await (const chunk of req) {
        bytes += chunk.length;
        if (bytes > 16000) { finish(413); return; }
        chunks.push(chunk);
      }
      const body = Buffer.concat(chunks);
      const request = new Request('http://127.0.0.1/api/studio-inquiry', {
        method: req.method, headers: req.headers,
        ...(body.length ? { body } : {}),
      });
      const response = await handler(request);
      if (req.method === 'POST' && response.status === 202) sent.push(time);
      res.writeHead(response.status, Object.fromEntries(response.headers));
      res.end(Buffer.from(await response.arrayBuffer()));
    } catch { if (!res.headersSent) finish(502); else res.destroy(); }
    finally { active--; if (req.method === 'POST') reserved--; }
  });
  server.requestTimeout = 15000;
  server.headersTimeout = 10000;
  server.keepAliveTimeout = 5000;
  server.maxConnections = 32;
  server.maxRequestsPerSocket = 20;
  return server;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    if (process.env.CREDENTIALS_DIRECTORY !== '/run/credentials/samuel-studio-inquiry.service') throw new Error('Managed credential required.');
    const key = await readFile(`${process.env.CREDENTIALS_DIRECTORY}/brevo-key`, 'utf8');
    if (key.length > 16384) throw new Error('Invalid credential.');
    const server = createRelayServer({ handler: createHandler({ apiKey: key }) });
    server.listen(8790, '127.0.0.1');
    server.on('error', () => { console.error('Studio inquiry listener unavailable.'); process.exitCode = 1; });
    process.on('SIGTERM', () => { server.close(); server.closeIdleConnections(); });
  } catch { console.error('Studio inquiry configuration unavailable.'); process.exitCode = 1; }
}
