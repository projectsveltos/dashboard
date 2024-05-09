import { TableCell, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Link, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { HelmReleaseType } from "@/types/helm.types";

export const AddonsTable = ({data}:{data:HelmReleaseType}) => {

  return (
    <>

      <>
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCell className={"flex item-center"} ><img width={25} height={30} className={"mx-1"} src={row.icon}/> {row.releaseName}</TableCell>


            <TableCell className={"text-main-500"}>{row.namespace}</TableCell>
                <TableCell className="hidden md:table-cell ">{row.chartVersion}</TableCell>
            <TableCell className="hidden md:table-cell" ><a className={"flex items-center text-blue-700"} href={"#"}>{row.repoURL}</a> </TableCell>

            <TableCell className="hidden md:table-cell">{new Date(row.lastAppliedTime)?.toLocaleDateString("en-US")}</TableCell>
            <TableCell className="hidden md:table-cell">{row.profileName}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    aria-haspopup="true"
                    size="icon"
                    variant="ghost"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </>
    </>
  );
};