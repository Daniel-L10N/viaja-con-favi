import { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/data';
import BlogCard from '@/components/BlogCard';

export const metadata: Metadata = {
  title: 'Blog de Viajes - Consejos y Experiencias | Viaja con Favi',
  description: 'Artículos sobre viajes, destinos exclusivos, consejos y tips para tus vacaciones de lujo. Descubre los mejores destinos del mundo.',
  keywords: ['blog viajes', 'consejos viaje', 'destinos lujo', 'experiencias viaje', 'tips vacaciones'],
  alternates: {
    canonical: 'https://viajaconfavi.com/blog',
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://viajaconfavi.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://viajaconfavi.com/blog"
      }
    ]
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <nav className="bg-white border-b" aria-label="Breadcrumb">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-sm" role="list">
            <li><Link href="/" className="text-gray-500 hover:text-amber-600">Inicio</Link></li>
            <li className="text-gray-400">/</li>
            <li><span className="text-gray-900 font-medium">Blog</span></li>
          </ol>
        </div>
      </nav>

      <section className="bg-gradient-to-r from-gray-900 to-gray-700 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Blog de Viajes
          </h1>
          <p className="text-xl text-gray-300">
            Consejos, destinos y experiencias de viaje
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Próximamente más artículos...</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}