import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileSliders } from "lucide-react";

export const ClusterConfig = () => {
  return (
    <>
      {" "}
      <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
        <CardHeader>
          <CardTitle className={"flex items-center"}>
            <FileSliders className={"w-4 h-4 mx-0.5"} /> Cluster Configuration
          </CardTitle>
          <CardDescription>
            Configuration of the cluster and its components.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="gap-2 flex flex-wrap">
            <dl className="grid grid-cols-1 gap-2">
              <dt className="text-sm text-muted-foreground ">
                Cluster Profile
              </dt>
              <dd className="font-medium">deploy-kyverno</dd>
              <dt className="text-sm text-muted-foreground ">Feature Type</dt>
              <dd className="font-medium">Helm</dd>
              <dt className="text-sm text-muted-foreground ">App Name</dt>
              <dd className="font-medium">kyverno-latest</dd>
              <dt className="text-sm text-muted-foreground ">App Version</dt>
              <dd className="font-medium">v1.11.4</dd>
              <dt className="text-sm text-muted-foreground ">Chart Version</dt>
              <dd className="font-medium">3.1.4</dd>
              <dt className="text-sm text-muted-foreground ">Repo URL</dt>
              <dd className="font-medium break-words">
                https://kyverno.github.io/kyverno/
              </dd>
            </dl>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
