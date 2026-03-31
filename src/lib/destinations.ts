export interface Destination {
  id: string;
  country: string;
  flag: string;
  image: string;
  resorts: string;
  benefits: {
    meals: string;
    transfers: string;
    extras: string[];
  };
  priceFrom: string;
}

export const destinations: Destination[] = [
  {
    id: "mexico",
    country: "México",
    flag: "🇲🇽",
    image: "https://images.unsplash.com/photo-1518659526054-190340b327c2?w=800&q=80",
    resorts: "500+",
    benefits: {
      meals: "Todo incluido",
      transfers: "Aeropuerto-Hotel-Aeropuerto",
      extras: ["Excursiones incluidas", "Upgrade sujeto a disponibilidad"],
    },
    priceFrom: "$899",
  },
  {
    id: "dominican-republic",
    country: "República Dominicana",
    flag: "🇩🇴",
    image: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=800&q=80",
    resorts: "300+",
    benefits: {
      meals: "Todo incluido",
      transfers: "Privado VIP",
      extras: ["Casino bonus", "Spa credit"],
    },
    priceFrom: "$799",
  },
  {
    id: "costa-rica",
    country: "Costa Rica",
    flag: "🇨🇷",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80",
    resorts: "150+",
    benefits: {
      meals: "Desayuno incluido",
      transfers: "Traslado incluido",
      extras: ["Tour nature", "Botella de vino"],
    },
    priceFrom: "$699",
  },
  {
    id: "jamaica",
    country: "Jamaica",
    flag: "🇯🇲",
    image: "https://images.unsplash.com/photo-1596910547037-846b7b5a24b8?w=800&q=80",
    resorts: "100+",
    benefits: {
      meals: "Todo incluido",
      transfers: "Privado",
      extras: ["Excursión a Nine Mile", "Club infantil"],
    },
    priceFrom: "$899",
  },
  {
    id: "bahamas",
    country: "Bahamas",
    flag: "🇧🇸",
    image: "https://images.unsplash.com/photo-1597423244039-d4f4c9c02c3a?w=800&q=80",
    resorts: "80+",
    benefits: {
      meals: "Todo incluido",
      transfers: "Barco privado",
      extras: ["Excursión a isla privada", "Snorkel"],
    },
    priceFrom: "$1,299",
  },
  {
    id: "puerto-rico",
    country: "Puerto Rico",
    flag: "🇵🇷",
    image: "https://images.unsplash.com/photo-1562664377-709f2c337eb2?w=800&q=80",
    resorts: "60+",
    benefits: {
      meals: "Desayuno y cena",
      transfers: "Incluido",
      extras: ["Tour Old San Juan", "Cata de ron"],
    },
    priceFrom: "$749",
  },
  {
    id: "usa",
    country: "Estados Unidos",
    flag: "🇺🇸",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
    resorts: "200+",
    benefits: {
      meals: "Breakfast included",
      transfers: "Rental car included",
      extras: ["Theme parks discounts", "City tours"],
    },
    priceFrom: "$599",
  },
  {
    id: "canada",
    country: "Canadá",
    flag: "🇨🇦",
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80",
    resorts: "150+",
    benefits: {
      meals: "Desayuno incluido",
      transfers: "Traslado incluido",
      extras: ["Tour Niagara", "Wine tasting"],
    },
    priceFrom: "$899",
  },
  {
    id: "spain",
    country: "España",
    flag: "🇪🇸",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80",
    resorts: "400+",
    benefits: {
      meals: "Desayunobuffet",
      transfers: "Aeropuerto-Hotel",
      extras: ["Tour ciudades", "Cata de vinos"],
    },
    priceFrom: "$699",
  },
  {
    id: "italy",
    country: "Italia",
    flag: "🇮🇹",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&q=80",
    resorts: "350+",
    benefits: {
      meals: "Desayuno",
      transfers: "Privado",
      extras: ["Tour Roma", "Wine experience"],
    },
    priceFrom: "$849",
  },
  {
    id: "france",
    country: "Francia",
    flag: "🇫🇷",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    resorts: "300+",
    benefits: {
      meals: "Desayuno",
      transfers: "Privado",
      extras: ["Tour París", "Crucero Sena"],
    },
    priceFrom: "$999",
  },
  {
    id: "portugal",
    country: "Portugal",
    flag: "🇵🇹",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80",
    resorts: "150+",
    benefits: {
      meals: "Desayuno",
      transfers: "Incluido",
      extras: ["Tour Lisboa", "Wine tour"],
    },
    priceFrom: "$599",
  },
  {
    id: "greece",
    country: "Grecia",
    flag: "🇬🇷",
    image: "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?w=800&q=80",
    resorts: "200+",
    benefits: {
      meals: "Desayuno",
      transfers: "Puerto-Hotel",
      extras: ["Tour Atenas", "Island hopping"],
    },
    priceFrom: "$799",
  },
  {
    id: "turkey",
    country: "Turquía",
    flag: "🇹🇷",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
    resorts: "250+",
    benefits: {
      meals: "Todo incluido",
      transfers: "Incluido",
      extras: ["Tour Estambul", "Baño turco"],
    },
    priceFrom: "$549",
  },
  {
    id: "thailand",
    country: "Tailandia",
    flag: "🇹🇭",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80",
    resorts: "180+",
    benefits: {
      meals: "Desayuno",
      transfers: "Privado",
      extras: ["Tour Bangkok", "Islands tour"],
    },
    priceFrom: "$699",
  },
  {
    id: "maldives",
    country: "Maldivas",
    flag: "🇲🇻",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    resorts: "150+",
    benefits: {
      meals: "Todo incluido",
      transfers: "Seaplane included",
      extras: ["Snorkeling safari", "Sunset cruise"],
    },
    priceFrom: "$1,899",
  },
  {
    id: "dubai",
    country: "Emiratos Árabes",
    flag: "🇦🇪",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    resorts: "200+",
    benefits: {
      meals: "Desayuno",
      transfers: "Privado VIP",
      extras: ["Desert safari", "Dubai tour"],
    },
    priceFrom: "$1,099",
  },
  {
    id: "santorini",
    country: "Santorini",
    flag: "🇬🇷",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
    resorts: "80+",
    benefits: {
      meals: "Desayuno",
      transfers: "Incluido",
      extras: ["Sunset tour", "Wine tasting"],
    },
    priceFrom: "$1,299",
  },
  {
    id: "bali",
    country: "Bali",
    flag: "🇮🇩",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    resorts: "200+",
    benefits: {
      meals: "Desayuno",
      transfers: "Privado",
      extras: ["Temple tour", "Spa treatment"],
    },
    priceFrom: "$649",
  },
  {
    id: "seychelles",
    country: "Seychelles",
    flag: "🇸🇨",
    image: "https://images.unsplash.com/photo-1589979481223-deb89304a225?w=800&q=80",
    resorts: "50+",
    benefits: {
      meals: "Half board",
      transfers: "Privado",
      extras: ["Island hopping", "Snorkeling"],
    },
    priceFrom: "$1,599",
  },
  {
    id: "mauritius",
    country: "Mauricio",
    flag: "🇲🇺",
    image: "https://images.unsplash.com/photo-1596436076282-9a4c2479c0c6?w=800&q=80",
    resorts: "80+",
    benefits: {
      meals: "Todo incluido",
      transfers: "Incluido",
      extras: ["Catamaran tour", "Golf"],
    },
    priceFrom: "$1,299",
  },
  {
    id: "fiji",
    country: "Fiyi",
    flag: "🇫🇯",
    image: "https://images.unsplash.com/photo-1598094679095-0940b27b2687?w=800&q=80",
    resorts: "60+",
    benefits: {
      meals: "Todo incluido",
      transfers: "Speedboat",
      extras: ["Village visit", "Kayaking"],
    },
    priceFrom: "$1,499",
  },
  {
    id: "australia",
    country: "Australia",
    flag: "🇦🇺",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80",
    resorts: "180+",
    benefits: {
      meals: "Desayuno",
      transfers: "Rental car",
      extras: ["Great Barrier Reef", "City tours"],
    },
    priceFrom: "$1,199",
  },
  {
    id: "new-zealand",
    country: "Nueva Zelanda",
    flag: "🇳🇿",
    image: "https://images.unsplash.com/photo-1507699622177-38889107e31c?w=800&q=80",
    resorts: "100+",
    benefits: {
      meals: "Desayuno",
      transfers: "Campervan included",
      extras: ["Hobbiton tour", "Milford Sound"],
    },
    priceFrom: "$1,399",
  },
  {
    id: "singapore",
    country: "Singapur",
    flag: "🇸🇬",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
    resorts: "60+",
    benefits: {
      meals: "Desayuno",
      transfers: "Privado",
      extras: ["City tour", "Sentosa island"],
    },
    priceFrom: "$899",
  },
  {
    id: "japan",
    country: "Japón",
    flag: "🇯🇵",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    resorts: "150+",
    benefits: {
      meals: "Desayuno",
      transfers: "Japan Rail Pass",
      extras: ["Tokyo tour", "Kyoto temples"],
    },
    priceFrom: "$1,299",
  },
];

export const getDestinationById = (id: string): Destination | undefined => {
  return destinations.find((d) => d.id === id);
};
