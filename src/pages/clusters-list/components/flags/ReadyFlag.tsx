import {
  AvatarRectangle,
  AvatarRectFallback,
} from "@/components/ui/avatar-rectangle";
import { Flag } from "lucide-react";

export const ReadyFlag = () => {
  return (
    <>
      <AvatarRectangle className="h-9 w-9">
        <AvatarRectFallback className={"bg-green-500 text-white"}>
          <Flag className={"h-6 w-6"} />
        </AvatarRectFallback>
      </AvatarRectangle>
    </>
  );
};
