require("dotenv").config();
import * as express from "express";
import { baseRouter } from "./routers/base";
import { authRouter } from "./routers/auth";

const app = express();

// middleware
app.use(express.json());

// routers
app.use(baseRouter);
app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
