export type HealthColumnKey =
  | "cluster"
  | "group"
  | "version"
  | "kind"
  | "namespace"
  | "name"
  | "status"
  | "message"
  | "profiles";

export interface HealthColumn {
  key: HealthColumnKey;
  // i18n key
  label: string;
  className?: string;
}

// The unhealthy resources of one cluster
export const clusterHealthColumns: HealthColumn[] = [
  { key: "group", label: "common.group", className: "hidden sm:table-cell" },
  {
    key: "version",
    label: "common.version",
    className: "hidden md:table-cell",
  },
  { key: "kind", label: "common.kind" },
  { key: "namespace", label: "common.namespace" },
  { key: "name", label: "common.name" },
  { key: "status", label: "common.status" },
  {
    key: "message",
    label: "common.health_message",
    className: "min-w-48 whitespace-normal",
  },
  { key: "profiles", label: "common.profile" },
];
