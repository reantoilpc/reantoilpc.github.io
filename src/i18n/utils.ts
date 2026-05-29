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
