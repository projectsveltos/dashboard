export function DryRunSkeleton() {
  return (
    <div className="flex h-[calc(100vh-100px)] flex-col gap-6 overflow-hidden animate-pulse">
      {/* Top Review Bar Skeleton */}
      <div className="flex items-center justify-between bg-card border border-border p-4 rounded-2xl">
        <div className="flex items-center gap-4">
          <div className="h-9 w-9 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="space-y-2">
            <div className="h-5 w-48 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-3 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        </div>
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Left Sidebar Skeleton */}
        <div className="w-[320px] flex flex-col bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border bg-zinc-50/50 dark:bg-zinc-900/30">
            <div className="h-8 w-full bg-slate-200 dark:bg-slate-800 rounded-lg" />
          </div>
          <div className="flex-1 p-2 space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-full p-3 rounded-xl flex items-start gap-3"
              >
                <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="flex gap-2">
                    <div className="h-3 w-1/3 bg-slate-200 dark:bg-slate-800 rounded" />
                    <div className="h-3 w-1/4 bg-slate-200 dark:bg-slate-800 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1 flex flex-col bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-border bg-zinc-50/50 dark:bg-zinc-900/30">
            <div className="flex justify-between items-center mb-4">
              <div className="h-6 w-1/3 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded-full" />
            </div>
            <div className="flex gap-6">
              <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          </div>
          <div className="flex-1 p-6 space-y-4">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className={`h-4 bg-slate-200 dark:bg-slate-800 rounded ${i % 2 === 0 ? "w-3/4" : "w-full"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
