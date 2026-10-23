import { useTranslation } from "react-i18next";

import { RolloutSummary } from "@/types/profile.types";
import { rolloutProgress, rolloutStateStyle } from "@/utils/rolloutState";

// maxUpdate is the value set in the profile spec: a number or a percentage
export function RolloutSummaryStrip({
  rollout,
  maxUpdate,
}: {
  rollout: RolloutSummary;
  maxUpdate?: string | number;
}) {
  const { t } = useTranslation();
  const progress = rolloutProgress(rollout);

  // A percentage is shown with the number of clusters it stands for
  const limit =
    typeof maxUpdate === "string" && maxUpdate.endsWith("%")
      ? `${maxUpdate} (${rollout.maxUpdate})`
      : String(rollout.maxUpdate);

  const counts: [string, number][] = [
    [rolloutStateStyle.updated.labelKey, rollout.updated],
    [rolloutStateStyle.updating.labelKey, rollout.updating],
    [rolloutStateStyle.waiting.labelKey, rollout.waiting],
    [rolloutStateStyle.paused.labelKey, rollout.paused],
    [rolloutStateStyle.notReady.labelKey, rollout.notReady],
  ];

  return (
    <div className="rounded-md border border-border bg-muted/30 p-3 mb-4 space-y-2">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-sm font-semibold">
          {t("common.rollout_in_progress")}
        </span>
        <span className="text-sm">
          {t("common.rollout_progress", {
            updated: progress.updated,
            total: progress.total,
          })}
        </span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress.percent}
      >
        <div
          className="h-full bg-green-500 transition-all"
          style={{ width: `${progress.percent}%` }}
        />
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {counts
          .filter(([, count]) => count > 0)
          .map(([labelKey, count]) => (
            <span key={labelKey}>
              {count} {t(labelKey)}
            </span>
          ))}
        {rollout.maxUpdate > 0 && (
          <span className="ml-auto">
            {t("common.max_concurrent_updates", { value: limit })}
          </span>
        )}
      </div>
    </div>
  );
}
