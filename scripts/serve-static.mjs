import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';
import { createServer } from 'node:http';

const root = resolve(process.argv[2] || '.');
const port = Number(process.argv[3] || 5173);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8' };

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const relative = normalize(decoded).replace(/^([/\\])+/, '');
  return resolve(root, relative || 'index.html');
}

createServer((req, res) => {
  let file = safePath(req.url || '/');
  if (!file.startsWith(root)) file = join(root, '404.html');
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!existsSync(file)) file = join(root, '404.html');
  res.writeHead(file.endsWith('404.html') && !(req.url || '/').includes('404.html') ? 404 : 200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
  createReadStream(file).pipe(res);
}).listen(port, '127.0.0.1', () => {
  console.log(`StudyQuest available at http://127.0.0.1:${port}/ from ${root}`);
});
