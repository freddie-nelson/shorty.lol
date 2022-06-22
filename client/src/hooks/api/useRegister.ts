import { fetcher } from "@/api/fetcher";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export function useRegister(onSuccess?: (data: string) => void, onError?: (error: unknown) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: { email: string; username: string; password: string }) => fetcher("/auth/register", "POST", data),
    {
      onSuccess: async (data) => {
        queryClient.invalidateQueries("getUser");
        if (onSuccess) onSuccess(await data.text());
      },
      onError,
    }
  );
}
