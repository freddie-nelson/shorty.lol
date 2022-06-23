import { useParams, useNavigate } from "react-router-dom";
import { slugSchema } from "@shared/schemas/slug";
import FormMessage from "@/components/shared/FormMessage";
import { useTrackSlug } from "@/hooks/api/useTrackSlug";

export default function Track() {
  const params = useParams();
  const slug = params.slug as string;
  const { isLoading, isError, data, error } = useTrackSlug(slug);

  return (
    <main className="flex flex-col justify-center items-center flex-grow">
      <div>{JSON.stringify(data)}</div>

      {isLoading && <FormMessage purpose="neutral">Loading...</FormMessage>}
      {isError && <FormMessage purpose="error">{(error as any)?.message}</FormMessage>}
    </main>
  );
}
