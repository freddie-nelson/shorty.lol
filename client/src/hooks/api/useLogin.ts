import { fetcher } from "@/api/fetcher";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export function useLogin(
  onSuccess?: (data: { email: string; username: string }) => void,
  onError?: (error: unknown) => void
) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation((data: { username: string; password: string }) => fetcher("/auth/login", "POST", data), {
    onSuccess: async (data) => {
      console.log("login");
      navigate("/");
      queryClient.invalidateQueries("getUser");
      if (onSuccess) onSuccess(await data.json());
    },
    onError,
  });
}
