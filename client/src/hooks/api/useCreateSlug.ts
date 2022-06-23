import { fetcher } from "@/api/fetcher";
import { useMutation } from "react-query";

export function useCreateSlug(
  onSuccess?: (data: { longLink: string; slug: string }) => void,
  onError?: (error: any) => void
) {
  return useMutation((data: { longLink: string }) => fetcher("/api/createSlug", "POST", data), {
    onSuccess: async (data) => {
      if (onSuccess) onSuccess(await data.json());
    },
    onError,
  });
}
