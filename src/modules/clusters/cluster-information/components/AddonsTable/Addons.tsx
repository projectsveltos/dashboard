import { Blocks, File, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AddonsTable } from "@/modules/clusters/cluster-information/components/AddonsTable/AddonsTable";
import { useMemo, useState } from "react";

import { AddonTypes } from "@/types/addon.types";

interface ResourceTableProps {
  addonsData: any;
  addonTypes: any;
}

export function Addons({ addonsData, addonTypes }: ResourceTableProps) {
  const [activeTab, setActiveTab] = useState(addonTypes[0]);

  const totalElements = useMemo(() => {
    if (activeTab === AddonTypes.HELM) {
      return addonsData.totalHelmReleases;
    } else if (activeTab === AddonTypes.RESOURCE) {
      return addonsData.totalClusters;
    } else {
      throw new Error("No Tab matches the selected value.");
    }
  }, [activeTab, addonsData]);

  return (
    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
      <main>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value)}
          orientation="vertical"
        >
          <Card>
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
                    key={tab}
                    value={tab}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
              {addonTypes.map((type: any) => (
                <TabsContent className={"w-[800px] "} key={type} value={type}>
                  <AddonsTable
                    type={type}
                    data={addonsData[type]}
                    total={totalElements}
                  />
                </TabsContent>
              ))}
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </Tabs>
      </main>
    </div>
  );
}
