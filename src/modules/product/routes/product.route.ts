import express, { NextFunction, Request, Response, Router } from "express";
import Container from "typedi";
import { wrap } from "../../../middlewares/wraps.middle";
import { ProductService } from "../services/product.service";
import lodash from "lodash";
import { Paginate } from "../../../utils/pagination.util";
const router: Router = express.Router();

/**
 * Get All Products
 * Author: Adnan
 * Updater:
 */

router.get(
  "/product-list",
  wrap(async (req: Request, res: Response, next: NextFunction) => {
    const productService: ProductService = Container.get(ProductService);
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    let allQuery: any = req.query;

    const isPagination = req.query.isPagination && req.query.isPagination == "false" ? false : true;
    allQuery;

    allQuery = { ...lodash.omit(allQuery, ["isPagination", "page", "limit"]), isActive: true };

    const count: number = await productService.count(allQuery);
    const pagination = new Paginate(count, limit, page);
    const data = await productService.getAllProducts(isPagination, pagination.limit, pagination.skip, allQuery);

    res.status(200).send({
      message: "request successful",
      ...(isPagination ? pagination : []),
      data: data,
    });
  })
);

router.get(
  "/category",
  wrap(async (req: Request, res: Response, next: NextFunction) => {
    const productService: ProductService = Container.get(ProductService);

    const result = await productService.getAllCategories();
    return res.status(200).json({
      message: "Request Successful",
      data: result,
    });
  })
);

export { router as productRouter };
