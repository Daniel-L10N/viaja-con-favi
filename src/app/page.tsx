import Hero from "@/components/Hero";
import Concepto from "@/components/Concepto";
import Confianza from "@/components/Confianza";
import Membresia from "@/components/Membresia";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { getOfertasDestacadas, getRecientesBlog } from "@/lib/data";
import OfertaCard from "@/components/OfertaCard";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";

export default async function Home() {
  const ofertasDestacadas = await getOfertasDestacadas();
  const postsRecientes = await getRecientesBlog(3);

  return (
    <main className="min-h-screen">
      <Hero />
      <Concepto />
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Ofertas Destacadas
            </h2>
            <Link 
              href="/destinos" 
              className="text-amber-600 font-semibold hover:underline"
            >
              Ver todas →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ofertasDestacadas.slice(0, 3).map((oferta, index) => (
              <OfertaCard key={oferta.id} oferta={oferta} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Confianza />
      <Membresia />
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Ultimas del Blog
            </h2>
            <Link 
              href="/blog" 
              className="text-amber-600 font-semibold hover:underline"
            >
              Ver todos →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {postsRecientes.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
