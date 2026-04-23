import { ProfileInfoHeading } from "@/modules/profiles/profile-information/components/ProfileInfo/ProfileInfoHeading";
import { ProfileSpecCard } from "@/modules/profiles/profile-information/components/ProfileInfo/ProfileSpec";
import { ProfileRelations } from "@/modules/profiles/profile-information/components/ProfileRelations/ProfileRelations";
import MatchingClusterTable from "@/modules/profiles/profile-information/components/ClusterTable/MatchingClusterTable";
import useProfileInfo from "@/modules/profiles/profile-information/hooks/useProfileInfo";
import { useParams } from "react-router-dom";
import { LoadingPage } from "@/lib/components/ui/feedback/LoadingPage";

export function ProfileInformation() {
  const { namespace = "", name = "", kind = "" } = useParams();

  const { data, isLoading, isSuccess } = useProfileInfo(namespace, name, kind);
  return (
    <>
      {isLoading && <LoadingPage />}
      {isSuccess && data && (
        <div>
          <ProfileInfoHeading
            name={data.name}
            namespace={data.namespace}
            kind={data.kind}
            tier={data.spec.tier}
          />
          <div className="grid grid-cols-12 gap-3 mt-4">
            <div className="col-span-7 space-y-4">
              <ProfileSpecCard
                spec={data.spec}
                className="bg-card-muted border-primary/10"
              />
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="px-4 py-3 border-b border-border bg-muted/30">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/70 flex items-center">
                    Matching Clusters
                  </h3>
                </div>
                <MatchingClusterTable data={data?.matchingClusters ?? []} />
              </div>
            </div>
            <div className="col-span-5">
              <ProfileRelations profile={data} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
