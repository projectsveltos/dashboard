import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { RefreshButton } from "@/components/ui/RefreshButton";

type ProfileInfoHeading = {
  name: string;
  kind?: string;
  namespace?: string;
  tier?: string | number;
};

export const ProfileInfoHeading = ({
  name,
  kind,
  tier,
  namespace,
}: ProfileInfoHeading) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex my-4 items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <Badge
          variant="default"
          className="ml-auto sm:ml-0  flex items-center "
        >
          Tier : {tier}
        </Badge>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {name || namespace}
        </h1>
        {kind && (
          <Badge
            variant="outline"
            className="ml-auto sm:ml-0  flex items-center "
          >
            kind : {kind}
          </Badge>
        )}
        {namespace && (
          <Badge
            variant="outline"
            className="ml-auto sm:ml-0  flex items-center "
          >
            namespace : {namespace}
          </Badge>
        )}

        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <RefreshButton />
        </div>
      </div>
    </>
  );
};
