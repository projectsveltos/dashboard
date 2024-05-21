import {
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {  ExternalLink, MoreHorizontal, Unplug } from "lucide-react";
import { HelmReleaseType } from "@/types/helm.types";
import { EmptyData } from "@/components/ui/emptyData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {  useState } from "react";
import { appConfig } from "@/config/app";
import { usePagination } from "@/hooks/usePagination";
import { AddonTypes } from "@/types/addon.types";

export const AddonsTable = ({
  data,
  type,
  total,
  setPage,
  loading
}: {
  data: HelmReleaseType[];
  type: AddonTypes;
  total: number;
  setPage:(page: number, type: AddonTypes)=>void
  loading:boolean
}) => {
  const navigateRepoURL = (url: string) => {
    window.open(url, "_blank");
  };
  const [page, setUIPage] = useState<number>(appConfig.defaultPage);

  const handlePageChange= (page: number) => {
    setPage(page,type)
    setUIPage(page)
  }

  const [PaginationUI] = usePagination(total, page, handlePageChange,appConfig.defaultTableSize);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Namespace</TableHead>
            <TableHead className={"hidden sm:table-cell"}>Version</TableHead>
            <TableHead className={"hidden sm:table-cell"}>
              Last Applied
            </TableHead>
            <TableHead className={"hidden sm:table-cell"}>Profile</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        {loading?
          <span>loading</span>
        : <TableBody>
            {data && data.length > 0 ? (
              <>
                {data.map((row: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className={"flex item-center w-120 h-120"}>
                      <Avatar>
                        <AvatarImage src={row.icon} />
                        <AvatarFallback>
                          <Unplug className={"w-4 h-4"} />
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>

                    <TableCell>
                      {" "}
                      {row.releaseName ? row.releaseName : row.name}
                    </TableCell>
                    <TableCell className={"text-main-500"}>
                      {row.namespace}
                    </TableCell>
                    <TableCell className="hidden md:table-cell ">
                      {row.chartVersion ? row.chartVersion : row.version}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div>
                        {new Date(row.lastAppliedTime)?.toLocaleDateString(
                          "en-US",
                        )}
                      </div>
                      {new Date(row.lastAppliedTime)?.toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {/*TODO handle multiple names (with tags)*/}
                      {row.profileName
                        ? row.profileName
                        : row.profileNames.map((name: string) => (
                          <span key={name}>{name}</span>
                        ))}
                    </TableCell>
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
                          {row.repoURL && (
                            <DropdownMenuItem
                              onSelect={() => navigateRepoURL(row.repoURL)}
                            >
                              <ExternalLink className={"w-4 h-4 mx-1"} /> repoURL
                            </DropdownMenuItem>
                          )}

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
                <EmptyData name={type} />
              </TableCell>
            )}
          </TableBody>}

      </Table>
      <div className="px-1 mt-1">
        <PaginationUI />
      </div>

    </>
  );
};
