
import { CircleOff, FilterX, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "react-query";
import { RefreshButton } from "@/components/ui/RefreshButton";

type EmptyDataProps = {
  name: string;
  isFiltered?: boolean;
  clearFilter?: () => void;
  refreshKey?: string;
}

export const EmptyData = ({name,isFiltered,clearFilter,refreshKey}:EmptyDataProps) => {
  const queryClient = useQueryClient();
 const handleRefresh = () => {

   queryClient.invalidateQueries()

  }
  return (
    <>
      <div className="w-full flex items-center mt-5 flex-wrap justify-center gap-10">
        <div className="grid gap-4 w-60">
          <div className="w-20 h-20 mx-auto bg-slate-50 dark:bg-slate-800 rounded-full shadow-sm justify-center items-center inline-flex">
      <CircleOff className="w-10 h-10 text-gray-500" />
          </div>
          <div>
            <h2 className="text-center  text-base font-semibold leading-relaxed pb-1">
              There’s no {name} here
            </h2>
            <p className="text-center  text-sm font-normal leading-snug pb-4">
              {isFiltered
                ? "Try changing the filter criteria or clear the filter"
                : "Try refreshing the page or check back later"}

            </p>
            <div className="flex gap-3">
              {isFiltered && (
                <Button onClick={clearFilter}>
                  <FilterX className="w-4 h-4 mr-2" /> Clear Filter
                </Button>
              )}
              <RefreshButton className={isFiltered?"":"w-60"}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
