import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { appConfig } from "@/config/app";
import { ClusterType } from "@/types/cluster.types";
import { HealthResourcesTable } from "@/modules/health/HealthResourcesTable";
import { clusterHealthColumns } from "@/modules/health/healthColumns";
import { healthSearchConfig } from "@/modules/health/healthSearchConfig";
import { useClusterHealth } from "@/modules/clusters/cluster-information/hooks/useClusterHealth";
import { pickSearchParams } from "@/utils/pickSearchParams";

// ClusterHealthView lists the resources of the cluster of the page which are not healthy. The filters live in
// the URL, like the other addons tabs: opened from the health badge of a profile, the profile filter is already
// set, and clearing it lists the unhealthy resources of every profile.
export function ClusterHealthView() {
  const { tab: clusterType, name, namespace } = useParams();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(appConfig.defaultPage);

  const filters = pickSearchParams(healthSearchConfig, searchParams);
  const filtersKey = JSON.stringify(filters);

  // Another page of the previous filters would make no sense
  useEffect(() => {
    setPage(appConfig.defaultPage);
  }, [filtersKey]);

  const query = useClusterHealth(
    namespace ?? "",
    name ?? "",
    clusterType as ClusterType,
    page,
    filters,
  );

  return (
    <HealthResourcesTable
      rows={query.data?.resources ?? []}
      total={query.data?.totalResources ?? 0}
      state={query.data?.state}
      hasFilters={Object.keys(filters).length > 0}
      loading={query.isLoading}
      page={page}
      onPageChange={setPage}
      columns={clusterHealthColumns}
    />
  );
}
