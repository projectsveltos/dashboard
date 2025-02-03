import { Button } from "@/lib/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/lib/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Icons } from "@/lib/components/icons";
import { RefreshButton } from "@/lib/components/ui/RefreshButton";

type ClusterHeadingProps = {
  name: string;
  version?: string;
  status?: boolean;
  namespace?: string;
  hideDetails?: boolean;
};

export const ClusterHeading = ({
  name,
  version,
  status,
  hideDetails,
  namespace,
}: ClusterHeadingProps) => {
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
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {name}
        </h1>
        {version && !hideDetails && (
          <Badge
            variant="outline"
            className="ml-auto sm:ml-0  flex items-center "
          >
            version : {version}
          </Badge>
        )}
        <Badge
          variant="outline"
          className="ml-auto sm:ml-0  flex items-center "
        >
          namespace : {namespace}
        </Badge>
        {!hideDetails && (
          <Badge
            variant="outline"
            className={`ml-auto sm:ml-0 ${status ? "bg-main-500" : "bg-red-500"}  flex items-center text-white`}
          >
            <Icons.k8s className="w-4 h-4 mr-1" />
            {status ? "Healthy" : "Failed"}
          </Badge>
        )}

        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <RefreshButton />
        </div>
      </div>
    </>
  );
};
