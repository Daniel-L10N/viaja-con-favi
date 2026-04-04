import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create ofertas
  const ofertas = await Promise.all([
    prisma.oferta.create({
      data: {
        titulo: 'Paris - 5 Noches',
        descripcion: 'Hotel 5 estrellas en centro de Paris con desayuno incluido. Auto de lujo y tours guiada por la ciudad.',
        precio: 450,
        imagen: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
        destino: 'Paris, Francia',
        incluye: JSON.stringify(['Hotel Ritz Paris', 'Auto BMW', 'Traslados', '2 Tours guiados', 'Seguro viaje']),
        duracion: '5 noches / 6 dias',
        destacada: true,
      },
    }),
    prisma.oferta.create({
      data: {
        titulo: 'Cancun - 7 Noches Todo Incluido',
        descripcion: 'Resort 5 estrellas en zona hotelera con todo incluido. Vuelo redondo y transfer privado.',
        precio: 890,
        imagen: 'https://images.unsplash.com/photo-1568853745861-dda1a63c9f8e?w=800',
        destino: 'Cancun, Mexico',
        incluye: JSON.stringify(['Hotel 5★', 'Todo incluido', 'Vuelo redondo', 'Transfer', 'Excursion a Cenotes']),
        duracion: '7 noches / 8 dias',
        destacada: true,
      },
    }),
    prisma.oferta.create({
      data: {
        titulo: 'Bali - 10 Noches',
        descripcion: 'Experience tropical paradise with luxury villa, private pool and cultural tours.',
        precio: 1200,
        imagen: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
        destino: 'Bali, Indonesia',
        incluye: JSON.stringify(['Villa privada', 'Piscina privada', 'Desayuno', 'Tours culturales', 'Spa treatment']),
        duracion: '10 noches / 11 dias',
        destacada: true,
      },
    }),
    prisma.oferta.create({
      data: {
        titulo: 'Roma + Firenze - 8 Noches',
        descripcion: 'Recorre dos joyas de Italia con hoteles centricos y tours privados por las ciudades.',
        precio: 750,
        imagen: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800',
        destino: 'Italia',
        incluye: JSON.stringify(['Hotel Roma centro', 'Hotel Florencia', 'Tours privados', 'Tren Italia', 'Entradas museos']),
        duracion: '8 noches / 9 dias',
        destacada: false,
      },
    }),
    prisma.oferta.create({
      data: {
        titulo: 'Dubai - 5 Noches',
        descripcion: 'Paquete ejecutivo con hotel en Downtown, safari en el desierto y cena show.',
        precio: 950,
        imagen: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
        destino: 'Dubai, EAU',
        incluye: JSON.stringify(['Hotel 5★ Downtown', 'Safari desierto', 'Cena show', 'City tour', 'Traslados VIP']),
        duracion: '5 noches / 6 dias',
        destacada: false,
      },
    }),
  ])

  // Create blog posts
  const posts = await Promise.all([
    prisma.blogPost.create({
      data: {
        titulo: '10 Razones paraviajar con Travorium',
        slug: '10-razones-viajar-travorium',
        excerpt: 'Descubre por que miles de personas eligen Travorium para sus vacaciones de lujo a precios accesibles.',
        contenido: 'Contenido del articulo...',
        imagen: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
        autor: 'Viaja con Favi',
        tags: JSON.stringify(['Travorium', 'Viajes', 'Luxo']),
        lectura: 5,
        fechaPublicacion: '2026-04-01',
      },
    }),
    prisma.blogPost.create({
      data: {
        titulo: 'Guia completa: Como funciona el club de viajes',
        slug: 'guia-club-viajes',
        excerpt: 'Todo lo que necesitas saber sobre el club de viajes Travorium y sus beneficios exclusivos.',
        contenido: 'Contenido del articulo...',
        imagen: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
        autor: 'Viaja con Favi',
        tags: JSON.stringify(['Guia', 'Club', 'Beneficios']),
        lectura: 8,
        fechaPublicacion: '2026-04-02',
      },
    }),
    prisma.blogPost.create({
      data: {
        titulo: 'Los mejores destinos para 2026',
        slug: 'mejores-destinos-2026',
        excerpt: 'Los destinos mas populares para el proximo ano. Desde Paris hasta Bali, aqui estan las opciones.',
        contenido: 'Contenido del articulo...',
        imagen: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800',
        autor: 'Viaja con Favi',
        tags: JSON.stringify(['Destinos', '2026', 'Viajes']),
        lectura: 6,
        fechaPublicacion: '2026-04-03',
      },
    }),
  ])

  console.log('Seeded:', {
    ofertas: ofertas.length,
    posts: posts.length,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
