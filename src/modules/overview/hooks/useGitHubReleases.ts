import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string;
  html_url: string;
  published_at: string;
  body: string;
}

const fetchGitHubReleases = async (): Promise<GitHubRelease[]> => {
  const { data } = await axios.get(
    "https://api.github.com/repos/projectsveltos/sveltos/releases",
    {
      params: { per_page: 5 },
    },
  );
  return data;
};

export const useGitHubReleases = () => {
  return useQuery({
    queryKey: ["github-releases"],
    queryFn: fetchGitHubReleases,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
