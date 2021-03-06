import { fetcher } from "@/api/fetcher";
import { useMutation, useQueryClient } from "react-query";

export function useCreateSlug(
  onSuccess?: (data: { longLink: string; slug: string }) => void,
  onError?: (error: any) => void
) {
  const queryClient = useQueryClient();

  return useMutation((data: { longLink: string }) => fetcher("/api/createSlug", "POST", data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getLinks");
      if (onSuccess) onSuccess(data);
    },
    onError,
  });
}
