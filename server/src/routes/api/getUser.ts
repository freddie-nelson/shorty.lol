import { RequestHandler } from "express";
import { Route } from "../route";
import { useToken } from "@/hooks/useToken";
import { prisma } from "@/db/client";
import { User } from ".prisma/client";

const controller: RequestHandler = async (req, res) => {
  const token = useToken(req.cookies);
  if (!token) {
    res.status(403).send("Unauthorized user.");
    return;
  }

  // get user from db
  let user: User | null = null;
  try {
    user = await prisma.user.findUnique({ where: { id: token.userId } });
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to contact database.");
    return;
  }

  if (!user || user.username !== token.username) {
    res.status(404).send("User could not be found.");
    res.clearCookie("token");
    return;
  }

  // success
  res.status(200).json({
    username: user.username,
    email: user.email,
  });
};

export default <Route>{
  method: "get",
  path: "/getUser",
  controller,
};
