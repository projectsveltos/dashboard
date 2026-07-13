import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/data-display/card";
import { Badge } from "@/lib/components/ui/data-display/badge";
import { Tags } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ClassifierLabelEntry } from "@/types/classifier.types";

export const ClassifierLabelsCard = ({
  labels,
}: {
  labels: ClassifierLabelEntry[];
}) => {
  const { t } = useTranslation();
  return (
    <Card className="bg-card/40 border-border/40 shadow-sm">
      <CardHeader className="py-3 px-4 border-b border-border/40 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-[10px] font-bold text-muted-foreground flex items-center gap-2">
          <Tags className="h-3 w-3" /> {t("common.classifier_labels")}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-1.5">
          {labels.length === 0 && (
            <span className="text-sm text-muted-foreground">
              {t("common.no_labels_configured")}
            </span>
          )}
          {labels.map((label, idx) => (
            <Badge key={idx} variant="outline">
              {label.key}: {label.value}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassifierLabelsCard;
