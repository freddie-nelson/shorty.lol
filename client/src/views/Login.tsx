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
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const loginMutation = useLogin(
    (data) => {
      setFormSuccess("Successfully logged in, redirecting...");
    },
    async (error) => {
      if (error instanceof Response) {
        setFormError(await error.text());
      }
    }
  );

  const login: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    try {
      usernameSchema.parse(username);
      passwordSchema.parse(password);
    } catch (error) {
      if (error instanceof ZodError) {
        setFormError(error.issues[0].message);
        return;
      }

      throw error;
    }

    setFormError("");
    setFormSuccess("");

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

        {!!formSuccess && <FormMessage purpose="success">{formSuccess}</FormMessage>}
        {!!formError && <FormMessage purpose="error">{formError}</FormMessage>}

        <Button className="h-16 mt-1" type="submit">
          sign in
        </Button>
      </form>
    </main>
  );
}
