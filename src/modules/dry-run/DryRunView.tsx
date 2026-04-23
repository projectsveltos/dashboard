import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { DryRunDiffView } from "./components/DryRunDiffView";
import { DryRunClusterSelect } from "./components/DryRunClusterSelect";

export function DryRunView() {
  const { namespace = "", name = "", kind = "" } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Check if we have cluster context from query params
  const clusterType = searchParams.get("type") as "sveltos" | "capi" | null;
  const clusterNamespace = searchParams.get("namespace");
  const clusterName = searchParams.get("cluster");

  const hasClusterContext =
    (clusterType === "sveltos" || clusterType === "capi") &&
    clusterNamespace &&
    clusterName;

  if (hasClusterContext) {
    return (
      <DryRunDiffView
        profileName={name}
        profileKind={kind}
        type={clusterType}
        namespace={clusterNamespace}
        clusterName={clusterName}
        onBack={() => {
          // Navigate back to cluster selection (remove query params)
          if (namespace) {
            navigate(`/sveltos/dry-run/${namespace}/${name}/${kind}`);
          } else {
            navigate(`/sveltos/dry-run/${name}/${kind}`);
          }
        }}
      />
    );
  }

  // Step 1: Show profile info with matching clusters
  return (
    <DryRunClusterSelect
      profileNamespace={namespace}
      profileName={name}
      profileKind={kind}
    />
  );
}
