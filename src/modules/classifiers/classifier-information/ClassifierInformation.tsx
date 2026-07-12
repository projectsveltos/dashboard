import { useParams } from "react-router-dom";
import { Activity } from "lucide-react";
import useClassifierDetails from "@/modules/classifiers/classifier-information/hooks/useClassifierDetails";
import { ClassifierPageHeading } from "@/modules/classifiers/classifier-information/components/ClassifierPageHeading";
import { ClassifierLabelsCard } from "./components/ClassifierLabelsCard";
import { ClassifierSpecCard } from "./components/ClassifierSpecCard";
import { MatchingClusterCard } from "./components/MatchingClusterCard";
import { LoadingPage } from "@/lib/components/ui/feedback/LoadingPage";
import { ErrorQuery } from "@/modules/common/components/feedback/ErrorQuery";
import { useTranslation } from "react-i18next";
import { ClassifierKind } from "@/types/classifier.types";

export const ClassifierInformation = () => {
  const { t } = useTranslation();
  const { name, type } = useParams();
  const { data, isLoading, isError } = useClassifierDetails(name, type);

  if (isLoading)
    return (
      <div>
        <LoadingPage />
      </div>
    );
  if (isError || !data)
    return (
      <div>
        <ErrorQuery name={"Classifiers"} error={"Failed to load data"} />
      </div>
    );

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="space-y-6">
          <ClassifierPageHeading
            name={data.name}
            type={data.type ?? (type as ClassifierKind)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ClassifierLabelsCard labels={data.classifierLabels ?? []} />
            <ClassifierSpecCard data={data} />
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between border-b border-border/40 pb-2">
              <h2 className="text-[10px] font-bold text-muted-foreground flex items-center gap-2">
                <Activity className="h-3 w-3 text-primary" />{" "}
                {t("common.matching_clusters")}
              </h2>
              <span className="text-[10px] font-mono text-muted-foreground">
                {data.matchingClusters?.length ?? 0}{" "}
                {t("common.clusters_linked")}
              </span>
            </div>

            {(!data.matchingClusters || data.matchingClusters.length === 0) && (
              <div className="text-sm text-muted-foreground">
                {t("common.no_matching_clusters")}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {data.matchingClusters?.map((cluster, idx) => (
                <MatchingClusterCard
                  key={idx}
                  cluster={cluster}
                  classifierName={data.name}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClassifierInformation;
