import { Metadata } from 'next';
import { getBlogPosts } from '@/lib/data';
import BlogCard from '@/components/BlogCard';

export const metadata: Metadata = {
  title: 'Blog de Viajes - Consejos y Experiencias | Viaja con Favi',
  description: 'Articulos sobre viajes, destinos exclusivos, consejos y tips para tus vacaciones dream.',
  keywords: ['blog viajes', 'consejos viaje', 'destinos lujo', 'experiencias viaje'],
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Blog de Viajes
          </h1>
          <p className="text-xl text-gray-300">
            Consejos, destinos y experiencias de viaje
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
