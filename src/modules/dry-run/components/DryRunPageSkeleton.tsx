import { PageHeading } from "@/lib/components/ui/layout/PageHeading";
import { useTranslation } from "react-i18next";

export function DryRunPageSkeleton() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6 animate-pulse">
      <PageHeading
        title={t("common.dry run")}
        description={t("common.description_dry_run")}
      />
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="h-[180px] bg-card border border-border rounded-2xl p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
            <div className="flex justify-between items-center mt-6">
              <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
              <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
