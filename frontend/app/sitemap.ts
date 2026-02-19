import { MetadataRoute } from 'next';
import { db } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [rows]: any = await db.execute('SELECT keyword, updated_at FROM seo_pillar_pages');
  
  const pages = rows.map((page: any) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'}/pillar/${encodeURIComponent(page.keyword)}`,
    lastModified: new Date(page.updated_at),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...pages,
  ];
}
