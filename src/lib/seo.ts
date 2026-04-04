export const siteMetadata = {
  siteUrl: 'https://viajaconfavi.com',
  siteName: 'Viaja con Favi',
  title: 'Viaja con Favi | Viajes de Lujo a Precios de Mayorista',
  description:
    'Accede a destinos de lujo en 26+ países con descuentos exclusivos. Viajes 5 estrellas, experiencias únicas, precios de mayorista.',
  author: 'Viaja con Favi',
  twitter: '@viajaconfavi',
  facebook: 'viajaconfavi',
  whatsapp: '525616376826',
  keywords: [
    'viajes de lujo',
    'viajes con descuento',
    'travorium',
    'resorts 5 estrellas',
    'paquetes turísticos',
    'viajes premium',
    'viajes económicos',
    'vacaciones familiares',
    'viajes románticos',
    'todo incluido',
  ],
  socialBanner: '/og-image.jpg',
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Viaja con Favi',
  url: 'https://viajaconfavi.com',
  logo: 'https://viajaconfavi.com/logo.png',
  description:
    'Agencia de viajes de lujo con descuentos exclusivos en más de 26 países.',
  sameAs: [
    'https://facebook.com/viajaconfavi',
    'https://instagram.com/viajaconfavi',
    'https://wa.me/525616376826',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+525616376826',
    contactType: 'customer service',
    availableTime: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '09:00',
      closes: '20:00',
    },
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Viaja con Favi',
  url: 'https://viajaconfavi.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://viajaconfavi.com/blog?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export const faqSchema = [
  {
    question: '¿Qué es Viaja con Favi?',
    answer:
      'Viaja con Favi es un club de viajes privado que ofrece acceso a destinos de lujo a precios de mayorista. Actualmente trabajamos con más de 26 países y más de 100 destinos.',
  },
  {
    question: '¿Cómo funcionan las membresías?',
    answer:
      'Con una membresía obtienes acceso a precios exclusivos en hoteles, tours y experiencias de lujo. Puedes ahorrar hasta 70% comparado con precios tradicionales.',
  },
  {
    question: '¿Qué países tienen ofertas?',
    answer:
      'Tenemos destinos en los 5 continentes: Europa, Asia, América, África y Oceanía. Algunos destinos populares son París, Bali, Dubai, México, Caribe y muchos más.',
  },
  {
    question: '¿Cómo contacto para reservar?',
    answer:
      'Puedes contactarnos por WhatsApp al 525616376826 o través de nuestro formulario de contacto en la página.',
  },
];