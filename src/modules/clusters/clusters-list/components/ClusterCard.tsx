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
import { PauseIcon } from "@radix-ui/react-icons";

interface ClusterCardProps {
  name: string;
  version?: string;
  namespace?: string;
  paused: boolean | string;
  status: boolean;
  labels?: Label[];
  onClick: () => void;
  failureMsg?: string | null;
}

import { useTranslation } from "react-i18next";

export const ClusterCard = ({
  name,
  version,
  namespace,
  paused,
  labels,
  onClick,
  failureMsg,
}: ClusterCardProps) => {
  const { t } = useTranslation();
  const labelEntries = Object.entries(labels || {});
  const displayEntries = labelEntries.slice(0, appConfig.maxBadges);
  const remainingCount = labelEntries.length - appConfig.maxBadges;
  const isPaused = paused == true || paused == "true";
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
              <span
                className={`inline-block h-2.5 w-2.5 rounded-full mr-2 ${isPaused ? "bg-yellow-400" : "bg-green-400"}`}
              />
              {name}
            </p>
            <p className="text-sm text-muted-foreground  py-1">
              {t("common.version")}:
              <span className={"text-muted-foreground mx-1"}>
                <Tooltip>
                  <TooltipTrigger> {version}</TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {t("common.kubernetes_version")} : {version}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </span>
            </p>
            <p className="text-sm text-muted-foreground  py-1">
              {t("common.namespace")}:{" "}
              <span className="text-main-500 ">{namespace}</span>
            </p>
            {isPaused && (
              <div className="flex items-center space-x-2 py-1">
                <p className="text-sm text-muted-foreground">
                  <span className="text-red-500 font-semibold">{""}</span>
                </p>
                <Badge
                  className="bg-yellow-500 dark:bg-yellow-200 dark:text-slate-950 text-white flex items-center space-x-1"
                  variant="label"
                >
                  <PauseIcon className={"h-4 w-4"} /> {t("common.paused")}
                </Badge>
              </div>
            )}
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
                <p>{t("common.labels")}:</p>
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
