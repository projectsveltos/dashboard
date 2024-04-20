import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { CardsFacetedFilter } from "@/pages/clusters-list/components/CardsFacetedFilter";

export const CardsFilterToolbar = () => {
  const [isFiltered, setIsFiltered] = useState(false);
  return (
    <>
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 items-center space-x-2">
            <Input
              placeholder="Filter... "
              className="h-8 w-[150px] lg:w-[250px]"
            />

            <CardsFacetedFilter
              title={"Labels"}
              options={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
            />
            <CardsFacetedFilter
              title={"Status"}
              options={[
                { label: "All", value: "all" },
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
            />
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
