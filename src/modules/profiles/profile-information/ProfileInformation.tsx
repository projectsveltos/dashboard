import { ProfileInfoHeading } from "@/modules/profiles/profile-information/components/ProfileInfoHeading";
import { profileInfo } from "@/modules/profiles/profile-information/mock";
import { ProfileSpecCard } from "@/modules/profiles/profile-information/components/ProfileSpec";
import { ProfileRelations } from "@/modules/profiles/profile-information/components/ProfileRelations/ProfileRelations";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlignHorizontalSpaceAround, Box, Cable } from "lucide-react";
import { Diagram } from "beautiful-react-diagrams";
import { Badge } from "@/components/ui/badge";
import MatchingClusterTable from "@/modules/profiles/profile-information/components/ClusterTable/MatchingClusterTable";

export function ProfileInformation() {
  return (
    <>
      <ProfileInfoHeading
        name={profileInfo.name}
        namespace={profileInfo.namespace}
        kind={profileInfo.kind}
        tier={profileInfo.spec.tier}
      />

      <div className="grid grid-cols-12 gap-2 mt-2">
        <div className="col-span-6">
          <ProfileRelations profile={profileInfo} />
        </div>
        <div className="col-span-5">
          <ProfileSpecCard spec={profileInfo.spec} />
          <MatchingClusterTable />
        </div>
      </div>
    </>
  );
}
