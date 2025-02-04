import { ProfileInfoHeading } from "@/modules/profiles/profile-information/components/ProfileInfo/ProfileInfoHeading";
import { ProfileSpecCard } from "@/modules/profiles/profile-information/components/ProfileInfo/ProfileSpec";
import { ProfileRelations } from "@/modules/profiles/profile-information/components/ProfileRelations/ProfileRelations";
import MatchingClusterTable from "@/modules/profiles/profile-information/components/ClusterTable/MatchingClusterTable";
import useProfileInfo from "@/modules/profiles/profile-information/hooks/useProfileInfo";
import { useParams } from "react-router-dom";
import { LoadingProfile } from "@/modules/profiles/profile-information/components/ProfileInfo/LoadingProfile";

export function ProfileInformation() {
  const { name = "", kind = "" } = useParams();

  const { data, isLoading, isSuccess } = useProfileInfo(name, kind);
  return (
    <>
      {isLoading && <LoadingProfile />}
      {isSuccess && data && (
        <div>
          <ProfileInfoHeading
            name={data.name}
            namespace={data.namespace}
            kind={data.kind}
            tier={data.spec.tier}
          />
          <div className="grid grid-cols-12 gap-2 mt-2">
            <div className="col-span-5">
              <ProfileRelations profile={data} />
            </div>
            <div className="col-span-6">
              <ProfileSpecCard spec={data.spec} />
              <MatchingClusterTable data={data.matchingClusters} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
