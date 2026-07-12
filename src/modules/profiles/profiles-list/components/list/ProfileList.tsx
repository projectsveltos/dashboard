import { Blocks, ALargeSmall } from "lucide-react";
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
    label: "common.namespace",
    placeholder: "common.filter_profile_namespace",
    icon: Blocks,
  },
  {
    key: "profile_name",
    label: "common.name",
    placeholder: "common.filter_profile_name",
    icon: ALargeSmall,
  },
];

interface ProfileListProps {
  dryRun?: boolean;
}

export function ProfileList({ dryRun }: ProfileListProps) {
  const { data, isSuccess, isLoading, isError, error } = useProfiles(
    searchConfig,
    dryRun,
  );

  return (
    <>
      <SearchQueryParamInput searchConfig={searchConfig} />
      {isLoading && <LoadingTier />}
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
            <TierCard tier={tier} key={index} dryRun={dryRun} />
          ))}
        </div>
      )}
    </>
  );
}
