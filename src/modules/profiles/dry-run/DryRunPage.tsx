import { PageHeading } from "@/lib/components/ui/layout/PageHeading";
import { ProfileList } from "@/modules/profiles/profiles-list/components/list/ProfileList";
import { useTranslation } from "react-i18next";

export const DryRunPage = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeading
        title={t("common.dry run")}
        description={t("common.description_dry_run")}
      />
      <ProfileList dryRun={true} />
    </div>
  );
};
