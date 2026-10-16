import * as yup from "yup";
import type { TFunction } from "i18next";

import { CreateProfileRequest } from "@/types/profile.types";

export type ProfileKind = "ClusterProfile" | "Profile";

export type ContentType = "helm" | "yaml" | "existing" | "remoteURL";

export type SelectorRow = { key: string; value: string };

// All the fields of the create form in one flat object. Only the fields belonging to the
// selected contentType are validated and sent; the others keep their value so switching
// content type back and forth does not lose what the user typed.
export interface ProfileFormValues {
  kind: ProfileKind;
  namespace: string;
  name: string;
  tier: string;
  dependsOn: string[];
  selectorRows: SelectorRow[];
  contentType: ContentType;

  repositoryURL: string;
  repositoryName: string;
  chartName: string;
  chartVersion: string;
  releaseName: string;
  releaseNamespace: string;
  values: string;

  yaml: string;

  existingKind: string;
  existingNamespace: string;
  existingName: string;

  remoteURL: string;
  remoteURLInterval: string;
  remoteURLTemplate: boolean;
  remoteURLInsecureSkipTLSVerify: boolean;
  remoteURLPlainHTTP: boolean;
  remoteURLSecretNamespace: string;
  remoteURLSecretName: string;
}

export const initialProfileFormValues: ProfileFormValues = {
  kind: "ClusterProfile",
  namespace: "",
  name: "",
  tier: "",
  dependsOn: [],
  selectorRows: [{ key: "", value: "" }],
  contentType: "helm",

  repositoryURL: "",
  repositoryName: "",
  chartName: "",
  chartVersion: "",
  releaseName: "",
  releaseNamespace: "",
  values: "",

  yaml: "",

  existingKind: "ConfigMap",
  existingNamespace: "",
  existingName: "",

  remoteURL: "",
  remoteURLInterval: "",
  remoteURLTemplate: false,
  remoteURLInsecureSkipTLSVerify: false,
  remoteURLPlainHTTP: false,
  remoteURLSecretNamespace: "",
  remoteURLSecretName: "",
};

// The CRD (addon-controller api/v1beta1 Spec.Tier) is an int32 with Minimum=1.
const maxTier = 2147483647;

// RemoteURL.URL has the CRD pattern ^(https?|oci)://
const remoteURLPattern = /^(https?|oci):\/\//;

// Accepts what Go's time.ParseDuration accepts, which is what the backend uses to parse
// RemoteURL.Interval: an optional sign, then either "0" or one or more number+unit pairs.
const durationPattern = /^[-+]?(0|((\d+\.?\d*|\.\d+)(ns|us|µs|μs|ms|s|m|h))+)$/;

// A Helm repository served over HTTP(S) or OCI requires repositoryName. The CRD additionally
// requires chartName and chartVersion for these. A Flux source (gitrepository://, ...) needs
// none of them.
export const isRemoteHelmSource = (repositoryURL: string) => {
  const lower = repositoryURL.toLowerCase();
  return (
    lower.startsWith("http://") ||
    lower.startsWith("https://") ||
    lower.startsWith("oci://")
  );
};

const isTier = (tier: string) => {
  if (!/^\d+$/.test(tier)) {
    return false;
  }
  const value = Number(tier);
  return value >= 1 && value <= maxTier;
};

