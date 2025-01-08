import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function capitalize<T extends string>(value: T | `${T}`) {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}
