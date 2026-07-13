import { PageHeading } from "@/lib/components/ui/layout/PageHeading";
import { ClassifierList } from "./components/ClassifierList";

import { useTranslation } from "react-i18next";

export const ClassifiersPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageHeading
        title={t("common.classifiers")}
        description={t("common.description_classifiers")}
      />
      <ClassifierList />
    </>
  );
};
