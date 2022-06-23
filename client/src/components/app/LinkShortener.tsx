import { useCreateSlug } from "@/hooks/api/useCreateSlug";
import useInput from "@/hooks/useInput";
import { z } from "@shared/node_modules/zod";
import { FormEventHandler, HTMLAttributes, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../shared/Button";
import FormMessage from "../shared/FormMessage";

const urlSchema = z.string().trim().url();

export default function LinkShortener(props: HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const fixedProps = { ...props };
  delete fixedProps.className;

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
    <div {...fixedProps} className={`flex flex-col gap-4 ${props.className}`}>
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
  );
}
