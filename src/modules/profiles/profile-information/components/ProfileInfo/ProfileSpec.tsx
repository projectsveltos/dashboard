import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/data-display/card";
import { Badge } from "@/lib/components/ui/data-display/badge";
import { FileSliders } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

import { ProfileInfo } from "@/types/profile.types";

type ProfileSpecCardProps = {
  spec: ProfileInfo["spec"];
  className?: string;
};

export const ProfileSpecCard = ({ spec, className }: ProfileSpecCardProps) => {
  const { t } = useTranslation();
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle className={"flex items-center"}>
          <FileSliders className={"w-4 h-4 mx-0.5"} /> {t("common.spec")}
        </CardTitle>
        <CardDescription>{t("common.profile_specifications")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="gap-2 flex flex-wrap">
          <dl className="grid grid-cols-1 gap-2">
            <dt className="text-sm text-muted-foreground">
              {t("common.cluster_selector")}
            </dt>
            <dd className="font-medium">
              <Badge variant={"outline"}>
                {Object.entries(spec.clusterSelector?.matchLabels ?? {}).map(
                  ([key, value]) => `${key}: ${value}`,
                )}
              </Badge>
            </dd>
            <dt className="text-sm text-muted-foreground">
              {t("common.sync_mode")}
            </dt>
            <Badge className="text-sm font-medium">{spec.syncMode}</Badge>
            {spec?.policyRefs && (
              <>
                <dt className="text-sm text-muted-foreground">
                  {t("common.policy_refs")}
                </dt>
                <dd>
                  {spec.policyRefs.map((policy, index) => (
                    <Badge key={index} variant={"outline"}>
                      {policy.name}
                    </Badge>
                  ))}
                </dd>
              </>
            )}
            {spec?.helmCharts && (
              <>
                <dt className="text-sm text-muted-foreground">
                  {t("common.helm_charts")}
                </dt>
                <dd>
                  {spec.helmCharts.map((chart, index) => (
                    <Badge key={index} variant={"outline"}>
                      {chart.chartName} ({chart.chartVersion})
                    </Badge>
                  ))}
                </dd>
              </>
            )}
          </dl>
        </div>
      </CardContent>
    </Card>
  );
};
