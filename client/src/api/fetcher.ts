export const fetcher = (path: string, method: "GET" | "POST" | "PATCH" | "DELETE", body: any) => {
  return fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    method,
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": typeof body === "object" ? "application/json" : "text/plain",
    },
    body: typeof body === "object" ? JSON.stringify(body) : body + "",
  }).then((res) => {
    if (res.status >= 400) {
      return new Promise<Response>((resolve, reject) => reject(res));
    }

    return new Promise<Response>((resolve) => resolve(res));
  });
};
