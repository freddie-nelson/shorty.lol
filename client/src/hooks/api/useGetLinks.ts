import { useInfiniteQuery } from "react-query";
import { fetcher } from "@/api/fetcher";

export const useGetLinks = (perPage = 10) => {
  return useInfiniteQuery<
    {
      hasMore: boolean;
      links: { slug: string; longLink: string; createdAt: string; _count: { Visit: number } }[];
    },
    Error
  >("getLinks", ({ pageParam = 1 }) => fetcher(`/api/getLinks?page=${pageParam}&perPage=${perPage}`, "GET"), {
    getNextPageParam: (lastPage) => lastPage.hasMore || undefined,
    retry: false,
    keepPreviousData: true,
  });
};
