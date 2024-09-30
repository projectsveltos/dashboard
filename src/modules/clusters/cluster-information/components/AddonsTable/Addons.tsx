import { Blocks, File, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AddonsTable } from "@/modules/clusters/cluster-information/components/AddonsTable/AddonsTable";
import { useState } from "react";

import { addonTypes, AddonTypes } from "@/types/addon.types";
import { appConfig } from "@/config/app";

interface ResourceTableProps {
  addonsData: any;
  loading: boolean;

  setPage: (page: number, type: AddonTypes) => void;
}

export function Addons({ addonsData, setPage, loading }: ResourceTableProps) {
  /* Bydefault we show helm charts , this will be hardcoded for now */
  const [activeTab, setActiveTab] = useState<AddonTypes>(AddonTypes.HELM);

  const handleChangeTab = (tab: AddonTypes) => {
    setActiveTab(tab);
    setPage(appConfig.defaultPage, tab);
  };
  return (
    <div className="grid auto-rows-max items-start">
      <main>
        <Tabs
          value={activeTab}
          onValueChange={(value) => handleChangeTab(value as AddonTypes)}
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
              {addonTypes.map((type: AddonTypes) => (
                <TabsContent key={type} value={type}>
                  <AddonsTable
                    type={type}
                    loading={loading}
                    setPage={setPage}
                    data={addonsData[type]}
                  />
                </TabsContent>
              ))}
            </CardContent>
          </Card>
        </Tabs>
      </main>
    </div>
  );
}
