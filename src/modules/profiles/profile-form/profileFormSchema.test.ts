import { describe, expect, it } from "vitest";
import { ValidationError } from "yup";
import { validateYupSchema, yupToFormErrors } from "formik";
import type { TFunction } from "i18next";

import {
  ProfileFormValues,
  buildCreateRequest,
  createProfileFormSchema,
  initialProfileFormValues,
} from "@/modules/profiles/profile-form/profileFormSchema";

// Returns the translation key, so messages read "common.name common.required".
const t = ((key: string) => key) as unknown as TFunction;

// Validates the same way Formik does: it hands empty strings to the schema as undefined.
const validate = (overrides: Partial<ProfileFormValues>) => {
  const values: ProfileFormValues = {
    ...initialProfileFormValues,
    name: "my-profile",
    ...overrides,
  };
  try {
    validateYupSchema(values, createProfileFormSchema(t), true);
    return {};
  } catch (error) {
    // Anything but a validation failure, such as an invalid schema, must fail the test.
    if (!(error instanceof ValidationError)) {
      throw error;
    }
    return yupToFormErrors(error) as Record<string, string>;
  }
};

describe("createProfileFormSchema", () => {
  describe("identity", () => {
    it("requires a name", () => {
      expect(validate({ name: "" }).name).toBe("common.name common.required");
    });

    it("requires a namespace for a Profile", () => {
      const errors = validate({
        kind: "Profile",
        namespace: "",
        contentType: "yaml",
        yaml: "kind: Namespace",
      });
      expect(errors.namespace).toBe("common.namespace common.required");
    });

    it("does not require a namespace for a ClusterProfile", () => {
      const errors = validate({
        kind: "ClusterProfile",
        namespace: "",
        contentType: "yaml",
      });
      expect(errors.namespace).toBeUndefined();
    });
  });

  describe("tier", () => {
    it("is optional", () => {
      expect(validate({ contentType: "yaml", tier: "" }).tier).toBeUndefined();
    });

    it.each(["1", "100", "2147483647"])("accepts %s", (tier) => {
      expect(validate({ contentType: "yaml", tier }).tier).toBeUndefined();
    });

    it.each(["0", "-1", "1.5", "abc", "2147483648"])("rejects %s", (tier) => {
      expect(validate({ contentType: "yaml", tier }).tier).toBe(
        "common.tier common.invalid_tier",
      );
    });
  });

  describe("helm", () => {
    const fluxSource = {
      contentType: "helm" as const,
      repositoryURL: "gitrepository://flux-system/charts",
      releaseName: "kyverno",
      releaseNamespace: "kyverno",
    };

    it("accepts a Flux source without repository name, chart name and version", () => {
      expect(validate(fluxSource)).toEqual({});
    });

    it("requires repository url, release name and release namespace", () => {
      const errors = validate({ contentType: "helm" });
      expect(Object.keys(errors).sort()).toEqual([
        "releaseName",
        "releaseNamespace",
        "repositoryURL",
      ]);
    });

    it.each([
      "https://kyverno.github.io/kyverno/",
      "http://charts.example.com",
      "oci://registry.example.com/charts",
      "HTTPS://kyverno.github.io/kyverno/",
    ])(
      "requires repository name, chart name and chart version for %s",
      (repositoryURL) => {
        const errors = validate({ ...fluxSource, repositoryURL });
        expect(Object.keys(errors).sort()).toEqual([
          "chartName",
          "chartVersion",
          "repositoryName",
        ]);
      },
    );

    it("accepts a complete remote chart", () => {
      const errors = validate({
        ...fluxSource,
        repositoryURL: "https://kyverno.github.io/kyverno/",
        repositoryName: "kyverno",
        chartName: "kyverno/kyverno",
        chartVersion: "3.3.0",
      });
      expect(errors).toEqual({});
    });

    it("does not validate helm fields for another content type", () => {
      expect(
        validate({
          contentType: "yaml",
          yaml: "kind: Namespace",
          repositoryURL: "",
        }),
      ).toEqual({});
    });
  });

  describe("yaml", () => {
    it("requires the manifests", () => {
      expect(validate({ contentType: "yaml", yaml: "" }).yaml).toBe(
        "common.manifests common.required",
      );
    });

    it("rejects manifests made only of whitespace", () => {
      expect(validate({ contentType: "yaml", yaml: " \n\t\n" }).yaml).toBe(
        "common.manifests common.required",
      );
    });

    it("accepts manifests", () => {
      expect(
        validate({ contentType: "yaml", yaml: "kind: Namespace" }),
      ).toEqual({});
    });

    it("does not validate the manifests for another content type", () => {
      expect(
        validate({
          contentType: "existing",
          yaml: "",
          existingNamespace: "default",
          existingName: "content",
        }),
      ).toEqual({});
    });
  });

  describe("existing content", () => {
    it("requires namespace and name", () => {
      const errors = validate({ contentType: "existing" });
      expect(Object.keys(errors).sort()).toEqual([
        "existingName",
        "existingNamespace",
      ]);
    });

    it("accepts namespace and name", () => {
      const errors = validate({
        contentType: "existing",
        existingNamespace: "default",
        existingName: "content",
      });
      expect(errors).toEqual({});
    });
  });

  describe("remote url", () => {
    const remote = {
      contentType: "remoteURL" as const,
      remoteURL: "https://example.com/manifest.yaml",
    };

    it("requires the url", () => {
      expect(validate({ contentType: "remoteURL" }).remoteURL).toBe(
        "common.url common.required",
      );
    });

    it.each([
      "http://example.com/a.yaml",
      "https://example.com/a.yaml",
      "oci://registry.example.com/space/app:latest",
    ])("accepts %s", (remoteURL) => {
      expect(validate({ ...remote, remoteURL }).remoteURL).toBeUndefined();
    });

    it.each(["example.com/a.yaml", "ftp://example.com/a.yaml", "HTTPS://x"])(
      "rejects %s",
      (remoteURL) => {
        expect(validate({ ...remote, remoteURL }).remoteURL).toBe(
          "common.url common.invalid_url_scheme",
        );
      },
    );

    it("treats interval as optional", () => {
      expect(validate(remote).remoteURLInterval).toBeUndefined();
    });

    it.each(["30s", "5m", "1h30m", "1.5h", "0", "100ms"])(
      "accepts interval %s",
      (remoteURLInterval) => {
        expect(
          validate({ ...remote, remoteURLInterval }).remoteURLInterval,
        ).toBeUndefined();
      },
    );

    it.each(["5", "abc", "5 m", "5d", "m"])(
      "rejects interval %s",
      (remoteURLInterval) => {
        expect(
          validate({ ...remote, remoteURLInterval }).remoteURLInterval,
        ).toBe("common.interval common.invalid_duration");
      },
    );

    it("does not require a secretRef", () => {
      expect(validate(remote)).toEqual({});
    });

    it("requires the secretRef name when only the namespace is set", () => {
      const errors = validate({
        ...remote,
        remoteURLSecretNamespace: "projectsveltos",
      });
      expect(Object.keys(errors)).toEqual(["remoteURLSecretName"]);
    });

    it("requires the secretRef namespace when only the name is set", () => {
      const errors = validate({ ...remote, remoteURLSecretName: "creds" });
      expect(Object.keys(errors)).toEqual(["remoteURLSecretNamespace"]);
    });

    it("accepts a complete secretRef", () => {
      const errors = validate({
        ...remote,
        remoteURLSecretNamespace: "projectsveltos",
        remoteURLSecretName: "creds",
      });
      expect(errors).toEqual({});
    });

    it("does not validate remote url fields for another content type", () => {
      const errors = validate({
        contentType: "yaml",
        yaml: "kind: Namespace",
        remoteURL: "not-a-url",
        remoteURLSecretName: "creds",
      });
      expect(errors).toEqual({});
    });
  });
});

