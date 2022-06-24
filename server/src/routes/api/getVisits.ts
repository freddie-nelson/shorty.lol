import { RequestHandler } from "express";
import { Route } from "../route";
import { useToken } from "@/hooks/useToken";
import { prisma } from "@/db/client";
import { ShortLink, Visit } from ".prisma/client";
import { slugSchema } from "@shared/schemas/slug";

const controller: RequestHandler = async (req, res) => {
  const page = Number(req.query.page);
  const perPage = Number(req.query.perPage);
  const parsedSlug = slugSchema.safeParse(req.query.slug);
  if (!parsedSlug.success || !page || !perPage || page < 0 || perPage < 0 || perPage > 100) {
    res.status(400).send("Bad query string.");
    return;
  }

  const slug = parsedSlug.data;
  const token = useToken(req.cookies);

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
  if (shortLink.userId !== null && token?.userId !== shortLink.userId) {
    res.status(403).send("Unauthorized access to tracking for slug.");
    return;
  }

  // get visits from db
  let visits: Visit[];
  try {
    visits = await prisma.visit.findMany({
      where: { slug },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * perPage,
      take: perPage + 1,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to get short link visits.");
    return;
  }

  // success
  res.status(200).json({ hasMore: visits.length > perPage, visits: visits.slice(0, perPage) });
};

export default <Route>{
  method: "get",
  path: "/getVisits",
  controller,
};
