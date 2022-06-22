import { FormEventHandler, useState } from "react";
import { ZodError } from "zod";
import { emailSchema } from "@shared/schemas/email";
import { usernameSchema } from "@shared/schemas/username";
import { passwordSchema } from "@shared/schemas/password";
import useInput from "@/hooks/useInput";
import InputText from "@/components/shared/InputText";
import InputPassword from "@/components/shared/InputPassword";
import FormMessage from "@/components/shared/FormMessage";
import Label from "@/components/shared/Label";
import Button from "@/components/shared/Button";
import { useRegister } from "@/hooks/api/useRegister";
import { useLogin } from "@/hooks/api/useLogin";

export default function Register() {
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const { value: username, bind: bindUsername, reset: resetUsername } = useInput("");
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput("");
  const { value: confirmPassword, bind: bindConfirmPassword, reset: resetConfirmPassword } = useInput("");
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

  const registerMutation = useRegister(
    (data) => {
      console.log("register");
      setFormSuccess("Account created, logging you in...");
      loginMutation.mutate({ username, password });
    },
    async (error) => {
      if (error instanceof Response) {
        setFormError(await error.text());
      }
    }
  );

  const register: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    try {
      emailSchema.parse(email);
      usernameSchema.parse(username);
      passwordSchema.parse(password);
    } catch (error) {
      if (error instanceof ZodError) {
        setFormError(error.issues[0].message);
        return;
      }

      throw error;
    }
    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    setFormError("");
    setFormSuccess("");

    registerMutation.mutate({ email, username, password });
  };

  return (
    <main className="flex flex-col justify-center items-center flex-grow ">
      <h1 className="font-bold text-3xl text-center mb-4">register</h1>

      <form className="flex flex-col gap-3 w-11/12 max-w-md" onSubmit={register}>
        <div className="flex flex-col">
          <Label htmlFor="email" required>
            email
          </Label>
          <InputText
            {...bindEmail}
            name="email"
            type="email"
            placeholder="jsmith@example.com"
            required
            maxLength={320}
          />
        </div>

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

        <div className="flex flex-col">
          <Label htmlFor="confirmPassword" required>
            confirm password
          </Label>
          <InputText
            {...bindConfirmPassword}
            name="confirmPassword"
            type="password"
            required
            maxLength={255}
          />
        </div>

        {!!formSuccess && <FormMessage purpose="success">{formSuccess}</FormMessage>}
        {!!formError && <FormMessage purpose="error">{formError}</FormMessage>}

        <Button className="h-16 mt-3" type="submit">
          create account
        </Button>
      </form>
    </main>
  );
}
