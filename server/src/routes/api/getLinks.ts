import { RequestHandler } from "express";
import { Route } from "../route";
import { useToken } from "@/hooks/useToken";
import { prisma } from "@/db/client";
import { ShortLink } from ".prisma/client";

const controller: RequestHandler = async (req, res) => {
  const page = Number(req.query.page);
  const perPage = Number(req.query.perPage);
  if (!page || !perPage || page < 0 || perPage < 0) {
    res.status(400).send("Bad query string.");
  }

  const token = useToken(req.cookies);
  if (!token) {
    res.status(403).send("Unauthorized user.");
    return;
  }

  // get links from db
  let links: ShortLink[];
  try {
    links = await prisma.shortLink.findMany({
      include: { _count: { select: { Visit: true } } },
      where: { userId: token.userId },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * perPage,
      take: perPage + 1,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to contact database.");
    return;
  }

  // success
  res.status(200).json({ hasMore: links.length > perPage, links: links.slice(0, perPage) });
};

export default <Route>{
  method: "get",
  path: "/getLinks",
  controller,
};
