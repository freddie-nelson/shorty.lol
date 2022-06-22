import { RequestHandler } from "express";
import { Route } from "../route";

const controller: RequestHandler = async (req, res) => {
  const info = req.body;
  res.send("hey");
};

export default <Route>{
  method: "post",
  path: "/register",
  controller,
};
