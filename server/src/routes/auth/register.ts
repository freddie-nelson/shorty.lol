import { RequestHandler } from "express";
import { hash } from "bcrypt";
import { Route } from "../route";
import { registerUserSchema } from "@shared/schemas/registerUser";
import { prisma } from "@/db/client";

const controller: RequestHandler = async (req, res) => {
  const parsedBody = registerUserSchema.safeParse(req.body);
  // '=== false' for type inference
  if (parsedBody.success === false) {
    res.status(400).send(parsedBody.error.issues[0].message);
    return;
  }

  const info = parsedBody.data;
  const hashedPassword = await hash(info.password, 10);

  try {
    await prisma.user.create({
      data: {
        email: info.email,
        username: info.username,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Account could not be created.");
  }
};

export default <Route>{
  method: "post",
  path: "/register",
  controller,
};
