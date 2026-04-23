import React from "react";

export function Charts() {
  return (
    <div className="grid grid-cols-1 gap-4 mt-4">
      <div className="bg-card rounded-xl p-4 border border-border">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
              Cluster Health
            </h3>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Aggregate Uptime (Last 30 Days)
            </p>
          </div>
          <span className="text-[10px] font-bold text-mint bg-mint/10 px-2 py-0.5 rounded">
            99.8% AVG
          </span>
        </div>

        {/* Mock Bar Chart */}
        <div className="h-48 flex items-end justify-between space-x-1 sm:space-x-1.5">
          {[...Array(30)].map((_, i) => {
            const height =
              i === 4
                ? "40%"
                : i === 12
                  ? "50%"
                  : `${75 + Math.random() * 25}%`;
            const colorClass =
              i === 4 || i === 12 ? "bg-coral/80" : "bg-primary/60";

            return (
              <div key={i} className="w-full flex flex-col justify-end h-full">
                <div
                  className={`${colorClass} w-full rounded-t-sm transition-all duration-500 hover:bg-primary/80`}
                  style={{ height }}
                ></div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-[8px] uppercase font-bold text-muted-foreground tracking-widest px-1">
          <span>30D AGO</span>
          <span>TODAY</span>
        </div>
      </div>
    </div>
  );
}
