const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const nextI18NextConfig = require('./next-i18next.config');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
    console.log(`> i18n enabled with locales: ${nextI18NextConfig.i18n.locales.join(', ')}`);
  });
});