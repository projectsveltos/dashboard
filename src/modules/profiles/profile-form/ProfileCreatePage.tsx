import { useTranslation } from "react-i18next";

import { ProfileForm } from "@/modules/profiles/profile-form/ProfileForm";

export const ProfileCreatePage = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="space-y-1 py-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          {t("common.create_profile")}
        </h2>
        <p className="text-muted-foreground text-sm">
          {t("common.description_profiles")}
        </p>
      </div>
      <ProfileForm />
    </>
  );
};
