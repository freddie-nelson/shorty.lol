import { fetcher } from "@/api/fetcher";
import { useMutation, useQueryClient } from "react-query";

// export function useEditSlug(onSuccess?: (data: string) => void, onError?: (error: any) => void) {
//   const queryClient = useQueryClient();

//   return useMutation((data: { slug: string; newSlug: string }) => fetcher("/api/editSlug", "POST", data), {
//     onSuccess: (data) => {
//       queryClient.invalidateQueries("getLinks");
//       queryClient.invalidateQueries("trackSlug");
//       if (onSuccess) onSuccess(data);
//     },
//     onError,
//   });
// }
