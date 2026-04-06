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
  metadataBase: new URL("https://viajaconfavi.com"),
  title: {
    default: "Viaja con Favi | Viajes de Lujo a Precios de Mayorista",
    template: "%s | Viaja con Favi",
  },
  description:
    "Accede a destinos de lujo en 26+ países con descuentos exclusivos. Viajes 5 estrellas, experiencias únicas, precios de mayorista. ¡Únete hoy!",
  keywords: [
    "viajes de lujo",
    "viajes con descuento",
    "travorium",
    "resorts 5 estrellas",
    "paquetes turísticos",
    "viajes premium",
    "viajes económicos",
    "vacaciones familiares",
    "viajes románticos",
    "todo incluido",
  ],
  authors: [{ name: "Viaja con Favi" }],
  creator: "Viaja con Favi",
  publisher: "Viaja con Favi",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://viajaconfavi.com",
    siteName: "Viaja con Favi",
    title: "Viaja con Favi | Viajes de Lujo a Precios de Mayorista",
    description:
      "Accede a destinos de lujo en 26+ países con descuentos exclusivos. Viajes 5 estrellas a precios de mayorista.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Viaja con Favi - Viajes de Lujo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Viaja con Favi | Viajes de Lujo",
    description:
      "Viajes 5 estrellas a precios de mayorista. ¡Únete a la comunidad!",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Viaja con Favi",
              url: "https://viajaconfavi.com",
              logo: "https://viajaconfavi.com/logo.png",
              description:
                "Agencia de viajes de lujo con descuentos exclusivos en más de 26 países.",
              sameAs: [
                "https://facebook.com/viajaconfavi",
                "https://instagram.com/viajaconfavi",
                "https://wa.me/1234567890",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1234567890",
                contactType: "customer service",
                availableTime: {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  opens: "09:00",
                  closes: "20:00",
                },
              },
            }),
          }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${poppins.variable} font-body antialiased bg-white text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}