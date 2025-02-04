import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Boxes, CircleHelp } from "lucide-react";

interface DependencyNodeProps {
  name: string;
  kind: string;
  apiVersion: string;
}
export function ClusterNode({ data }: { data: DependencyNodeProps }) {
  return (
    <div className=" bg-card flex text-primary  border-primary items-center space-x-4 rounded-md border p-4">
      <Boxes />

      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none text-primary">
          {data?.name}
        </p>
        <p className="text-sm flex text-muted-foreground">
          {data?.kind} <CircleHelp size={15} className={"mx-4"} />
        </p>
      </div>

      <Handle
        type="source"
        position={Position.Top}
        className="w-16 !bg-primary"
      />
      <Handle
        type="target"
        position={Position.Bottom}
        className="w-16 !bg-primary"
      />
    </div>
  );
}
