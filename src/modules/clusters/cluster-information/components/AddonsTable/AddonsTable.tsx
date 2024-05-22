import {
  Table,
  TableBody,
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
import {
  Check,
  ExternalLink,
  MoreHorizontal,
  ServerCrash,
  Unplug,
} from "lucide-react";
import { EmptyData } from "@/components/ui/emptyData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { appConfig } from "@/config/app";
import { usePagination } from "@/hooks/usePagination";
import { AddonTypes } from "@/types/addon.types";
import { LoadingTableRow } from "@/components/ui/loadingTableRow";

export const AddonsTable = ({
  data,
  type,

  setPage,
  loading,
}: {
  data: any;
  type: AddonTypes;

  setPage: (page: number, type: AddonTypes) => void;
  loading: boolean;
}) => {
  const navigateRepoURL = (url: string) => {
    window.open(url, "_blank");
  };
  const [total, setTotal] = useState<number>(0);
  const [page, setUIPage] = useState<number>(appConfig.defaultPage);
  const [rows, setRows] = useState<any>([]);
  const isProfile = type == AddonTypes.PROFILE;
  useEffect(() => {
    switch (type) {
      case AddonTypes.HELM:
        setRows(data.helmReleases);
        setTotal(data.totalHelmReleases);
        break;
      case AddonTypes.RESOURCE:
        setRows(data.resources);
        setTotal(data.totalResources);
        break;
      case AddonTypes.PROFILE:
        setRows(
          Object.keys(data.profiles).map((key) => ({
            name: key,
            failure: data.profiles[key],
            isFailed: data.profiles[key].length > 0,
            icon:
              data.profiles[key].length <= 0 ? (
                <Check className={"w-4 h-4 "} />
              ) : (
                <ServerCrash className={"w-4 h-4"} />
              ),
          })),
        );
        setTotal(data.profiles.length);
        break;
      default:
        throw new Error("Invalid AddonType provided.");
    }
  }, [data]);
  const handlePageChange = (page: number) => {
    setPage(page, type);
    setUIPage(page);
  };

  const [PaginationUI] = usePagination(
    total,
    page,
    handlePageChange,
    appConfig.defaultTableSize,
  );
  const columns = [
    { label: "", className: "" },
    { label: "Name", className: "" },
    { label: isProfile ? "Failed Resources" : "Namespace", className: "" },
    {
      label: "Version",
      className: isProfile ? "hidden" : "hidden sm:table-cell",
    },
    {
      label: "Last Applied",
      className: isProfile ? "hidden" : "hidden sm:table-cell",
    },
    {
      label: "Profile",
      className: isProfile ? "hidden" : "hidden sm:table-cell",
    },
    { label: "Actions", className: "", isSrOnly: true },
  ];

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index} className={column.className}>
                {column.isSrOnly ? (
                  <span className="sr-only">{column.label}</span>
                ) : (
                  column.label
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {loading ? (
          <LoadingTableRow columns={appConfig.defaultTableSize} />
        ) : (
          <TableBody>
            {rows && rows.length > 0 ? (
              <>
                {rows.map((row: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className={"flex item-center w-120 h-120"}>
                      {isProfile ? (
                        <Avatar>
                          <AvatarFallback
                            className={`${row.isFailed ? "bg-red-500" : "bg-green-600"} text-white`}
                          >
                            {row.icon}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <Avatar>
                          <AvatarImage src={row.icon} />
                          <AvatarFallback>
                            <Unplug className={"w-4 h-4"} />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </TableCell>

                    <TableCell>
                      {row.releaseName ? row.releaseName : row.name}
                    </TableCell>

                    <TableCell colSpan={isProfile ? 7 : 1} className="py-4 ">
                      <span className={"text-main-500"}> {row.namespace}</span>

                      {row.failure && row.failure.length > 0 && (
                        <Table>
                          <TableHeader>
                            <TableHead>Feature</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Message</TableHead>
                          </TableHeader>
                          <TableBody className={"text-sm "}>
                            {row.failure.map(
                              (failure: any, failureIndex: number) => (
                                <TableRow key={failureIndex}>
                                  <TableCell>{failure.featureID}</TableCell>
                                  <TableCell>{failure.status}</TableCell>
                                  <TableCell>
                                    {failure.failureMessage}
                                  </TableCell>
                                </TableRow>
                              ),
                            )}
                          </TableBody>
                        </Table>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell ">
                      {row.chartVersion ? row.chartVersion : row.version}
                    </TableCell>
                    {row.lastAppliedTime && (
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
                    )}

                    <TableCell className="hidden md:table-cell">
                      {/*TODO handle multiple names (with tags)*/}
                      {row.profileName
                        ? row.profileName
                        : row?.profileNames?.map((name: string) => (
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
                              <ExternalLink className={"w-4 h-4 mx-1"} />{" "}
                              repoURL
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
          </TableBody>
        )}
      </Table>
      <div className="px-1 mt-1">
        <PaginationUI />
      </div>
    </>
  );
};
