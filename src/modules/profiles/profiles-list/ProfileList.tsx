import { TierCard } from "@/modules/profiles/profiles-list/components/tier/TierCard";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { mockProfileListRespArray } from "@/modules/profiles/profiles-list/mock";
import { PageHeading } from "@/components/ui/PageHeading";

export function ProfileList() {
  return (
    <>
      <PageHeading
        title={"Profiles"}
        description={
          "You can view all tiers , profiles and visualize dependants and dependencies "
        }
      />
      <div
        className={"p-4 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-4"}
      >
        {mockProfileListRespArray.map((tier, index) => (
          <TierCard tier={tier} key={index} />
        ))}
      </div>
    </>
  );
}
