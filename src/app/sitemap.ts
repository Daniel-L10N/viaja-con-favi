import { MetadataRoute } from 'next';
import { getOfertas, getBlogPosts } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://viajacconfavi.github.io/viaja-con-favi';
  
  const ofertas = await getOfertas();
  const posts = await getBlogPosts();
  
  const rutas = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/destinos`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    ...ofertas.map((oferta) => ({
      url: `${baseUrl}/destinos/${oferta.id}`,
      lastModified: new Date(oferta.createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
  
  return rutas;
}
