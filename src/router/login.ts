import { Router } from "express";
import { login_controller_head, 
    login_controller_professor, 
    signup_controller,
    login_controller_rector
} from "../controller/login_controller";
import { authentication } from "../middleware/authentication";
const router = Router();
/**
 * These paths are for accessing the main page "/algorithms_test".
 * @method post  '/login/in'
 * @method post '/login/signup'
 */
router.post('/head', login_controller_head); //Login for the "Ricardo validivia"
router.post('/rector', login_controller_rector); //Login for the "Ricardo validivia"
router.post('/professor', login_controller_professor); //Login for the professor 
router.post('/signup', authentication, signup_controller);
export {router}; 