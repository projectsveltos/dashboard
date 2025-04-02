import React from "react";
import { Handle, Position } from "@xyflow/react";
import { CircleHelp, Package } from "lucide-react";
import { Dependency } from "@/types/profile.types";
import { useNavigate } from "react-router-dom";

export function DependentsNode({ data }: { data: Dependency }) {
  const navigate = useNavigate();
  function handleNavigation() {
    if (data.namespace) {
      navigate(`/sveltos/profile/${data.namespace}/${data.name}/${data.kind}`);
    } else {
      navigate(`/sveltos/profile/${data.name}/${data.kind}`);
    }
  }

  return (
    <div
      onClick={handleNavigation}
      className=" bg-card hover:bg-slate-200 hover:dark:bg-slate-800 flex cursor-pointer items-center text-slate-600 space-x-4 rounded-md border p-4"
    >
      <Package />
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none text-slate-600">
          {data?.name}
        </p>
        <p className="text-sm flex text-muted-foreground">
          {data?.kind} <CircleHelp size={15} className={"mx-1 mt-0.5"} />
        </p>
      </div>

      <Handle
        type="target"
        position={Position.Bottom}
        className="w-20 !bg-slate-600"
      >
        <p className="text-xs flex text-white mx-auto px-2">dependents</p>
      </Handle>
    </div>
  );
}
