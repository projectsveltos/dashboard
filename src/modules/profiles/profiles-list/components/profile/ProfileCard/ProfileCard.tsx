import { Card } from "@/lib/components/ui/card";
import { TableCellsMerge } from "lucide-react";
import { Profile } from "@/types/profile.types";
import { useNavigate } from "react-router-dom";

export function ProfileCard({ profile }: { profile: Profile }) {
  const navigate = useNavigate();
  function handleNavigation() {
    if (profile.namespace) {
      navigate(`/sveltos/profile/${profile.namespace}/${profile.name}/${profile.kind}`);
    } else {
      navigate(`/sveltos/profile/${profile.name}/${profile.kind}`);
    }
  }
  return (
    <Card
      onClick={handleNavigation}
      className="w-full  hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer"
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
