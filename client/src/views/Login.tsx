import { FormEventHandler, useState } from "react";
import { ZodError } from "zod";
import { usernameSchema } from "@/schemas/username";
import { passwordSchema } from "@/schemas/password";
import useInput from "@/hooks/useInput";
import InputText from "@/components/shared/InputText";
import InputPassword from "@/components/shared/InputPassword";
import FormMessage from "@/components/shared/FormMessage";
import Label from "@/components/shared/Label";
import Button from "@/components/shared/Button";

export default function Login() {
  const { value: username, bind: bindUsername, reset: resetUsername } = useInput("");
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput("");
  const [formError, setFormError] = useState("");

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

    console.log(username, password);
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

        {!!formError && <FormMessage purpose="error">{formError}</FormMessage>}

        <Button className="h-16 mt-1" type="submit">
          sign in
        </Button>
      </form>
    </main>
  );
}
