import { Button } from "@/lib/components/ui/inputs/button";
import { ChevronLeft } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { RefreshButton } from "@/modules/common/components/actions/RefreshButton";
import { Badge } from "@/lib/components/ui/data-display/badge";
import { useTranslation } from "react-i18next";
import { ClassifierKind } from "@/types/classifier.types";

type ClassifierPageHeadingProps = {
  name: string;
  type: ClassifierKind;
};

export const ClassifierPageHeading = ({
  name,
  type,
}: ClassifierPageHeadingProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <div className="flex my-4 items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">{t("common.back")}</span>
        </Button>

        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {name}
        </h1>

        <Badge variant="outline">
          {type === "Classifier"
            ? t("common.classifier")
            : t("common.management_cluster_classifier")}
        </Badge>

        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <RefreshButton />
        </div>
      </div>
    </>
  );
};
