import { PageHeading } from "@/lib/components/ui/PageHeading";
import { ProfileList } from "@/modules/profiles/profiles-list/components/list/ProfileList";

export const ProfilePage = () => {
  return <>
    <PageHeading
      title={"Profiles"}
      description={
        "You can view all tiers , profiles and visualize dependents and dependencies "
      }
    />
    <ProfileList/>
  </>;
};
