import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/rent4-admin/', '/api/', '/_next/'],
    },
    sitemap: 'https://rent4usolutions.com/sitemap.xml',
  };
}
