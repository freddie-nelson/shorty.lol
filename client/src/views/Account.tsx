import GradientAvatar from "@/components/app/GradientAvatar";
import LinkShortener from "@/components/app/LinkShortener";
import LinksList from "@/components/app/LinksList/LinksList";
import Button from "@/components/shared/Button";
import FormMessage from "@/components/shared/FormMessage";
import { useGetUser } from "@/hooks/api/useGetUser";
import { useLogout } from "@/hooks/api/useLogout";

export default function Account() {
  const { isLoading, isError, data, error } = useGetUser();
  const logoutMutation = useLogout();

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
        <FormMessage purpose="error">{error?.message}</FormMessage>
      </main>
    );
  }

  return (
    <main className="flex flex-col flex-grow px-12 py-20">
      <div className="flex flex-col lg:flex-row lg:items-center w-full">
        <GradientAvatar className="w-full h-28 lg:w-40 lg:h-40" seed={data?.username || "123"} />

        <div className="my-4 lg:my-0 lg:ml-6 flex flex-col">
          <p className="text-4xl font-bold text-gray-900">{data?.username}</p>
          <p className="text-xl font-bold text-gray-600">{data?.email}</p>
        </div>

        <div className="flex lg:flex-col gap-3 lg:ml-auto">
          {/* <Button className="p-3 flex-grow lg:flex-grow-0">change password</Button> */}
          <Button
            className="py-3 px-5 flex-grow lg:flex-grow-0"
            purpose="danger"
            onClick={() => logoutMutation.mutate()}
          >
            {logoutMutation.isLoading ? "logging out..." : "log out"}
          </Button>
        </div>
      </div>

      <LinkShortener className="mt-7 lg:mt-10" />

      <h1 className="font-bold text-3xl mt-6">your links</h1>
      <LinksList className="mt-6" />
    </main>
  );
}
