import { Link, useParams, useNavigate } from "react-router-dom";
import FormMessage from "@/components/shared/FormMessage";
import { useTrackSlug } from "@/hooks/api/useTrackSlug";
import GradientAvatar from "@/components/app/GradientAvatar";
import { Icon } from "@iconify/react";
import calendarIcon from "@iconify-icons/uil/calender";
import visitsIcon from "@iconify-icons/uil/eye";
import Button from "@/components/shared/Button";
import { useDeleteSlug } from "@/hooks/api/useDeleteSlug";
import VisitsList from "@/components/app/VisitsList";
// import { useEditSlug } from "@/hooks/api/useEditSlug";

export default function Track() {
  const navigate = useNavigate();
  const params = useParams();

  const slug = params.slug as string;
  const { isLoading, isError, data, error } = useTrackSlug(slug);

  const deleteSlugMutation = useDeleteSlug(() => {
    navigate("/account");
  });

  // const editSlugMutation = useEditSlug();

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
    <main className="flex flex-col justify-center items-center flex-grow px-0 py-6 sm:px-6 sm:py-14 md:px-12 md:py-20">
      <div className="flex flex-col gap-5 lg:gap-0 lg:flex-row items-center max-w-3xl w-11/12">
        <div className="flex items-center w-full lg:w-auto">
          <GradientAvatar className="w-28 h-28" seed={slug} />

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
              className="italic text-gray-700 hover:text-gray-900 hover:underline transition-colors duration-300 max-w-[17rem] sm:max-w-sm whitespace-nowrap text-ellipsis overflow-hidden"
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

        <div className="md:ml-auto w-full lg:w-auto flex md:flex-col gap-3 text-sm">
          {!data?.editable && (
            <Link className="flex-grow lg:flex-grow-0" to="/register">
              <Button className="p-3 w-full">register to edit</Button>
            </Link>
          )}
          {data?.editable && (
            <>
              {/* <Button className="p-3 flex-grow lg:flex-grow-0">edit slug</Button> */}
              <Button
                className="p-3 flex-grow lg:flex-grow-0"
                purpose="danger"
                onClick={() => deleteSlugMutation.mutate({ slug })}
              >
                {deleteSlugMutation.isLoading ? "deleting..." : "delete"}
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="max-w-3xl w-11/12 mt-5">
        <VisitsList slug={slug} />
      </div>
    </main>
  );
}
