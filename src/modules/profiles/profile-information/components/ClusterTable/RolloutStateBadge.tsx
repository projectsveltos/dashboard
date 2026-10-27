import { Pause } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/lib/components/ui/data-display/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/lib/components/ui/data-display/tooltip";
import { RolloutState } from "@/types/profile.types";
import { rolloutStateStyle } from "@/utils/rolloutState";

export function RolloutStateBadge({ state }: { state: RolloutState }) {
  const { t } = useTranslation();
  const style = rolloutStateStyle[state];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge variant={style.variant} className="gap-1">
          {state === "paused" && <Pause className="h-3 w-3" />}
          {t(style.labelKey)}
        </Badge>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        {t(style.tooltipKey)}
      </TooltipContent>
    </Tooltip>
  );
}
