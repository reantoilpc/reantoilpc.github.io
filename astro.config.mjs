import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://reantoilpc.github.io',
  base: '/',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'zh-TW',
    locales: ['zh-TW', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  redirects: {
    '/docs/Git/Give-Up-Reset-Commit': '/notes/git/give-up-reset-commit',
    '/docs/PowerShell/show-list-installeds-software': '/notes/powershell/show-list-installed-software',
    '/docs/Shortcut/rider-shortcut': '/notes/shortcut/rider-shortcut',
    '/docs/Dotnet/dotnet-commit': '/notes/dotnet/dotnet-commit',
    '/docs/intro': '/notes',
  },
  integrations: [
    expressiveCode({
      themes: ['github-dark', 'github-light'],
      styleOverrides: {
        borderRadius: '0.5rem',
        codeFontFamily: "'Cascadia Code', 'JetBrains Mono', 'Fira Code', Consolas, 'SF Mono', Menlo, monospace",
      },
    }),
    mdx(),
    sitemap({
      i18n: { defaultLocale: 'zh-TW', locales: { 'zh-TW': 'zh-TW', en: 'en' } },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
