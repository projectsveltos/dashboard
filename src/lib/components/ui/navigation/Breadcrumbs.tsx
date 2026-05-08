import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs() {
  const { t } = useTranslation();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Map of segments to translation keys or display labels
  const breadcrumbNameMap: Record<string, string> = {
    overview: "common.overview",
    clusters: "common.clusters",
    profiles: "common.profiles",
    events: "common.events",
    cluster: "common.clusters",
    profile: "common.profiles",
    event: "common.events",
    "dry-run": "common.dry run",
    "pull-mode": "enterprise",
  };

  // Segments to completely skip in the UI
  const skipSegments = new Set([
    "sveltos",
    "addon",
    "cluster-wide",
    "capi",
    "sveltoscluster",
    "clusterapi",
  ]);

  // Process segments to build the visible breadcrumbs
  const crumbs = pathnames.reduce<
    { label: string; path: string; isLast: boolean }[]
  >((acc, value, index) => {
    // 1. Skip numeric IDs (pagination)
    if (!isNaN(Number(value))) return acc;

    // 2. Skip specifically blocked technical segments
    if (skipSegments.has(value.toLowerCase())) return acc;

    // 3. Smart Detail Skipping:
    // If parent is 'profile', skip the namespace (index 2) and kind (index 4 or index 3 if namespace missing)
    if (pathnames[1]?.toLowerCase() === "profile") {
      if (index === 2 && pathnames.length > 4) return acc; // Skip namespace in 3-param route
      if (index === 4) return acc; // Skip kind in 3-param route
      if (index === 3 && pathnames.length === 4) return acc; // Skip kind in 2-param route
    }

    // If parent is 'cluster', skip technical tab (index 2) and namespace (index 3)
    if (pathnames[1]?.toLowerCase() === "cluster") {
      if (index === 2 || index === 3) return acc;
    }

    const path = `/${pathnames.slice(0, index + 1).join("/")}`;
    const isLast = index === pathnames.length - 1;

    // 4. Map singular to plural or translate technical names
    const labelKey = breadcrumbNameMap[value.toLowerCase()];
    const label = labelKey ? t(labelKey) : value;

    acc.push({ label, path, isLast });
    return acc;
  }, []);

  return (
    <nav className="flex items-center space-x-1 text-xs font-medium text-muted-foreground mb-4 animate-in fade-in slide-in-from-left-2 duration-300">
      <Link
        to="/sveltos/overview"
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home className="w-3.5 h-3.5 mr-1" />
        Sveltos
      </Link>

      {crumbs.map((crumb, _index) => (
        <div key={crumb.path} className="flex items-center">
          <ChevronRight className="w-3.5 h-3.5 mx-1 text-muted-foreground/40" />
          {crumb.isLast ? (
            <span className="text-foreground font-bold tracking-tight capitalize">
              {crumb.label}
            </span>
          ) : (
            <Link
              to={crumb.path}
              className="hover:text-foreground transition-colors capitalize"
            >
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
