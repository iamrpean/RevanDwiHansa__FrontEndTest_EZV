import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility untuk merge Tailwind classes
 * Menghindari konflik class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
