import { copyFile, mkdir, rm } from 'node:fs/promises';

async function copyStaticSite(target) {
  await mkdir(target, { recursive: true });
  await copyFile('index.html', `${target}/index.html`);
  await copyFile('404.html', `${target}/404.html`);
  await copyFile('.nojekyll', `${target}/.nojekyll`);
}

await rm('dist', { recursive: true, force: true });
await copyStaticSite('dist');
await copyStaticSite('docs');

console.log('StudyQuest static site generated in dist/ and docs/');
