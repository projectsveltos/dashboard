import { ALargeSmall, Blocks, Tags } from "lucide-react";
import { SearchField } from "@/modules/clusters/clusters-list/components/searchFieldTags";

export const clusterSearchfields: SearchField[] = [
  {
    icon: ALargeSmall,
    label: "Name",
    placeholder: "Filter clusters by name...",
    termKey: "name",
  },
  {
    icon: Blocks,
    label: "Namespace",
    placeholder: "Filter clusters by namespace...",
    termKey: "namespace",
  },
  {
    icon: Tags,
    label: "Labels",
    placeholder: "Filter clusters by labels...",
    termKey: "labels",
    isTag: true,
  },
];
