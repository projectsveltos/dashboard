import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/data-display/table";
import { Badge } from "@/lib/components/ui/data-display/badge";
import { Archive, ChevronDown, ChevronRight, CircleEqual } from "lucide-react";
import React, { Fragment, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/data-display/card";
import { ScrollArea } from "@/lib/components/ui/layout/scroll-area";
import { MatchingCluster, RolloutSummary } from "@/types/profile.types";
import { FailureMessage } from "@/lib/components/ui/feedback/failureMessage";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/lib/components/ui/inputs/toggle-group";
import { RolloutStateBadge } from "@/modules/profiles/profile-information/components/ClusterTable/RolloutStateBadge";
import { RolloutSummaryStrip } from "@/modules/profiles/profile-information/components/ClusterTable/RolloutSummaryStrip";
import {
  countByRolloutState,
  filterByRolloutState,
  hasRolloutInfo,
  RolloutFilter,
  rolloutStates,
  rolloutStateStyle,
} from "@/utils/rolloutState";
import { useTranslation } from "react-i18next";

type ClusterStatus = "failed" | "provisioning" | "provisioned";

// The status of a cluster is derived from the status of its features
function getClusterStatus(
  features: MatchingCluster["clusterFeatureSummaries"],
): ClusterStatus {
  if (features.some((feature) => feature.failureMessage)) {
    return "failed";
  }

  // No feature yet (for instance, waiting for a dependency) or a feature not deployed yet
  if (
    features.length === 0 ||
    features.some((feature) => feature.status !== "Provisioned")
  ) {
    return "provisioning";
  }

  return "provisioned";
}

function ClusterStatusBadge({ status }: { status: ClusterStatus }) {
  const { t } = useTranslation();

  switch (status) {
    case "failed":
      return <Badge variant={"destructive"}>{t("common.failed")}</Badge>;
    case "provisioning":
      return <Badge variant={"warning"}>{t("common.provisioning")}</Badge>;
    default:
      return <Badge variant={"success"}>{t("common.provisioned")}</Badge>;
  }
}

function getClusterKey(cluster: MatchingCluster): string {
  return `${cluster.cluster.kind}/${cluster.cluster.namespace}/${cluster.cluster.name}`;
}

export default function MatchingClusterTable({
  data,
  rollout,
  maxUpdate,
}: {
  data: MatchingCluster[];
  rollout?: RolloutSummary;
  maxUpdate?: string | number;
}) {
  const { t } = useTranslation();
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const [rolloutFilter, setRolloutFilter] = useState<RolloutFilter>("all");

  const showRollout = hasRolloutInfo(data);
  const rolloutCounts = countByRolloutState(data);
  // The filtered state may have no cluster left, for instance once the rollout is done
  const activeFilter =
    rolloutFilter !== "all" && rolloutCounts[rolloutFilter] === 0
      ? "all"
      : rolloutFilter;
  const visibleClusters = filterByRolloutState(data, activeFilter);

  const toggleAccordion = (accordionId: string) => {
    setOpenAccordions((prev) =>
      prev.includes(accordionId)
        ? prev.filter((id) => id !== accordionId)
        : [...prev, accordionId],
    );
  };

  return (
    <Card className="overflow-hidden my-2">
      <CardHeader>
        <CardTitle className={"flex items-center"}>
          <CircleEqual className={"w-4 h-4 mx-0.5"} />{" "}
          {t("common.matching_clusters")}
        </CardTitle>
        <CardDescription>{t("common.list_matching_clusters")}</CardDescription>
      </CardHeader>
      <CardContent>
        {rollout && (
          <RolloutSummaryStrip rollout={rollout} maxUpdate={maxUpdate} />
        )}
        {showRollout && (
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs text-muted-foreground">
              {t("common.filter_rollout_state")}
            </span>
            <ToggleGroup
              type="single"
              variant="outline"
              size="sm"
              value={activeFilter}
              onValueChange={(value) => {
                // Clicking the selected item unselects it: go back to all
                setRolloutFilter(
                  value === "" ? "all" : (value as RolloutFilter),
                );
              }}
            >
              <ToggleGroupItem value="all">{t("common.all")}</ToggleGroupItem>
              {rolloutStates
                .filter((state) => rolloutCounts[state] > 0)
                .map((state) => (
                  <ToggleGroupItem key={state} value={state}>
                    {t(rolloutStateStyle[state].labelKey)} (
                    {rolloutCounts[state]})
                  </ToggleGroupItem>
                ))}
            </ToggleGroup>
          </div>
        )}
        <ScrollArea
          className={data.length === 0 ? "" : " h-96" + "rounded-md border p-4"}
        >
          {data.length === 0 ? (
            <span
              className={
                "flex flex-col items-center justify-center h-full mt-4"
              }
            >
              <Archive className="h-12 w-12 text-muted-foreground" />
              <div className="flex justify-center items-center h-full">
                <p className="text-muted-foreground mt-2">
                  {t("common.no_matching_clusters")}
                </p>
              </div>
            </span>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>{t("common.cluster_name")}</TableHead>
                  <TableHead>{t("common.namespace")}</TableHead>
                  <TableHead>{t("common.status")}</TableHead>
                  {showRollout && <TableHead>{t("common.rollout")}</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleClusters.map((cluster) => {
                  const clusterKey = getClusterKey(cluster);
                  return (
                    <Fragment key={clusterKey}>
                      <TableRow
                        onClick={() => toggleAccordion(clusterKey)}
                        className="cursor-pointer hover:bg-muted/50"
                      >
                        <TableCell>
                          {openAccordions.includes(clusterKey) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </TableCell>
                        <TableCell>{cluster.cluster.name}</TableCell>
                        <TableCell>
                          <Badge variant={"outline"}>
                            {cluster.cluster.namespace}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <ClusterStatusBadge
                            status={getClusterStatus(
                              cluster.clusterFeatureSummaries,
                            )}
                          />
                        </TableCell>
                        {showRollout && (
                          <TableCell>
                            {cluster.rolloutState && (
                              <RolloutStateBadge state={cluster.rolloutState} />
                            )}
                          </TableCell>
                        )}
                      </TableRow>
                      <TableRow
                        className={cn(
                          "bg-muted/50 transition-all",
                          openAccordions.includes(clusterKey)
                            ? "table-row"
                            : "hidden",
                        )}
                      >
                        <TableCell
                          colSpan={showRollout ? 5 : 4}
                          className="p-0"
                        >
                          <div
                            className={cn(
                              "grid transition-all",
                              openAccordions.includes(clusterKey)
                                ? "grid-rows-[1fr]"
                                : "grid-rows-[0fr]",
                            )}
                          >
                            <div className="overflow-hidden">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>
                                      {t("common.feature_id")}
                                    </TableHead>
                                    <TableHead>{t("common.status")}</TableHead>
                                    <TableHead>
                                      {t("common.failure_message")}
                                    </TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {cluster.clusterFeatureSummaries.map(
                                    (feature, featureIndex) => (
                                      <TableRow
                                        className={
                                          feature.failureMessage != null
                                            ? "bg-red-200 dark:bg-red-500"
                                            : ""
                                        }
                                        key={featureIndex}
                                      >
                                        <TableCell>
                                          {feature.featureID}
                                        </TableCell>
                                        <TableCell
                                          className={
                                            "break-words whitespace-normal"
                                          }
                                        >
                                          {feature.status}
                                        </TableCell>
                                        <TableCell
                                          className={
                                            "break-words whitespace-normal"
                                          }
                                        >
                                          <FailureMessage
                                            msg={feature.failureMessage}
                                          />
                                        </TableCell>
                                      </TableRow>
                                    ),
                                  )}
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    </Fragment>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
