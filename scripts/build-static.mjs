import { cp, copyFile, mkdir } from 'node:fs/promises';

const targets = ['dist', 'docs'];

for (const target of targets) {
  await mkdir(target, { recursive: true });
  await copyFile('index.html', `${target}/index.html`);
  await copyFile('404.html', `${target}/404.html`);
  await copyFile('.nojekyll', `${target}/.nojekyll`);
  await cp('assets', `${target}/assets`, { recursive: true });
}

console.log('StudyQuest minimal static site generated in dist/ and docs/.');
