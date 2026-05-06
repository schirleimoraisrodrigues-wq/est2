import { copyFile, mkdir } from 'node:fs/promises';

await mkdir('dist', { recursive: true });
await copyFile('index.html', 'dist/index.html');
await copyFile('404.html', 'dist/404.html');
await copyFile('public/.nojekyll', 'dist/.nojekyll');

console.log('StudyQuest static site generated in dist/');
