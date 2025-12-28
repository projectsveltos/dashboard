import { useNavigate, useParams, useLocation } from "react-router-dom";
import useEvents, {
  DEFAULT_EVENTS_SEARCH_CONFIG,
} from "@/modules/events/hooks/useEvents";
import { UseQueryResult } from "react-query";

import { SearchQueryParamInput } from "@/lib/components/ui/inputs/SearchQueryParamInput";
import EventCard from "./EventCard";

import { EmptyData } from "@/lib/components/ui/feedback/emptyData";
import { usePagination } from "@/hooks/usePagination";
import { appConfig } from "@/config/app";
import { EventsListResponse, EventTriggerSummary } from "@/types/event.types";
import { LoadingCards } from "@/lib/components/ui/feedback/LoadingCards";

export const EventList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const defaultPage = appConfig.defaultPage;
  const { pageNumber } = useParams();

  const currentPage = (() => {
    const page = Number(pageNumber);
    return Number.isInteger(page) && page > 0 ? page : defaultPage;
  })();

  const eventsQuery = useEvents(currentPage) as UseQueryResult<
    EventsListResponse,
    Error
  >;
  const events = eventsQuery.data?.eventTriggers ?? [];
  const totalEvents = eventsQuery.data?.totalEvents ?? 0;
  const isLoading = eventsQuery.isLoading;
  const isPreviousData = eventsQuery.isPreviousData;
  const handlePageChange = (page: number) => {
    navigate(`/sveltos/events/${page}${location.search}`);
  };

  const handlePageSearch = (searchTerms: Record<string, string>) => {
    const newPathname = location.pathname.replace(
      `/${pageNumber}`,
      `/${defaultPage}`,
    );
    navigate(`${newPathname}?${new URLSearchParams(searchTerms).toString()}`);
  };

  const [PaginationUI] = usePagination(
    totalEvents,
    currentPage,
    handlePageChange,
  );

  return (
    <>
      <SearchQueryParamInput
        searchConfig={DEFAULT_EVENTS_SEARCH_CONFIG}
        onSearch={handlePageSearch}
      />

      {(isLoading || isPreviousData) && <LoadingCards />}

      {(!events || events.length === 0) && !isLoading && (
        <EmptyData name={"event triggers"} isFiltered={false} />
      )}

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {events.map((event: EventTriggerSummary, idx: number) => (
          <div key={idx}>
            <EventCard
              event={event}
              onClick={() => navigate(`/sveltos/event/${event.name}`)}
            />
          </div>
        ))}
      </div>

      <div className="mt-4">
        {" "}
        <PaginationUI />
      </div>
    </>
  );
};

export default EventList;
