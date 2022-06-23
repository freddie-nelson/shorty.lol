import { useQuery } from "react-query";
import { fetcher } from "@/api/fetcher";

export const useTrackSlug = (slug: string) => {
  return useQuery<
    { slug: string; longLink: string; createdAt: string; visits: number; editable: boolean },
    Error
  >("trackSlug", () => fetcher("/api/trackSlug", "POST", { slug }), { retry: false });
};
