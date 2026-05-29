# Ray Hsu 個人網站（Docusaurus → Astro）Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 `reantoilpc.github.io` 從舊版 Docusaurus 改建為 Astro 個人網站（首頁／關於＋Blog＋Notes），完整遷移 9 篇文章與 4 篇筆記、保留所有文章網址，並用 GitHub Actions 自動部署到 GitHub Pages。

**Architecture:** Astro 靜態網站（content collections 管理 Markdown），Astro 原生 i18n（zh-TW 預設無前綴、en 在 `/en/`），純前端、0 後端。原始碼放在 `reantoilpc.github.io` repo，GitHub Actions 建置後以 `actions/deploy-pages` 部署；舊 `docusaurus_websit` 保留為內容來源並停用其舊部署 workflow。

**Tech Stack:** Astro 5、TypeScript、Tailwind CSS v4（`@tailwindcss/vite`）、`@astrojs/mdx`、`@astrojs/sitemap`、`@astrojs/rss`、`astro-expressive-code`（程式碼區塊）、Pagefind（站內搜尋）、Node 22、npm。

---

## Verification 哲學（本專案的「測試」如何定義）

這是內容型靜態網站，沒有傳統商業邏輯單元測試。每個 Task 的驗證 gate 為下列之一或組合：

- `npx astro check` — 型別 + content collection schema 驗證（frontmatter 錯誤會在此擋下）。
- `npm run build` — 建置成功（壞連結、壞圖片、i18n 設定錯誤會在此爆出）。
- `node scripts/check-urls.mjs` — **真正的自動化測試**：斷言 9 篇文章網址在 `dist/` 都存在（保護 SEO 的核心需求）。
- 產物檢查 — `dist/rss.xml`、`dist/sitemap-index.xml`、`dist/pagefind/` 存在。
- 視覺 QA — 用 `/browse`（gstack）開 `http://localhost:4321` 目視確認。

每個 Task 結尾都 commit（conventional commits）。

## 開發環境前置

- 確認 Node 版本：`node -v` 需 ≥ 20.3（建議用 22）。若不符，先 `nvm install 22 && nvm use 22`。
- 全程在 `reantoilpc.github.io/` repo 內、`feature/astro-migration/site` 分支上開發。
- 內容來源（唯讀，不修改）：`/home/rayhsu/projects/Github/docusaurus_websit/`。
- 工作根目錄（開發時）：`/home/rayhsu/projects/Github/reantoilpc.github.io/`。

## File Structure（最終結構）

```
reantoilpc.github.io/
├── .github/workflows/deploy.yml      # CI：build + deploy to Pages
├── astro.config.mjs                  # site/base/i18n/integrations
├── package.json
├── tsconfig.json
├── public/
│   ├── .nojekyll
│   ├── favicon.svg
│   └── og-default.png                # 預設 OG 分享圖
├── scripts/
│   └── check-urls.mjs                # 網址保留自動化測試
├── src/
│   ├── consts.ts                     # SITE_TITLE / TAGLINE / AUTHOR / SITE_URL
│   ├── content.config.ts             # collections: blog, notes
│   ├── content/
│   │   ├── blog/                      # 9 篇文章 + pictures/
│   │   │   └── pictures/<date>/*.png
│   │   └── notes/<category>/*.md      # 4 篇筆記
│   ├── i18n/
│   │   ├── ui.ts                      # UI 字串字典 zh-TW / en
│   │   └── utils.ts                   # getLangFromUrl / useTranslations
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── BlogPost.astro
│   │   └── NotesLayout.astro
│   ├── components/
│   │   ├── BaseHead.astro             # SEO / OG / hreflang
│   │   ├── Header.astro               # 品牌 + nav + 語言 + 主題 + 搜尋入口
│   │   ├── Footer.astro
│   │   ├── ThemeToggle.astro
│   │   ├── LanguageSwitcher.astro
│   │   ├── PostCard.astro
│   │   └── NotesSidebar.astro
│   ├── pages/
│   │   ├── index.astro                # / 首頁（zh-TW）
│   │   ├── about.astro                # /about
│   │   ├── blog/index.astro           # /blog 列表
│   │   ├── blog/[...slug].astro       # /blog/<slug> 文章（保留舊網址）
│   │   ├── notes/index.astro          # /notes
│   │   ├── notes/[...slug].astro      # /notes/<category>/<page>
│   │   ├── tags/index.astro
│   │   ├── tags/[tag].astro
│   │   ├── rss.xml.js                 # /rss.xml
│   │   ├── 404.astro
│   │   └── en/                         # 英文介面頁（index/about/blog）
│   └── styles/
│       └── global.css                 # Tailwind import + 基礎排版
```

---

## Phase 0 — Repo 安全與專案骨架

### Task 1: 備份舊站並建立開發分支

**Files:**
- 無新檔；操作 git。

- [ ] **Step 1: 進入 repo 並確認乾淨、抓最新**

Run:
```bash
cd /home/rayhsu/projects/Github/reantoilpc.github.io
git fetch origin
git status -s        # 預期：乾淨（無輸出）
git checkout main && git pull --ff-only origin main
```
Expected: 在 main，working tree 乾淨。

- [ ] **Step 2: 把目前的舊 Docusaurus 成品備份成分支與 tag**

Run:
```bash
git branch legacy-docusaurus-build
git tag pre-astro-backup
```
Expected: 分支 `legacy-docusaurus-build` 與 tag `pre-astro-backup` 都指向目前 main（舊站成品）。日後要救回舊站可 `git checkout legacy-docusaurus-build`。

- [ ] **Step 3: 建立開發分支（依使用者慣例 `feature/<name>/<描述>`）**

Run:
```bash
git checkout -b feature/astro-migration/site
```
Expected: 切到 `feature/astro-migration/site`。

- [ ] **Step 4: 清掉 main 帶來的舊成品檔（保留 .git 與規格文件）**

> 舊成品檔（`index.html`、`assets/`、`blog/`、`docs/`、`en/`、`404.html`、`sitemap.xml`、`.nojekyll`、`markdown-page/`、`img/`）即將被 Astro 取代。

Run:
```bash
git rm -rq . ':!docs/superpowers'   # 移除追蹤的舊成品，但保留 docs/superpowers（規格/計畫）
ls -A                                # 預期只剩 .git/ 和 docs/（superpowers）
```
Expected: 舊成品檔已從工作區與索引移除；`docs/superpowers/` 仍在。

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove legacy Docusaurus build, prep for Astro (backup in legacy-docusaurus-build)"
```

---

### Task 2: 建立 Astro 專案骨架並安裝整合套件

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/`, `public/`（由 scaffold 產生）

- [ ] **Step 1: 在 repo 內就地建立 Astro 專案（blog 範本）**

