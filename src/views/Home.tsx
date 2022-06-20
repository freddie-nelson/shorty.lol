import { FormEventHandler } from "react";
import { z } from "zod";
import useInput from "@/hooks/useInput";
import Button from "@/components/shared/Button";

export default function Home() {
  const { value, bind, reset } = useInput("");
  const urlSchema = z.string().trim().url();

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const parsed = urlSchema.safeParse(value);
    if (!parsed.success) return;

    console.log("valid url", parsed.data);
  };

  return (
    <main className="flex flex-col items-center justify-center flex-grow">
      <h1 className="font-bold text-2xl md:text-3xl text-center">
        shorty and tracky your links at the same time!
      </h1>
      <h2 className="italic text-center text-gray-800 mt-0.5">
        (shorten and track your links with shorty.lol)
      </h2>

      <form
        onSubmit={submit}
        className="border-4 rounded-lg p-2 h-20 border-gray-900 flex gap-2 w-11/12 max-w-lg mt-5"
      >
        <input
          className="bg-transparent outline-none flex-grow pl-2 h-full"
          type="text"
          name="url"
          maxLength={2048}
          required
          placeholder="https://example.com"
          {...bind}
        />

        <Button className="h-full px-4">Shorten</Button>
      </form>
    </main>
  );
}
