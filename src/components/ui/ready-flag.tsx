import {
  AvatarRectangle,
  AvatarRectFallback,
} from "@/components/ui/avatar-rectangle";
import { Icons } from "@/components/icons";

export const ReadyFlag = () => {
  return (
    <>
      <AvatarRectangle className="h-9 w-9">
        <AvatarRectFallback className={"bg-k8s-500 text-white"}>
          <Icons.k8s className={"h-6 w-6"} />
        </AvatarRectFallback>
      </AvatarRectangle>
    </>
  );
};
