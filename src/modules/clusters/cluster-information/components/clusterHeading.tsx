import { Button } from "@/lib/components/ui/button";
import { Check, ChevronLeft } from "lucide-react";
import { Badge } from "@/lib/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Icons } from "@/lib/components/icons";
import { RefreshButton } from "@/lib/components/ui/RefreshButton";

type ClusterHeadingProps = {
  name: string;
  version?: string;
  ready?: boolean;
  namespace?: string;
  hideDetails?: boolean;
  failureMsg?: string | null;
};

export const ClusterHeading = ({
  name,
  version,
  ready,
  hideDetails,
  namespace,
  failureMsg
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
            className={`ml-auto sm:ml-0 ${failureMsg ?"bg-red-500": "bg-main-500" }  flex items-center text-white`}
          >
            <Icons.k8s className="w-4 h-4 mr-1" />
            {failureMsg ?"Unhealthy": "Healthy" }
          </Badge>


        )}
        {!hideDetails && (
          <Badge
            variant="outline"
            className={`ml-auto sm:ml-0 ${ready ? "bg-green-500" : "bg-yellow-400"}  flex items-center text-white`}
          >
            <Check className="w-4 h-4 mr-1" />
            {ready ? "Ready" : "Unready"}
          </Badge>
        )}

        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <RefreshButton />
        </div>
      </div>
    </>
  );
};
