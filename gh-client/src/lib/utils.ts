import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import environments from "@/environments/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function capitalize(value: string | `${string}`) {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export const pictureUrl = (pictureName?: string) => {
  if (!pictureName) return undefined;
  var url = environments().baseApiPath + environments().apiResourcePrefix;
  url += `/storage/pictures/${pictureName}`;
  return url;
};

export const certificateUrl = (certificateName?: string) => {
  if (!certificateName) {
    throw new Error("Certificate name is required to generate the URL.");
  }
  var url = environments().baseApiPath + environments().apiResourcePrefix;
  url += `/storage/certificates/${certificateName}`;
  return url;
};
