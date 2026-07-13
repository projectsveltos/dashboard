import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/data-display/card";
import { Badge } from "@/lib/components/ui/data-display/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/components/ui/data-display/dialog";
import { FileSliders } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  prism,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

import { ProfileInfo } from "@/types/profile.types";

type ProfileSpecCardProps = {
  spec: ProfileInfo["spec"];
  className?: string;
};

export const ProfileSpecCard = ({ spec, className }: ProfileSpecCardProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
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
            <dt className="text-sm text-muted-foreground">
              {t("common.max_update")}
            </dt>
            {spec?.maxUpdate ? (
              <Badge className="text-sm font-medium">{spec.maxUpdate}</Badge>
            ) : (
              <dd className="text-sm text-muted-foreground italic">
                {t("common.max_update_default")}
              </dd>
            )}
            {spec?.validateHealths && spec.validateHealths.length > 0 && (
              <>
                <dt className="text-sm text-muted-foreground">
                  {t("common.validate_healths")}
                </dt>
                <dd className="flex flex-wrap gap-1">
                  {spec.validateHealths.map((check, index) => (
                    <Dialog key={index}>
                      <DialogTrigger asChild>
                        <Badge
                          variant={"outline"}
                          className="cursor-pointer hover:bg-accent"
                        >
                          {check.name} ({check.featureID})
                        </Badge>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{check.name}</DialogTitle>
                        </DialogHeader>
                        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                          <dt className="text-muted-foreground">Feature ID</dt>
                          <dd className="font-medium">{check.featureID}</dd>
                          {check.group && (
                            <>
                              <dt className="text-muted-foreground">Group</dt>
                              <dd className="font-medium">{check.group}</dd>
                            </>
                          )}
                          {check.version && (
                            <>
                              <dt className="text-muted-foreground">Version</dt>
                              <dd className="font-medium">{check.version}</dd>
                            </>
                          )}
                          {check.kind && (
                            <>
                              <dt className="text-muted-foreground">Kind</dt>
                              <dd className="font-medium">{check.kind}</dd>
                            </>
                          )}
                          {check.namespace && (
                            <>
                              <dt className="text-muted-foreground">
                                Namespace
                              </dt>
                              <dd className="font-medium">{check.namespace}</dd>
                            </>
                          )}
                        </dl>
                        {check.script && (
                          <div className="rounded-md overflow-hidden border border-border">
                            <SyntaxHighlighter
                              language="lua"
                              style={theme === "dark" ? vscDarkPlus : prism}
                              customStyle={{
                                margin: 0,
                                padding: "1rem",
                                fontSize: "12px",
                                lineHeight: "1.5",
                                background: "transparent",
                              }}
                              wrapLines={true}
                              showLineNumbers={true}
                            >
                              {check.script}
                            </SyntaxHighlighter>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  ))}
                </dd>
              </>
            )}
            {spec?.policyRefs && spec.policyRefs.length > 0 && (
              <>
                <dt className="text-sm text-muted-foreground">
                  {t("common.policy_refs")}
                </dt>
                <dd className="flex flex-wrap gap-1">
                  {spec.policyRefs.map((policy, index) => (
                    <Dialog key={index}>
                      <DialogTrigger asChild>
                        <Badge
                          variant={"outline"}
                          className="cursor-pointer hover:bg-accent"
                        >
                          {policy.name}
                        </Badge>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{policy.name}</DialogTitle>
                        </DialogHeader>
                        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                          <dt className="text-muted-foreground">Namespace</dt>
                          <dd className="font-medium">{policy.namespace}</dd>
                          <dt className="text-muted-foreground">Kind</dt>
                          <dd className="font-medium">{policy.kind}</dd>
                          <dt className="text-muted-foreground">
                            Deployment Type
                          </dt>
                          <dd className="font-medium">
                            {policy.deploymentType}
                          </dd>
                        </dl>
                      </DialogContent>
                    </Dialog>
                  ))}
                </dd>
              </>
            )}
            {spec?.helmCharts && spec.helmCharts.length > 0 && (
              <>
                <dt className="text-sm text-muted-foreground">
                  {t("common.helm_charts")}
                </dt>
                <dd className="flex flex-wrap gap-1">
                  {spec.helmCharts.map((chart, index) => (
                    <Dialog key={index}>
                      <DialogTrigger asChild>
                        <Badge
                          variant={"outline"}
                          className="cursor-pointer hover:bg-accent"
                        >
                          {chart.chartName} ({chart.chartVersion})
                        </Badge>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{chart.chartName}</DialogTitle>
                        </DialogHeader>
                        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                          <dt className="text-muted-foreground">
                            Repository URL
                          </dt>
                          <dd className="font-medium break-all">
                            {chart.repositoryURL}
                          </dd>
                          <dt className="text-muted-foreground">
                            Repository Name
                          </dt>
                          <dd className="font-medium">
                            {chart.repositoryName}
                          </dd>
                          <dt className="text-muted-foreground">
                            Chart Version
                          </dt>
                          <dd className="font-medium">{chart.chartVersion}</dd>
                          <dt className="text-muted-foreground">
                            Release Name
                          </dt>
                          <dd className="font-medium">{chart.releaseName}</dd>
                          <dt className="text-muted-foreground">
                            Release Namespace
                          </dt>
                          <dd className="font-medium">
                            {chart.releaseNamespace}
                          </dd>
                          <dt className="text-muted-foreground">Action</dt>
                          <dd className="font-medium">
                            {chart.helmChartAction}
                          </dd>
                        </dl>
                        {chart.values && (
                          <div className="rounded-md overflow-hidden border border-border">
                            <SyntaxHighlighter
                              language="yaml"
                              style={theme === "dark" ? vscDarkPlus : prism}
                              customStyle={{
                                margin: 0,
                                padding: "1rem",
                                fontSize: "12px",
                                lineHeight: "1.5",
                                background: "transparent",
                              }}
                              wrapLines={true}
                              showLineNumbers={true}
                            >
                              {chart.values}
                            </SyntaxHighlighter>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
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
