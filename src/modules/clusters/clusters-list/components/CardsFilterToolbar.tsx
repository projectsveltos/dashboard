import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { CardsFacetedFilter } from "@/modules/clusters/clusters-list/components/CardsFacetedFilter";
import { RefreshButton } from "@/components/ui/RefreshButton";

export const CardsFilterToolbar = () => {
  const [isFiltered, setIsFiltered] = useState(false);
  return (
    <>
      <div className="flex  space-x-2">
        <div className="flex items-center ">
          <div className="flex flex-1 items-center space-x-2">
            {/*<CardsFacetedFilter*/}
            {/*  title={"Labels"}*/}
            {/*  options={[*/}
            {/*    { label: "Active", value: "active" },*/}
            {/*    { label: "Inactive", value: "inactive" },*/}
            {/*  ]}*/}
            {/*/>*/}
            {/*<CardsFacetedFilter*/}
            {/*  title={"Status"}*/}
            {/*  options={[*/}
            {/*    { label: "All", value: "all" },*/}
            {/*    { label: "Active", value: "active" },*/}
            {/*    { label: "Inactive", value: "inactive" },*/}
            {/*  ]}*/}
            {/*/>*/}
            <RefreshButton className={"w-26 h-8 "} />
            {isFiltered && (
              <Button variant="ghost" className="h-8 px-2 lg:px-3">
                Reset
                <Cross2Icon className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
