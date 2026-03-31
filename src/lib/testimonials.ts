export interface Testimonial {
  id: string;
  name: string;
  photo: string;
  text: string;
  trip: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "María González",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    text: "Increíble experiencia en Cancún. El ahorro fue de más del 60% comparado con otras agencias. El resort era impresionante y el servicio impeccable. ¡Viaja con Favi ahora es mi agencia favorita!",
    trip: "Cancún, México",
    rating: 5,
  },
  {
    id: "2",
    name: "Carlos Ramírez",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    text: "Mi luna de miel en Maldivas fue soñada. El equipo de Favi coordinó cada detalle perfectamente. El traslado en hidroavión fue una experiencia única. ¡Totalmente recomendado!",
    trip: "Maldivas",
    rating: 5,
  },
  {
    id: "3",
    name: "Ana Martínez",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    text: "Viajamos a Bali en familia y fue maravilloso. Los niños amendaron el club infantil. El precio que conseguimos fue inmejorable. ¡Volveremos a viajar con Favi!",
    trip: "Bali, Indonesia",
    rating: 5,
  },
  {
    id: "4",
    name: "Roberto Sánchez",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    text: "Mi primer viaje con la comunidad fue a Punta Cana. Desde el primer momento senti que estaba en manos profesionales. El servicio 24/7 es real y funciona.",
    trip: "Punta Cana, República Dominicana",
    rating: 5,
  },
  {
    id: "5",
    name: "Laura Fernández",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    text: "Grecia fue magia pura. El asesoramiento personalizado de Favi nos ayudó a elegir el hotel perfecto con vista al mar Egeo. ¡Una experiencia que nunca olvidaré!",
    trip: "Santorini, Grecia",
    rating: 5,
  },
  {
    id: "6",
    name: "Miguel Torres",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    text: "Dubai supero todas mis expectativas. El safari en el desierto y el tour por la ciudad fueron incluidos. El equipo de soporte siempre estuvo disponible.",
    trip: "Dubai, EAU",
    rating: 5,
  },
];

export const guarantees = [
  {
    id: "1",
    title: "Asistencia 24/7",
    description: "Soporte disponible en todo momento durante tu viaje",
    icon: "clock",
  },
  {
    id: "2",
    title: "Precio Mayorista",
    description: "Acceso a tarifas exclusivas de mayorista",
    icon: "tag",
  },
  {
    id: "3",
    title: "Garantía de Satisfacción",
    description: "Si no estás satisfecho, buscamos alternativas",
    icon: "shield",
  },
  {
    id: "4",
    title: "Asesoría Personalizada",
    description: "Expertos dedicados a planificar tu viaje soñado",
    icon: "users",
  },
];
