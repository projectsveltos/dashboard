import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { URLSearchParams } from "url";
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

export const isNotProvisioned = (status: string | undefined) => {
  return status !== "Provisioned";
};

export const extractFiltersFromSearchParams = (
  searchParams: URLSearchParams,
  searchConfig: { key: string; placeholder: string }[],
): Record<string, string> => {
  return searchConfig.reduce(
    (acc, { key }) => {
      const value = searchParams.get(key);
      if (value) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, string>,
  );
};
