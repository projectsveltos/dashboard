import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/data-display/card";
import { Badge } from "@/lib/components/ui/data-display/badge";
import { Box, Terminal } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  ClassifierDetails,
  ClassifierResourceSelector,
} from "@/types/classifier.types";

const ResourceSelectorRow = ({
  selector,
}: {
  selector: ClassifierResourceSelector;
}) => (
  <div className="bg-muted/30 p-2 rounded text-xs font-mono space-y-1">
    <div>
      {selector.kind || "*"}
      {selector.group ? `.${selector.group}` : ""}
      {selector.version ? `/${selector.version}` : ""}
    </div>
    {selector.namespace && (
      <div className="text-muted-foreground">ns: {selector.namespace}</div>
    )}
    {selector.selector?.matchLabels &&
      Object.keys(selector.selector.matchLabels).length > 0 && (
        <div className="text-muted-foreground">
          {Object.entries(selector.selector.matchLabels)
            .map(([key, value]) => `${key}=${value}`)
            .join(", ")}
        </div>
      )}
  </div>
);

export const ClassifierSpecCard = ({ data }: { data: ClassifierDetails }) => {
  const { t } = useTranslation();

  const selectors =
    data.type === "Classifier" ? data.resourceSelectors : data.matchResources;
  const lua =
    data.type === "Classifier"
      ? data.aggregatedClassification
      : data.classificationLua;

  return (
    <Card className="bg-card/40 border-border/40 shadow-sm">
      <CardHeader className="py-3 px-4 border-b border-border/40">
        <CardTitle className="text-[10px] font-bold text-muted-foreground flex items-center gap-2">
          <Box className="h-3 w-3" />
          {data.type === "Classifier"
            ? t("common.resource_selectors")
            : t("common.match_resources")}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          {(!selectors || selectors.length === 0) && (
            <span className="text-sm text-muted-foreground">
              {t("common.no_resource_selectors")}
            </span>
          )}
          {selectors?.map((selector, idx) => (
            <ResourceSelectorRow key={idx} selector={selector} />
          ))}
        </div>

        {data.type === "Classifier" &&
          data.kubernetesVersionConstraints &&
          data.kubernetesVersionConstraints.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-[10px] text-muted-foreground uppercase font-semibold">
                {t("common.kubernetes_version_constraints")}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {data.kubernetesVersionConstraints.map((constraint, idx) => (
                  <Badge key={idx} variant="outline">
                    {constraint.comparison} {constraint.version}
                  </Badge>
                ))}
              </div>
            </div>
          )}

        {lua && (
          <div className="space-y-1.5">
            <p className="text-[10px] text-muted-foreground uppercase font-semibold flex items-center gap-1">
              <Terminal className="h-3 w-3" />
              {data.type === "Classifier"
                ? t("common.aggregated_classification")
                : t("common.classification_lua")}
            </p>
            <pre className="bg-muted/30 p-2 rounded text-xs font-mono overflow-x-auto whitespace-pre-wrap">
              {lua}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClassifierSpecCard;
