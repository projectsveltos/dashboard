import {
  AvatarRectangle,
  AvatarRectFallback,
} from "@/lib/components/ui/data-display/avatar-rectangle";
import { Icons } from "@/lib/components/icons";
import { SquareCheck } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/lib/components/ui/data-display/tooltip";

export const ReadyFlag = () => {
  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <AvatarRectangle className="h-9 w-9">
            <AvatarRectFallback className={"bg-k8s-500  text-white"}>
              <Icons.k8s className={"h-6 w-6 hover:animate-spin"} />
            </AvatarRectFallback>
          </AvatarRectangle>
        </TooltipTrigger>
        <TooltipContent>
          <div className={"inline-flex items-baseline"}>
            <SquareCheck className={"w-3 h-3 mx-1 mt-1"} />
            <p>Healthy</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </>
  );
};
