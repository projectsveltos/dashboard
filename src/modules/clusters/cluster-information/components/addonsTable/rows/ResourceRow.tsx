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
import { colorFromStatus } from "@/lib/utils";
import { Button } from "@/lib/components/ui/inputs/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/lib/components/ui/inputs/dropdown-menu";
import { ExternalLink, MoreHorizontal } from "lucide-react";

interface ResourceRowProps {
  row: AddonData;
  columns: AddonColumn[];
  onOpenRepo?: (url: string | undefined) => void;
}

export const ResourceRow = ({ row, columns, onOpenRepo }: ResourceRowProps) => {
  return (
    <TableRow
      className={row.failureMessage ? "bg-slate-200 dark:bg-slate-700" : ""}
    >
      {columns.map((column, colIndex) => {
        const key = column.keys;
        if (key === AddonTableTypes.ICON) {
          return (
            <TableCell key={colIndex} className={column.className}>
              <Avatar>
                <AvatarFallback
                  className={row.failureMessage ? "bg-red-500" : "bg-green-600"}
                >
                  {row.failureMessage ? (
                    <ServerCrash className={"w-4 h-4"} />
                  ) : (
                    <Check className={"w-4 h-4"} />
                  )}
                </AvatarFallback>
              </Avatar>
            </TableCell>
          );
        }
        if (key === AddonTableTypes.TIME) {
          return (
            <TableCell key={colIndex} className={column.className}>
              <div>
                {row.lastAppliedTime &&
                  new Date(row.lastAppliedTime)?.toLocaleDateString("en-US")}
              </div>
              {row.lastAppliedTime &&
                new Date(row.lastAppliedTime)?.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
            </TableCell>
          );
        }
        if (key === AddonTableTypes.FAILURE_MESSAGE) {
          return (
            <TableCell
              key={colIndex}
              className="break-words whitespace-normal text-sm overflow-hidden"
            >
              {row.failureMessage && (
                <FailureMessage msg={row.failureMessage} />
              )}
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
        if (key === AddonTableTypes.PROFILE) {
          return (
            <TableCell key={colIndex} className={column.className}>
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
              .map((k) => (
                <div key={k as string}>
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

export default ResourceRow;
