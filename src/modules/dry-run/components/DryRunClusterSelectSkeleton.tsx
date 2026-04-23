export function DryRunClusterSelectSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-slate-200 dark:bg-slate-800 shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-border/50">
          <div className="h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-28 bg-slate-200 dark:bg-slate-800 rounded-[20px]"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="h-14 bg-slate-200 dark:bg-slate-800 border-b border-border" />
        <div className="p-4 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-16 bg-slate-200 dark:bg-slate-800 rounded-xl"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
