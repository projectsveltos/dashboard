import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReadyFlag } from "@/components/ui/ready-flag";
import { FailedFlag } from "@/components/ui/failed-flag";

interface ClusterCardProps {
  name: string;
  version: string;
  namespace: string;
  status: Boolean;
  labels: {
    designation: string;
    color: string;
  }[];
  onClick: () => void;
}

export const ClusterCard = ({
  name,
  version,
  namespace,
  labels,
  onClick,
  status,
}: ClusterCardProps) => {
  return (
    <>
      <Card
        className={
          "hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer"
        }
        onClick={onClick}
      >
        <div className=" flex items-center space-x-4 rounded-md  p-4">
          {status ? <ReadyFlag /> : <FailedFlag />}
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
          {labels?.length > 0 && (
            <div className="flex items-center space-x-2">
              {labels?.map((label) => (
                <Badge key={label.designation} variant="secondary">
                  {label.designation}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Card>
    </>
  );
};
