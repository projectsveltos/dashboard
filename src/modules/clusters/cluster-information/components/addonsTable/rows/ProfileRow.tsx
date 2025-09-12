import { useId } from "react";
import { TableRow, TableCell } from "@/lib/components/ui/data-display/table";
import {
  Avatar,
  AvatarFallback,
} from "@/lib/components/ui/data-display/avatar";
import { Check, ServerCrash } from "lucide-react";
import { Badge } from "@/lib/components/ui/data-display/badge";
import { FailureMessage } from "@/lib/components/ui/feedback/failureMessage";
import { AddonData } from "@/types/addon.types";
import { AddonColumn } from "@/types/addonTable.types";

interface ProfileRowProps {
  row: AddonData;
  columns: AddonColumn[];
}

export const ProfileRow = ({ row, columns }: ProfileRowProps) => {
  const id = useId();

  return (
    <TableRow
      className={row.failureMessage ? "bg-slate-200 dark:bg-slate-700" : ""}
    >
      {columns.map((column, colIndex) => (
        <TableCell key={colIndex} className={column.className}>
          {column.keys === "profile" ? (
            <div>{row.profileName}</div>
          ) : column.keys === "status" ? (
            <Badge>{row.status}</Badge>
          ) : column.keys === "failureMessage" ? (
            row.failureMessage && <FailureMessage msg={row.failureMessage} />
          ) : column.keys === "icon" ? (
            <Avatar>
              <AvatarFallback
                className={row.failureMessage ? "bg-red-500" : "bg-green-600"}
              >
                {row.failureMessage ? <ServerCrash /> : <Check />}
              </AvatarFallback>
            </Avatar>
          ) : (
            column.keys
              .split("/")
              .map((key: string) => (
                <div key={key}>{row[key as keyof AddonData]}</div>
              ))
              .filter(Boolean)
          )}
        </TableCell>
      ))}
    </TableRow>
  );
};
