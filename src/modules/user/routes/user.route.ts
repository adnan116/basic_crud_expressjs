import express, { NextFunction, Request, Response, Router } from "express";
import Container from "typedi";
import { wrap } from "../../../middlewares/wraps.middle";
import lodash from "lodash";
import UserService from "../services/user.service";
import BadRequestError from "../../../errors/bad-request.error";
const router: Router = express.Router();
// router.post(
//     "/login/:component",
//     wrap(async (req: Request, res: Response, next: NextFunction) => {
//       const { username, password } = req.body;
//       const userService = Container.get(UserService);
//       if (!password) {
//         throw new BadRequestError("Invalid password");
//       }

//       // response variables
//       let accessToken: string | null = null;
//       const user = await userService.getByUsername(username);

//       if (!user) {
//         throw new BadRequestError("User not found");
//       } else {

//         return true

//           // provide response
//           return res.status(200).json({
//             message: "Request Successful",
//             data: {
//               username: user.name,
//               loginPermission: true
//             },
//           });
//         }

//       }
//     })
//   );
export { router as userRouter };
