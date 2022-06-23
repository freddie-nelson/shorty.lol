import { RequestHandler } from "express";
import { Route } from "../route";
import { deleteSlugSchema } from "@shared/schemas/deleteSlug";
import { useToken } from "@/hooks/useToken";
import { prisma } from "@/db/client";
import { ShortLink } from ".prisma/client";

const controller: RequestHandler = async (req, res) => {
  const parsedBody = deleteSlugSchema.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).send(parsedBody.error.issues[0].message);
    return;
  }

  const { slug } = parsedBody.data;

  const token = useToken(req.cookies);
  if (!token) {
    res.status(403).send("Unauthorized user.");
    return;
  }

  // get short link from db
  let shortLink: ShortLink | null = null;
  try {
    shortLink = await prisma.shortLink.findUnique({ where: { slug } });
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to contact database.");
    return;
  }

  if (!shortLink) {
    res.status(404).send("The provided slug does not exist.");
    return;
  }

  // check access
  if (token.userId !== shortLink.userId) {
    res.status(403).send("Not authorized to delete slug.");
    return;
  }

  // delete shortLink and realted visits
  try {
    await prisma.shortLink.delete({ where: { slug } });
    await prisma.visit.deleteMany({ where: { slug } });
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to contact database.");
  }

  // success
  res.status(200).send("Slug successfully deleted.");
};

export default <Route>{
  method: "post",
  path: "/deleteSlug",
  controller,
};
