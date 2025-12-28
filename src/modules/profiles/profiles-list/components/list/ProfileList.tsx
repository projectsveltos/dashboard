import { TierCard } from "@/modules/profiles/profiles-list/components/tier/TierCard";
import useProfiles from "@/modules/profiles/profiles-list/hooks/useProfiles";
import { TierData } from "@/types/profile.types";
import { ErrorQuery } from "@/modules/common/components/feedback/ErrorQuery";
import { LoadingTier } from "@/modules/profiles/profiles-list/components/tier/LoadingTier";
import { EmptyData } from "@/lib/components/ui/feedback/emptyData";
import { SearchQueryParamInput } from "@/lib/components/ui/inputs/SearchQueryParamInput";

const searchConfig = [
  {
    key: "profile_namespace",
    placeholder: "Search by Namespace",
  },
  {
    key: "profile_name",
    placeholder: "Search by Name",
  },
];

export function ProfileList() {
  const { data, isSuccess, isLoading, isError, error, isPreviousData } =
    useProfiles(searchConfig);

  return (
    <>
      <SearchQueryParamInput searchConfig={searchConfig} />
      {(isLoading || isPreviousData) && <LoadingTier />}
      {(!data || data?.length <= 0) && (
        <EmptyData name={"profiles"} isFiltered={false} />
      )}
      {isError && <ErrorQuery name={"profiles"} error={error} />}
      {isSuccess && data && (
        <div
          className={
            "p-4 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-4"
          }
        >
          {data.map((tier: TierData, index: number) => (
            <TierCard tier={tier} key={index} />
          ))}
        </div>
      )}
    </>
  );
}
