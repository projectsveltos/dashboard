import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Plus, X } from "lucide-react";

import { Button } from "@/lib/components/ui/inputs/button";
import { Input } from "@/lib/components/ui/inputs/input";
import { Textarea } from "@/lib/components/ui/inputs/textarea";
import { Label } from "@/lib/components/ui/inputs/label";
import { Checkbox } from "@/lib/components/ui/inputs/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/data-display/card";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/lib/components/ui/inputs/toggle-group";
import TagInput from "@/lib/components/ui/data-display/TagInput";
import { useCreateProfile } from "@/modules/profiles/profile-form/hooks/useProfileMutations";
import { CreateProfileRequest } from "@/types/profile.types";

type ContentType = "helm" | "yaml" | "existing" | "remoteURL";

type SelectorRow = { key: string; value: string };

const isRemoteHelmSource = (repositoryURL: string) => {
  const lower = repositoryURL.toLowerCase();
  return (
    lower.startsWith("http://") ||
    lower.startsWith("https://") ||
    lower.startsWith("oci://")
  );
};

export const ProfileForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const createProfile = useCreateProfile();

  const [kind, setKind] = useState<"ClusterProfile" | "Profile">(
    "ClusterProfile",
  );
  const [namespace, setNamespace] = useState("");
  const [name, setName] = useState("");
  const [tier, setTier] = useState("");
  const [dependsOn, setDependsOn] = useState<string[]>([]);
  const [selectorRows, setSelectorRows] = useState<SelectorRow[]>([
    { key: "", value: "" },
  ]);
  const [contentType, setContentType] = useState<ContentType>("helm");

  const [repositoryURL, setRepositoryURL] = useState("");
  const [repositoryName, setRepositoryName] = useState("");
  const [chartName, setChartName] = useState("");
  const [chartVersion, setChartVersion] = useState("");
  const [releaseName, setReleaseName] = useState("");
  const [releaseNamespace, setReleaseNamespace] = useState("");
  const [values, setValues] = useState("");

  const [yaml, setYaml] = useState("");

  const [existingKind, setExistingKind] = useState("ConfigMap");
  const [existingNamespace, setExistingNamespace] = useState("");
  const [existingName, setExistingName] = useState("");

  const [remoteURL, setRemoteURL] = useState("");
  const [remoteURLInterval, setRemoteURLInterval] = useState("");
  const [remoteURLTemplate, setRemoteURLTemplate] = useState(false);
  const [remoteURLInsecureSkipTLSVerify, setRemoteURLInsecureSkipTLSVerify] =
    useState(false);
  const [remoteURLPlainHTTP, setRemoteURLPlainHTTP] = useState(false);
  const [remoteURLSecretNamespace, setRemoteURLSecretNamespace] = useState("");
  const [remoteURLSecretName, setRemoteURLSecretName] = useState("");

  const [error, setError] = useState<string | null>(null);

  const updateSelectorRow = (
    index: number,
    field: "key" | "value",
    fieldValue: string,
  ) => {
    setSelectorRows(
      selectorRows.map((row, i) =>
        i === index ? { ...row, [field]: fieldValue } : row,
      ),
    );
  };

  const removeSelectorRow = (index: number) => {
    setSelectorRows(selectorRows.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    setError(null);

    if (
      contentType === "helm" &&
      isRemoteHelmSource(repositoryURL) &&
      !repositoryName
    ) {
      setError(
        `${t("common.repository_name")} ${t("common.required")}: ${t("common.repository_url")} ${repositoryURL}`,
      );
      return;
    }

    if (contentType === "remoteURL") {
      if (!remoteURL) {
        setError(`${t("common.url")} ${t("common.required")}`);
        return;
      }
      if (
        (remoteURLSecretNamespace && !remoteURLSecretName) ||
        (!remoteURLSecretNamespace && remoteURLSecretName)
      ) {
        setError(
          `${t("common.remote_url_secret_ref")} ${t("common.content_namespace")} + ${t("common.content_name")}: ${t("common.required")}`,
        );
        return;
      }
    }

    const clusterSelector: { [key: string]: string } = {};
    selectorRows.forEach((row) => {
      if (row.key) {
        clusterSelector[row.key] = row.value;
      }
    });

    const request: CreateProfileRequest = {
      kind,
      namespace: kind === "Profile" ? namespace : undefined,
      name,
      clusterSelector,
      tier: tier ? Number(tier) : undefined,
      dependsOn: dependsOn.length > 0 ? dependsOn : undefined,
    };

    if (contentType === "helm") {
      request.helmChart = {
        repositoryURL,
        repositoryName: repositoryName || undefined,
        chartName: chartName || undefined,
        chartVersion: chartVersion || undefined,
        releaseName,
        releaseNamespace,
        values: values || undefined,
      };
    } else if (contentType === "yaml") {
      request.yaml = yaml;
    } else if (contentType === "existing") {
      request.existingContent = {
        kind: existingKind,
        namespace: existingNamespace,
        name: existingName,
      };
    } else {
      request.remoteURL = {
        url: remoteURL,
        interval: remoteURLInterval || undefined,
        secretRef: remoteURLSecretName
          ? { namespace: remoteURLSecretNamespace, name: remoteURLSecretName }
          : undefined,
        template: remoteURLTemplate || undefined,
        insecureSkipTLSVerify: remoteURLInsecureSkipTLSVerify || undefined,
        plainHTTP: remoteURLPlainHTTP || undefined,
      };
    }

    createProfile.mutate(request, {
      onSuccess: () => navigate("/sveltos/profiles"),
      onError: (mutationError) => setError(mutationError.message),
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4">
            <ToggleGroup
              type="single"
              value={kind}
              onValueChange={(newKind) => {
                if (newKind) {
                  setKind(newKind as "ClusterProfile" | "Profile");
                }
              }}
              className="justify-start bg-muted p-1 rounded-md inline-flex w-fit"
            >
              <ToggleGroupItem value="ClusterProfile">
                ClusterProfile
              </ToggleGroupItem>
              <ToggleGroupItem value="Profile">Profile</ToggleGroupItem>
            </ToggleGroup>
            <p className="text-sm text-muted-foreground mt-2">
              {kind === "Profile"
                ? t("common.kind_hint_profile")
                : t("common.kind_hint_cluster_profile")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>{t("common.name")}</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            {kind === "Profile" && (
              <div>
                <Label>{t("common.namespace")}</Label>
                <Input
                  value={namespace}
                  onChange={(e) => setNamespace(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3">
            <div>
              <Label>
                {t("common.tier")} ({t("common.optional")})
              </Label>
              <Input
                type="number"
                value={tier}
                onChange={(e) => setTier(e.target.value)}
              />
            </div>
            <div>
              <Label>
                {t("common.depends_on")} ({t("common.optional")})
              </Label>
              <TagInput
                tags={dependsOn}
                setTags={setDependsOn}
                placeholder=""
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("common.cluster_selector")}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {selectorRows.map((row, index) => (
            <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-2">
              <Input
                placeholder={t("common.key")}
                value={row.key}
                onChange={(e) =>
                  updateSelectorRow(index, "key", e.target.value)
                }
              />
              <Input
                placeholder={t("common.value")}
                value={row.value}
                onChange={(e) =>
                  updateSelectorRow(index, "value", e.target.value)
                }
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeSelectorRow(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="ghost"
            className="w-fit"
            onClick={() =>
              setSelectorRows([...selectorRows, { key: "", value: "" }])
            }
          >
            <Plus className="w-4 h-4 mr-2" />
            {t("common.add_label")}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <ToggleGroup
            type="single"
            value={contentType}
            onValueChange={(newContentType) => {
              if (newContentType) {
                setContentType(newContentType as ContentType);
              }
            }}
            className="justify-start bg-muted p-1 rounded-md inline-flex w-fit mb-4"
          >
            <ToggleGroupItem value="helm">
              {t("common.helm_chart")}
            </ToggleGroupItem>
            <ToggleGroupItem value="yaml">
              {t("common.raw_yaml")}
            </ToggleGroupItem>
            <ToggleGroupItem value="existing">
              {t("common.existing_content")}
            </ToggleGroupItem>
            <ToggleGroupItem value="remoteURL">
              {t("common.remote_url")}
            </ToggleGroupItem>
          </ToggleGroup>

          {contentType === "helm" && (
            <div className="flex flex-col gap-3">
              <div>
                <Label>{t("common.repository_url")}</Label>
                <Input
                  value={repositoryURL}
                  onChange={(e) => setRepositoryURL(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>
                    {t("common.repository_name")} ({t("common.optional")})
                  </Label>
                  <Input
                    value={repositoryName}
                    onChange={(e) => setRepositoryName(e.target.value)}
                  />
                </div>
                <div>
                  <Label>
                    {t("common.chart_name")} ({t("common.optional")})
                  </Label>
                  <Input
                    value={chartName}
                    onChange={(e) => setChartName(e.target.value)}
                  />
                </div>
                <div>
                  <Label>
                    {t("common.chart_version")} ({t("common.optional")})
                  </Label>
                  <Input
                    value={chartVersion}
                    onChange={(e) => setChartVersion(e.target.value)}
                  />
                </div>
                <div>
                  <Label>{t("common.release_name")}</Label>
                  <Input
                    value={releaseName}
                    onChange={(e) => setReleaseName(e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <Label>{t("common.release_namespace")}</Label>
                  <Input
                    value={releaseNamespace}
                    onChange={(e) => setReleaseNamespace(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label>
                  {t("common.values")} ({t("common.optional")})
                </Label>
                <Textarea
                  className="font-mono text-xs"
                  rows={6}
                  value={values}
                  onChange={(e) => setValues(e.target.value)}
                />
              </div>
            </div>
          )}

          {contentType === "yaml" && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t("common.yaml_hint")}
              </p>
              <Label>{t("common.manifests")}</Label>
              <Textarea
                className="font-mono text-xs"
                rows={12}
                value={yaml}
                onChange={(e) => setYaml(e.target.value)}
              />
            </div>
          )}

          {contentType === "existing" && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t("common.existing_content_hint")}
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label>{t("common.content_kind")}</Label>
                  <ToggleGroup
                    type="single"
                    value={existingKind}
                    onValueChange={(newKind) => {
                      if (newKind) {
                        setExistingKind(newKind);
                      }
                    }}
                    className="justify-start bg-muted p-1 rounded-md inline-flex w-fit"
                  >
                    <ToggleGroupItem value="ConfigMap">
                      ConfigMap
                    </ToggleGroupItem>
                    <ToggleGroupItem value="Secret">Secret</ToggleGroupItem>
                  </ToggleGroup>
                </div>
                <div>
                  <Label>{t("common.content_namespace")}</Label>
                  <Input
                    value={existingNamespace}
                    onChange={(e) => setExistingNamespace(e.target.value)}
                  />
                </div>
                <div>
                  <Label>{t("common.content_name")}</Label>
                  <Input
                    value={existingName}
                    onChange={(e) => setExistingName(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {contentType === "remoteURL" && (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-muted-foreground">
                {t("common.remote_url_hint")}
              </p>
              <div>
                <Label>{t("common.url")}</Label>
                <Input
                  placeholder="https://example.com/manifest.yaml"
                  value={remoteURL}
                  onChange={(e) => setRemoteURL(e.target.value)}
                />
              </div>
              <div>
                <Label>
                  {t("common.interval")} ({t("common.optional")})
                </Label>
                <Input
                  placeholder="5m"
                  value={remoteURLInterval}
                  onChange={(e) => setRemoteURLInterval(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remoteURLTemplate"
                    checked={remoteURLTemplate}
                    onCheckedChange={(checked) =>
                      setRemoteURLTemplate(checked === true)
                    }
                  />
                  <Label htmlFor="remoteURLTemplate">
                    {t("common.remote_url_template")}
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remoteURLInsecureSkipTLSVerify"
                    checked={remoteURLInsecureSkipTLSVerify}
                    onCheckedChange={(checked) =>
                      setRemoteURLInsecureSkipTLSVerify(checked === true)
                    }
                  />
                  <Label htmlFor="remoteURLInsecureSkipTLSVerify">
                    {t("common.remote_url_insecure_skip_tls_verify")}
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remoteURLPlainHTTP"
                    checked={remoteURLPlainHTTP}
                    onCheckedChange={(checked) =>
                      setRemoteURLPlainHTTP(checked === true)
                    }
                  />
                  <Label htmlFor="remoteURLPlainHTTP">
                    {t("common.remote_url_plain_http")}
                  </Label>
                </div>
              </div>
              <div>
                <Label>
                  {t("common.remote_url_secret_ref")} ({t("common.optional")})
                </Label>
                <div className="grid grid-cols-2 gap-3 mt-1">
                  <Input
                    placeholder={t("common.content_namespace")}
                    value={remoteURLSecretNamespace}
                    onChange={(e) =>
                      setRemoteURLSecretNamespace(e.target.value)
                    }
                  />
                  <Input
                    placeholder={t("common.content_name")}
                    value={remoteURLSecretName}
                    onChange={(e) => setRemoteURLSecretName(e.target.value)}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {t("common.remote_url_secret_ref_hint")}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => navigate(-1)}>
          {t("common.cancel")}
        </Button>
        <Button onClick={handleSubmit} disabled={createProfile.isPending}>
          {t("common.create_profile")}
        </Button>
      </div>
    </div>
  );
};