// Formik hands the schema empty strings as undefined, so conditions below must treat
// undefined and "" the same way.
export const createProfileFormSchema = (t: TFunction) => {
  const requiredMessage = (label: string) => `${label} ${t("common.required")}`;

  const requiredWhenContentType = (contentType: ContentType, label: string) =>
    yup.string().when("contentType", {
      is: contentType,
      then: (schema) => schema.required(requiredMessage(label)),
    });

  const requiredForRemoteHelmSource = (label: string) =>
    yup.string().when(["contentType", "repositoryURL"], {
      is: (contentType: ContentType, repositoryURL?: string) =>
        contentType === "helm" && isRemoteHelmSource(repositoryURL ?? ""),
      then: (schema) => schema.required(requiredMessage(label)),
    });

  // secretRef needs both namespace and name. Each half is required once the other is set.
  const secretRefHalf = (
    otherHalf: "remoteURLSecretNamespace" | "remoteURLSecretName",
    label: string,
  ) =>
    yup.string().when(["contentType", otherHalf], {
      is: (contentType: ContentType, other?: string) =>
        contentType === "remoteURL" && Boolean(other),
      then: (schema) =>
        schema.required(
          `${t("common.remote_url_secret_ref")}: ${requiredMessage(label)}`,
        ),
    });

  // The two secretRef halves depend on each other, which Yup rejects as a cycle unless the
  // pair is excluded explicitly.
  const secretRefCycle: [string, string] = [
    "remoteURLSecretNamespace",
    "remoteURLSecretName",
  ];

  const fields = {
    name: yup.string().required(requiredMessage(t("common.name"))),
    namespace: yup.string().when("kind", {
      is: "Profile",
      then: (schema) => schema.required(requiredMessage(t("common.namespace"))),
    }),
    tier: yup
      .string()
      .test(
        "tier",
        `${t("common.tier")} ${t("common.invalid_tier")}`,
        (tier) => !tier || isTier(tier),
      ),

    repositoryURL: requiredWhenContentType("helm", t("common.repository_url")),
    repositoryName: requiredForRemoteHelmSource(t("common.repository_name")),
    chartName: requiredForRemoteHelmSource(t("common.chart_name")),
    chartVersion: requiredForRemoteHelmSource(t("common.chart_version")),
    releaseName: requiredWhenContentType("helm", t("common.release_name")),
    releaseNamespace: requiredWhenContentType(
      "helm",
      t("common.release_namespace"),
    ),

    // Whitespace alone would create a ConfigMap with nothing to deploy.
    yaml: yup.string().when("contentType", {
      is: "yaml",
      then: (schema) =>
        schema.test(
          "yaml-not-blank",
          requiredMessage(t("common.manifests")),
          (yaml) => Boolean(yaml?.trim()),
        ),
    }),

    existingNamespace: requiredWhenContentType(
      "existing",
      t("common.content_namespace"),
    ),
    existingName: requiredWhenContentType("existing", t("common.content_name")),

    remoteURL: yup.string().when("contentType", {
      is: "remoteURL",
      then: (schema) =>
        schema
          .required(requiredMessage(t("common.url")))
          .matches(remoteURLPattern, {
            message: `${t("common.url")} ${t("common.invalid_url_scheme")}`,
            excludeEmptyString: true,
          }),
    }),
    remoteURLInterval: yup.string().when("contentType", {
      is: "remoteURL",
      then: (schema) =>
        schema.matches(durationPattern, {
          message: `${t("common.interval")} ${t("common.invalid_duration")}`,
          excludeEmptyString: true,
        }),
    }),
    remoteURLSecretNamespace: secretRefHalf(
      "remoteURLSecretName",
      t("common.content_namespace"),
    ),
    remoteURLSecretName: secretRefHalf(
      "remoteURLSecretNamespace",
      t("common.content_name"),
    ),
  };

  return yup.object().shape(fields, [secretRefCycle]);
};

// Rows with an empty key are dropped, as the form has always done.
const buildClusterSelector = (selectorRows: SelectorRow[]) => {
  const clusterSelector: { [key: string]: string } = {};
  selectorRows.forEach((row) => {
    if (row.key) {
      clusterSelector[row.key] = row.value;
    }
  });
  return clusterSelector;
};

// Only the fields of the selected contentType end up in the request.
export const buildCreateRequest = (
  values: ProfileFormValues,
): CreateProfileRequest => {
  const request: CreateProfileRequest = {
    kind: values.kind,
    namespace: values.kind === "Profile" ? values.namespace : undefined,
    name: values.name,
    clusterSelector: buildClusterSelector(values.selectorRows),
    tier: values.tier ? Number(values.tier) : undefined,
    dependsOn: values.dependsOn.length > 0 ? values.dependsOn : undefined,
  };

  if (values.contentType === "helm") {
    request.helmChart = {
      repositoryURL: values.repositoryURL,
      repositoryName: values.repositoryName || undefined,
      chartName: values.chartName || undefined,
      chartVersion: values.chartVersion || undefined,
      releaseName: values.releaseName,
      releaseNamespace: values.releaseNamespace,
      values: values.values || undefined,
    };
  } else if (values.contentType === "yaml") {
    request.yaml = values.yaml;
  } else if (values.contentType === "existing") {
    request.existingContent = {
      kind: values.existingKind,
      namespace: values.existingNamespace,
      name: values.existingName,
    };
  } else {
    request.remoteURL = {
      url: values.remoteURL,
      interval: values.remoteURLInterval || undefined,
      secretRef: values.remoteURLSecretName
        ? {
            namespace: values.remoteURLSecretNamespace,
            name: values.remoteURLSecretName,
          }
        : undefined,
      template: values.remoteURLTemplate || undefined,
      insecureSkipTLSVerify: values.remoteURLInsecureSkipTLSVerify || undefined,
      plainHTTP: values.remoteURLPlainHTTP || undefined,
    };
  }

  return request;
};
