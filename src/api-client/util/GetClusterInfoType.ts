import { ClusterType } from "@/types/cluster";
import {
  clusterAPIValue,
  clusterInfoCapiType,
  clusterInfoSveltosType,
  clusterInfoTypes,
  sveltosClusterValue,
} from "@/types/cluster.consts";

export const getClusterInfoType = (type: ClusterType): clusterInfoTypes => {
  if (type == sveltosClusterValue) {
    return clusterInfoSveltosType;
  } else if (type == clusterAPIValue) {
    return clusterInfoCapiType;
  }
  throw new Error("Invalid cluster type");
};
