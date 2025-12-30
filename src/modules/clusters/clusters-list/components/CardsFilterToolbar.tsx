import { Button } from "@/lib/components/ui/inputs/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { RefreshButton } from "@/modules/common/components/actions/RefreshButton";

import { useTranslation } from "react-i18next";

export const CardsFilterToolbar = () => {
  const { t } = useTranslation();
  const [isFiltered, _setIsFiltered] = useState(false);
  return (
    <>
      <div className="flex  space-x-2">
        <div className="flex items-center ">
          <div className="flex flex-1 items-center space-x-2">
            <RefreshButton className={"w-26 h-8 "} />
            {isFiltered && (
              <Button variant="ghost" className="h-8 px-2 lg:px-3">
                {t("common.reset")}
                <Cross2Icon className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
