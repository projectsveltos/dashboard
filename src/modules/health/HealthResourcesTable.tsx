import { useTranslation } from "react-i18next";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/data-display/table";
import { Badge } from "@/lib/components/ui/data-display/badge";
import { HealthStatusLabel } from "@/lib/components/ui/data-display/health-status-label";
import { LoadingTableRow } from "@/lib/components/ui/feedback/loadingTableRow";
import { usePagination } from "@/hooks/usePagination";
import { appConfig } from "@/config/app";
import { ClusterHealthState, HealthResource } from "@/types/health.types";
import { healthEmptyStateKey } from "@/utils/healthStatus";
import { HealthColumn, HealthColumnKey } from "@/modules/health/healthColumns";

interface HealthResourcesTableProps {
  rows: HealthResource[];
  total: number;
  // Health of the cluster (or of what the rows come from): tells what an empty table means
  state?: ClusterHealthState;
  hasFilters: boolean;
  loading: boolean;
  page: number;
  onPageChange: (page: number) => void;
  columns: HealthColumn[];
}

// HealthResourcesTable lists resources which are not healthy. It knows nothing about where the rows come from:
// the cluster page feeds it with the resources of a cluster, and any other view (for instance one listing
// the resources of all the clusters) can feed it with its own rows and columns.
export const HealthResourcesTable = ({
  rows,
  total,
  state,
  hasFilters,
  loading,
  page,
  onPageChange,
  columns,
}: HealthResourcesTableProps) => {
  const { t } = useTranslation();
  const [PaginationUI] = usePagination(
    total,
    page,
    onPageChange,
    appConfig.defaultTableSize,
  );

  return (
    <>
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow className="border-b-border bg-transparent hover:bg-transparent">
            {columns.map((column) => (
              <TableHead key={column.key} className={column.className}>
                {t(column.label)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {loading ? (
          <LoadingTableRow columns={appConfig.defaultTableSize} />
        ) : (
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <HealthResourceRow key={index} row={row} columns={columns} />
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="py-10 text-center text-sm text-muted-foreground"
                >
                  {t(healthEmptyStateKey(state, hasFilters))}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        )}
      </Table>
      <div className="px-1 mt-1">
        <PaginationUI />
      </div>
    </>
  );
};

interface HealthResourceRowProps {
  row: HealthResource;
  columns: HealthColumn[];
}

const HealthResourceRow = ({ row, columns }: HealthResourceRowProps) => (
  <TableRow>
    {columns.map((column) => (
      // max-w-none: the cell clips at 6rem otherwise, which cuts names and profiles
      <TableCell
        key={column.key}
        className={`max-w-none ${column.className ?? ""}`}
      >
        <HealthCell row={row} columnKey={column.key} />
      </TableCell>
    ))}
  </TableRow>
);

const HealthCell = ({
  row,
  columnKey,
}: {
  row: HealthResource;
  columnKey: HealthColumnKey;
}) => {
  const { t } = useTranslation();

  switch (columnKey) {
    case "cluster":
      return <>{`${row.clusterNamespace ?? ""}/${row.clusterName ?? ""}`}</>;
    case "group":
      return <>{row.group}</>;
    case "version":
      return <>{row.version}</>;
    case "kind":
      return <>{row.kind}</>;
    case "namespace":
      return <>{row.namespace}</>;
    case "name":
      return <>{row.name}</>;
    case "status":
      return <HealthStatusLabel status={row.status} />;
    case "message":
      return (
        <span className="break-words whitespace-normal text-sm">
          {row.message}
        </span>
      );
    case "profiles":
      if (row.profiles.length === 0 && row.healthCheckName) {
        // Reported by a HealthCheck no profile owns
        return (
          <Badge variant="outline">
            {t("common.health_check", { name: row.healthCheckName })}
          </Badge>
        );
      }
      return (
        <>
          {row.profiles.map((profile) => (
            <Badge
              variant="outline"
              key={`${profile.kind}/${profile.namespace ?? ""}/${profile.name}`}
            >
              {`${profile.kind}/${profile.name}`}
            </Badge>
          ))}
        </>
      );
  }
};
