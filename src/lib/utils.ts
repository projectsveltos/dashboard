import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const colorFromStatus = (status: string | undefined) => {
  switch (status) {
    case "Provisioned":
      return "bg-green-500";
    case "Provisioning":
      return "bg-blue-500";
    case "Failed":
    case "FailedNonRetriable":
      return "bg-red-500";
    case "Removing":
      return "bg-yellow-500";
    case "Removed":
      return "bg-gray-500";
    default:
      return "bg-gray-500";
  }
};
