import { Card } from "@/lib/components/ui/data-display/card";
import { Badge } from "@/lib/components/ui/data-display/badge";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/lib/components/ui/data-display/tooltip";
import { ReadyFlag } from "@/lib/components/ui/data-display/ready-flag";
import { FailedFlag } from "@/lib/components/ui/data-display/failed-flag";
import { Label } from "@/types/cluster.types";
import { appConfig } from "@/config/app";
import { Tags } from "lucide-react";

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
          {failureMsg ? <FailedFlag msg={failureMsg} /> : <ReadyFlag />}
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
            <p className="text-sm text-muted-foreground  py-1">
              Namespace: <span className="text-main-500 ">{namespace}</span>
            </p>
          </div>
          <Tooltip>
            <TooltipTrigger>
              {labelEntries.length > 0 && (
                <div className="flex items-center space-x-2">
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {displayEntries.map(([key, value]) => (
                      <Badge
                        key={`${key}: ${value}`}
                        className={
                          "my-0.5 dark:bg-slate-800 bg-slate-300 hover:animate-in border-2 rounded"
                        }
                        variant="label"
                      >
                        <p className="truncate">{`${key}: ${value}`}</p>
                      </Badge>
                    ))}
                  </div>
                  {remainingCount > 0 && <span>+ {remainingCount} more</span>}
                </div>
              )}
            </TooltipTrigger>
            <TooltipContent className={"w-min h-64 px-4 overflow-auto"}>
              <div className={"inline-flex items-baseline "}>
                <Tags className={"w-3 h-3 mx-1 mt-1"} />
                <p>Labels:</p>
              </div>
              <br />

              {labelEntries.map(([key, value]) => (
                <Badge
                  key={`${key}: ${value}`}
                  className={"my-0.5 rounded overflow-auto "}
                  variant="label"
                >
                  <p>{`${key}: ${value}`}</p>
                </Badge>
              ))}
            </TooltipContent>
          </Tooltip>
        </div>
      </Card>
    </>
  );
};
