import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rent4usolutions.com';

  const routes = [
    '',
    '/opportunities',
    // Future static pages can be added here
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // In the future, dynamic opportunity routes like /opportunities/[id] or /opportunities/[location] 
  // can be mapped and appended here.

  return [...routes];
}
