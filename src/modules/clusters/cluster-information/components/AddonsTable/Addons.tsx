import { Blocks, File, PlusCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelmReleaseType } from "@/types/helm.types";
import { AddonsTable } from "@/modules/clusters/cluster-information/components/AddonsTable/AddonsTable";
import { Key, useState } from "react";

interface ResourceTableProps {
  addonsData: any;
  addonTypes: any;
}

export function Addons({ addonsData, addonTypes }: ResourceTableProps) {
  const [activeTab, setActiveTab] = useState(addonTypes[0].value);
  return (
    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
      <main>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value)}
          orientation="vertical"
        >
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle className={"flex items-center"}>
                <Blocks className={"w-4 h-4"} /> Addons
              </CardTitle>
              <CardDescription>
                Manage the cluster addons and resources
                <div className="flex items-center">
                  <div className="ml-auto flex items-center gap-2">
                    <Button size="sm" variant="outline" className="h-7 gap-1">
                      <File className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Export
                      </span>
                    </Button>
                    <Button disabled size="sm" className="h-7 gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Addon
                      </span>
                    </Button>
                  </div>
                </div>
              </CardDescription>
            </CardHeader>

            <CardContent>
              <TabsList>
                {addonTypes.map((tab: any) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {addonTypes.map((type: any) => (
                <TabsContent key={type} value={type.value}>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead></TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Namespace</TableHead>
                        <TableHead className={"hidden sm:table-cell"}>
                          Version
                        </TableHead>
                        {/*<TableHead className={"hidden sm:table-cell"}>repo</TableHead>*/}
                        <TableHead className={"hidden sm:table-cell"}>
                          Last Applied
                        </TableHead>
                        <TableHead className={"hidden sm:table-cell"}>
                          Profile
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AddonsTable
                        type={type.value}
                        data={addonsData[type.value]}
                      />
                    </TableBody>
                  </Table>
                </TabsContent>
              ))}
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>4</strong> addons
              </div>
            </CardFooter>
          </Card>
        </Tabs>
      </main>
    </div>
  );
}
