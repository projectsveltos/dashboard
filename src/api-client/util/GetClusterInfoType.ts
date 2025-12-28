import { ClusterType } from "@/types/cluster.types";
import {
  clusterAPIValue,
  clusterInfoCapiType,
  clusterInfoSveltosType,
  clusterInfoTypes,
  sveltosClusterValue,
} from "@/types/cluster.consts";

export const getClusterInfoType = (type?: ClusterType): clusterInfoTypes => {
  if (type == sveltosClusterValue) {
    return clusterInfoSveltosType;
  } else if (type == clusterAPIValue) {
    return clusterInfoCapiType;
  }
  throw new Error("Invalid cluster type");
};

export const getClusterType = (infoType: clusterInfoTypes): ClusterType => {
  if (infoType === clusterInfoSveltosType) {
    return sveltosClusterValue;
  } else if (infoType === clusterInfoCapiType) {
    return clusterAPIValue;
  }
  throw new Error("Invalid cluster info type");
};
