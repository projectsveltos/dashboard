import { ALargeSmall, Blocks, Tags } from "lucide-react";
import { SearchField } from "@/modules/clusters/clusters-list/components/searchFieldTags";

export const clusterSearchfields: SearchField[] = [
  {
    icon: Blocks,
    label: "common.namespace",
    placeholder: "common.filter_namespace",
    termKey: "namespace",
  },
  {
    icon: ALargeSmall,
    label: "common.name",
    placeholder: "common.filter_name",
    termKey: "name",
  },
  {
    icon: Tags,
    label: "common.labels",
    placeholder: "common.filter_labels",
    termKey: "labels",
    isTag: true,
  },
];
