import { ShortLink } from ".prisma/client";
import { prisma } from "@/db/client";
import { slugSchema } from "@shared/schemas/slug";
import { RequestHandler } from "express";
import { Route } from "./route";

const controller: RequestHandler = async (req, res) => {
  const slug = req.params.slug;
  const parsedSlug = slugSchema.safeParse(slug);

  if (!parsedSlug.success) {
    res.status(400).send(parsedSlug.error.issues[0].message);
    return;
  }

  // find short link from slug
  let shortLink: ShortLink | null = null;
  try {
    shortLink = await prisma.shortLink.findUnique({ where: { slug } });
  } catch (error) {
    console.log(error);
    res.status(500).send("Could not query database for short link.");
    return;
  }

  if (!shortLink) {
    res.status(404).send("Short link does not exist.");
    return;
  }

  // track visitors
  try {
    await prisma.visit.create({
      data: { ip: req.ip, userAgent: req.headers["user-agent"]?.slice(0, 255) || "", slug },
    });
  } catch (error) {
    console.log(error);
  }

  // redirect
  res.status(302).redirect(shortLink.longLink);
};

export default <Route>{
  method: "get",
  path: "/:slug",
  controller,
};
