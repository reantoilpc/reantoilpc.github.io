import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';
import { slugForCategory } from './categories';

/** Astro 6's glob loader slugifies entry.id (lowercase, strips dots). Derive the
 *  slug from the original filename so blog URLs match the old Docusaurus URLs. */
export function getPostSlug(entry: CollectionEntry<'blog'>): string {
  return entry.filePath
    ? entry.filePath.split('/').pop()!.replace(/\.(md|mdx)$/, '')
    : entry.id;
}

/** Published, non-draft blog posts for a language, newest first. */
export async function getPublishedPosts(lang: string): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog', ({ data }) => data.lang === lang && !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Category counts for categories present in the given posts, sorted by count desc then name. */
export function getCategoryCounts(
  posts: CollectionEntry<'blog'>[],
): { name: string; slug: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of posts) {
    const name = p.data.category;
    if (!name) continue;
    counts.set(name, (counts.get(name) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, slug: slugForCategory(name), count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** Monthly archive grouped by year then month, newest first. */
export function getArchive(
  posts: CollectionEntry<'blog'>[],
): { year: number; months: { ym: string; label: string; count: number }[] }[] {
  const byYm = new Map<string, number>();
  for (const p of posts) {
    const d = p.data.pubDate;
    const ym = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
    byYm.set(ym, (byYm.get(ym) ?? 0) + 1);
  }
  const byYear = new Map<number, { ym: string; label: string; count: number }[]>();
  for (const [ym, count] of byYm) {
    const [yStr, mStr] = ym.split('-');
    const year = Number(yStr);
    const month = Number(mStr);
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year)!.push({ ym, label: `${month} 月`, count });
  }
  return [...byYear.entries()]
    .map(([year, months]) => ({
      year,
      months: months.sort((a, b) => b.ym.localeCompare(a.ym)),
    }))
    .sort((a, b) => b.year - a.year);
}
