import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/data';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    return { title: 'Articulo no encontrado | Viaja con Favi' };
  }
  
  return {
    title: `${post.titulo} | Viaja con Favi`,
    description: post.excerpt,
    openGraph: {
      title: post.titulo,
      description: post.excerpt,
      images: [post.imagen],
      type: 'article',
      publishedTime: post.fechaPublicacion,
      authors: [post.autor],
    },
  };
}

export default async function BlogDetallePage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  const tags = Array.isArray(post.tags) ? post.tags : [];

  return (
    <main className="min-h-screen bg-gray-50">
      <article>
        <div className="relative h-[40vh] min-h-[300px]">
          <Image
            src={post.imagen}
            alt={post.titulo}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver al blog
              </Link>
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, i) => (
                  <span key={i} className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {post.titulo}
              </h1>
              <div className="flex items-center gap-6 text-white/80">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.fechaPublicacion}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.lectura} min lectura
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {post.excerpt}
              </p>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {post.contenido}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
              
              <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <Share2 className="w-5 h-5" />
                  <span>Compartir articulo</span>
                </div>
                
                <Link
                  href="/contacto"
                  className="bg-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-600 transition-colors"
                >
                  Contactanos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
