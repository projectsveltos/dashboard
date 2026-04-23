import React from "react";
import { StatCards } from "./components/StatCards";
import { Charts } from "./components/Charts";
import { RecentEventsTable } from "./components/RecentEventsTable";

export function OverviewPage() {
  return (
    <div className="w-full flex flex-col space-y-4 animate-in slide-in-from-bottom border-transparent overflow-x-hidden">
      {/* Page Header */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between border-b-0 pb-1 space-y-3 xl:space-y-0">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-foreground">
            Overview
          </h1>
          <p className="text-muted-foreground mt-0.5 text-xs md:text-sm">
            Real-time synchronization status across 42 active clusters.
          </p>
        </div>
        <div className="flex items-center px-3 py-1.5 border border-border bg-sidebar rounded-md">
          <span className="h-2 w-2 rounded-full bg-teal-400 mr-2 animate-pulse shrink-0"></span>
          <span className="text-[10px] font-semibold tracking-wider text-teal-400 uppercase whitespace-nowrap">
            System Live
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <StatCards />

      {/* Charts Row */}
      <Charts />

      {/* Tables Row */}
      <div className="mt-4 bg-card-muted rounded-xl border border-border w-full">
        <div className="px-6 py-3 border-b border-border bg-muted/30">
          <h2 className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
            Recent Events
          </h2>
        </div>
        <div className="p-0 overflow-x-auto">
          <RecentEventsTable />
        </div>
      </div>
    </div>
  );
}
