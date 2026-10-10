import { TableRow, TableCell } from "@/lib/components/ui/data-display/table";
import {
  Avatar,
  AvatarFallback,
} from "@/lib/components/ui/data-display/avatar";
import { Check, ServerCrash } from "lucide-react";
import { Badge } from "@/lib/components/ui/data-display/badge";
import { FailureMessage } from "@/lib/components/ui/feedback/failureMessage";
import { AddonData } from "@/types/addon.types";
import { AddonColumn, AddonTableTypes } from "@/types/addonTable.types";
import { colorFromStatus, isNotProvisioned } from "@/lib/utils";
import { McpButton } from "@/lib/components/ui/inputs/mcp-button";
import { useParams } from "react-router-dom";
import { useMcp } from "@/hooks/useMcp";
import { getClusterInfoType } from "@/utils/GetClusterInfoType";
import { ClusterType } from "@/types/cluster.types";
import { useTranslation } from "react-i18next";
import { DriftDialog } from "@/modules/clusters/cluster-information/components/addonsTable/DriftDialog";

interface ProfileRowProps {
  row: AddonData;
  columns: AddonColumn[];
}

export const ProfileRow = ({ row, columns }: ProfileRowProps) => {
  const { t } = useTranslation();
  const { tab: type, name, namespace } = useParams();
  const { debugProfileClusterQuery } = useMcp(
    namespace ?? "",
    name ?? "",
    getClusterInfoType(type as ClusterType),
    row.profileName ?? "",
    row.profileType ?? "",
  );
  function triggerMcp() {
    debugProfileClusterQuery.refetch();
  }
  return (
    <TableRow
      className={
        row.failureMessage
          ? "bg-coral/10 hover:bg-coral/20 transition-colors"
          : ""
      }
    >
      {columns.map((column, colIndex) => {
        const key = column.keys;
        if (key === AddonTableTypes.ICON) {
          return (
            <TableCell key={colIndex} className={column.className}>
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarFallback
                    className={
                      row.failureMessage ? "bg-red-500" : "bg-green-600"
                    }
                  >
                    {row.failureMessage ? <ServerCrash /> : <Check />}
                  </AvatarFallback>
                </Avatar>
                {isNotProvisioned(row?.status) ? (
                  <McpButton
                    onClick={triggerMcp}
                    isLoading={debugProfileClusterQuery?.isFetching}
                    mcpResponse={
                      debugProfileClusterQuery?.isError
                        ? t("common.mcp_unavailable")
                        : debugProfileClusterQuery?.data
                          ? debugProfileClusterQuery.data
                          : t("common.no_debug_data")
                    }
                    variant={"highlight"}
                  >
                    {t("common.debug")}
                  </McpButton>
                ) : null}
              </div>
            </TableCell>
          );
        }
        if (key === AddonTableTypes.STATUS) {
          return (
            <TableCell key={colIndex} className={column.className}>
              <Badge className={colorFromStatus(row.status)}>
                {row.status}
              </Badge>
            </TableCell>
          );
        }
        if (key === AddonTableTypes.FAILURE_MESSAGE) {
          return (
            <TableCell key={colIndex} className={column.className}>
              {row.failureMessage && (
                <FailureMessage msg={row.failureMessage} />
              )}
            </TableCell>
          );
        }
        if (key === AddonTableTypes.PROFILE) {
          return (
            <TableCell key={colIndex} className={"hidden sm:table-cell"}>
              {row.profileName
                ? row.profileName.split("/").map((name: string) => (
                    <Badge variant={"outline"} key={name}>
                      {name}
                    </Badge>
                  ))
                : row.profileNames?.map((profileName: string) =>
                    profileName.split("/").map((name: string) => (
                      <Badge variant={"outline"} key={name}>
                        {name}
                      </Badge>
                    )),
                  )}
            </TableCell>
          );
        }
        if (key === AddonTableTypes.DRIFT) {
          return (
            <TableCell key={colIndex} className={column.className}>
              {row.driftHistory && (
                <DriftDialog
                  featureID={row.featureID}
                  history={row.driftHistory}
                />
              )}
            </TableCell>
          );
        }
        return (
          <TableCell key={colIndex} className={column.className}>
            {key
              .split("/")
              .map((k: string) => (
                <div key={k}>
                  {row[k as keyof AddonData] as unknown as string}
                </div>
              ))
              .filter(Boolean)}
          </TableCell>
        );
      })}
    </TableRow>
  );
};
