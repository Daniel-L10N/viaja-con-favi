import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Viaja con Favi | Experiencias de 5 Estrellas a Precios de Mayorista",
  description:
    "Únete a la comunidad de Viaja con Favi y accede a destinos de lujo en 26 países con descuentos exclusivos. Viajes 5 estrellas a precios de mayorista.",
  keywords: [
    "viajes de lujo",
    "viajes con descuento",
    "Travorium",
    "resorts 5 estrellas",
    "paquetes turísticos",
    "viajes premium",
  ],
  openGraph: {
    title: "Viaja con Favi | Experiencias de 5 Estrellas",
    description:
      "Únete a la comunidad de Viaja con Favi y accede a destinos de lujo con descuentos exclusivos.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Viaja con Favi | Experiencias de 5 Estrellas",
    description:
      "Viaja con Favi: Experiencias de 5 Estrellas a Precios de Mayorista",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${montserrat.variable} ${poppins.variable} font-body antialiased bg-white text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
