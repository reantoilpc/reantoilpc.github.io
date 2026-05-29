export const CATEGORIES = [
  { name: 'C#', slug: 'csharp' },
  { name: 'ASP.NET Core', slug: 'aspnet-core' },
  { name: 'Entity Framework', slug: 'entity-framework' },
  { name: 'DevOps', slug: 'devops' },
  { name: 'Tools', slug: 'tools' },
] as const;
export const slugForCategory = (name: string) => CATEGORIES.find(c => c.name === name)?.slug ?? name.toLowerCase().replace(/[^a-z0-9]+/g,'-');
export const categoryForSlug = (slug: string) => CATEGORIES.find(c => c.slug === slug)?.name;
