import {
  Boxes,
  RouteIcon,
  Ship,
  Play,
  LayoutDashboard,
  Tags,
} from "lucide-react";
import { CardStackIcon } from "@radix-ui/react-icons";

interface NavItem {
  title: string;
  to?: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: JSX.Element | string;
  label?: string;
  enterprise?: boolean;
}

interface NavItemWithChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export const mainMenu: NavItemWithChildren[] = [
  {
    title: "Overview",
    to: "/sveltos/overview",
    icon: <LayoutDashboard className={"w-4 h-4"} />,
  },
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
  {
    title: "Classifiers",
    to: "/sveltos/classifiers",
    icon: <Tags className={"w-4 h-4"} />,
  },
  {
    title: "Dry Run",
    to: "/sveltos/dry-run",
    icon: <Play className={"w-4 h-4"} />,
  },
  {
    title: "Enterprise",
    to: "/sveltos/enterprise",
    icon: <Ship className={"w-4 h-4 text-primary"} />,
    enterprise: true,
  },
];

export const sideMenu: NavItemWithChildren[] = [];
