import { Request, Response, Router } from "express";
import { authentication } from "../middleware/authentication";
import { isProfessor } from "../middleware/verifyType";
import { get_schedule_cotroller, get_schedule_semester_cotroller } from "../controller/professor/schedule_cotroller";
const router = Router();

//Routers
router.get("/", authentication, isProfessor, (req: Request, res: Response) => {
  res.send({
    status: true,
    response: "The user is professor",
  });
});
router.get('/horario', authentication, get_schedule_cotroller);
router.post('/horario', authentication, get_schedule_semester_cotroller);
export { router };
