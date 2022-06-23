import { FormEventHandler, useState } from "react";
import { z } from "zod";
import useInput from "@/hooks/useInput";
import Button from "@/components/shared/Button";
import { useCreateSlug } from "@/hooks/api/useCreateSlug";
import FormMessage from "@/components/shared/FormMessage";
import { useNavigate } from "react-router-dom";

const urlSchema = z.string().trim().url();

export default function Home() {
  const navigate = useNavigate();

  const { value, bind, reset } = useInput("");
  const [formMessage, setFormMessage] = useState<{
    message: string;
    purpose: "success" | "error" | "neutral";
  }>();

  const createSlugMutation = useCreateSlug(
    (data) => {
      setFormMessage({ message: "Link shortened, redirecting...", purpose: "success" });
      navigate(`/track/${data.slug}`);
    },
    async (error) => {
      setFormMessage({ message: error?.message, purpose: "error" });
    }
  );

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const parsed = urlSchema.safeParse(value);
    if (!parsed.success) {
      setFormMessage({ message: parsed.error.issues[0].message, purpose: "error" });
      return;
    }

    setFormMessage({ message: "Shortening link...", purpose: "neutral" });
    createSlugMutation.mutate({ longLink: parsed.data });
  };

  return (
    <main className="flex flex-col items-center justify-center flex-grow">
      <h1 className="font-bold text-2xl md:text-3xl text-center">
        shorty and tracky your links at the same time!
      </h1>
      <h2 className="italic text-center text-gray-800 mt-0.5">
        (shorten and track your links with shorty.lol)
      </h2>

      <div className="w-11/12 max-w-lg mt-5 flex flex-col gap-4">
        <form onSubmit={submit} className="border-4 rounded-lg p-2 h-20 border-gray-900 flex gap-2 w-full">
          <input
            className="bg-transparent outline-none flex-grow pl-2 h-full min-w-0"
            type="text"
            name="url"
            maxLength={2048}
            required
            placeholder="https://example.com"
            {...bind}
          />

          <Button className="h-full px-4">Shorten</Button>
        </form>

        {!!formMessage && <FormMessage purpose={formMessage.purpose}>{formMessage.message}</FormMessage>}
      </div>
    </main>
  );
}
