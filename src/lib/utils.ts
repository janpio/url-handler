import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const baseUrl: string =process.env.NODE_ENV ==="production"? "https://url.nexisltd.com":"http://localhost:3000"
