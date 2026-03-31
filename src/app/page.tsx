import Hero from "@/components/Hero";
import Concepto from "@/components/Concepto";
import Galeria from "@/components/Galeria";
import Confianza from "@/components/Confianza";
import Membresia from "@/components/Membresia";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Concepto />
      <Galeria />
      <Confianza />
      <Membresia />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
