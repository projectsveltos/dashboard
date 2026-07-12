import { PageHeading } from "@/lib/components/ui/layout/PageHeading";
import { ProfileList } from "@/modules/profiles/profiles-list/components/list/ProfileList";
import { useTranslation } from "react-i18next";
import { DryRunPageSkeleton } from "./components/DryRunPageSkeleton";
import useProfiles from "@/modules/profiles/profiles-list/hooks/useProfiles";

const searchConfig = [
  {
    key: "profile_namespace",
    placeholder: "common.filter_profile_namespace",
  },
  {
    key: "profile_name",
    placeholder: "common.filter_profile_name",
  },
];

export const DryRunPage = () => {
  const { t } = useTranslation();
  const { isLoading } = useProfiles(searchConfig, true);

  if (isLoading) {
    return <DryRunPageSkeleton />;
  }

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
