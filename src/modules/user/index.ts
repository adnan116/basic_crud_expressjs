import { Application } from "express";
import { userRouter } from "../user/routes/user.route";

export function init(app: Application) {
  app.use("/user", userRouter);
}
