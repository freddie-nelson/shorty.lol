import { useQuery } from "react-query";
import { fetcher } from "@/api/fetcher";

export const useGetUser = () => {
  return useQuery<{ email: string; username: string }, Error>(
    "getUser",
    () => fetcher("/api/getUser", "GET"),
    { retry: false }
  );
};