Run（在 `reantoilpc.github.io/`，目錄此時僅有 `.git/`、`docs/`）:
```bash
npm create astro@latest -- . --template blog --no-install --no-git --typescript strict --skip-houston
```
- `.` = 在當前目錄建立；`--no-git` = 不要重新 init git（沿用既有 repo）。
- 若 CLI 因目錄非空而警告，選擇「繼續 / merge」。

Expected: 產生 `src/`、`public/`、`astro.config.mjs`、`package.json`、`tsconfig.json` 等；blog 範本內含 content collection、RSS、sitemap、範例文章。

- [ ] **Step 2: 安裝相依並加入整合套件**

Run:
```bash
npm install
npx astro add tailwind mdx --yes
npm install astro-expressive-code pagefind
```
Expected: Tailwind v4（`@tailwindcss/vite`）與 MDX 寫入 `astro.config.mjs`；`astro-expressive-code`、`pagefind` 進 `package.json`。

- [ ] **Step 3: 設定 build script 含 Pagefind 索引**

Modify `package.json` 的 `scripts.build`：
```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build && pagefind --site dist",
    "preview": "astro preview",
    "check": "astro check"
  }
}
```

- [ ] **Step 4: 驗證骨架可建置**

Run:
```bash
npm run build
```
Expected: build 成功，產生 `dist/` 與 `dist/pagefind/`（Pagefind 對範例文章建索引）。

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: scaffold Astro blog template + tailwind, mdx, expressive-code, pagefind"
```

---

## Phase 1 — 核心設定與版型骨架

### Task 3: 設定站台常數、`astro.config.mjs`（site / i18n / 整合）

**Files:**
- Create: `src/consts.ts`
- Modify: `astro.config.mjs`

- [ ] **Step 1: 建立站台常數**

Create `src/consts.ts`:
```ts
export const SITE_URL = 'https://reantoilpc.github.io';
export const SITE_TITLE = 'Ray Hsu';
export const AUTHOR = 'Ray Hsu';
export const GITHUB_URL = 'https://github.com/reantoilpc';

export const TAGLINE = {
  'zh-TW': 'C# 後端工程師・開發筆記',
  en: 'Backend engineer · dev notes',
} as const;

export const SITE_DESCRIPTION = {
  'zh-TW': 'Ray Hsu 的個人網站：.NET、後端開發與工具的文章與筆記。',
  en: "Ray Hsu's personal site: articles and notes on .NET, backend and tooling.",
} as const;

