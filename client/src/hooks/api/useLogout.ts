import { fetcher } from "@/api/fetcher";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export function useLogout(onSuccess?: (data: string) => void, onError?: (error: any) => void) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(() => fetcher("/auth/logout", "GET"), {
    onSuccess: async (data: string) => {
      navigate("/");
      queryClient.resetQueries("getUser");
      if (onSuccess) onSuccess(data);
    },
    onError,
  });
}
