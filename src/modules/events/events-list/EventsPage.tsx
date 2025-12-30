import { PageHeading } from "@/lib/components/ui/layout/PageHeading";
import { EventList } from "./components/EventList";

import { useTranslation } from "react-i18next";

export const EventsPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageHeading
        title={t("common.events")}
        description={t("common.description_events")}
      />
      <EventList />
    </>
  );
};
