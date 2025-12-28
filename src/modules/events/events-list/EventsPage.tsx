import { PageHeading } from "@/lib/components/ui/layout/PageHeading";
import { EventList } from "./components/EventList";

export const EventsPage = () => {
  return (
    <>
      <PageHeading
        title={"Events"}
        description={"View and manage event triggers across clusters."}
      />
      <EventList />
    </>
  );
};
