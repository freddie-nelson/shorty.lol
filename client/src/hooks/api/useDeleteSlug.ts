import { fetcher } from "@/api/fetcher";
import { useMutation, useQueryClient } from "react-query";

export function useDeleteSlug(onSuccess?: (data: string) => void, onError?: (error: any) => void) {
  const queryClient = useQueryClient();

  return useMutation((data: { slug: string }) => fetcher("/api/deleteSlug", "POST", data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getLinks");
      if (onSuccess) onSuccess(data);
    },
    onError,
  });
}
