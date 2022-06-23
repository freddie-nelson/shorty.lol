import { RequestHandler } from "express";
import { Route } from "../route";
import { createSlugSchema } from "@shared/schemas/createSlug";
import { useSlug } from "@/hooks/useSlug";
import { useToken } from "@/hooks/useToken";
import { prisma } from "@/db/client";

const controller: RequestHandler = async (req, res) => {
  const parsedBody = createSlugSchema.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).send(parsedBody.error.issues[0].message);
    return;
  }

  const { longLink } = parsedBody.data;
  const token = useToken(req.cookies);

  // create unique slug
  let taken = true;
  let slug = "";
  while (taken) {
    slug = useSlug();
    try {
      const exists = await prisma.shortLink.findUnique({ where: { slug } });
      taken = !!exists;
    } catch (error) {
      res.status(500).send("Failed to generate slug.");
      return;
    }
  }

  // create ShortLink
  try {
    await prisma.shortLink.create({ data: { slug, longLink, userId: token?.userId } });
  } catch (error) {
    res.status(500).send("Failed to create short link.");
    return;
  }

  // success
  res.status(201).json({
    slug,
    longLink,
  });
};

export default <Route>{
  method: "post",
  path: "/createSlug",
  controller,
};
