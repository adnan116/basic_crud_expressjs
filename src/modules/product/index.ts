import { Application } from "express";
import { productRouter } from "../product/routes/product.route";

export function init(app: Application) {
  app.use("/product", productRouter);
}
