import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { ALargeSmall, Blocks } from "lucide-react";

import client from "@/api-client/apiClient";
import { API_ENDPOINTS } from "@/api-client/endpoints";
import { extractFiltersFromSearchParams } from "@/lib/utils";
import { appConfig } from "@/config/app";
import { getItemsToSkip } from "@/utils/getItemsToSkip";
import { ClassifiersListResponse } from "@/types/classifier.types";
import { SearchConfig } from "@/lib/components/ui/inputs/SearchQueryParamInput";

const fetchClassifiers = async (
  page: number,
  params: Record<string, string>,
): Promise<ClassifiersListResponse> => {
  const { data } = await client.get(API_ENDPOINTS.CLASSIFIERS, {
    params: {
      skip: getItemsToSkip(page, appConfig.defaultSize),
      limit: appConfig.defaultSize,
      ...params,
    },
  });
  return data as ClassifiersListResponse;
};

export const DEFAULT_CLASSIFIERS_SEARCH_CONFIG: SearchConfig[] = [
  {
    key: "name",
    label: "common.classifier_name",
    placeholder: "common.filter_classifier_name",
    icon: ALargeSmall,
  },
  {
    key: "cluster_namespace",
    label: "common.cluster_namespace",
    placeholder: "common.filter_cluster_namespace_classifiers",
    tooltip: "common.search_cluster_namespace_tooltip_classifiers",
    icon: Blocks,
  },
  {
    key: "cluster_name",
    label: "common.cluster_name",
    placeholder: "common.filter_cluster_name_classifiers",
    tooltip: "common.search_cluster_name_tooltip_classifiers",
    icon: ALargeSmall,
  },
];

const useClassifiers = (
  page: number = appConfig.defaultPage,
  params?: Record<string, string>,
  searchConfig: SearchConfig[] = DEFAULT_CLASSIFIERS_SEARCH_CONFIG,
): UseQueryResult<ClassifiersListResponse, Error> => {
  const [searchParams] = useSearchParams();
  const filters = params
    ? params
    : extractFiltersFromSearchParams(searchParams, searchConfig);

  return useQuery({
    queryKey: ["classifiers", page, filters],
    queryFn: () => fetchClassifiers(page, filters),
  });
};

export default useClassifiers;
