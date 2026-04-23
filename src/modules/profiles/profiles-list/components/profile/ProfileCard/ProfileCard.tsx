import { Card } from "@/lib/components/ui/data-display/card";
import { TableCellsMerge } from "lucide-react";
import { Profile } from "@/types/profile.types";
import { useNavigate } from "react-router-dom";

export function ProfileCard({
  profile,
  dryRun,
}: {
  profile: Profile;
  dryRun?: boolean;
}) {
  const navigate = useNavigate();
  function handleNavigation() {
    if (dryRun) {
      if (profile.namespace) {
        navigate(
          `/sveltos/dry-run/${profile.namespace}/${profile.name}/${profile.kind}`,
        );
      } else {
        navigate(`/sveltos/dry-run/${profile.name}/${profile.kind}`);
      }
      return;
    }

    if (profile.namespace) {
      navigate(
        `/sveltos/profile/${profile.namespace}/${profile.name}/${profile.kind}`,
      );
    } else {
      navigate(`/sveltos/profile/${profile.name}/${profile.kind}`);
    }
  }
  return (
    <Card
      onClick={handleNavigation}
      className="w-full hover:bg-accent/50 hover:border-primary/50 transition-all cursor-pointer group"
    >
      <div className="flex items-center space-x-4 rounded-md p-4">
        <TableCellsMerge className={"w-6 h-6"} />
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">{profile?.name}</p>
        </div>
      </div>
    </Card>
  );
}
