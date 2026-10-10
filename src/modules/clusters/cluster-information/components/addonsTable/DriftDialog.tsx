import { GitCompare } from "lucide-react";
import { useState } from "react";
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
import { Button } from "@/lib/components/ui/inputs/button";
import { DriftedResource, DriftHistory } from "@/types/addon.types";

interface DriftDialogProps {
  featureID?: string;
  history: DriftHistory;
}

// Table wraps itself in a min-h-120 div: reset it so a short list neither
// leaves blank space nor shows a scrollbar
const tableContainerClassName = "max-h-96 overflow-y-auto [&>div]:min-h-0";

// TableCell truncates at 6rem by default, which cuts the timestamp
const cellClassName = "max-w-none whitespace-nowrap";

// kubectl notation: Kind.group, or just Kind for resources in the core group
function formatKind(resource: DriftedResource): string {
  return resource.group ? `${resource.kind}.${resource.group}` : resource.kind;
}

function formatHelmRelease(resource: DriftedResource): string {
  if (!resource.helmReleaseName) {
    return "";
  }
  return resource.helmReleaseNamespace
    ? `${resource.helmReleaseNamespace}/${resource.helmReleaseName}`
    : resource.helmReleaseName;
}

function formatDetectedTime(detectedTime: string): string {
  const time = new Date(detectedTime);
  return `${time.toLocaleDateString("en-US")} ${time.toLocaleTimeString(
    "en-US",
    { hour: "2-digit", minute: "2-digit", second: "2-digit" },
  )}`;
}

export const DriftDialog = ({ featureID, history }: DriftDialogProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const resources = history.resources ?? [];
  const showHelmRelease = resources.some((resource) =>
    Boolean(resource.helmReleaseName),
  );

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        title={formatDetectedTime(history.lastDetectedTime)}
        onClick={() => setOpen(true)}
      >
        <GitCompare className="w-4 h-4 mr-1" />
        {t("common.drift_history")}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>
              {t("common.drift_history")}
              {featureID ? `: ${featureID}` : ""}
            </DialogTitle>
            <DialogDescription>
              {t("common.drift_last_detected")}{" "}
              {formatDetectedTime(history.lastDetectedTime)}
            </DialogDescription>
          </DialogHeader>
          {resources.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {t("common.drift_resources_not_reported")}
            </p>
          ) : (
            <div className={tableContainerClassName}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("common.kind")}</TableHead>
                    <TableHead>{t("common.namespace")}</TableHead>
                    <TableHead>{t("common.name")}</TableHead>
                    <TableHead>{t("common.detected")}</TableHead>
                    {showHelmRelease && (
                      <TableHead>{t("common.helm_release")}</TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resources.map((resource, index) => (
                    <TableRow key={index}>
                      <TableCell className={cellClassName}>
                        {formatKind(resource)}
                      </TableCell>
                      <TableCell className={cellClassName}>
                        {resource.namespace || "-"}
                      </TableCell>
                      <TableCell className="max-w-md break-words whitespace-normal">
                        {resource.name}
                      </TableCell>
                      <TableCell className={cellClassName}>
                        {formatDetectedTime(resource.detectedTime)}
                      </TableCell>
                      {showHelmRelease && (
                        <TableCell className={cellClassName}>
                          {formatHelmRelease(resource)}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          {history.truncated && (
            <p className="text-xs text-muted-foreground">
              {t("common.drift_truncated")}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
