import { ClassifierSummary } from "@/types/classifier.types";
import {
  AvatarRectangle,
  AvatarRectFallback,
} from "@/lib/components/ui/data-display/avatar-rectangle";
import { Card } from "@/lib/components/ui/data-display/card";
import { Badge } from "@/lib/components/ui/data-display/badge";

import { Tags } from "lucide-react";
import { useTranslation } from "react-i18next";

export const ClassifierCard = ({
  classifier,
  onClick,
}: {
  classifier: ClassifierSummary;
  onClick?: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <Card
      className={
        "hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer"
      }
      onClick={onClick}
    >
      <div className=" flex items-center space-x-4 rounded-md  p-4">
        <div>
          <AvatarRectangle className="w-9 h-9">
            <AvatarRectFallback
              className={
                "bg-primary text-white flex items-center justify-center h-full w-full"
              }
            >
              <Tags className={"h-6 w-6"} />
            </AvatarRectFallback>
          </AvatarRectangle>
        </div>

        <div className="flex-1 space-y-1 min-w-0">
          <p className="text-sm font-medium leading-none truncate">
            {classifier.name}
          </p>
          <div className="py-1">
            <Badge variant={"outline"}>
              {classifier.type === "Classifier"
                ? t("common.classifier")
                : t("common.management_cluster_classifier")}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-xs text-muted-foreground">
              {t("common.labels")}
            </div>
            <div className="text-lg font-bold">{classifier.labelCount}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">
              {t("common.matching_clusters")}
            </div>
            <div className="text-lg font-bold">
              {classifier.matchingClusterCount}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ClassifierCard;
