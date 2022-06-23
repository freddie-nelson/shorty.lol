import { fetcher } from "@/api/fetcher";
import { useMutation } from "react-query";

export function useRegister(onSuccess?: (data: string) => void, onError?: (error: any) => void) {
  return useMutation(
    (data: { email: string; username: string; password: string }) => fetcher("/auth/register", "POST", data),
    {
      onSuccess,
      onError,
    }
  );
}
