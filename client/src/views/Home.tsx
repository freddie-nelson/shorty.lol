import LinkShortener from "@/components/app/LinkShortener";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center flex-grow">
      <h1 className="font-bold text-2xl md:text-3xl text-center">
        shorty and tracky your links at the same time!
      </h1>
      <h2 className="italic text-center text-gray-800 mt-0.5">
        (shorten and track your links with shorty.lol)
      </h2>

      <LinkShortener className="w-11/12 max-w-lg mt-5 " />
    </main>
  );
}
