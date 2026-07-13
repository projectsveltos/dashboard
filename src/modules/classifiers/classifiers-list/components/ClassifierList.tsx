import { useNavigate, useParams, useLocation } from "react-router-dom";
import useClassifiers, {
  DEFAULT_CLASSIFIERS_SEARCH_CONFIG,
} from "@/modules/classifiers/hooks/useClassifiers";
import { UseQueryResult } from "@tanstack/react-query";

import { SearchQueryParamInput } from "@/lib/components/ui/inputs/SearchQueryParamInput";
import ClassifierCard from "./ClassifierCard";

import { EmptyData } from "@/lib/components/ui/feedback/emptyData";
import { usePagination } from "@/hooks/usePagination";
import { appConfig } from "@/config/app";
import {
  ClassifiersListResponse,
  ClassifierSummary,
} from "@/types/classifier.types";
import { LoadingCards } from "@/lib/components/ui/feedback/LoadingCards";

export const ClassifierList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const defaultPage = appConfig.defaultPage;
  const { pageNumber } = useParams();

  const currentPage = (() => {
    const page = Number(pageNumber);
    return Number.isInteger(page) && page > 0 ? page : defaultPage;
  })();

  const classifiersQuery = useClassifiers(currentPage) as UseQueryResult<
    ClassifiersListResponse,
    Error
  >;
  const classifiers = classifiersQuery.data?.classifiers ?? [];
  const totalClassifiers = classifiersQuery.data?.totalClassifiers ?? 0;
  const isLoading = classifiersQuery.isLoading;
  const isPlaceholderData = classifiersQuery.isPlaceholderData;
  const handlePageChange = (page: number) => {
    if (page === 1) {
      navigate(`/sveltos/classifiers${location.search}`);
    } else {
      navigate(`/sveltos/classifiers/${page}${location.search}`);
    }
  };

  const handlePageSearch = (searchTerms: Record<string, string>) => {
    navigate(
      `/sveltos/classifiers?${new URLSearchParams(searchTerms).toString()}`,
    );
  };

  const [PaginationUI] = usePagination(
    totalClassifiers,
    currentPage,
    handlePageChange,
  );

  return (
    <>
      <SearchQueryParamInput
        searchConfig={DEFAULT_CLASSIFIERS_SEARCH_CONFIG}
        onSearch={handlePageSearch}
      />

      {(isLoading || isPlaceholderData) && <LoadingCards />}

      {(!classifiers || classifiers.length === 0) && !isLoading && (
        <EmptyData name={"classifiers"} isFiltered={false} />
      )}

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {classifiers.map((classifier: ClassifierSummary, idx: number) => (
          <div key={idx}>
            <ClassifierCard
              classifier={classifier}
              onClick={() =>
                navigate(
                  `/sveltos/classifier/${classifier.type}/${classifier.name}`,
                )
              }
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

export default ClassifierList;
