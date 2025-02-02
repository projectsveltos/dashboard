import React from "react";
import { Handle, Position } from "@xyflow/react";
import { ArchiveRestore, CircleHelp } from "lucide-react";

interface DependencyNodeProps {
  name: string;
  kind: string;
  apiVersion: string;
}
export function DependencyNode({ data }: { data: DependencyNodeProps }) {
  return (
    <div className=" bg-card flex items-center space-x-4 text-orange-500 rounded-md border p-4">
      <ArchiveRestore />
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none text-orange-500">
          {data?.name}
        </p>
        <p className="text-sm flex text-muted-foreground">
          {data?.kind} <CircleHelp size={15} className={"mx-1 mt-0.5"} />
        </p>
      </div>

      <Handle
        type="source"
        position={Position.Top}
        className="w-20 !bg-orange-500 border rounded-sm text-sm"
      >
        <p className="text-xs flex text-white mx-auto px-2">dependency</p>
      </Handle>
    </div>
  );
}
