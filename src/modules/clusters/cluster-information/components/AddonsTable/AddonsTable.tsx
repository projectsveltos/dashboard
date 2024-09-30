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
  ImageOff,
  MoreHorizontal,
  ServerCrash,
} from "lucide-react";
import { EmptyData } from "@/components/ui/emptyData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { appConfig } from "@/config/app";
import { usePagination } from "@/hooks/usePagination";
import { AddonTypes } from "@/types/addon.types";
import { LoadingTableRow } from "@/components/ui/loadingTableRow";
import { Badge } from "@/components/ui/badge";
import { colorFromStatus } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, useSearchParams } from "react-router-dom";

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

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [total, setTotal] = useState<number>(0);
  const [page, setUIPage] = useState<number>(appConfig.defaultPage);
  const [rows, setRows] = useState<any>([]);
  const isProfile = type == AddonTypes.PROFILE;
  const failedOnly = searchParams.get("failure") === "true";

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
        setRows(data.profiles);
        setTotal(data.totalResources);
        break;
      default:
    }
  }, [data]);
  useEffect(() => {
    setFailureCheck(failedOnly);
  }, [failedOnly]);

  const handlePageChange = (page: number) => {
    setUIPage(page);
    setPage(page, type);
  };

  const [PaginationUI] = usePagination(
    total,
    Number(page),
    handlePageChange,
    appConfig.defaultTableSize,
  );
  const columns = [
    {
      label: isProfile ? "Failed only" : "",
      className: "",
      isCheckbox: isProfile,
    },
    { label: isProfile ? "Feature" : "Name", className: "" },
    {
      label: "Profile",
      className: "hidden sm:table-cell",
    },
    { label: "Namespace", className: isProfile ? "hidden" : "" },
    {
      label: isProfile ? "Status" : "Version",
      className: "hidden sm:table-cell",
    },
    {
      label: isProfile ? "Error" : "Last Applied",
      className: "hidden sm:table-cell",
    },

    { label: "Actions", className: "", isSrOnly: true },
  ];
  const [failureCheck, setFailureCheck] = useState<boolean>(failedOnly);

  const handleCheckedChange = (checked: boolean) => {
    setFailureCheck(checked);
    searchParams.set("failure", checked.toString());
    navigate({
      search: searchParams.toString(),
    });
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index} className={column.className}>
                {column.isCheckbox && (
                  <Checkbox
                    id="filters"
                    checked={failureCheck}
                    onCheckedChange={handleCheckedChange}
                    className={"mx-2 mb-2 text-center"}
                  />
                )}
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
                  <TableRow
                    key={index}
                    className={
                      row.failureMessage ? "bg-slate-200 dark:bg-slate-700" : ""
                    }
                  >
                    <TableCell
                      content={row.failureMessage}
                      className={"flex item-center w-120 h-120"}
                    >
                      {isProfile ? (
                        <Avatar>
                          <AvatarFallback
                            className={`${row.failureMessage ? "bg-red-500" : "bg-green-600"} text-white`}
                          >
                            {row.failureMessage ? (
                              <ServerCrash className={"w-4 h-4"} />
                            ) : (
                              <Check className={"w-4 h-4"} />
                            )}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <Avatar>
                          <AvatarImage
                            className="object-contain object-center"
                            src={row.icon}
                          />
                          <AvatarFallback>
                            <ImageOff className={"w-4 h-4"} />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </TableCell>

                    <TableCell
                      content={row.releaseName || row.name || row.featureID}
                    >
                      {row.releaseName || row.name || row.featureID}
                    </TableCell>
                    <TableCell
                      content={row.profileName}
                      className="hidden md:table-cell"
                    >
                      {row.profileType && (
                        <div>
                          <Badge variant={"outline"}>{row.profileType}</Badge>
                        </div>
                      )}

                      {row.profileName
                        ? row.profileName
                        : row?.profileNames?.map((name: string) => (
                            <div key={name}>{name}</div>
                          ))}
                    </TableCell>
                    {!isProfile && (
                      <TableCell content={row.namespace} className="py-4 ">
                        <span> {row.namespace}</span>
                      </TableCell>
                    )}

                    <TableCell className="hidden md:table-cell ">
                      {row.chartVersion || row.version || (
                        <Badge className={colorFromStatus(row.status)}>
                          {row.status}
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell
                      content={row.failureMessage}
                      colSpan={isProfile ? 2 : 1}
                      className="hidden md:table-cell"
                    >
                      {row.failureMessage}
                      {row.lastAppliedTime && (
                        <>
                          {" "}
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
                        </>
                      )}
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
