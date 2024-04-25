import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronLeft, RefreshCcw, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Icons } from "@/components/icons";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";

type ClusterHeadingProps = {
  name: string;
  version: string;
  status: boolean;
};

export const ClusterHeading = ({
  name,
  version,
  status,
}: ClusterHeadingProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center gap-4">
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
        <Badge
          variant="outline"
          className="ml-auto sm:ml-0  flex items-center "
        >
          version : {version}
        </Badge>
        <Badge
          variant="outline"
          className={`ml-auto sm:ml-0 ${status ? "bg-main-500" : "bg-red-500"}  flex items-center text-white`}
        >
          <Icons.k8s className="w-4 h-4 mr-1" />
          {status ? "Healthy" : "Failed"}
        </Badge>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant="outline" size="sm">
            <RefreshCcw className={"w-3 h-3 mx-1"} /> Refresh
          </Button>
        </div>
      </div>
    </>
  );
};
