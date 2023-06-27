import { Request, Response, Router } from "express";
import { authentication } from "../middleware/authentication";
import { isRector } from "../middleware/verifyType";
const router = Router();

//Routers
router.get("/", authentication, isRector, (req: Request, res: Response) => {
  res.send({
    status: true,
    response: "The user is Rector",
  });
});

export { router };