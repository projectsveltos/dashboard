import { MouseEvent } from "react";
import {
  CheckCircle2,
  CircleDashed,
  LucideIcon,
  PauseCircle,
  Timer,
  XCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/lib/components/ui/data-display/tooltip";
import { HealthStatus } from "@/types/health.types";
import { healthStatusStyle } from "@/utils/healthStatus";

const icons: Record<HealthStatus, LucideIcon> = {
  Healthy: CheckCircle2,
  Progressing: Timer,
  Suspended: PauseCircle,
  Degraded: XCircle,
  NoData: CircleDashed,
};

interface HealthBadgeProps {
  // Nothing is shown when the status is unknown: the resources are not monitored.
  status?: HealthStatus;
  // When set the badge is a button, for instance to open the unhealthy resources.
  onClick?: () => void;
}

// HealthBadge shows the health reported by health monitoring: the resources a profile deploys and any other
// HealthCheck. It is shown for a monitored cluster or profile only (a profile with monitoring enabled, or a
// cluster with health reports), so a missing badge means "not monitored", never "healthy".
export const HealthBadge = ({ status, onClick }: HealthBadgeProps) => {
  const { t } = useTranslation();
  if (!status) {
    return null;
  }

  const Icon = icons[status];
  const style = healthStatusStyle[status];
  const icon = <Icon className={`h-3.5 w-3.5 shrink-0 ${style.textClass}`} />;

  const handleClick = (event: MouseEvent) => {
    // The badge sits in clickable cards and rows
    event.stopPropagation();
    onClick?.();
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {onClick ? (
          <button
            type="button"
            className="inline-flex cursor-pointer"
            aria-label={t("common.health_tooltip", {
              status: t(style.labelKey),
            })}
            onClick={handleClick}
          >
            {icon}
          </button>
        ) : (
          <span className="inline-flex cursor-default">{icon}</span>
        )}
      </TooltipTrigger>
      <TooltipContent>
        <p>{t("common.health_tooltip", { status: t(style.labelKey) })}</p>
      </TooltipContent>
    </Tooltip>
  );
};
