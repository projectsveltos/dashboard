import {
  AvatarRectangle,
  AvatarRectFallback,
} from "@/components/ui/avatar-rectangle";
import { FlagOff } from "lucide-react";

export const FailedFlag = () => {
  return (
    <>
      <AvatarRectangle className="h-9 w-9">
        <AvatarRectFallback className={"bg-red-600 text-white"}>
          <FlagOff className={"h-6 w-6"} />
        </AvatarRectFallback>
      </AvatarRectangle>
    </>
  );
};
