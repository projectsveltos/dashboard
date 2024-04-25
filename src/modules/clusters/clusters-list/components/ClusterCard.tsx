import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReadyFlag } from "@/components/ui/ready-flag";
import { FailedFlag } from "@/components/ui/failed-flag";
import { Label } from "@/types/cluster";
import { appConfig } from "@/config/app";

interface ClusterCardProps {
  name: string;
  version?: string;
  namespace?: string;
  status: boolean;
  labels?: Label[];
  onClick: () => void;
  failureMsg?: string | null;
}

export const ClusterCard = ({
  name,
  version,
  namespace,
  labels,
  onClick,
  failureMsg,
  status,
}: ClusterCardProps) => {
  const labelEntries = Object.entries(labels || {});
  const displayEntries = labelEntries.slice(0, appConfig.maxBadges);
  const remainingCount = labelEntries.length - appConfig.maxBadges;
  return (
    <>
      <Card
        className={
          "hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer"
        }
        onClick={onClick}
      >
        <div className=" flex items-center space-x-4 rounded-md  p-4">
          {status ? <ReadyFlag /> : <FailedFlag msg={failureMsg} />}
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              {name}
              <span className={"text-muted-foreground mx-1"}>
                <Tooltip>
                  <TooltipTrigger>{version}</TooltipTrigger>
                  <TooltipContent>
                    <p>Kubernetes version : {version}</p>
                  </TooltipContent>
                </Tooltip>
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              Namespace: <span className="text-main-500">{namespace}</span>
            </p>
          </div>
          {labelEntries.length > 0 && (
            <div className="flex items-center space-x-2">
              {displayEntries.map(([key, value]) => (
                <Badge key={key} variant="label">
                  <p className={"truncate"}>{`${key}: ${value}`}</p>
                </Badge>
              ))}
              {remainingCount > 0 && <span>+ {remainingCount} more</span>}
            </div>
          )}
        </div>
      </Card>
    </>
  );
};
