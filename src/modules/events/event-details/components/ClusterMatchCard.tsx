import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Button } from "@/lib/components/ui/inputs/button";
import { ClusterEventMatch } from "@/types/event.types";
import { Badge } from "@/lib/components/ui/data-display/badge";
import { FailedFlag } from "@/lib/components/ui/data-display/failed-flag";
import { ReadyFlag } from "@/lib/components/ui/data-display/ready-flag";
import { useTranslation } from "react-i18next";
import { McpButton } from "@/lib/components/ui/inputs/mcp-button";
import * as React from "react";
import { EventResourcesDialog } from "@/modules/events/event-details/components/EventResourcesDialog";
import { useEventClusterDebugMcp } from "@/modules/events/hooks/debugMcp";
import { typeFromPath } from "@/utils/GetPathFromType";
import { getClusterInfoType } from "@/utils/GetClusterInfoType";

export const ClusterMatchCard = ({
  cluster,
  eventName,
}: {
  cluster: ClusterEventMatch;
  eventName: string;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [resourcesOpen, setResourcesOpen] = React.useState(false);

  const McpQuery = useEventClusterDebugMcp({
    namespace: cluster.clusterNamespace,
    name: cluster.clusterName,
    type: getClusterInfoType(typeFromPath(cluster.clusterKind)),
    event_name: eventName,
  });

  function handleNavigation(cluster: ClusterEventMatch) {
    navigate(
      `/sveltos/cluster/${typeFromPath(cluster.clusterKind)}/${cluster.clusterNamespace}/${cluster.clusterName}`,
    );
  }

  return (
    <div className="border rounded-lg p-4 bg-card flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="font-semibold flex items-center gap-2">
            {cluster.failureMessage ? (
              <FailedFlag msg={cluster.failureMessage} />
            ) : (
              <ReadyFlag />
            )}
            {cluster.clusterName}
            <Badge variant={"outline"}>{cluster.clusterNamespace}</Badge>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => handleNavigation(cluster)}
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-grow text-sm">
        {cluster.matchingResourcesCount > 0 ? (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setResourcesOpen(true)}
            >
              {t("common.matching_resources_count", {
                count: cluster.matchingResourcesCount,
              })}
            </Button>
            <EventResourcesDialog
              open={resourcesOpen}
              onOpenChange={setResourcesOpen}
              eventName={eventName}
              clusterNamespace={cluster.clusterNamespace}
              clusterName={cluster.clusterName}
              clusterType={typeFromPath(cluster.clusterKind)}
            />
          </>
        ) : (
          <div className="text-muted-foreground italic text-xs">
            {t("common.no_resources")}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge variant="secondary" className="flex items-center gap-2">
          <div
            className={`h-2.5 w-2.5 rounded-full ${
              cluster.paused ? "bg-yellow-400" : "bg-green-400"
            }`}
          />
          {cluster.paused ? t("common.paused") : t("common.running")}
        </Badge>
      </div>
      <div className="mt-4">
        <McpButton
          variant="default"
          onClick={() => McpQuery?.refetch()}
          isLoading={McpQuery?.isRefetching}
          mcpResponse={
            McpQuery?.isError
              ? t("common.mcp_unavailable")
              : McpQuery?.data && McpQuery.data.length > 0
                ? McpQuery.data
                : t("common.relax_no_errors")
          }
        >
          {t("common.analyze_pipeline")}
        </McpButton>
      </div>
    </div>
  );
};
