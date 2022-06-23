import { RequestHandler } from "express";
import { Route } from "../route";
import { trackSlugSchema } from "@shared/schemas/trackSlug";
import { useToken } from "@/hooks/useToken";
import { prisma } from "@/db/client";
import { ShortLink } from ".prisma/client";

const controller: RequestHandler = async (req, res) => {
  const parsedBody = trackSlugSchema.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).send(parsedBody.error.issues[0].message);
    return;
  }

  const { slug } = parsedBody.data;
  const token = useToken(req.cookies);

  // get short link from db
  let shortLink: ShortLink | null = null;
  try {
    shortLink = await prisma.shortLink.findUnique({ where: { slug } });
  } catch (error) {
    res.status(500).send("Failed to contact database.");
    return;
  }

  if (!shortLink) {
    res.status(404).send("The provided slug does not exist.");
    return;
  }

  // check access
  if (shortLink.userId !== null && token?.userId !== shortLink.userId) {
    res.status(403).send("Unauthorized access to tracking for slug.");
    return;
  }

  // calculate number of visits
  let visits: number;
  try {
    visits = await prisma.visit.count({ where: { slug } });
  } catch (error) {
    res.status(500).send("Failed to calculate short link visits.");
    return;
  }

  // success
  res.status(200).json({
    slug,
    createdAt: shortLink.createdAt,
    longLink: shortLink.longLink,
    visits,
    editable: shortLink.userId && token?.userId === shortLink.userId,
  });
};

export default <Route>{
  method: "post",
  path: "/trackSlug",
  controller,
};
