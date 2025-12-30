import { Button } from "@/lib/components/ui/inputs/button";
import { ChevronLeft, RouteIcon } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { RefreshButton } from "@/modules/common/components/actions/RefreshButton";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

type EventPageHeading = {
  name: string;
};

export const EventPageHeading = ({ name }: EventPageHeading) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <div className="flex my-4 items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">{t("common.back")}</span>
        </Button>

        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {name}
        </h1>

        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <RefreshButton />
          <Fragment></Fragment>{" "}
          <Button disabled variant="default" size="sm" className="h-9 gap-2 ">
            <RouteIcon className="h-4 w-4" /> {t("common.trigger_event")}
          </Button>
        </div>
      </div>
    </>
  );
};
