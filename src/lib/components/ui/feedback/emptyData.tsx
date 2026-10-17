import { FilterX } from "lucide-react";
import { Button } from "@/lib/components/ui/inputs/button";
import { RefreshButton } from "@/modules/common/components/actions/RefreshButton";
import mascot from "@/assets/admiral-sveltopus.png";

type EmptyDataProps = {
  name: string;
  isFiltered?: boolean;
  clearFilter?: () => void;
};

export const EmptyData = ({
  name,
  isFiltered,
  clearFilter,
}: EmptyDataProps) => {
  return (
    <>
      <div className="w-full mt-16 flex items-center flex-wrap justify-center gap-10">
        <div className="grid gap-4 w-64">
          {/* Decorative: the text below says what is missing */}
          <img src={mascot} alt="" className="w-32 h-32 mx-auto" />
          <div>
            <h2 className="text-center  text-base font-semibold leading-relaxed pb-1">
              There’s no {name} found.
            </h2>
            <div className="text-base font-normal leading-snug pb-4">
              <ul>
                {isFiltered && (
                  <li>Try changing the filter criteria or clear the filter</li>
                )}
                <li>Try refreshing the page or check back later</li>
              </ul>
            </div>
            <div className="flex gap-3">
              {isFiltered && (
                <Button onClick={clearFilter}>
                  <FilterX className="w-4 h-4 mr-2" /> Clear Filter
                </Button>
              )}
              <RefreshButton className={isFiltered ? "" : "w-60"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
