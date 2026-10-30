import { createServer } from 'node:http';
import handler from './api/index.js';

const port = Number(process.env.PORT || 8787);

const manifestData = {
  "id": "dev.akira.bitchord-hires",
  "name": "juanjob hi res",
  "version": "1.0.0",
  "resources": ["search", "stream"],
  "checkValidLossless": 1,
  "allowDownloads": 1,
  "settings": [
    {
      "key": "quality",
      "type": "select",
      "default": "lossless",
      "options": [
        { "label": "Lossless (FLAC, up to 24/192)", "value": "lossless" },
        { "label": "High (FLAC, up to 24/96)", "value": "high" },
        { "label": "Low (data saver)", "value": "low" }
      ]
    },
    {
      "key": "atmos",
      "type": "select",
      "default": "stereo",
      "options": [
        { "label": "Stereo only", "value": "stereo" },
        { "label": "Dolby Atmos when available", "value": "auto" }
      ]
    }
  ]
};

createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname === '/manifest.json') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(manifestData));
    return;
  }

  handler(req, res).catch((err) => {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: String(err?.message || err) }));
  });
}).listen(port, '0.0.0.0', () => {
  console.log(`juanjob hi res addon listening on http://0.0.0.0:${port}`);
});
