import { Blocks, File, PlusCircle } from "lucide-react";

import { Button } from "@/lib/components/ui/inputs/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/data-display/card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/lib/components/ui/navigation/tabs";

import { AddonsTable } from "@/modules/clusters/cluster-information/components/addonsTable/AddonsTable";
import { useSearchParams } from "react-router-dom";

import {
  AddonTableData,
  addonTypes,
  AddonTypes,
  TableAddonTypes,
} from "@/types/addon.types";
import { appConfig } from "@/config/app";
import { SearchQueryParamInput } from "@/lib/components/ui/inputs/SearchQueryParamInput";
import { getSearchConfig } from "@/modules/clusters/cluster-information/components/addonsTable/utils/addonsTableUtils";
import { ClusterHealthView } from "@/modules/clusters/cluster-information/components/ClusterHealthView";
import { omitSearchParams } from "@/utils/pickSearchParams";
import {
  ADDONS_TAB_PARAM,
  addonTabFromParam,
  addonTabSlug,
} from "@/utils/addonTabs";
import { useTranslation } from "react-i18next";

interface ResourceTableProps {
  addonsData: Record<TableAddonTypes, AddonTableData>;
  loading: boolean;

  setPage: (page: number, type: TableAddonTypes) => void;
}

export function Addons({ addonsData, setPage, loading }: ResourceTableProps) {
  const { t } = useTranslation();
  /* The tab is in the URL, so it can be linked to. By default, we show helm charts */
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = addonTabFromParam(searchParams.get(ADDONS_TAB_PARAM));

  const handleChangeTab = (tab: AddonTypes) => {
    // The filters belong to the tab being left: some tabs share filters (a profile health badge opens the
    // unhealthy resources already filtered by profile), which must not follow the user back to the Profiles tab
    const next = omitSearchParams(getSearchConfig(activeTab), searchParams);
    next.set(ADDONS_TAB_PARAM, addonTabSlug(tab));
    setSearchParams(next, { replace: true });
    // The unhealthy resources tab keeps its own page
    if (tab !== AddonTypes.UNHEALTHY) {
      setPage(appConfig.defaultPage, tab);
    }
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
                <Blocks className={"w-4 h-4"} /> {t("common.addons")}
              </CardTitle>
              <CardDescription>
                {t("common.manage_addons")}
                <div className="flex items-center">
                  <div className="ml-auto flex items-center gap-2">
                    <Button size="sm" variant="outline" className="h-7 gap-1">
                      <File className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        {t("common.export")}
                      </span>
                    </Button>
                    <Button disabled size="sm" className="h-7 gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        {t("common.add_addon")}
                      </span>
                    </Button>
                  </div>
                </div>
              </CardDescription>
            </CardHeader>

            <CardContent>
              <TabsList>
                {addonTypes.map((tab: AddonTypes) => (
                  <TabsTrigger key={tab} value={tab}>
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Remounted per tab, so its fields start from the URL (a badge can open a tab already filtered) */}
              <SearchQueryParamInput
                key={activeTab}
                searchConfig={getSearchConfig(activeTab)}
              />
              {addonTypes.map((type: AddonTypes) => (
                <TabsContent key={type} value={type}>
                  {type === AddonTypes.UNHEALTHY ? (
                    <ClusterHealthView />
                  ) : (
                    <AddonsTable
                      type={type}
                      loading={loading}
                      setPage={setPage}
                      data={addonsData[type]}
                    />
                  )}
                </TabsContent>
              ))}
            </CardContent>
          </Card>
        </Tabs>
      </main>
    </div>
  );
}
