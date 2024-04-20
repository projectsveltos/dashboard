import { Icons } from "@/components/icons";

interface NavItem {
  title: string;
  to?: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: JSX.Element | string;
  label?: string;
}

interface NavItemWithChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export const mainMenu: NavItemWithChildren[] = [
  {
    title: "Clusters",
    to: "/",
  },
  {
    title: "Profiles",
    to: "cluster-profiles",
  },
  {
    title: "Labels",
    to: "labels",
  },
];

export const sideMenu: NavItemWithChildren[] = [];
