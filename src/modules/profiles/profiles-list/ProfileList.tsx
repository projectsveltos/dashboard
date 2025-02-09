import { TierCard } from "@/modules/profiles/profiles-list/components/tier/TierCard";
import { PageHeading } from "@/lib/components/ui/PageHeading";
import useProfiles from "@/modules/profiles/profiles-list/hooks/useProfiles";
import { TierData } from "@/types/profile.types";
import { ErrorQuery } from "@/lib/components/ui/errorQuery";
import { LoadingTier } from "@/modules/profiles/profiles-list/components/tier/LoadingTier";

export function ProfileList() {
  const { data, isSuccess, isLoading, isError, error, isPreviousData } =
    useProfiles();
  return (
    <>
      <PageHeading
        title={"Profiles"}
        description={
          "You can view all tiers , profiles and visualize dependents and dependencies "
        }
      />
      {(isLoading || isPreviousData) && <LoadingTier />}
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
