import { readFile, stat } from 'node:fs/promises';

const required = ['index.html', '404.html', '.nojekyll', 'docs/index.html', 'docs/404.html', 'docs/.nojekyll'];
for (const file of required) {
  const info = await stat(file);
  if (!info.isFile()) throw new Error(`${file} is not a file`);
}

for (const file of ['index.html', '404.html', 'docs/index.html', 'docs/404.html']) {
  const html = await readFile(file, 'utf8');
  if (!html.includes('<title>StudyQuest</title>')) throw new Error(`${file} is missing the StudyQuest title`);
  if (!html.includes('<div id="root"></div>')) throw new Error(`${file} is missing the app root`);
  if (/type="module"|src="\/src\/|\/assets\//.test(html)) throw new Error(`${file} still depends on build-only imports`);
  const script = html.split('<script>', 2)[1]?.split('</script>', 1)[0];
  if (!script?.includes('function render()')) throw new Error(`${file} is missing the standalone app script`);
}

console.log('GitHub Pages files verified successfully.');
