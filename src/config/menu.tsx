import { Boxes, RouteIcon } from "lucide-react";
import { CardStackIcon } from "@radix-ui/react-icons";

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
    icon: <CardStackIcon className={"w-4 h-4"} />,
  },
  {
    title: "Events",
    to: "/sveltos/events",

    icon: <RouteIcon className={"w-4 h-4"} />,
  },
];

export const sideMenu: NavItemWithChildren[] = [];
