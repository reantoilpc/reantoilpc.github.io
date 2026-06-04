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
    category: z.string().optional(),
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
    tags: z.array(z.string()).default([]),
    order: z.number().default(999),
    created: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    lang: z.enum(['zh-TW', 'en']).default('zh-TW'),
  }),
});

export const collections = { blog, notes };
