import { fetcher } from "@/api/fetcher";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export function useLogin(
  onSuccess?: (data: { email: string; username: string }) => void,
  onError?: (error: any) => void
) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation((data: { username: string; password: string }) => fetcher("/auth/login", "POST", data), {
    onSuccess: async (data) => {
      navigate("/account");
      queryClient.invalidateQueries("getUser");
      if (onSuccess) onSuccess(data);
    },
    onError,
  });
}
