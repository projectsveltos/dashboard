import React, { useCallback, useMemo } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
} from "@xyflow/react";

import "@xyflow/react/dist/base.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cable, File, Fullscreen, PlusCircle } from "lucide-react";
import { DependencyNode } from "@/modules/profiles/profile-information/components/ProfileRelations/Nodes/DependencyNode";
import { DependentsNode } from "@/modules/profiles/profile-information/components/ProfileRelations/Nodes/DependentsNode";
import { ClusterNode } from "@/modules/profiles/profile-information/components/ProfileRelations/Nodes/ClusterNode";
import { Button } from "@/components/ui/button";
import { Dependency } from "@/types/profile.types";

const nodeTypes = {
  custom: ClusterNode,
  dependents: DependentsNode,
  dependencies: DependencyNode,
};

export function ProfileRelations({
  profile,
}: {
  profile: {
    name: string;
    apiVersion?: string;
    dependencies: Dependency[];
    dependents: Dependency[];
    matchingClusters: { cluster: { name: string } }[];
  };
}) {
  if (!profile) {
    alert("No profile found");
    return null;
  }

  const initNodes = useMemo(() => {
    const nodes = [
      {
        id: "profile",
        type: "custom",
        data: {
          name: profile.name,
          kind: "Profile",
          apiVersion: profile?.apiVersion,
        },
        position: { x: 0, y: 0 },
      },
    ];
    // TODO if more than 4 clusters , should add it on bottom
    const horizontalSpacing = 200;
    const verticalSpacing = 120;

    profile.dependents.forEach((dep, index) => {
      nodes.push({
        id: `depends-${index}`,
        type: "dependents",
        data: { name: dep.name, kind: dep.kind, apiVersion: dep.apiVersion },
        position: {
          x:
            -((profile.dependents.length - 1) / 2) * horizontalSpacing +
            index * horizontalSpacing,
          y: -verticalSpacing, // Position above the profile
        },
      });
    });

    profile.dependencies.forEach((dep, index) => {
      nodes.push({
        id: `dependency-${index}`,
        type: "dependencies",

        data: { name: dep.name, kind: dep.kind, apiVersion: dep.apiVersion },
        position: {
          x:
            -((profile.dependencies.length - 1) / 2) * horizontalSpacing +
            index * horizontalSpacing,
          y: verticalSpacing,
        },
      });
    });

    return nodes;
  }, [profile]);

  const initEdges = useMemo(() => {
    const edges: any[] = [];

    profile.dependencies.forEach((_, index) => {
      edges.push({
        id: `e-profile-dependencies-${index}`,
        target: "profile",
        source: `dependency-${index}`,
      });
    });

    profile.dependents.forEach((_, index) => {
      edges.push({
        id: `e-profile-dep-${index}`,
        source: "profile",
        animated: true,
        target: `depends-${index}`,
      });
    });

    return edges;
  }, [profile]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  return (
    <div>
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className={"flex items-center"}>
            <Cable className={"w-4 h-4 mx-0.5"} /> Profile
          </CardTitle>
          <CardDescription>
            Profile specifications for the selected profile
            <div className="flex items-center">
              <div className="ml-auto flex items-center gap-2">
                <Button size="sm" variant="outline" className="h-7 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
                <Button
                  disabled
                  variant={"secondary"}
                  size="sm"
                  className="h-7 gap-1"
                >
                  <Fullscreen className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Drag And Drop
                  </span>
                </Button>
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            style={{
              height: "40rem",
              width: "100%",
              overflow: "auto",
            }}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              fitView
              className="bg-primary/5"
            >
              <MiniMap />
              <Controls />
            </ReactFlow>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
