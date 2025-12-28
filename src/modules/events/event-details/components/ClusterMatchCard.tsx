import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Button } from "@/lib/components/ui/inputs/button";
import { ClusterEventMatch, Resource } from "@/types/event.types";
import { Badge } from "@/lib/components/ui/data-display/badge";
import { FailedFlag } from "@/lib/components/ui/data-display/failed-flag";
import { ReadyFlag } from "@/lib/components/ui/data-display/ready-flag";

export const ClusterMatchCard = ({
  cluster,
}: {
  cluster: ClusterEventMatch;
}) => {
  const navigate = useNavigate();
  function handleNavigation(cluster: ClusterEventMatch) {
    navigate(
      `/sveltos/cluster/${cluster.clusterKind}/${cluster.clusterNamespace}/${cluster.clusterName}`,
    );
  }

  return (
    <div className="border rounded-lg p-4 bg-card flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="font-semibold flex items-center gap-2">
            {cluster.failureMessage ? (
              <FailedFlag msg={cluster.failureMessage} />
            ) : (
              <ReadyFlag />
            )}
            {cluster.clusterName}
            <Badge variant={"outline"}>{cluster.clusterNamespace}</Badge>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => handleNavigation(cluster)}
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-grow text-sm">
        <div className="text-xs text-muted-foreground mb-1">Resources</div>
        <div className="space-y-1">
          {cluster.resources?.map((res: Resource, idx: number) => (
            <div
              key={idx}
              className="bg-muted/30 p-1.5 rounded text-xs font-mono flex items-center justify-between"
            >
              <span>
                {res.kind}/{res.name}
              </span>
              <span className="text-muted-foreground">{res.namespace}</span>
            </div>
          ))}
          {(!cluster.resources || cluster.resources.length === 0) && (
            <div className="text-muted-foreground italic text-xs">
              No resources found
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge variant="secondary" className="flex items-center gap-2">
          <div
            className={`h-2.5 w-2.5 rounded-full ${
              cluster.paused ? "bg-yellow-400" : "bg-green-400"
            }`}
          />
          {cluster.paused ? "Paused" : "Running"}
        </Badge>
      </div>
    </div>
  );
};
