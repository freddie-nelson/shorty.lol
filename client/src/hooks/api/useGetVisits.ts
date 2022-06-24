import { useInfiniteQuery } from "react-query";
import { fetcher } from "@/api/fetcher";

export const useGetVisits = (slug: string, perPage = 10) => {
  return useInfiniteQuery<
    {
      hasMore: boolean;
      visits: { id: number; createdAt: string; ip: string; userAgent: string; slug: string }[];
    },
    Error
  >(
    "getVisits",
    ({ pageParam = 1 }) => fetcher(`/api/getVisits?slug=${slug}&page=${pageParam}&perPage=${perPage}`, "GET"),
    {
      getNextPageParam: (lastPage) => lastPage.hasMore || undefined,
      retry: false,
      keepPreviousData: true,
    }
  );
};
