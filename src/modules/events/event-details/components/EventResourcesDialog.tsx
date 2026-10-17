import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/lib/components/ui/data-display/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/data-display/table";
import { LoadingTableRow } from "@/lib/components/ui/feedback/loadingTableRow";
import { Input } from "@/lib/components/ui/inputs/input";
import useDebounce from "@/hooks/useDebounce";
import { usePagination } from "@/hooks/usePagination";
import useEventResources from "@/modules/events/event-details/hooks/useEventResources";
import { appConfig } from "@/config/app";
import { ClusterType } from "@/types/cluster.types";
import {
  EVENT_RESOURCES_PAGE_SIZE,
  EventResourcesFilters,
  hasEventResourcesFilters,
  noEventResourcesFilters,
} from "@/utils/eventResources";

interface EventResourcesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventName: string;
  clusterNamespace: string;
  clusterName: string;
  clusterType: ClusterType;
}

// Table wraps itself in a min-h-120 div: reset it so a short list neither
// leaves blank space nor shows a scrollbar
const tableContainerClassName = "max-h-96 overflow-y-auto [&>div]:min-h-0";

// TableCell truncates at 6rem by default, which cuts names
const cellClassName = "max-w-none break-words whitespace-normal";

const filterDelayMs = 300;

// EventResourcesDialog lists, one page at a time, the resources matching the EventSource of an EventTrigger in
// a cluster. A cluster can match hundreds, so they are requested only once the dialog is opened.
export const EventResourcesDialog = ({
  open,
  onOpenChange,
  eventName,
  clusterNamespace,
  clusterName,
  clusterType,
}: EventResourcesDialogProps) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(appConfig.defaultPage);
  // What is typed, and what is asked for: the second follows the first after a short pause
  const [typed, setTyped] = useState<EventResourcesFilters>(
    noEventResourcesFilters,
  );
  const [filters, setFilters] = useState<EventResourcesFilters>(
    noEventResourcesFilters,
  );

  useDebounce(
    () => {
      setFilters(typed);
    },
    [typed],
    filterDelayMs,
  );

  // Another page of the previous filters would make no sense
  useEffect(() => {
    setPage(appConfig.defaultPage);
  }, [filters]);

  const query = useEventResources(
    { eventName, clusterNamespace, clusterName, clusterType },
    page,
    filters,
    open,
  );
  const resources = query.data?.resources ?? [];
  const total = query.data?.totalResources ?? 0;

  const [PaginationUI] = usePagination(
    total,
    page,
    setPage,
    EVENT_RESOURCES_PAGE_SIZE,
  );

  const handleFilterChange =
    (key: keyof EventResourcesFilters) =>
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setTyped((current) => ({ ...current, [key]: event.target.value }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>{t("common.matching_resources")}</DialogTitle>
          <DialogDescription>
            {`${eventName} · ${clusterNamespace}/${clusterName}`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <Input
            value={typed.kind}
            onChange={handleFilterChange("kind")}
            placeholder={t("common.search_resource_kind")}
          />
          <Input
            value={typed.namespace}
            onChange={handleFilterChange("namespace")}
            placeholder={t("common.search_resource_namespace")}
          />
          <Input
            value={typed.name}
            onChange={handleFilterChange("name")}
            placeholder={t("common.search_resource_name")}
          />
        </div>
        <div className={tableContainerClassName}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("common.kind")}</TableHead>
                <TableHead>{t("common.namespace")}</TableHead>
                <TableHead>{t("common.name")}</TableHead>
              </TableRow>
            </TableHeader>
            {query.isLoading ? (
              <LoadingTableRow columns={EVENT_RESOURCES_PAGE_SIZE} />
            ) : (
              <TableBody>
                {resources.length > 0 ? (
                  resources.map((resource, index) => (
                    <TableRow key={index}>
                      <TableCell className={cellClassName}>
                        {resource.group
                          ? `${resource.kind}.${resource.group}`
                          : resource.kind}
                      </TableCell>
                      <TableCell className={cellClassName}>
                        {resource.namespace || "-"}
                      </TableCell>
                      <TableCell className={cellClassName}>
                        {resource.name}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="py-10 text-center text-sm text-muted-foreground"
                    >
                      {query.isError
                        ? t("common.matching_resources_error")
                        : hasEventResourcesFilters(filters)
                          ? t("common.matching_resources_no_match")
                          : t("common.no_resources")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        </div>
        <div className="px-1">
          <PaginationUI />
        </div>
      </DialogContent>
    </Dialog>
  );
};
