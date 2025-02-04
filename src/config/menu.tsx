import { Boxes, Tags, Users } from "lucide-react";

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
    to: "/sveltos/clusters",
    icon: <Boxes className={"w-4 h-4"} />,
  },
  {
    title: "Profiles",
    to: "/sveltos/profiles",
    icon: <Users className={"w-4 h-4"} />,
  },
  {
    title: "Labels",
    to: "labels",
    disabled: true,
    icon: <Tags className={"w-4 h-4"} />,
  },
];

export const sideMenu: NavItemWithChildren[] = [];
