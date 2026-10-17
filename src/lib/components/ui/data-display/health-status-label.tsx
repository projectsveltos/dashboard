import { useTranslation } from "react-i18next";

import { Badge } from "@/lib/components/ui/data-display/badge";
import { HealthStatus } from "@/types/health.types";
import { healthStatusStyle } from "@/utils/healthStatus";

interface HealthStatusLabelProps {
  status: HealthStatus;
  // When set the label is a button, for instance to open the unhealthy resources.
  onClick?: () => void;
}

// HealthStatusLabel shows a health status as a coloured badge with its name.
export const HealthStatusLabel = ({
  status,
  onClick,
}: HealthStatusLabelProps) => {
  const { t } = useTranslation();
  const style = healthStatusStyle[status];
  const badge = <Badge className={style.badgeClass}>{t(style.labelKey)}</Badge>;

  if (!onClick) {
    return badge;
  }

  return (
    <button
      type="button"
      className="inline-flex cursor-pointer"
      onClick={onClick}
    >
      {badge}
    </button>
  );
};
