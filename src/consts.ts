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
