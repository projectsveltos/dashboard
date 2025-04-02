import React, { useCallback, useMemo } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Connection,
  Edge,
} from "@xyflow/react";

import "@xyflow/react/dist/base.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";
import { Cable, File, Fullscreen } from "lucide-react";
import { DependencyNode } from "@/modules/profiles/profile-information/components/ProfileRelations/Nodes/DependencyNode";
import { DependentsNode } from "@/modules/profiles/profile-information/components/ProfileRelations/Nodes/DependentsNode";
import { ClusterNode } from "@/modules/profiles/profile-information/components/ProfileRelations/Nodes/ClusterNode";
import { Button } from "@/lib/components/ui/button";
import { Dependency } from "@/types/profile.types";
import { Badge } from "@/lib/components/ui/badge";

const nodeTypes = {
  custom: ClusterNode,
  dependents: DependentsNode,
  dependencies: DependencyNode,
};

export function ProfileRelations({
  profile,
}: {
  profile: {
    kind: string,
    namespace: string,
    name: string;
    apiVersion?: string;
    dependencies: Dependency[];
    dependents: Dependency[];
    matchingClusters: { cluster: { name: string } }[];
  };
}) {
  const initEdges = useMemo(() => {
    const edges: Edge[] = [];

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
  const initNodes = useMemo(() => {
    const nodes = [
      {
        id: "profile",
        type: "custom",
        data: {
          name: profile.name,
          kind: profile.kind,
          apiVersion: profile?.apiVersion,
        },
        position: { x: 0, y: 0 },
      },
    ];

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

  const [nodes, _setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  if (!profile) {
    alert("No profile found");
    return null;
  }

  return (
    <div>
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className={"flex items-center"}>
            <Cable className={"w-4 h-4 mx-0.5"} /> Profile
            <div className=" flex ml-auto gap-2 ">
              <Badge variant={"label"} className={" "}>
                Total dependents: {profile.dependents.length}
              </Badge>
              <Badge variant={"label"}>
                Total dependencies: {profile.dependencies.length}
              </Badge>
            </div>
          </CardTitle>
          <CardDescription>
            Profile associations with linked dependents and dependencies within
            the cluster.
            <div className="flex items-center my-2">
              <span className={"ml-auto flex items-center gap-2"}>
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
              </span>
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
              <Controls />
            </ReactFlow>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
