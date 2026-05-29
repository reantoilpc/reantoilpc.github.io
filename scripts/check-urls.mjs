import { existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const slugs = [
  'postman-environment-variable',
  '2022-07-21-nuget-package-Enums.NET',
  '2022-08-02-global-produces-attribute',
  '2022-08-17-efcore-guide',
  '2022-11-02-github-unitofwork',
  '2022-12-29-miniProfiler-guide',
  '2023-02-22-Create-Multiple-Project-Template',
  '2023-03-25-lens-with-k8s',
  '2026-05-29-wsl2-claude-cli-memory',
];
let fail = 0;
for (const s of slugs) {
  const ok = existsSync(join(DIST, 'blog', s, 'index.html')) || existsSync(join(DIST, 'blog', `${s}.html`));
  console.log(`${ok ? 'PASS' : 'FAIL'}  /blog/${s}`);
  if (!ok) fail++;
}
if (fail) { console.error(`\n${fail} URL(s) missing — SEO 會斷鏈`); process.exit(1); }
console.log('\nAll 9 blog URLs preserved ✅');
