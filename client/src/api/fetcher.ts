export const fetcher = (path: string, method: "GET" | "POST" | "PATCH" | "DELETE", body?: any) => {
  return fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    method,
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": typeof body === "object" ? "application/json" : "text/plain",
    },
    body: body === undefined ? body : typeof body === "object" ? JSON.stringify(body) : body + "",
  }).then(async (res) => {
    if (res.status >= 400) {
      throw new Error(await res.text());
    }

    return res.headers.get("Content-Type")?.includes("application/json")
      ? await res.json()
      : await res.text();
  });
};