export const LOCALES = ['zh-TW', 'en'] as const;
export const DEFAULT_LOCALE = 'zh-TW';
export type Locale = (typeof LOCALES)[number];
```

- [ ] **Step 2: 設定 `astro.config.mjs`**

Replace `astro.config.mjs` 內容為：
```js
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
  integrations: [
    expressiveCode({ themes: ['github-dark', 'github-light'], styleOverrides: { borderRadius: '0.5rem' } }),
    mdx(),
    sitemap({
      i18n: { defaultLocale: 'zh-TW', locales: { 'zh-TW': 'zh-TW', en: 'en' } },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
```
> `expressiveCode` 必須排在 `mdx()` 前面。

- [ ] **Step 3: 驗證**

Run: `npm run build`
Expected: build 成功（sitemap 產生含 i18n）。

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: configure site URL, i18n (zh-TW default, en), integrations"
```

---

### Task 4: Content collections schema（blog + notes）

**Files:**
- Modify/Create: `src/content.config.ts`

- [ ] **Step 1: 定義 collections**

Replace `src/content.config.ts`（Astro 5 Content Layer，用 glob loader）：
```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['zh-TW', 'en']).default('zh-TW'),
    draft: z.boolean().default(false),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
    category: z.string(),
    order: z.number().default(999),
    lang: z.enum(['zh-TW', 'en']).default('zh-TW'),
  }),
});

export const collections = { blog, notes };
```
> `glob` 的 `pattern` 排除了 `pictures/`（非 .md/.mdx 不會被當成 entry）。

- [ ] **Step 2: 移除 blog 範本附帶的範例文章與舊 schema 檔**

Run:
```bash
rm -f src/content/blog/*.md src/content/blog/*.mdx
# 若範本是用 src/content/config.ts，刪除以免與 content.config.ts 衝突
rm -f src/content/config.ts
```
Expected: `src/content/blog/` 清空（稍後 Task 6 填入真實文章）。

- [ ] **Step 3: 驗證 schema（先放一個臨時測試檔）**

Run:
```bash
mkdir -p src/content/blog
printf -- '---\ntitle: tmp\npubDate: 2024-01-01\n---\nhello\n' > src/content/blog/_tmp.md
npx astro check
rm src/content/blog/_tmp.md
```
Expected: `astro check` 對臨時檔通過（schema 正確）。

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: define blog and notes content collections schema"
```

---

### Task 5: i18n 工具 + 全站版型骨架（Header/Footer/主題/語言）

**Files:**
- Create: `src/i18n/ui.ts`, `src/i18n/utils.ts`
- Create: `src/styles/global.css`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/{BaseHead,Header,Footer,ThemeToggle,LanguageSwitcher}.astro`

- [ ] **Step 1: UI 字串字典**

Create `src/i18n/ui.ts`:
```ts
export const ui = {
  'zh-TW': {
    'nav.home': '首頁',
    'nav.blog': '文章',
    'nav.notes': '筆記',
    'nav.about': '關於',
    'nav.tags': '標籤',
    'search.placeholder': '搜尋…',
    'blog.readingTime': '分鐘閱讀',
    'blog.publishedOn': '發表於',
    'blog.empty': '目前還沒有文章。',
    'theme.toggle': '切換深色／淺色',
    'lang.switch': 'English',
  },
  en: {
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.notes': 'Notes',
    'nav.about': 'About',
    'nav.tags': 'Tags',
    'search.placeholder': 'Search…',
    'blog.readingTime': 'min read',
    'blog.publishedOn': 'Published on',
    'blog.empty': 'No posts in English yet.',
    'theme.toggle': 'Toggle dark/light',
    'lang.switch': '繁體中文',
  },
} as const;

export const defaultLang = 'zh-TW';
```

- [ ] **Step 2: i18n helper**

Create `src/i18n/utils.ts`:
```ts
import { ui, defaultLang } from './ui';

export type Lang = keyof typeof ui;

export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  if (seg === 'en') return 'en';
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** zh-TW 不加前綴；en 加 /en 前綴 */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === 'en' ? `/en${clean === '/' ? '' : clean}` : clean;
}
```

- [ ] **Step 3: 全域樣式（Tailwind + 基礎排版 + 深色變數）**

Create `src/styles/global.css`:
```css
@import 'tailwindcss';

@custom-variant dark (&:where(.dark, .dark *));

:root {
  --bg: #ffffff;
  --fg: #1a1a1a;
  --muted: #6b7280;
  --accent: #2563eb;
  --border: #e5e7eb;
}
.dark {
  --bg: #0f1115;
  --fg: #e6e6e6;
  --muted: #9ca3af;
  --accent: #60a5fa;
  --border: #232733;
}

html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--fg);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang TC',
    'Noto Sans TC', 'Microsoft JhengHei', sans-serif;
  line-height: 1.75;
}
/* 文章內文排版 */
.prose { max-width: 70ch; }
.prose h2 { margin-top: 2rem; font-weight: 700; font-size: 1.5rem; }
.prose h3 { margin-top: 1.5rem; font-weight: 600; font-size: 1.25rem; }
.prose p, .prose ul, .prose ol { margin: 1rem 0; }
.prose a { color: var(--accent); text-decoration: underline; }
.prose img { border-radius: 0.5rem; margin: 1.25rem 0; max-width: 100%; height: auto; }
.prose :not(pre) > code {
  background: color-mix(in srgb, var(--fg) 8%, transparent);
  padding: 0.15em 0.35em; border-radius: 0.3rem; font-size: 0.9em;
}
```

- [ ] **Step 4: BaseHead（SEO/OG/hreflang）**

Create `src/components/BaseHead.astro`:
```astro
---
import { SITE_TITLE, SITE_URL } from '../consts';
interface Props { title: string; description: string; image?: string; }
const { title, description, image = '/og-default.png' } = Astro.props;
const canonical = new URL(Astro.url.pathname, SITE_URL);
const imageUrl = new URL(image, SITE_URL);
const zhHref = new URL(Astro.url.pathname.replace(/^\/en/, '') || '/', SITE_URL);
const enPath = Astro.url.pathname.startsWith('/en') ? Astro.url.pathname : `/en${Astro.url.pathname}`;
const enHref = new URL(enPath, SITE_URL);
---
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="icon" href="/favicon.svg" />
<link rel="canonical" href={canonical} />
<link rel="alternate" hreflang="zh-TW" href={zhHref} />
<link rel="alternate" hreflang="en" href={enHref} />
<link rel="alternate" hreflang="x-default" href={zhHref} />
<title>{title}</title>
<meta name="description" content={description} />
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={imageUrl} />
<meta property="og:url" content={canonical} />
<meta name="twitter:card" content="summary_large_image" />
<link rel="alternate" type="application/rss+xml" title={SITE_TITLE} href={new URL('/rss.xml', SITE_URL)} />
```

- [ ] **Step 5: ThemeToggle（避免 FOUC 的 inline script）**

Create `src/components/ThemeToggle.astro`:
```astro
---
import { getLangFromUrl, useTranslations } from '../i18n/utils';
const t = useTranslations(getLangFromUrl(Astro.url));
---
<button id="theme-toggle" type="button" aria-label={t('theme.toggle')}
  class="rounded-md p-2 hover:bg-[color-mix(in_srgb,var(--fg)_10%,transparent)]">
  <span class="dark:hidden">🌙</span><span class="hidden dark:inline">☀️</span>
</button>
<script is:inline>
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || (!saved && matchMedia('(prefers-color-scheme: dark)').matches)) root.classList.add('dark');
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    root.classList.toggle('dark');
    localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
  });
</script>
```
> 另在 `BaseLayout` 的 `<head>` 最前面也放一份「讀 localStorage 立即加 class」的 inline script 防閃爍（見 Step 8）。

- [ ] **Step 6: LanguageSwitcher**

Create `src/components/LanguageSwitcher.astro`:
```astro
---
import { getLangFromUrl, useTranslations } from '../i18n/utils';
const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
const path = Astro.url.pathname;
const target = lang === 'en' ? (path.replace(/^\/en/, '') || '/') : `/en${path}`;
---
<a href={target} class="text-sm hover:text-[var(--accent)]">{t('lang.switch')}</a>
```

- [ ] **Step 7: Header + Footer**

Create `src/components/Header.astro`:
```astro
---
import { SITE_TITLE, TAGLINE } from '../consts';
import { getLangFromUrl, useTranslations, localizePath } from '../i18n/utils';
import ThemeToggle from './ThemeToggle.astro';
import LanguageSwitcher from './LanguageSwitcher.astro';
const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
const nav = [
  { href: localizePath('/', lang), label: t('nav.home') },
  { href: localizePath('/blog', lang), label: t('nav.blog') },
  { href: localizePath('/notes', lang), label: t('nav.notes') },
  { href: localizePath('/about', lang), label: t('nav.about') },
];
---
<header class="border-b" style="border-color:var(--border)">
  <div class="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
    <a href={localizePath('/', lang)} class="flex flex-col leading-tight">
      <span class="text-lg font-bold">{SITE_TITLE}</span>
      <span class="text-xs" style="color:var(--muted)">{TAGLINE[lang]}</span>
    </a>
    <nav class="flex items-center gap-4 text-sm">
      {nav.map((i) => <a href={i.href} class="hover:text-[var(--accent)]">{i.label}</a>)}
      <a href={localizePath('/blog', lang) + '#search'} aria-label={t('search.placeholder')}>🔍</a>
      <LanguageSwitcher />
      <ThemeToggle />
    </nav>
  </div>
</header>
```

Create `src/components/Footer.astro`:
```astro
---
import { SITE_TITLE, GITHUB_URL } from '../consts';
const year = new Date().getFullYear();
---
<footer class="mt-16 border-t" style="border-color:var(--border)">
  <div class="mx-auto max-w-3xl px-4 py-8 text-sm flex justify-between" style="color:var(--muted)">
    <span>© {year} {SITE_TITLE}</span>
    <a href={GITHUB_URL} class="hover:text-[var(--accent)]">GitHub</a>
  </div>
</footer>
```

- [ ] **Step 8: BaseLayout**

Create `src/layouts/BaseLayout.astro`:
```astro
---
import '../styles/global.css';
import BaseHead from '../components/BaseHead.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import { getLangFromUrl } from '../i18n/utils';
interface Props { title: string; description: string; image?: string; }
const { title, description, image } = Astro.props;
const lang = getLangFromUrl(Astro.url);
---
<!doctype html>
<html lang={lang}>
  <head>
    <script is:inline>
      const s = localStorage.getItem('theme');
      if (s === 'dark' || (!s && matchMedia('(prefers-color-scheme: dark)').matches)) document.documentElement.classList.add('dark');
    </script>
    <BaseHead title={title} description={description} image={image} />
  </head>
  <body>
    <Header />
    <main class="mx-auto max-w-3xl px-4 py-8"><slot /></main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 9: 暫時首頁 + 驗證版型**

Replace `src/pages/index.astro`（暫時版，Task 10 再做完整首頁）：
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
---
<BaseLayout title={SITE_TITLE} description={SITE_DESCRIPTION['zh-TW']}>
  <h1 class="text-2xl font-bold">Ray Hsu</h1>
  <p>版型測試頁。</p>
</BaseLayout>
```

Run:
```bash
npm run dev
```
然後用 `/browse` 開 `http://localhost:4321`，目視確認：品牌 + tagline、導覽列、深色切換、語言切換（點了會到 `/en`，目前會 404 屬正常，Task 10 補）。

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: i18n utils, global styles, base layout, header/footer, theme + lang toggle"
```

---

## Phase 2 — 內容遷移

### Task 6: 遷移 9 篇文章（保留 slug + 轉換 frontmatter + 圖片）

**Files:**
- Create: `src/content/blog/*.md`（9 篇）、`src/content/blog/pictures/`（複製）
- 來源：`/home/rayhsu/projects/Github/docusaurus_websit/blog/`

**檔名 = slug 對應表（新檔名決定網址，務必照抄）：**

| 來源檔 | 新檔名（= slug）→ 網址 `/blog/<檔名>` | pubDate | title | tags |
|---|---|---|---|---|
| 2022-05-31-postman-set-environment-variable.md | `postman-environment-variable.md` | 2022-05-31 | Postman 環境變數設定 | [Postman] |
| 2022-07-21-nuget-package-Enums.NET.md | `2022-07-21-nuget-package-Enums.NET.md` | 2022-07-21 | Enums.NET 使用 | [nuget, unittest, Enums.NET] |
| 2022-08-02-global-produces-attribute.md | `2022-08-02-global-produces-attribute.md` | 2022-08-02 | Produces Attribute 全域設定 | [nuget, Produces, Attribute] |
| 2022-08-17-efcore-guide.md | `2022-08-17-efcore-guide.md` | 2022-08-17 | efcore 使用介紹 | [efcore] |
| 2022-11-02-github-unitofwork.md | `2022-11-02-github-unitofwork.md` | 2022-11-02 | github unitofwork 使用介紹 | [github, efcore] |
| 2022-12-29-miniProfiler-guide.md | `2022-12-29-miniProfiler-guide.md` | 2022-12-29 | miniProfiler 使用介紹 | [miniProfiler] |
| 2023-02-22-Create-Multiple-Project-Template.md | `2023-02-22-Create-Multiple-Project-Template.md` | 2023-02-22 | 建立 visual studio multiple project template | [visual studio, template] |
| 2023-03-25-lens-with-k8s.md | `2023-03-25-lens-with-k8s.md` | 2023-03-25 | 使用 Lens IDE 管理 Azure K8s | [lens, k8s] |
| 2026-05-29-wsl2-claude-cli-memory.md | `2026-05-29-wsl2-claude-cli-memory.md` | 2026-05-29 | WSL2 + Claude CLI 記憶體越用越多最後當機 — 完整除錯與解法 | [wsl2, claude-code, debug, windows, memory] |

- [ ] **Step 1: 複製圖片資料夾**

Run:
```bash
cd /home/rayhsu/projects/Github/reantoilpc.github.io
mkdir -p src/content/blog
cp -r ../docusaurus_websit/blog/pictures src/content/blog/pictures
ls src/content/blog/pictures        # 預期：2022-05-31 2023-02-22 2023-03-25
```
> 文章內 `![image](./pictures/<date>/x.png)` 的相對路徑會直接對應到此處，Astro 會優化圖片。

- [ ] **Step 2: 遷移每篇文章的「正文」並換上新 frontmatter**

對表格中每一篇，做：複製來源 `.md` → 新檔名 → 把原本的 Docusaurus frontmatter（`slug/title/authors/tags`）整段換成新的 Astro frontmatter（其餘正文與圖片語法**原封不動保留**）。

新 frontmatter 範本（以 lens 文為例）：
```md
---
title: 使用 Lens IDE 管理 Azure K8s
description: ''
pubDate: 2023-03-25
tags: [lens, k8s]
lang: zh-TW
---
```

逐篇執行（重複九次，每次換對應檔名/標題/日期/tags）。範例（lens 篇）：
```bash
SRC=../docusaurus_websit/blog
# 取出正文（跳過原 frontmatter：第一個 --- 到第二個 --- 之後）
awk 'f{print} /^---$/{c++} c==2 && !f{f=1}' "$SRC/2023-03-25-lens-with-k8s.md" > /tmp/body.md
{ printf -- '---\ntitle: 使用 Lens IDE 管理 Azure K8s\ndescription: ""\npubDate: 2023-03-25\ntags: [lens, k8s]\nlang: zh-TW\n---\n'; cat /tmp/body.md; } > src/content/blog/2023-03-25-lens-with-k8s.md
```
> 對 9 篇都做（postman 篇輸出檔名為 `postman-environment-variable.md`）。

- [ ] **Step 3: 處理空白文章 `github-unitofwork`**

該篇正文為空。為保留網址又不致全空白，在其正文加一行佔位：
```bash
printf -- '---\ntitle: github unitofwork 使用介紹\ndescription: ""\npubDate: 2022-11-02\ntags: [github, efcore]\nlang: zh-TW\n---\n\n> 內容整理中。\n' > src/content/blog/2022-11-02-github-unitofwork.md
```
> ⚠️ 完成後在交付摘要中提醒使用者：這篇原本就沒內容，請補寫或考慮下架。

- [ ] **Step 4: 確認沒有殘留 Docusaurus 專屬語法**

Run:
```bash
grep -rnE ':::|<Tabs|import .*@theme|\{/\* truncate \*/\}|<!--truncate-->' src/content/blog/ || echo "OK: 無 Docusaurus 專屬語法"
```
Expected: `OK`（若有 `:::note` 等 admonition 或 `<!--truncate-->`，手動改成一般 Markdown／移除）。

- [ ] **Step 5: 驗證 schema 與建置**

Run:
```bash
npx astro check && npm run build
```
Expected: 通過。若某張圖片路徑找不到，build 會報錯 → 對照 `src/content/blog/pictures/` 修正該文引用。

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: migrate 9 blog posts (slugs preserved) + images from Docusaurus"
```

---

### Task 7: Blog 路由（保留網址）+ 文章版型 + 網址保留自動化測試

**Files:**
- Create: `src/layouts/BlogPost.astro`, `src/pages/blog/[...slug].astro`
- Create: `scripts/check-urls.mjs`

- [ ] **Step 1: 文章版型**

Create `src/layouts/BlogPost.astro`:
```astro
---
import BaseLayout from './BaseLayout.astro';
import { getLangFromUrl, useTranslations } from '../i18n/utils';
interface Props { title: string; description: string; pubDate: Date; tags: string[]; minutes: number; }
const { title, description, pubDate, tags, minutes } = Astro.props;
const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
const dateStr = pubDate.toISOString().slice(0, 10);
---
<BaseLayout title={`${title} — Ray Hsu`} description={description}>
  <article class="prose">
    <h1 class="text-3xl font-bold mb-2">{title}</h1>
    <p class="text-sm mb-6" style="color:var(--muted)">
      {t('blog.publishedOn')} {dateStr} · {minutes} {t('blog.readingTime')}
    </p>
    <slot />
    {tags.length > 0 && (
      <div class="mt-8 flex flex-wrap gap-2">
        {tags.map((tag) => <a href={`/tags/${tag}`} class="text-xs rounded-full border px-3 py-1" style="border-color:var(--border)">#{tag}</a>)}
      </div>
    )}
  </article>
</BaseLayout>
```

- [ ] **Step 2: Blog 文章路由（id = 檔名 = slug → 保留舊網址）**

Create `src/pages/blog/[...slug].astro`:
```astro
---
import { getCollection, render } from 'astro:content';
import BlogPost from '../../layouts/BlogPost.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => data.lang === 'zh-TW' && !data.draft);
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}
const { post } = Astro.props;
const { Content, headings } = await render(post);
const words = post.body?.length ? post.body.trim().split(/\s+/).length : 0;
const minutes = Math.max(1, Math.round(words / 350)); // 中文以字元估更準，這裡簡化
---
<BlogPost title={post.data.title} description={post.data.description}
  pubDate={post.data.pubDate} tags={post.data.tags} minutes={minutes}>
  <Content />
</BlogPost>
```
> `post.id` 對 glob loader 為「檔名（去副檔名）」，因此網址 = `/blog/<檔名>`，與舊站一致。

- [ ] **Step 3: 撰寫網址保留測試**

Create `scripts/check-urls.mjs`:
```js
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
```

- [ ] **Step 4: 跑測試（先看它能抓到問題，再看它通過）**

Run:
```bash
npm run build
node scripts/check-urls.mjs
```
Expected: 9 行 PASS + `All 9 blog URLs preserved ✅`。若有 FAIL，檢查該篇檔名是否與表格 slug 完全一致（含大小寫）。

- [ ] **Step 5: 視覺確認一篇含圖文章**

`npm run dev` → 用 `/browse` 開 `http://localhost:4321/blog/2023-03-25-lens-with-k8s`，確認圖片、程式碼高亮（含複製鈕）正常。

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: blog post route (URLs preserved) + post layout + URL-preservation test"
```

---

### Task 8: 遷移 Notes 知識庫 + 側邊欄 + 舊 /docs 轉址

**Files:**
- Create: `src/content/notes/<category>/*.md`（4 篇）
- Create: `src/components/NotesSidebar.astro`, `src/layouts/NotesLayout.astro`
- Create: `src/pages/notes/index.astro`, `src/pages/notes/[...slug].astro`
- Modify: `astro.config.mjs`（加 redirects）

**Notes 對應表（來源 `docusaurus_websit/docs/`）：**

| 來源 | 新檔 | category | order | title |
|---|---|---|---|---|
| Git/Give-Up-Reset-Commit.md | notes/git/give-up-reset-commit.md | Git | 1 | 在 hard 模式 Reset 了某個 Commit，如何救回來? |
| PowerShell/show-list-installeds-software.md | notes/powershell/show-list-installed-software.md | PowerShell | 2 | （取來源 H1 為 title） |
| Shortcut/rider-shortcut.md | notes/shortcut/rider-shortcut.md | Shortcut | 3 | （取來源 H1 為 title） |
| Dotnet/dotnet-commit.md | notes/dotnet/dotnet-commit.md | Dotnet | 4 | （取來源 H1 為 title） |

> category/order 取自各 `_category_*.json` 的 `label`/`position`。

- [ ] **Step 1: 遷移 4 篇筆記**

對每篇：建立新檔、加上 Astro frontmatter、貼上來源正文（移除來源若有的 H1，改放 frontmatter `title`，或保留 H1 皆可，二擇一一致）。範例（Git 篇）：
```bash
mkdir -p src/content/notes/git
{ printf -- '---\ntitle: "在 hard 模式 Reset 了某個 Commit，如何救回來?"\ndescription: ""\ncategory: Git\norder: 1\nlang: zh-TW\n---\n'; tail -n +2 ../docusaurus_websit/docs/Git/Give-Up-Reset-Commit.md; } > src/content/notes/git/give-up-reset-commit.md
```
（`tail -n +2` 去掉來源首行 H1，避免與 frontmatter title 重複。其餘 3 篇比照，先 `head` 看來源 H1 取 title。）

- [ ] **Step 2: NotesSidebar**

Create `src/components/NotesSidebar.astro`:
```astro
---
import { getCollection } from 'astro:content';
const notes = await getCollection('notes', ({ data }) => data.lang === 'zh-TW');
const byCat = new Map();
for (const n of notes) {
  if (!byCat.has(n.data.category)) byCat.set(n.data.category, []);
  byCat.get(n.data.category).push(n);
}
const cats = [...byCat.entries()].sort((a, b) =>
  Math.min(...a[1].map((n) => n.data.order)) - Math.min(...b[1].map((n) => n.data.order)));
const current = Astro.url.pathname;
---
<aside class="text-sm">
  {cats.map(([cat, items]) => (
    <div class="mb-4">
      <p class="font-semibold mb-1">{cat}</p>
      <ul class="space-y-1">
        {items.map((n) => (
          <li>
            <a href={`/notes/${n.id}`}
               class={`hover:text-[var(--accent)] ${current === `/notes/${n.id}` ? 'text-[var(--accent)] font-medium' : ''}`}
               style={current === `/notes/${n.id}` ? '' : 'color:var(--muted)'}>{n.data.title}</a>
          </li>
        ))}
      </ul>
    </div>
  ))}
</aside>
```

- [ ] **Step 3: NotesLayout + 路由**

Create `src/layouts/NotesLayout.astro`:
```astro
---
import BaseLayout from './BaseLayout.astro';
import NotesSidebar from '../components/NotesSidebar.astro';
interface Props { title: string; description: string; }
const { title, description } = Astro.props;
---
<BaseLayout title={`${title} — Notes — Ray Hsu`} description={description}>
  <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
    <NotesSidebar />
    <article class="prose"><h1 class="text-2xl font-bold mb-4">{title}</h1><slot /></article>
  </div>
</BaseLayout>
```

Create `src/pages/notes/[...slug].astro`:
```astro
---
import { getCollection, render } from 'astro:content';
import NotesLayout from '../../layouts/NotesLayout.astro';
export async function getStaticPaths() {
  const notes = await getCollection('notes', ({ data }) => data.lang === 'zh-TW');
  return notes.map((n) => ({ params: { slug: n.id }, props: { note: n } }));
}
const { note } = Astro.props;
const { Content } = await render(note);
---
<NotesLayout title={note.data.title} description={note.data.description}><Content /></NotesLayout>
```

Create `src/pages/notes/index.astro`:
```astro
---
import NotesLayout from '../../layouts/NotesLayout.astro';
---
<NotesLayout title="Notes" description="技術筆記知識庫">
  <p>左側選擇分類瀏覽筆記。</p>
</NotesLayout>
```

- [ ] **Step 4: 舊 `/docs/...` → `/notes/...` 轉址**

在 `astro.config.mjs` 的 `defineConfig({...})` 加入 `redirects`：
```js
  redirects: {
    '/docs/Git/Give-Up-Reset-Commit': '/notes/git/give-up-reset-commit',
    '/docs/PowerShell/show-list-installeds-software': '/notes/powershell/show-list-installed-software',
    '/docs/Shortcut/rider-shortcut': '/notes/shortcut/rider-shortcut',
    '/docs/Dotnet/dotnet-commit': '/notes/dotnet/dotnet-commit',
    '/docs/intro': '/notes',
  },
```

- [ ] **Step 5: 驗證**

Run:
```bash
npx astro check && npm run build
test -f dist/notes/git/give-up-reset-commit/index.html && echo "notes OK"
test -f dist/docs/Git/Give-Up-Reset-Commit/index.html && echo "redirect page OK"
```
`npm run dev` → `/browse` 開 `/notes/git/give-up-reset-commit`，確認側邊欄分類順序（Git→PowerShell→Shortcut→Dotnet）與內容正確。

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: migrate notes knowledge base + sidebar + /docs redirects"
```

---

## Phase 3 — 列表頁、首頁、搜尋、Feed

### Task 9: Blog 列表 + 標籤頁 + RSS + sitemap

**Files:**
- Create: `src/components/PostCard.astro`, `src/pages/blog/index.astro`, `src/pages/tags/index.astro`, `src/pages/tags/[tag].astro`, `src/pages/rss.xml.js`

- [ ] **Step 1: PostCard**

Create `src/components/PostCard.astro`:
```astro
---
interface Props { href: string; title: string; pubDate: Date; tags: string[]; description?: string; }
const { href, title, pubDate, tags, description } = Astro.props;
---
<a href={href} class="block py-4 border-b" style="border-color:var(--border)">
  <h3 class="text-lg font-semibold">{title}</h3>
  <p class="text-xs mt-1" style="color:var(--muted)">{pubDate.toISOString().slice(0,10)} · {tags.map(t=>`#${t}`).join(' ')}</p>
  {description && <p class="text-sm mt-1" style="color:var(--muted)">{description}</p>}
</a>
```

- [ ] **Step 2: Blog 列表（含搜尋掛載點 `#search`）**

Create `src/pages/blog/index.astro`:
```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import PostCard from '../../components/PostCard.astro';
const posts = (await getCollection('blog', ({ data }) => data.lang === 'zh-TW' && !data.draft))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
---
<BaseLayout title="文章 — Ray Hsu" description="Ray Hsu 的技術文章">
  <h1 class="text-2xl font-bold mb-2">文章</h1>
  <div id="search" class="mb-6"></div>
  {posts.map((p) => (
    <PostCard href={`/blog/${p.id}`} title={p.data.title} pubDate={p.data.pubDate} tags={p.data.tags} description={p.data.description} />
  ))}
</BaseLayout>
```

- [ ] **Step 3: 標籤索引 + 單一標籤頁**

Create `src/pages/tags/index.astro`:
```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
const posts = await getCollection('blog', ({ data }) => !data.draft);
const tags = [...new Set(posts.flatMap((p) => p.data.tags))].sort();
---
<BaseLayout title="標籤 — Ray Hsu" description="所有標籤">
  <h1 class="text-2xl font-bold mb-4">標籤</h1>
  <div class="flex flex-wrap gap-2">
    {tags.map((t) => <a href={`/tags/${t}`} class="rounded-full border px-3 py-1 text-sm" style="border-color:var(--border)">#{t}</a>)}
  </div>
</BaseLayout>
```

Create `src/pages/tags/[tag].astro`:
```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import PostCard from '../../components/PostCard.astro';
export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const tags = [...new Set(posts.flatMap((p) => p.data.tags))];
  return tags.map((tag) => ({
    params: { tag },
    props: { posts: posts.filter((p) => p.data.tags.includes(tag)).sort((a,b)=>b.data.pubDate.valueOf()-a.data.pubDate.valueOf()) },
  }));
}
const { tag } = Astro.params;
const { posts } = Astro.props;
---
<BaseLayout title={`#${tag} — Ray Hsu`} description={`標籤 ${tag} 的文章`}>
  <h1 class="text-2xl font-bold mb-4">#{tag}</h1>
  {posts.map((p) => <PostCard href={`/blog/${p.id}`} title={p.data.title} pubDate={p.data.pubDate} tags={p.data.tags} description={p.data.description} />)}
</BaseLayout>
```

- [ ] **Step 4: RSS**

Create `src/pages/rss.xml.js`:
```js
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
  const posts = (await getCollection('blog', ({ data }) => data.lang === 'zh-TW' && !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION['zh-TW'],
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.pubDate,
      description: p.data.description,
      link: `/blog/${p.id}/`,
    })),
  });
}
```

- [ ] **Step 5: 驗證 feed/sitemap**

Run:
```bash
npm run build
test -f dist/rss.xml && echo "rss OK"
test -f dist/sitemap-index.xml && echo "sitemap OK"
node scripts/check-urls.mjs
```
Expected: rss OK / sitemap OK / 9 URL PASS。

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: blog list, tag pages, RSS feed"
```

---

### Task 10: 首頁 + About + 英文介面頁（/en）

**Files:**
- Modify: `src/pages/index.astro`
- Create: `src/pages/about.astro`, `src/pages/404.astro`
- Create: `src/pages/en/index.astro`, `src/pages/en/about.astro`, `src/pages/en/blog/index.astro`

- [ ] **Step 1: 完整首頁（zh-TW）**

Replace `src/pages/index.astro`:
```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import PostCard from '../components/PostCard.astro';
import { SITE_TITLE, TAGLINE, SITE_DESCRIPTION } from '../consts';
const recent = (await getCollection('blog', ({ data }) => data.lang === 'zh-TW' && !data.draft))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()).slice(0, 5);
---
<BaseLayout title={`${SITE_TITLE} — ${TAGLINE['zh-TW']}`} description={SITE_DESCRIPTION['zh-TW']}>
  <section class="py-6">
    <h1 class="text-3xl font-bold">{SITE_TITLE}</h1>
    <p class="mt-2" style="color:var(--muted)">{TAGLINE['zh-TW']}</p>
    <p class="mt-4">嗨，我是 Ray，一名 C# 後端工程師。這裡記錄我在 .NET、後端與開發工具上的文章與筆記。</p>
  </section>
  <section class="mt-8">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold">最新文章</h2>
      <a href="/blog" class="text-sm" style="color:var(--accent)">全部 →</a>
    </div>
    {recent.map((p) => <PostCard href={`/blog/${p.id}`} title={p.data.title} pubDate={p.data.pubDate} tags={p.data.tags} description={p.data.description} />)}
  </section>
</BaseLayout>
```

- [ ] **Step 2: About（zh-TW）**

Create `src/pages/about.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="關於 — Ray Hsu" description="關於 Ray Hsu">
  <article class="prose">
    <h1 class="text-2xl font-bold">關於我</h1>
    <p>我是 Ray Hsu，C# 後端工程師。專注於 .NET、EF Core、API 設計與雲端（Azure / Kubernetes）。</p>
    <p>GitHub：<a href="https://github.com/reantoilpc">@reantoilpc</a></p>
  </article>
</BaseLayout>
```

- [ ] **Step 3: 404**

Create `src/pages/404.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="404 — Ray Hsu" description="頁面不存在">
  <h1 class="text-2xl font-bold">404</h1>
  <p>找不到頁面。<a href="/" style="color:var(--accent)">回首頁</a></p>
</BaseLayout>
```

- [ ] **Step 4: 英文介面頁（en；目前無英文文章，列表顯示空狀態）**

Create `src/pages/en/index.astro`:
```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import PostCard from '../../components/PostCard.astro';
import { SITE_TITLE, TAGLINE, SITE_DESCRIPTION } from '../../consts';
const recent = (await getCollection('blog', ({ data }) => data.lang === 'en' && !data.draft))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()).slice(0, 5);
---
<BaseLayout title={`${SITE_TITLE} — ${TAGLINE['en']}`} description={SITE_DESCRIPTION['en']}>
  <section class="py-6">
    <h1 class="text-3xl font-bold">{SITE_TITLE}</h1>
    <p class="mt-2" style="color:var(--muted)">{TAGLINE['en']}</p>
    <p class="mt-4">Hi, I'm Ray — a C# backend engineer. Notes and articles on .NET, backend and dev tooling.</p>
  </section>
  <section class="mt-8">
    <h2 class="text-xl font-bold">Latest posts</h2>
    {recent.length ? recent.map((p) => <PostCard href={`/en/blog/${p.id}`} title={p.data.title} pubDate={p.data.pubDate} tags={p.data.tags} description={p.data.description} />)
      : <p class="mt-2" style="color:var(--muted)">No posts in English yet.</p>}
  </section>
</BaseLayout>
```

Create `src/pages/en/about.astro`:
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
---
<BaseLayout title="About — Ray Hsu" description="About Ray Hsu">
  <article class="prose">
    <h1 class="text-2xl font-bold">About</h1>
    <p>I'm Ray Hsu, a C# backend engineer focused on .NET, EF Core, API design and cloud (Azure / Kubernetes).</p>
    <p>GitHub: <a href="https://github.com/reantoilpc">@reantoilpc</a></p>
  </article>
</BaseLayout>
```

Create `src/pages/en/blog/index.astro`:
```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../../layouts/BaseLayout.astro';
import PostCard from '../../../components/PostCard.astro';
const posts = (await getCollection('blog', ({ data }) => data.lang === 'en' && !data.draft))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
---
<BaseLayout title="Blog — Ray Hsu" description="Articles by Ray Hsu">
  <h1 class="text-2xl font-bold mb-4">Blog</h1>
  {posts.length ? posts.map((p) => <PostCard href={`/en/blog/${p.id}`} title={p.data.title} pubDate={p.data.pubDate} tags={p.data.tags} description={p.data.description} />)
    : <p style="color:var(--muted)">No posts in English yet.</p>}
</BaseLayout>
```

- [ ] **Step 5: 驗證**

Run: `npm run build && node scripts/check-urls.mjs`
`npm run dev` → `/browse` 確認 `/`、`/about`、`/en`、`/en/about`，語言切換器可在 `/` ↔ `/en` 互跳。

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: homepage, about, 404, and English UI pages (/en)"
```

---

### Task 11: Pagefind 站內搜尋

**Files:**
- Create: `src/components/Search.astro`
- Modify: `src/pages/blog/index.astro`（掛載搜尋 UI）

- [ ] **Step 1: 搜尋元件（用 Pagefind 預設 UI）**

Create `src/components/Search.astro`:
```astro
---
import { getLangFromUrl, useTranslations } from '../i18n/utils';
const t = useTranslations(getLangFromUrl(Astro.url));
---
<div id="pagefind-search" data-placeholder={t('search.placeholder')}></div>
<link rel="stylesheet" href="/pagefind/pagefind-ui.css" />
<script>
  // Pagefind 產物只有在 build 後存在；dev 模式會找不到，屬正常。
  async function init() {
    // @ts-ignore
    const { PagefindUI } = await import('/pagefind/pagefind-ui.js');
    new PagefindUI({ element: '#pagefind-search', showSubResults: true });
  }
  if (document.getElementById('pagefind-search')) init().catch(() => {});
</script>
```

- [ ] **Step 2: 把搜尋掛到 blog 列表**

Modify `src/pages/blog/index.astro`：把 `<div id="search" class="mb-6"></div>` 換成：
```astro
import Search from '../../components/Search.astro';
// ...在 frontmatter import 區
```
並在模板把該 div 改為：
```astro
<div class="mb-6"><Search /></div>
```

- [ ] **Step 3: 驗證（需 build + preview，dev 模式無索引）**

Run:
```bash
npm run build && npm run preview
```
用 `/browse` 開 `http://localhost:4321/blog`，在搜尋框輸入「k8s」「efcore」，確認能搜到對應文章。

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: Pagefind static search on blog page"
```

---

## Phase 4 — 視覺設計打磨（迭代）

### Task 12: 設計打磨（排版、間距、深色、程式碼、響應式）

> 此 Task 是**迭代視覺工作**，非一次定稿。以 Task 5 的 `global.css` 與既有元件為起點，逐項調整並用 `/browse` 比對。

**Files:**
- Modify: `src/styles/global.css`、各 `.astro` 元件的 class

- [ ] **Step 1: 啟動預覽**

`npm run build && npm run preview`，用 `/browse` 開首頁、一篇長文（lens 或 wsl2）、`/notes`、`/blog`、深色與淺色各看一次。

- [ ] **Step 2: 逐項打磨檢查清單（每調一項就存檔、瀏覽器重看）**
  - [ ] 標題層級對比與字重清楚（h1/h2/h3）
  - [ ] 內文行寬 ≤ 70ch、行高舒適（中文 1.75 起跳）
  - [ ] 連結、強調色在深淺兩色都對比足夠（WCAG AA）
  - [ ] 程式碼區塊：字級、邊距、捲動、複製鈕、檔名標題正常
  - [ ] 圖片圓角、留白、不溢出
  - [ ] 手機寬度（375px）導覽列不擠、可點
  - [ ] 深色模式無「白底殘留」區塊

- [ ] **Step 3: （可選）建立預設 OG 圖**

放一張 1200×630 的 `public/og-default.png`（簡單品牌字卡即可）。沒有也不阻擋上線。

- [ ] **Step 4: 設計驗收（交付者請使用者確認）**

把預覽截圖／本機網址給使用者看，確認外觀 OK 再進入部署。若使用者要調整，回到 Step 2。

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "style: visual polish — typography, dark mode, code blocks, responsive"
```

---

## Phase 5 — 部署上線

### Task 13: GitHub Actions 自動建置部署

**Files:**
- Create: `.github/workflows/deploy.yml`、`public/.nojekyll`

- [ ] **Step 1: 加 `.nojekyll`**

Run: `touch public/.nojekyll`

- [ ] **Step 2: 部署 workflow**

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: false
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with: { path: ./dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: 本機最終驗證**

Run:
```bash
rm -rf node_modules dist && npm ci && npm run build && node scripts/check-urls.mjs
```
Expected: 全新安裝也能 build、9 URL PASS（模擬 CI 環境）。

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "ci: add GitHub Actions workflow to build and deploy Astro to Pages"
```

---

### Task 14: 切換上線（cutover）

> ⚠️ 這是對線上站台的不可逆變更。先確認 Task 1–13 全部 PASS、使用者已驗收設計。

- [ ] **Step 1: 先停用舊 repo 的部署 workflow（最高風險，先做）**

在 `docusaurus_websit` repo：
```bash
cd /home/rayhsu/projects/Github/docusaurus_websit
git fetch origin && git checkout main && git pull --ff-only
git mv .github/workflows/publish-blog.yml .github/workflows/publish-blog.yml.disabled
git commit -m "chore: disable Docusaurus deploy (site migrated to Astro)"
```
> 先**和使用者確認**再 `git push origin main`（push 屬對外動作，需使用者點頭）。
Expected: 舊 workflow 停用，不會再覆蓋 `reantoilpc.github.io`。

- [ ] **Step 2: 合併 Astro 分支到 main**

```bash
cd /home/rayhsu/projects/Github/reantoilpc.github.io
git checkout main
git merge --no-ff feature/astro-migration/site -m "feat: migrate site to Astro"
```

- [ ] **Step 3: 推上去（需使用者同意的對外動作）**

先告知使用者「準備 push main、觸發部署」，取得同意後：
```bash
git push origin main
git push origin legacy-docusaurus-build   # 備份分支也推上去
git push origin --tags
```

- [ ] **Step 4: 使用者操作一次 — 切換 Pages 來源**

請使用者到 GitHub → `reantoilpc.github.io` repo → **Settings → Pages → Build and deployment → Source** 改為 **GitHub Actions**。
（或由使用者在本機執行：`gh api -X POST repos/reantoilpc/reantoilpc.github.io/pages -f build_type=workflow` — 需已 `gh auth login`。）

- [ ] **Step 5: 確認部署成功**

到 repo 的 Actions 分頁確認 workflow 綠燈。用 `/browse` 開正式站：
- `https://reantoilpc.github.io/`（新首頁）
- `https://reantoilpc.github.io/blog/2023-03-25-lens-with-k8s`（舊網址仍可達）
- `https://reantoilpc.github.io/notes/git/give-up-reset-commit`
- `https://reantoilpc.github.io/rss.xml`、`/sitemap-index.xml`

- [ ] **Step 6: 上線後檢查清單（交付摘要）**
  - [ ] 9 篇文章網址全部可達
  - [ ] 圖片、程式碼高亮正常
  - [ ] 深色／語言切換正常
  - [ ] 搜尋可用
  - [ ] 提醒使用者：`github-unitofwork` 內容待補；舊 `docusaurus_websit` 已停用部署但保留為封存

---

## Self-Review（撰寫者對照 spec 的覆蓋檢查）

**Spec 覆蓋對照：**
- §3 技術選型 → Task 2、3（Astro/Tailwind/MDX/ExpressiveCode/Pagefind/sitemap/rss）✅
- §4.1 頁面/路由 → Task 7（blog）、8（notes）、9（tags）、10（home/about/en）✅
- §4.2 i18n（zh-TW 預設無前綴、en /en/、hreflang、per-post lang）→ Task 3、5（utils）、10（en 頁）、BaseHead（hreflang）✅
- §4.3 品牌 Ray Hsu + tagline → `consts.ts`（Task 3）、Header（Task 5）✅
- §5 外觀設計 → Task 5（骨架）+ Task 12（迭代打磨）✅
- §6 功能（深色/標籤/閱讀時間/搜尋/RSS/sitemap/OG/高亮/RWD）→ Task 5、7、9、11、12、BaseHead ✅
- §7 內容遷移（9 文保留 slug、丟範例、圖片、作者單一、4 筆記、丟教學）→ Task 6、7、8 ✅
- §8 Repo/部署（備份、source 進 repo、Actions、Pages 來源、停用舊 workflow）→ Task 1、13、14 ✅
- §9 SEO/網址保留 → Task 7（測試）、BaseHead、§8 redirects（Task 8）✅
- §10 不做範圍（無作品集、不強制翻譯）→ 計畫未含 projects；en 為空狀態非翻譯 ✅
- §11 成功標準 → check-urls 測試、build gate、視覺 QA、Task 14 線上驗證 ✅
- §12 風險（舊 workflow 覆蓋、Pages 來源、slug 大小寫、CJK 字型、圖片路徑）→ Task 14 Step 1、Task 14 Step 4、Task 7 Step 4、global.css 字型堆疊、Task 6 Step 5 ✅

**Placeholder 掃描：** 無 TBD/TODO；空白文章以明確佔位處理並標記。設計打磨為「迭代工作」而非佔位（含明確檢查清單）。

**型別/命名一致性：** `lang` 欄位、`post.id`/`note.id`、`localizePath`/`getLangFromUrl`/`useTranslations`、`SITE_TITLE`/`TAGLINE` 跨 Task 一致。

---

## 給執行者的備註

- 對外動作（`git push`、改 GitHub 設定、停用舊 repo workflow 的 push）**務必先取得使用者同意**。
- 開分支遵循使用者慣例：從最新生產 `main` 開 `feature/astro-migration/site`，勿從未驗證分支開。
- 視覺相關一律用 gstack `/browse` 開 localhost 檢視，不用其他瀏覽器工具。
