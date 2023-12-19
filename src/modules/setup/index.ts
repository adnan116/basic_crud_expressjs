import { Application } from "express";
import { setupRouter } from "../setup/routes/setup.route";

export function init(app: Application) {
  app.use("/setup", setupRouter);
}
