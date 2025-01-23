import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Divide, FileSliders } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type ProfileSpecCardProps = {
  spec: {
    clusterSelector: {
      matchLabels: {
        env: string;
      };
    };
    syncMode: string;
    stopMatchingBehavior: string;
    policyRefs: {
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
          <FileSliders className={"w-4 h-4 mx-0.5"} /> Specs
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
                {spec.clusterSelector.matchLabels.env}
              </Badge>
            </dd>
            <dt className="text-sm text-muted-foreground">Sync Mode</dt>
            <dd className="text-sm font-medium">{spec.syncMode}</dd>

            <dt className="text-sm text-muted-foreground">Policy References</dt>
            <dd className="font-medium">
              {spec.policyRefs.map((policy, index) => (
                <div key={index} className="ml-2">
                  <Badge variant={"secondary"} className="mr-1">
                    {policy.kind}
                  </Badge>
                  <span>{policy.name}</span>
                </div>
              ))}
            </dd>
          </dl>
        </div>
      </CardContent>
    </Card>
  );
};
