import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/data-display/card";
import { Badge } from "@/lib/components/ui/data-display/badge";
import { FileSliders } from "lucide-react";

type ProfileSpecCardProps = {
  spec: {
    clusterSelector?: {
      matchLabels: {
        env: string;
      };
    };
    helmCharts?: {
      chartName: string;
      chartVersion: string;
    }[];
    syncMode: string;
    stopMatchingBehavior: string;
    policyRefs?: {
      namespace: string;
      name: string;
      kind: string;
      deploymentType: string;
    }[];
  };
};

export const ProfileSpecCard = ({ spec }: ProfileSpecCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className={"flex items-center"}>
          <FileSliders className={"w-4 h-4 mx-0.5"} /> Spec
        </CardTitle>
        <CardDescription>
          Profile specifications for the selected profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="gap-2 flex flex-wrap">
          <dl className="grid grid-cols-1 gap-2">
            <dt className="text-sm text-muted-foreground">Cluster Selector</dt>
            <dd className="font-medium">
              <Badge variant={"outline"}>
                {Object.entries(spec.clusterSelector?.matchLabels ?? {}).map(
                  ([key, value]) => `${key}: ${value}`,
                )}
              </Badge>
            </dd>
            <dt className="text-sm text-muted-foreground">Sync Mode</dt>
            <Badge className="text-sm font-medium">{spec.syncMode}</Badge>
            {spec?.policyRefs && (
              <>
                <dt className="text-sm text-muted-foreground">Policy Refs</dt>
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
                <dt className="text-sm text-muted-foreground">Helm Charts</dt>
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
