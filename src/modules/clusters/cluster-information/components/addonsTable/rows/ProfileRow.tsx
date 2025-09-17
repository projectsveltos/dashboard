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
import { Button } from "@/lib/components/ui/inputs/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/lib/components/ui/inputs/dropdown-menu";
import { ExternalLink, MoreHorizontal } from "lucide-react";
import { McpButton } from "@/lib/components/ui/inputs/mcp-button";
import { useParams } from "react-router-dom";
import { useMcp } from "@/hooks/useMcp";
import { getClusterInfoType } from "@/api-client/util/GetClusterInfoType";
import { ClusterType } from "@/types/cluster.types";

interface ProfileRowProps {
  row: AddonData;
  columns: AddonColumn[];
  onOpenRepo?: (url: string | undefined) => void;
}

export const ProfileRow = ({ row, columns, onOpenRepo }: ProfileRowProps) => {
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
      className={row.failureMessage ? "bg-red-50 dark:bg-slate-700" : ""}
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
                      debugProfileClusterQuery?.data
                        ? debugProfileClusterQuery.data
                        : "No debug data available."
                    }
                    variant={"highlight"}
                  >
                    Debug
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
        if (key === AddonTableTypes.ACTION) {
          return (
            <TableCell key={colIndex} className={column.className}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  {row.repoURL && (
                    <DropdownMenuItem
                      onSelect={() => onOpenRepo && onOpenRepo(row.repoURL)}
                    >
                      <ExternalLink className={"w-4 h-4 mx-1"} /> repoURL
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem disabled>Edit</DropdownMenuItem>
                  <DropdownMenuItem disabled>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          );
        }
        return (
          <TableCell key={colIndex} className={column.className}>
            {key
              .split("/")
              .map((k: string) => (
                <div key={k}>{row[k as keyof AddonData]}</div>
              ))
              .filter(Boolean)}
          </TableCell>
        );
      })}
    </TableRow>
  );
};
