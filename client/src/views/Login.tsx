import { FormEventHandler, useState } from "react";
import { ZodError } from "zod";
import { useNavigate } from "react-router-dom";
import { usernameSchema } from "@shared/schemas/username";
import { passwordSchema } from "@shared/schemas/password";
import useInput from "@/hooks/useInput";
import InputText from "@/components/shared/InputText";
import InputPassword from "@/components/shared/InputPassword";
import FormMessage from "@/components/shared/FormMessage";
import Label from "@/components/shared/Label";
import Button from "@/components/shared/Button";
import { useLogin } from "@/hooks/api/useLogin";

export default function Login() {
  const navigate = useNavigate();

  const { value: username, bind: bindUsername, reset: resetUsername } = useInput("");
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput("");
  const [formMessage, setFormMessage] = useState<{
    message: string;
    purpose: "success" | "error" | "neutral";
  }>();

  const loginMutation = useLogin(
    (data) => {
      setFormMessage({ message: "Successfully logged in, redirecting...", purpose: "success" });
    },
    async (error) => {
      setFormMessage({ message: error?.message, purpose: "error" });
    }
  );

  const login: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (loginMutation.isLoading) return;

    try {
      usernameSchema.parse(username);
      passwordSchema.parse(password);
    } catch (error) {
      if (error instanceof ZodError) {
        setFormMessage({ message: error.issues[0].message, purpose: "error" });
        return;
      }

      throw error;
    }

    setFormMessage({ message: "Logging in...", purpose: "neutral" });

    loginMutation.mutate({ username, password });
  };

  return (
    <main className="flex flex-col justify-center items-center flex-grow ">
      <h1 className="font-bold text-3xl text-center mb-4">login</h1>

      <form className="flex flex-col gap-3 w-11/12 max-w-md" onSubmit={login}>
        <div className="flex flex-col">
          <Label htmlFor="username" required>
            username
          </Label>
          <InputText {...bindUsername} name="username" placeholder="jsmith17" required maxLength={255} />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="password" required>
            password
          </Label>
          <InputPassword
            {...bindPassword}
            name="password"
            placeholder="password123"
            required
            maxLength={255}
          />
        </div>

        {!!formMessage && <FormMessage purpose={formMessage.purpose}>{formMessage.message}</FormMessage>}

        <Button className="h-16 mt-1" type="submit">
          sign in
        </Button>
      </form>
    </main>
  );
}
