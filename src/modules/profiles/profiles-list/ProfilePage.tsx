import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

import { PageHeading } from "@/lib/components/ui/layout/PageHeading";
import { Button } from "@/lib/components/ui/inputs/button";
import { ProfileList } from "@/modules/profiles/profiles-list/components/list/ProfileList";

import { useTranslation } from "react-i18next";

export const ProfilePage = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageHeading
        title={t("common.profiles")}
        description={t("common.description_profiles")}
        actions={
          <Button asChild size="sm">
            <Link to="/sveltos/profile/new">
              <Plus className="w-4 h-4 mr-2" />
              {t("common.new_profile")}
            </Link>
          </Button>
        }
      />
      <ProfileList />
    </>
  );
};
