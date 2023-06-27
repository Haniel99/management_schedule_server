import { Router } from "express";
import { authentication } from "../middleware/authentication";
import verify_path  from "../middleware/verify_path";
const router = Router();
//Routers
router.get('/', authentication, verify_path);
export { router };