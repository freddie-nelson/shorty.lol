import { Link, useParams } from "react-router-dom";
import FormMessage from "@/components/shared/FormMessage";
import { useTrackSlug } from "@/hooks/api/useTrackSlug";
import SlugAvatar from "@/components/app/SlugAvatar";
import { Icon } from "@iconify/react";
import calendarIcon from "@iconify-icons/uil/calender";
import visitsIcon from "@iconify-icons/uil/eye";
import Button from "@/components/shared/Button";

export default function Track() {
  const params = useParams();
  const slug = params.slug as string;
  const { isLoading, isError, data, error } = useTrackSlug(slug);

  if (isLoading) {
    return (
      <main className="flex flex-col justify-center items-center flex-grow">
        <FormMessage purpose="neutral">Loading...</FormMessage>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex flex-col justify-center items-center flex-grow">
        <FormMessage purpose="error">{(error as any)?.message}</FormMessage>
      </main>
    );
  }

  return (
    <main className="flex flex-col justify-center items-center flex-grow">
      <div className="flex flex-col gap-5 md:gap-0 md:flex-row items-center max-w-2xl w-11/12">
        <div className="flex items-center w-full md:w-auto">
          <SlugAvatar className="w-28 h-28" slug={slug} />

          <div className="flex flex-col gap-0.5 ml-5">
            <a
              className="-mt-1 underline font-bold text-2xl text-blue-500 hover:text-blue-400 focus:text-blue-600 transition-colors duration-300"
              href={`${import.meta.env.VITE_API_URL}/${data?.slug}`}
              target="_blank"
              rel="norefferer noopener"
            >
              {`${import.meta.env.VITE_API_URL.split("://")[1]}/${data?.slug}`}
            </a>

            <a
              className="italic text-gray-700 hover:text-gray-900 hover:underline transition-colors duration-300"
              href={data?.longLink}
              target="_blank"
              rel="norefferer noopener"
            >
              {data?.longLink}
            </a>

            <div className="mt-2.5 flex gap-5 text-gray-700">
              <div className="flex gap-1.5 font-bold items-center">
                <Icon className="w-6 h-6" icon={calendarIcon} />
                <p>{data && new Date(data.createdAt).toLocaleDateString()}</p>
              </div>

              <div className="flex gap-1.5 font-bold items-center">
                <Icon className="w-6 h-6" icon={visitsIcon} />
                <p>{data?.visits}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:ml-auto w-full md:w-auto flex md:flex-col gap-3 text-sm">
          {!data?.editable && (
            <Link className="flex-grow md:flex-grow-0" to="/register">
              <Button className="p-3 w-full">register to edit</Button>
            </Link>
          )}
          {data?.editable && (
            <>
              <Button className="p-3 flex-grow md:flex-grow-0">edit slug</Button>
              <Button className="p-3 flex-grow md:flex-grow-0" purpose="danger">
                delete
              </Button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
