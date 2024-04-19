import { Icons } from "@/components/icons";
import {
  AvatarRectangle,
  AvatarRectFallback,
} from "@/components/ui/avatar-rectangle";
import {
  AlertCircle,
  AlertCircleIcon,
  FlagOff,
  MessageSquareWarningIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const FailedFlag = () => {
  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <AvatarRectangle className="h-9 w-9">
            <AvatarRectFallback className={"bg-red-600 text-white"}>
              <Icons.k8s className={"h-6 w-6"} />
            </AvatarRectFallback>
          </AvatarRectangle>
        </TooltipTrigger>
        <TooltipContent>
          <div className={"inline-flex items-baseline"}>
            <AlertCircleIcon />
            <p>Unhealthy</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </>
  );
};