describe("buildCreateRequest", () => {
  it("sends the namespace only for a Profile", () => {
    const base = {
      ...initialProfileFormValues,
      name: "p",
      namespace: "team-a",
      contentType: "yaml" as const,
    };
    expect(buildCreateRequest({ ...base, kind: "Profile" }).namespace).toBe(
      "team-a",
    );
    expect(
      buildCreateRequest({ ...base, kind: "ClusterProfile" }).namespace,
    ).toBeUndefined();
  });

  it("converts tier to a number and omits an empty tier and empty dependsOn", () => {
    const base = { ...initialProfileFormValues, name: "p" };
    const withTier = buildCreateRequest({
      ...base,
      tier: "50",
      dependsOn: ["a", "b"],
    });
    expect(withTier.tier).toBe(50);
    expect(withTier.dependsOn).toEqual(["a", "b"]);

    const withoutTier = buildCreateRequest(base);
    expect(withoutTier.tier).toBeUndefined();
    expect(withoutTier.dependsOn).toBeUndefined();
  });

  it("drops selector rows with an empty key", () => {
    const request = buildCreateRequest({
      ...initialProfileFormValues,
      name: "p",
      selectorRows: [
        { key: "env", value: "prod" },
        { key: "", value: "ignored" },
        { key: "region", value: "" },
      ],
    });
    expect(request.clusterSelector).toEqual({ env: "prod", region: "" });
  });

  it("sends only the helm chart for the helm content type", () => {
    const request = buildCreateRequest({
      ...initialProfileFormValues,
      name: "p",
      contentType: "helm",
      repositoryURL: "https://charts.example.com",
      repositoryName: "example",
      chartName: "example/app",
      chartVersion: "1.0.0",
      releaseName: "app",
      releaseNamespace: "apps",
      values: "",
      yaml: "ignored",
      remoteURL: "https://ignored",
    });
    expect(request.helmChart).toEqual({
      repositoryURL: "https://charts.example.com",
      repositoryName: "example",
      chartName: "example/app",
      chartVersion: "1.0.0",
      releaseName: "app",
      releaseNamespace: "apps",
      values: undefined,
    });
    expect(request.yaml).toBeUndefined();
    expect(request.existingContent).toBeUndefined();
    expect(request.remoteURL).toBeUndefined();
  });

  it("sends only the yaml for the yaml content type", () => {
    const request = buildCreateRequest({
      ...initialProfileFormValues,
      name: "p",
      contentType: "yaml",
      yaml: "kind: Namespace",
      repositoryURL: "https://ignored",
    });
    expect(request.yaml).toBe("kind: Namespace");
    expect(request.helmChart).toBeUndefined();
  });

  it("sends only the reference for the existing content type", () => {
    const request = buildCreateRequest({
      ...initialProfileFormValues,
      name: "p",
      contentType: "existing",
      existingKind: "Secret",
      existingNamespace: "default",
      existingName: "content",
    });
    expect(request.existingContent).toEqual({
      kind: "Secret",
      namespace: "default",
      name: "content",
    });
    expect(request.helmChart).toBeUndefined();
  });

  it("builds the remote url, leaving unset options out", () => {
    const request = buildCreateRequest({
      ...initialProfileFormValues,
      name: "p",
      contentType: "remoteURL",
      remoteURL: "https://example.com/a.yaml",
    });
    expect(request.remoteURL).toEqual({
      url: "https://example.com/a.yaml",
      interval: undefined,
      secretRef: undefined,
      template: undefined,
      insecureSkipTLSVerify: undefined,
      plainHTTP: undefined,
    });
  });

  it("builds the remote url with all options set", () => {
    const request = buildCreateRequest({
      ...initialProfileFormValues,
      name: "p",
      contentType: "remoteURL",
      remoteURL: "oci://registry.example.com/app:latest",
      remoteURLInterval: "10m",
      remoteURLTemplate: true,
      remoteURLInsecureSkipTLSVerify: true,
      remoteURLPlainHTTP: true,
      remoteURLSecretNamespace: "projectsveltos",
      remoteURLSecretName: "creds",
    });
    expect(request.remoteURL).toEqual({
      url: "oci://registry.example.com/app:latest",
      interval: "10m",
      secretRef: { namespace: "projectsveltos", name: "creds" },
      template: true,
      insecureSkipTLSVerify: true,
      plainHTTP: true,
    });
  });
});
