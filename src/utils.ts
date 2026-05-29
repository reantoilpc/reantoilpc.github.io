import type { CollectionEntry } from 'astro:content';

/** Astro 6's glob loader slugifies entry.id (lowercase, strips dots). Derive the
 *  slug from the original filename so blog URLs match the old Docusaurus URLs. */
export function getPostSlug(entry: CollectionEntry<'blog'>): string {
  return entry.filePath
    ? entry.filePath.split('/').pop()!.replace(/\.(md|mdx)$/, '')
    : entry.id;
}
