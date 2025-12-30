import { PageHeading } from "@/lib/components/ui/layout/PageHeading";
import { ProfileList } from "@/modules/profiles/profiles-list/components/list/ProfileList";

import { useTranslation } from "react-i18next";

export const ProfilePage = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageHeading
        title={t("common.profiles")}
        description={t("common.description_profiles")}
      />
      <ProfileList />
    </>
  );
};
