import { useQuery } from "react-query";
import { fetcher } from "@/api/fetcher";

export const useGetLinks = (page: number, perPage = 10) => {
  return useQuery<{ slug: string; longLink: string; createdAt: string; _count: { Visit: number } }[], Error>(
    "getLinks",
    () => fetcher(`/api/getLinks?page=${page}&perPage=${perPage}`, "GET"),
    { retry: false }
  );
};
