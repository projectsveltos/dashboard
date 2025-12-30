import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/data-display/table";
import { EmptyData } from "@/lib/components/ui/feedback/emptyData";
import { LoadingTableRow } from "@/lib/components/ui/feedback/loadingTableRow";
import { Checkbox } from "@/lib/components/ui/inputs/checkbox";
import { usePagination } from "@/hooks/usePagination";
import { useNavigate, useSearchParams } from "react-router-dom";

import { appConfig } from "@/config/app";
import { useTranslation } from "react-i18next";

import { FC, useState } from "react";
import { getRowsAndTotal } from "@/modules/clusters/cluster-information/components/addonsTable/utils/addonsTableUtils";
import { typeConfig } from "@/modules/clusters/cluster-information/components/addonsTable/config/typeConfig";
import { AddonTableData, AddonTypes } from "@/types/addon.types";

interface AddonsTableProps {
  data: AddonTableData;
  type: AddonTypes;
  setPage: (page: number, type: AddonTypes) => void;
  loading: boolean;
}

export const AddonsTable: FC<AddonsTableProps> = ({
  data,
  type,
  setPage,
  loading,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const failedOnly = searchParams.get(appConfig.queryParams.failure) === "true";

  const [failureCheck, setFailureCheck] = useState<boolean>(failedOnly);
  const [page, setUIPage] = useState<number>(appConfig.defaultPage);

  const { rows, total } = getRowsAndTotal(data, type);
  const { columns, RowComponent } = typeConfig[type];

  const [PaginationUI] = usePagination(
    total,
    page,
    (newPage: number) => {
      setUIPage(newPage);
      setPage(newPage, type);
    },
    appConfig.defaultTableSize,
  );

  const handleCheckedChange = (checked: boolean) => {
    setFailureCheck(checked);
    searchParams.set(appConfig.queryParams.failure, checked.toString());
    navigate({ search: searchParams.toString() });
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
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
                    className="mx-2 mb-2 text-center"
                  />
                )}
                {column.isSrOnly ? (
                  <span className="sr-only">
                    {column?.label ? t(column.label) : ""}
                  </span>
                ) : column?.label ? (
                  t(column.label)
                ) : (
                  ""
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {loading ? (
          <LoadingTableRow columns={appConfig.defaultTableSize} />
        ) : (
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <RowComponent
                  key={index}
                  row={row}
                  columns={columns}
                  onOpenRepo={(url: string | undefined) => {
                    if (url) {
                      window.open(url, "_blank");
                    }
                  }}
                />
              ))
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
