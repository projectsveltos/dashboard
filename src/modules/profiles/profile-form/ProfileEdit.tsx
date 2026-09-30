import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Button } from "@/lib/components/ui/inputs/button";
import { Textarea } from "@/lib/components/ui/inputs/textarea";
import { Label } from "@/lib/components/ui/inputs/label";
import { Card, CardContent } from "@/lib/components/ui/data-display/card";
import { LoadingPage } from "@/lib/components/ui/feedback/LoadingPage";
import useProfileInfo from "@/modules/profiles/profile-information/hooks/useProfileInfo";
import { useUpdateProfile } from "@/modules/profiles/profile-form/hooks/useProfileMutations";
import toYaml from "@/utils/toYaml";

export const ProfileEdit = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { namespace = "", name = "", kind = "" } = useParams();

  const { data, isLoading, isSuccess } = useProfileInfo(namespace, name, kind);
  const updateProfile = useUpdateProfile();

  const [specYAML, setSpecYAML] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Dumped as real YAML, not JSON.stringify, so a multi-line value such as a Helm chart's
  // values field renders as a readable block instead of one line full of escaped newlines.
  // The backend parses specYAML with sigs.k8s.io/yaml so the edited YAML is sent back as is.
  useEffect(() => {
    if (data) {
      setSpecYAML(toYaml(data.spec));
    }
  }, [data]);

  const handleSave = () => {
    setError(null);
    updateProfile.mutate(
      { kind, namespace: namespace || undefined, name, specYAML },
      {
        onSuccess: () => navigate(-1),
        onError: (mutationError) => setError(mutationError.message),
      },
    );
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!isSuccess || !data) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1 py-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          {t("common.edit_profile")}: {data.name || data.namespace}
        </h2>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Label>{t("common.spec_yaml")}</Label>
          <Textarea
            className="font-mono text-xs"
            rows={24}
            value={specYAML}
            onChange={(e) => setSpecYAML(e.target.value)}
          />
        </CardContent>
      </Card>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => navigate(-1)}>
          {t("common.cancel")}
        </Button>
        <Button onClick={handleSave} disabled={updateProfile.isPending}>
          {t("common.save_changes")}
        </Button>
      </div>
    </div>
  );
};
