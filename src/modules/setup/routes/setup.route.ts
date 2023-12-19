import express, { NextFunction, Request, Response, Router } from "express";
import Container from "typedi";
import { wrap } from "../../../middlewares/wraps.middle";
import { SetupService } from "../services/setup.service";
import lodash from "lodash";
import { Paginate } from "../../../utils/pagination.util";
const router: Router = express.Router();

router.get(
  "/about-us",
  wrap(async (req: Request, res: Response, next: NextFunction) => {
    const setupService: SetupService = Container.get(SetupService);

    const result = await setupService.getCompanyAboutUsInfo();
    return res.status(200).json({
      message: "Request Successful",
      data: result,
    });
  })
);

router.get(
  "/contact-us",
  wrap(async (req: Request, res: Response, next: NextFunction) => {
    const setupService: SetupService = Container.get(SetupService);

    const result = await setupService.getCompanyContactInfo();
    return res.status(200).json({
      message: "Request Successful",
      data: result,
    });
  })
);

router.get(
  "/customer-reviews",
  wrap(async (req: Request, res: Response, next: NextFunction) => {
    const setupService: SetupService = Container.get(SetupService);

    const result = await setupService.getAllCustomerReviews();
    return res.status(200).json({
      message: "Request Successful",
      data: result,
    });
  })
);

export { router as setupRouter };
