import { Icons } from "@/components/icons";
import {
  AvatarRectangle,
  AvatarRectFallback,
} from "@/components/ui/avatar-rectangle";
import { ServerCrash } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const FailedFlag = ({ msg }: { msg?: string | undefined | null }) => {
  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <AvatarRectangle className="h-9 w-9">
            <AvatarRectFallback className={"bg-red-600  text-white"}>
              <Icons.k8s className={"h-6 w-6 animate-pulse"} />
            </AvatarRectFallback>
          </AvatarRectangle>
        </TooltipTrigger>
        <TooltipContent>
          <div className={"inline-flex items-baseline"}>
            <ServerCrash className={"w-3 h-3 mx-1 mt-1"} />
            <p>Unhealthy</p>
          </div>
          <br />

          {msg && <p className={"text-muted-foreground w-24"}>{msg}</p>}
        </TooltipContent>
      </Tooltip>
    </>
  );
};
