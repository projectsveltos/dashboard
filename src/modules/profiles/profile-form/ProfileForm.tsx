import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
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
import {
  ContentType,
  ProfileFormValues,
  ProfileKind,
  buildCreateRequest,
  createProfileFormSchema,
  initialProfileFormValues,
  isRemoteHelmSource,
} from "@/modules/profiles/profile-form/profileFormSchema";

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="text-sm text-destructive mt-1">{message}</p> : null;

export const ProfileForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const createProfile = useCreateProfile();

  // Errors returned by the backend. Field errors come from the Yup schema.
  const [serverError, setServerError] = useState<string | null>(null);

  const formik = useFormik<ProfileFormValues>({
    initialValues: initialProfileFormValues,
    validationSchema: createProfileFormSchema(t),
    onSubmit: (values) => {
      setServerError(null);
      createProfile.mutate(buildCreateRequest(values), {
        onSuccess: () => navigate("/sveltos/profiles"),
        onError: (mutationError) => setServerError(mutationError.message),
      });
    },
  });

  const { values } = formik;

  // A field's error is shown once the user has left it or tried to submit.
  const errorFor = (field: keyof ProfileFormValues) => {
    const error = formik.errors[field];
    const showError = formik.touched[field] || formik.submitCount > 0;
    return showError && typeof error === "string" ? error : undefined;
  };

  // repositoryName, chartName and chartVersion are only optional for Flux sources.
  const isHelmChartRemote =
    values.contentType === "helm" && isRemoteHelmSource(values.repositoryURL);
  const optionalUnlessRemote = isHelmChartRemote
    ? ""
    : ` (${t("common.optional")})`;

  const updateSelectorRow = (
    index: number,
    field: "key" | "value",
    fieldValue: string,
  ) => {
    formik.setFieldValue(
      "selectorRows",
      values.selectorRows.map((row, i) =>
        i === index ? { ...row, [field]: fieldValue } : row,
      ),
    );
  };

  const removeSelectorRow = (index: number) => {
    formik.setFieldValue(
      "selectorRows",
      values.selectorRows.filter((_, i) => i !== index),
    );
  };

  const addSelectorRow = () => {
    formik.setFieldValue("selectorRows", [
      ...values.selectorRows,
      { key: "", value: "" },
    ]);
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4">
            <ToggleGroup
              type="single"
              value={values.kind}
              onValueChange={(newKind) => {
                if (newKind) {
                  formik.setFieldValue("kind", newKind as ProfileKind);
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
              {values.kind === "Profile"
                ? t("common.kind_hint_profile")
                : t("common.kind_hint_cluster_profile")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>{t("common.name")}</Label>
              <Input {...formik.getFieldProps("name")} />
              <FieldError message={errorFor("name")} />
            </div>
            {values.kind === "Profile" && (
              <div>
                <Label>{t("common.namespace")}</Label>
                <Input {...formik.getFieldProps("namespace")} />
                <FieldError message={errorFor("namespace")} />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3">
            <div>
              <Label>
                {t("common.tier")} ({t("common.optional")})
              </Label>
              <Input type="number" {...formik.getFieldProps("tier")} />
              <FieldError message={errorFor("tier")} />
            </div>
            <div>
              <Label>
                {t("common.depends_on")} ({t("common.optional")})
              </Label>
              <TagInput
                tags={values.dependsOn}
                setTags={(tags) => formik.setFieldValue("dependsOn", tags)}
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
          {values.selectorRows.map((row, index) => (
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
          <Button variant="ghost" className="w-fit" onClick={addSelectorRow}>
            <Plus className="w-4 h-4 mr-2" />
            {t("common.add_label")}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <ToggleGroup
            type="single"
            value={values.contentType}
            onValueChange={(newContentType) => {
              if (newContentType) {
                formik.setFieldValue(
                  "contentType",
                  newContentType as ContentType,
                );
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

          {values.contentType === "helm" && (
            <div className="flex flex-col gap-3">
              <div>
                <Label>{t("common.repository_url")}</Label>
                <Input {...formik.getFieldProps("repositoryURL")} />
                <FieldError message={errorFor("repositoryURL")} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>
                    {t("common.repository_name")}
                    {optionalUnlessRemote}
                  </Label>
                  <Input {...formik.getFieldProps("repositoryName")} />
                  <FieldError message={errorFor("repositoryName")} />
                </div>
                <div>
                  <Label>
                    {t("common.chart_name")}
                    {optionalUnlessRemote}
                  </Label>
                  <Input {...formik.getFieldProps("chartName")} />
                  <FieldError message={errorFor("chartName")} />
                </div>
                <div>
                  <Label>
                    {t("common.chart_version")}
                    {optionalUnlessRemote}
                  </Label>
                  <Input {...formik.getFieldProps("chartVersion")} />
                  <FieldError message={errorFor("chartVersion")} />
                </div>
                <div>
                  <Label>{t("common.release_name")}</Label>
                  <Input {...formik.getFieldProps("releaseName")} />
                  <FieldError message={errorFor("releaseName")} />
                </div>
                <div className="col-span-2">
                  <Label>{t("common.release_namespace")}</Label>
                  <Input {...formik.getFieldProps("releaseNamespace")} />
                  <FieldError message={errorFor("releaseNamespace")} />
                </div>
              </div>
              <div>
                <Label>
                  {t("common.values")} ({t("common.optional")})
                </Label>
                <Textarea
                  className="font-mono text-xs"
                  rows={6}
                  {...formik.getFieldProps("values")}
                />
              </div>
            </div>
          )}

          {values.contentType === "yaml" && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t("common.yaml_hint")}
              </p>
              <Label>{t("common.manifests")}</Label>
              <Textarea
                className="font-mono text-xs"
                rows={12}
                {...formik.getFieldProps("yaml")}
              />
              <FieldError message={errorFor("yaml")} />
            </div>
          )}

          {values.contentType === "existing" && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t("common.existing_content_hint")}
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label>{t("common.content_kind")}</Label>
                  <ToggleGroup
                    type="single"
                    value={values.existingKind}
                    onValueChange={(newKind) => {
                      if (newKind) {
                        formik.setFieldValue("existingKind", newKind);
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
                  <Input {...formik.getFieldProps("existingNamespace")} />
                  <FieldError message={errorFor("existingNamespace")} />
                </div>
                <div>
                  <Label>{t("common.content_name")}</Label>
                  <Input {...formik.getFieldProps("existingName")} />
                  <FieldError message={errorFor("existingName")} />
                </div>
              </div>
            </div>
          )}

          {values.contentType === "remoteURL" && (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-muted-foreground">
                {t("common.remote_url_hint")}
              </p>
              <div>
                <Label>{t("common.url")}</Label>
                <Input
                  placeholder="https://example.com/manifest.yaml"
                  {...formik.getFieldProps("remoteURL")}
                />
                <FieldError message={errorFor("remoteURL")} />
              </div>
              <div>
                <Label>
                  {t("common.interval")} ({t("common.optional")})
                </Label>
                <Input
                  placeholder="5m"
                  {...formik.getFieldProps("remoteURLInterval")}
                />
                <FieldError message={errorFor("remoteURLInterval")} />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remoteURLTemplate"
                    checked={values.remoteURLTemplate}
                    onCheckedChange={(checked) =>
                      formik.setFieldValue(
                        "remoteURLTemplate",
                        checked === true,
                      )
                    }
                  />
                  <Label htmlFor="remoteURLTemplate">
                    {t("common.remote_url_template")}
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remoteURLInsecureSkipTLSVerify"
                    checked={values.remoteURLInsecureSkipTLSVerify}
                    onCheckedChange={(checked) =>
                      formik.setFieldValue(
                        "remoteURLInsecureSkipTLSVerify",
                        checked === true,
                      )
                    }
                  />
                  <Label htmlFor="remoteURLInsecureSkipTLSVerify">
                    {t("common.remote_url_insecure_skip_tls_verify")}
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remoteURLPlainHTTP"
                    checked={values.remoteURLPlainHTTP}
                    onCheckedChange={(checked) =>
                      formik.setFieldValue(
                        "remoteURLPlainHTTP",
                        checked === true,
                      )
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
                  <div>
                    <Input
                      placeholder={t("common.content_namespace")}
                      {...formik.getFieldProps("remoteURLSecretNamespace")}
                    />
                    <FieldError
                      message={errorFor("remoteURLSecretNamespace")}
                    />
                  </div>
                  <div>
                    <Input
                      placeholder={t("common.content_name")}
                      {...formik.getFieldProps("remoteURLSecretName")}
                    />
                    <FieldError message={errorFor("remoteURLSecretName")} />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {t("common.remote_url_secret_ref_hint")}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {serverError && <p className="text-sm text-destructive">{serverError}</p>}

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => navigate(-1)}>
          {t("common.cancel")}
        </Button>
        <Button
          onClick={() => formik.handleSubmit()}
          disabled={createProfile.isPending}
        >
          {t("common.create_profile")}
        </Button>
      </div>
    </div>
  );
};
