import { TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ExternalLink, MoreHorizontal } from "lucide-react";
import { HelmReleaseType } from "@/types/helm.types";
import { EmptyData } from "@/components/ui/emptyData";

export const AddonsTable = ({
  data,
  type,
}: {
  data: HelmReleaseType[];
  type: string;
}) => {
  const navigateRepoURL = (url: string) => {
    window.open(url, "_blank");
  };
  return (
    <>
      <>
        {data && data.length > 0 ? (
          <>
            {data.map((row: any, index: any) => (
              <TableRow key={index}>
                <TableCell className={"flex item-center"}>
                  <img width={50} height={50} src={row.icon} />{" "}
                </TableCell>

                <TableCell> {row.releaseName}</TableCell>
                <TableCell className={"text-main-500"}>
                  {row.namespace}
                </TableCell>
                <TableCell className="hidden md:table-cell ">
                  {row.chartVersion}
                </TableCell>
                {/*<TableCell className="hidden md:table-cell" ><a className={"flex items-center text-blue-700"} href={"#"}>{row.repoURL}</a> </TableCell>*/}

                <TableCell className="hidden md:table-cell">
                  <div>
                    {new Date(row.lastAppliedTime)?.toLocaleDateString("en-US")}{" "}
                  </div>
                  {new Date(row.lastAppliedTime)?.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {row.profileName}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onSelect={() => navigateRepoURL(row.repoURL)}
                      >
                        <ExternalLink className={"w-4 h-4 mx-1"} /> repoURL
                      </DropdownMenuItem>
                      <DropdownMenuItem disabled>Edit</DropdownMenuItem>
                      <DropdownMenuItem disabled>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </>
        ) : (
          <TableCell colSpan={12}>
            <EmptyData name={type == "all" ? "Addons" : type + "s"} />
          </TableCell>
        )}
      </>
    </>
  );
};
