import { Tags } from "lucide-react";
import { Label } from "@/types/cluster.types";
import { Badge } from "@/lib/components/ui/data-display/badge";
import { useTranslation } from "react-i18next";

type LabelsCardProps = {
  labels: Label;
};

export const LabelsCard = ({ labels }: LabelsCardProps) => {
  const { t } = useTranslation();
  const labelEntries = Object.entries(labels || {});
  return (
    <div className="p-4">
      {labelEntries.length > 0 && (
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Tags className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">
              {t("common.labels")}
            </span>
            <Badge
              variant="outline"
              className="text-[10px] ml-auto border-primary/20 bg-primary/5 text-primary"
            >
              Total: {labelEntries.length}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {labelEntries.map(([key, value]) => (
              <Badge
                key={key}
                className="text-[10px] bg-background border border-border px-2 py-1 transition-all hover:border-primary/40"
                variant="secondary"
              >
                <span className="text-primary mr-1">{key}:</span>
                <span className="text-foreground/80">{value}</span>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
