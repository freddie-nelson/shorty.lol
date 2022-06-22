import { FormEventHandler, useState } from "react";
import { ZodError } from "zod";
import { emailSchema } from "@/schemas/email";
import { usernameSchema } from "@/schemas/username";
import { passwordSchema } from "@/schemas/password";
import useInput from "@/hooks/useInput";
import InputText from "@/components/shared/InputText";
import InputPassword from "@/components/shared/InputPassword";
import FormMessage from "@/components/shared/FormMessage";
import Label from "@/components/shared/Label";
import Button from "@/components/shared/Button";

export default function Register() {
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const { value: username, bind: bindUsername, reset: resetUsername } = useInput("");
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput("");
  const { value: confirmPassword, bind: bindConfirmPassword, reset: resetConfirmPassword } = useInput("");
  const [formError, setFormError] = useState("");

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

    console.log(email, username, password, confirmPassword);
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

        {!!formError && <FormMessage purpose="error">{formError}</FormMessage>}

        <Button className="h-16 mt-3" type="submit">
          create account
        </Button>
      </form>
    </main>
  );
}
