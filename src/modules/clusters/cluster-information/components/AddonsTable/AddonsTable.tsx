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
import {
  helmColumns,
  profileColumns,
  resourceColumns,
} from "@/modules/clusters/cluster-information/components/AddonsTable/Columns";
import { AddonColumn, AddonTableTypes } from "@/types/addonTable.types";

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

  const [failureCheck, setFailureCheck] = useState<boolean>(failedOnly);

  const handleCheckedChange = (checked: boolean) => {
    setFailureCheck(checked);
    searchParams.set("failure", checked.toString());
    navigate({
      search: searchParams.toString(),
    });
  };
  const columns =
    type === AddonTypes.HELM
      ? helmColumns
      : type === AddonTypes.RESOURCE
        ? resourceColumns
        : profileColumns;
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column: AddonColumn, index) => (
              <TableHead key={index} className={column?.className}>
                {column?.isCheckbox && (
                  <Checkbox
                    id="filters"
                    checked={failureCheck}
                    onCheckedChange={handleCheckedChange}
                    className={"mx-2 mb-2 text-center"}
                  />
                )}
                {column.isSrOnly ? (
                  <span className="sr-only">{column?.label}</span>
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
                    {columns.map((column, colIndex) => (
                      <>
                        {column.keys == AddonTableTypes.ICON ? (
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
                        ) : column.keys == AddonTableTypes.TIME ? (
                          <TableCell>
                            {" "}
                            <div>
                              {new Date(
                                row.lastAppliedTime,
                              )?.toLocaleDateString("en-US")}
                            </div>
                            {new Date(row.lastAppliedTime)?.toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </TableCell>
                        ) : column.keys == AddonTableTypes.STATUS ? (
                          <TableCell>
                            <Badge className={colorFromStatus(row.status)}>
                              {row.status}
                            </Badge>
                          </TableCell>
                        ) : column.keys == AddonTableTypes.PROFILE ? (
                          <>
                            {" "}
                            <TableCell
                              content={row.profileName}
                              className="hidden md:table-cell break-words whitespace-normal"
                            >
                              {row.profileType && (
                                <div>
                                  <Badge variant={"outline"}>
                                    {row.profileType}
                                  </Badge>
                                </div>
                              )}

                              {row.profileName
                                ? row.profileName
                                    .split("/")
                                    .map((name: string) => (
                                      <Badge variant={"outline"} key={name}>
                                        {name}
                                      </Badge>
                                    ))
                                : row.profileNames?.map((profileName: string) =>
                                    profileName
                                      .split("/")
                                      .map((name: string) => (
                                        <Badge variant={"outline"} key={name}>
                                          {name}
                                        </Badge>
                                      )),
                                  )}
                            </TableCell>
                          </>
                        ) : column.keys == AddonTableTypes.ACTION ? (
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
                                    onSelect={() =>
                                      navigateRepoURL(row.repoURL)
                                    }
                                  >
                                    <ExternalLink className={"w-4 h-4 mx-1"} />{" "}
                                    repoURL
                                  </DropdownMenuItem>
                                )}

                                <DropdownMenuItem disabled>
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem disabled>
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        ) : (
                          <TableCell
                            key={colIndex}
                            className={` ${column.className}`}
                          >
                            {column.keys
                              .split("/")
                              .map((key) => <div key={key}>{row[key]}</div>)
                              .filter(Boolean)}
                          </TableCell>
                        )}
                      </>
                    ))}
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
