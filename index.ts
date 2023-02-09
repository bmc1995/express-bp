import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as bodyparser from "body-parser";
import userRouter from "./src/routes/userRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.use(bodyparser.json());
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
