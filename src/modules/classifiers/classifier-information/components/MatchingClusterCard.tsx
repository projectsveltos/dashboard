import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Button } from "@/lib/components/ui/inputs/button";
import { Badge } from "@/lib/components/ui/data-display/badge";
import { ReadyFlag } from "@/lib/components/ui/data-display/ready-flag";
import { useTranslation } from "react-i18next";
import { MatchingClusterEntry } from "@/types/classifier.types";
import { typeFromPath } from "@/utils/GetPathFromType";
import { McpButton } from "@/lib/components/ui/inputs/mcp-button";
import { useClassifierClusterDebugMcp } from "@/modules/classifiers/hooks/debugMcp";

export const MatchingClusterCard = ({
  cluster,
  classifierName,
}: {
  cluster: MatchingClusterEntry;
  classifierName: string;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const McpQuery = useClassifierClusterDebugMcp({
    namespace: cluster.clusterNamespace,
    name: cluster.clusterName,
    type: cluster.clusterType,
    classifier_name: classifierName,
  });

  function handleNavigation() {
    navigate(
      `/sveltos/cluster/${typeFromPath(cluster.clusterType)}/${cluster.clusterNamespace}/${cluster.clusterName}`,
    );
  }

  return (
    <div className="border rounded-lg p-4 bg-card flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold flex items-center gap-2 min-w-0">
          <ReadyFlag />
          <span className="truncate">{cluster.clusterName}</span>
          <Badge variant={"outline"}>{cluster.clusterNamespace}</Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 shrink-0"
          onClick={handleNavigation}
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-grow text-sm space-y-3">
        <div>
          <div className="text-xs text-muted-foreground mb-1">
            {t("common.managed_labels")}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(!cluster.managedLabels || cluster.managedLabels.length === 0) && (
              <span className="text-muted-foreground italic text-xs">
                {t("common.no_labels_configured")}
              </span>
            )}
            {cluster.managedLabels?.map((label, idx) => (
              <Badge key={idx} variant="secondary">
                {label.key}: {label.value}
              </Badge>
            ))}
          </div>
        </div>

        {cluster.conflictedLabels && cluster.conflictedLabels.length > 0 && (
          <div>
            <div className="text-xs text-muted-foreground mb-1">
              {t("common.conflicted_labels")}
            </div>
            <div className="space-y-1">
              {cluster.conflictedLabels.map((label, idx) => (
                <div
                  key={idx}
                  className="bg-red-500/10 text-red-600 dark:text-red-400 p-1.5 rounded text-xs"
                  title={label.failureMessage}
                >
                  {label.key}
                  {label.failureMessage ? `: ${label.failureMessage}` : ""}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4">
        <McpButton
          variant="default"
          onClick={() => McpQuery?.refetch()}
          isLoading={McpQuery?.isRefetching}
          mcpResponse={
            McpQuery?.data && McpQuery.data.length > 0
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

export default MatchingClusterCard;
