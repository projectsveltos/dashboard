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
    to: "/clusters",
  },
  {
    title: "Profiles",
    to: "cluster-profiles",
    disabled: true,
  },
  {
    title: "Labels",
    to: "labels",
    disabled: true,
  },
];

export const sideMenu: NavItemWithChildren[] = [];
