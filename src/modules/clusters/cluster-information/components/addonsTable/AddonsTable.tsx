import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/data-display/table";

import { EmptyData } from "@/lib/components/ui/feedback/emptyData";

import { useEffect, useState } from "react";
import { appConfig } from "@/config/app";
import { usePagination } from "@/hooks/usePagination";
import { AddonData, AddonTypes } from "@/types/addon.types";
import { LoadingTableRow } from "@/lib/components/ui/feedback/loadingTableRow";

import { Checkbox } from "@/lib/components/ui/inputs/checkbox";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  helmColumns,
  profileColumns,
  resourceColumns,
} from "@/modules/clusters/cluster-information/components/addonsTable/Columns";
import { AddonColumn } from "@/types/addonTable.types";
import { ProfileRow } from "@/modules/clusters/cluster-information/components/addonsTable/rows/ProfileRow";
import { HelmRow } from "@/modules/clusters/cluster-information/components/addonsTable/rows/HelmRow";
import { ResourceRow } from "@/modules/clusters/cluster-information/components/addonsTable/rows/ResourceRow";

interface AddonsTableProps {
  data: {
    helmReleases?: AddonData[];
    totalHelmReleases?: number;
    resources?: AddonData[];
    totalResources?: number;
    profiles?: AddonData[];
  };
  type: AddonTypes;
  setPage: (page: number, type: AddonTypes) => void;
  loading: boolean;
}

export const AddonsTable = ({
  data,
  type,
  setPage,
  loading,
}: AddonsTableProps) => {
  const navigateRepoURL = (url: string | undefined) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [total, setTotal] = useState<number>(0);
  const [page, setUIPage] = useState<number>(appConfig.defaultPage);
  const [rows, setRows] = useState<AddonData[]>([]);

  const failedOnly = searchParams.get("failure") === "true";

  useEffect(() => {
    switch (type) {
      case AddonTypes.HELM:
        setRows(data.helmReleases || []);
        setTotal(data.totalHelmReleases || 0);
        break;
      case AddonTypes.RESOURCE:
        setRows(data.resources || []);
        setTotal(data.totalResources || 0);
        break;
      case AddonTypes.PROFILE:
        setRows(data.profiles || []);
        setTotal(data.totalResources || 0);
        break;
      default:
    }
  }, [data, type]);
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
              <TableHead
                key={index}
                colSpan={column?.colSpan}
                className={column?.className}
              >
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
                {rows.map((row: AddonData, index: number) => (
                  <>
                    {type === AddonTypes.PROFILE && (
                      <ProfileRow
                        key={index}
                        row={row}
                        columns={columns}
                        onOpenRepo={navigateRepoURL}
                      />
                    )}
                    {type === AddonTypes.HELM && (
                      <HelmRow
                        key={index}
                        row={row}
                        columns={columns}
                        onOpenRepo={navigateRepoURL}
                      />
                    )}
                    {type === AddonTypes.RESOURCE && (
                      <ResourceRow
                        key={index}
                        row={row}
                        columns={columns}
                        onOpenRepo={navigateRepoURL}
                      />
                    )}
                  </>
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
