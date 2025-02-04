export interface HelmReleaseType {
  repoURL: string;
  releaseName: string;
  namespace: string;
  chartVersion: string;
  icon: string;
  lastAppliedTime: string;
  profileName: string;
}

export type HelmReleaseReponse = {
  totalHelmReleases: number;
  helmReleases: HelmReleaseType[];
};
