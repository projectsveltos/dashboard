import React from "react";
import { Tag, ArrowRight, ExternalLink, GitBranch } from "lucide-react";
import { useGitHubReleases } from "../hooks/useGitHubReleases";

export function LatestReleases() {
  const { data: releases, isLoading, isError } = useGitHubReleases();

  if (isError) return null;

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden flex flex-col h-full">
      <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-primary" />
          <h2 className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
            Latest Releases
          </h2>
        </div>
        <a 
          href="https://github.com/projectsveltos/sveltos/releases" 
          target="_blank" 
          rel="noreferrer"
          className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1 uppercase tracking-wider"
        >
          GitHub <ExternalLink className="w-3 h-3" />
        </a>
      </div>
      <div className="p-4 flex flex-col gap-3 flex-1 min-h-[300px]">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse flex flex-col p-3 rounded-lg border border-border bg-card/50">
              <div className="h-2 bg-muted rounded w-1/4 mb-2" />
              <div className="h-4 bg-muted rounded w-3/4 mb-2" />
              <div className="h-3 bg-muted rounded w-full" />
            </div>
          ))
        ) : (
          releases?.map((release) => (
            <a
              key={release.id}
              href={release.html_url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col p-3 rounded-lg border border-border bg-card/50 hover:bg-accent/40 hover:border-primary/20 transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <Tag className="w-3 h-3 text-primary" />
                  <span className="text-[10px] font-black text-primary uppercase tracking-wider">
                    {release.tag_name}
                  </span>
                </div>
                <span className="text-[9px] text-muted-foreground font-medium">
                  {new Date(release.published_at).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {release.name || release.tag_name}
              </h3>
              <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                {release.body?.replace(/[#*`]/g, "").slice(0, 150)}...
              </p>
              <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-[-4px] group-hover:translate-x-0">
                View Release Notes <ArrowRight className="w-3 h-3" />
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
