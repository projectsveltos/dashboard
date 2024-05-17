import {
  ClusterApiType,
  ClusterType,
  SveltosClusterType,
} from "@/types/cluster.types";
import { sveltosClusterValue } from "@/types/cluster.consts";

interface AppConfig {
  name: string;
  github: {
    title: string;
    url: string;
  };
  defaultType: ClusterType;
  defaultPage: number;
  defaultSize: number;
  maxBadges: number;
  defaultTableSize: number;
}

export const appConfig: AppConfig = {
  name: "Sveltos",
  github: {
    title: "dashboard",
    url: "https://github.com/projectsveltos/dashboard",
  },
  defaultType: sveltosClusterValue,
  defaultPage: 1,
  defaultSize: 8,
  defaultTableSize: 6,
  maxBadges: 2,
};
