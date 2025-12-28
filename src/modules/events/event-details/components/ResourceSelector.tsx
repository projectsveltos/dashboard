import { useState, useEffect } from "react";
import { Box, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/data-display/card";
import { EventSource } from "@/types/event.types";

export function ResourceSelectorView({
  eventSource,
}: {
  eventSource?: EventSource;
}) {
  const resourceSelectors = eventSource?.spec?.resourceSelectors || [];
  const isCollectResources = eventSource?.spec?.collectResources ?? false;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (resourceSelectors.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % resourceSelectors.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [resourceSelectors.length]);

  if (resourceSelectors.length === 0) {
    return (
      <Card className="bg-card/50 border-border/40">
        <CardContent className="p-4 text-sm text-muted-foreground">
          No resource selectors defined.
        </CardContent>
      </Card>
    );
  }

  const sel = resourceSelectors[currentIndex];

  return (
    <div className="space-y-2 group">
      <div className="relative">
        <Card className="bg-card/50 border-border/40">
          <CardHeader className="py-3 px-4 border-b border-border/40">
            <CardTitle className="text-xs font-mono uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
              <Box className="h-3 w-3" />
              Resource Selector{" "}
              {resourceSelectors.length > 1 &&
                `(${currentIndex + 1}/${resourceSelectors.length})`}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] text-muted-foreground uppercase font-semibold">
                  Kind
                </p>
                <p className="text-sm font-mono text-primary">
                  {sel.kind || "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-muted-foreground uppercase font-semibold">
                  Group
                </p>
                <p className="text-sm font-mono">{sel.group || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-muted-foreground uppercase font-semibold">
                  API Version
                </p>
                <p className="text-sm font-mono">{sel.version || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2
                className={`h-4 w-4 ${isCollectResources ? "text-green-500" : "text-slate-500"}`}
              />
              <span>
                {isCollectResources
                  ? "Resource collection is enabled"
                  : "Resource collection is disabled"}
              </span>
            </div>
          </CardContent>
        </Card>

        {resourceSelectors.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrentIndex(
                  (prev) =>
                    (prev - 1 + resourceSelectors.length) %
                    resourceSelectors.length,
                )
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/80 hover:bg-background shadow-sm border opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() =>
                setCurrentIndex((prev) => (prev + 1) % resourceSelectors.length)
              }
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/80 hover:bg-background shadow-sm border opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
      {resourceSelectors.length > 1 && (
        <div className="flex justify-center gap-1.5">
          {resourceSelectors.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentIndex
                  ? "w-4 bg-primary"
                  : "w-1.5 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
