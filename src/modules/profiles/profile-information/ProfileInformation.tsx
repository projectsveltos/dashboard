import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { ProfileInfoHeading } from "@/modules/profiles/profile-information/components/ProfileInfo/ProfileInfoHeading";
import { ProfileSpecCard } from "@/modules/profiles/profile-information/components/ProfileInfo/ProfileSpec";
import { ProfileRelations } from "@/modules/profiles/profile-information/components/ProfileRelations/ProfileRelations";
import MatchingClusterTable from "@/modules/profiles/profile-information/components/ClusterTable/MatchingClusterTable";
import useProfileInfo from "@/modules/profiles/profile-information/hooks/useProfileInfo";
import { LoadingPage } from "@/lib/components/ui/feedback/LoadingPage";
import { Button } from "@/lib/components/ui/inputs/button";
import { Checkbox } from "@/lib/components/ui/inputs/checkbox";
import { Label } from "@/lib/components/ui/inputs/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/lib/components/ui/data-display/dialog";
import { useDeleteProfile } from "@/modules/profiles/profile-form/hooks/useProfileMutations";

export function ProfileInformation() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { namespace = "", name = "", kind = "" } = useParams();

  const { data, isLoading, isSuccess } = useProfileInfo(namespace, name, kind);
  const deleteProfile = useDeleteProfile();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [removeReferencedContent, setRemoveReferencedContent] = useState(false);

  const hasReferencedContent = (data?.spec.policyRefs ?? []).some(
    (ref) => ref.kind === "ConfigMap" || ref.kind === "Secret",
  );

  const handleDelete = () => {
    deleteProfile.mutate(
      {
        kind,
        namespace: namespace || undefined,
        name,
        removeReferencedContent,
      },
      { onSuccess: () => navigate("/sveltos/profiles") },
    );
  };

  return (
    <>
      {isLoading && <LoadingPage />}
      {isSuccess && data && (
        <div>
          <ProfileInfoHeading
            name={data.name}
            namespace={data.namespace}
            kind={data.kind}
            tier={data.spec.tier}
            onEdit={() =>
              navigate(
                `/sveltos/profile/${namespace ? `${namespace}/` : ""}${name}/${kind}/edit`,
              )
            }
            onDelete={() => setShowDeleteDialog(true)}
          />

          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("common.delete_profile")}</DialogTitle>
              </DialogHeader>
              <p className="text-sm">{t("common.confirm_delete_profile")}</p>
              {hasReferencedContent && (
                <>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="removeReferencedContent"
                      checked={removeReferencedContent}
                      onCheckedChange={(checked) =>
                        setRemoveReferencedContent(checked === true)
                      }
                    />
                    <Label htmlFor="removeReferencedContent">
                      {t("common.remove_referenced_content")}
                    </Label>
                  </div>
                  {removeReferencedContent && (
                    <p className="text-xs text-muted-foreground">
                      {t("common.remove_referenced_content_warning")}
                    </p>
                  )}
                </>
              )}
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteDialog(false)}
                >
                  {t("common.cancel")}
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={deleteProfile.isPending}
                >
                  {t("common.delete")}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="grid grid-cols-12 gap-3 mt-4">
            <div className="col-span-7 space-y-4">
              <ProfileSpecCard
                spec={data.spec}
                className="bg-card-muted border-primary/10"
              />
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="px-4 py-3 border-b border-border bg-muted/30">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/70 flex items-center">
                    Matching Clusters
                  </h3>
                </div>
                <MatchingClusterTable data={data?.matchingClusters ?? []} />
              </div>
            </div>
            <div className="col-span-5">
              <ProfileRelations profile={data} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
