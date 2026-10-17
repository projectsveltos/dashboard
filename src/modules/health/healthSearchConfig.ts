// Filters of a list of unhealthy resources. The keys are the query parameters of ui-backend, and of the URL.
export const healthSearchConfig = [
  { key: "profile_kind", placeholder: "common.search_profile_kind" },
  { key: "profile_name", placeholder: "common.search_profile_name" },
  { key: "resource_kind", placeholder: "common.search_resource_kind" },
  {
    key: "resource_namespace",
    placeholder: "common.search_resource_namespace",
  },
  { key: "resource_name", placeholder: "common.search_resource_name" },
];
