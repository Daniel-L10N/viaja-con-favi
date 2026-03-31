import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWhatsAppMessage(message: string): string {
  return encodeURIComponent(message);
}

export function buildWhatsAppLink(
  phoneNumber: string,
  message: string
): string {
  const formattedNumber = phoneNumber.replace(/\D/g, "");
  const encodedMessage = formatWhatsAppMessage(message);
  return `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
}
