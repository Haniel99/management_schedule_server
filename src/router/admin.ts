import { Router } from "express"
import { authentication } from "../middleware/authentication";
import { admin_controller } from "../controller/admin/admin_controller";
import { get_professors_controller } from "../controller/admin/professor_controller";
import { get_subjects_controller, add_room_controller, add_subject_controller } from "../controller/admin/department_controller";
import { 
    create_schedule_controller, 
    get_schedule_contoller, 
    get_schedule_semester_controller,
    get_block_semester_controller,
    create_class_block_controller,
    get_room_controller,
    putClassBlockController,
    deleteClassBlockController
} from "../controller/admin/schedule_controller";
import {signup_controller} from "../controller/login_controller";
import { isAdmin } from "../middleware/verifyType";
//Rounter
const router = Router();
//Routes
//
router.get('/', authentication, isAdmin, admin_controller); 
//
router.post('/add-block', authentication, create_class_block_controller);
router.post('/get-block', authentication, get_block_semester_controller);
//
router.get('/professors', authentication, get_professors_controller);
//
router.get('/subjects', authentication, get_subjects_controller);
router.post('/add-subject', authentication, add_subject_controller);
//
router.post('/create-schedule',authentication, create_schedule_controller ); 
router.get('/get-schedule', authentication,  get_schedule_contoller );
router.post('/get-semester', authentication, get_schedule_semester_controller );
//
//
router.post('/add-room', authentication, add_room_controller);
router.get('/get-room', authentication, get_room_controller);
//
router.post('/add-professor', authentication, signup_controller);
//UPDATE CLASS  BLOCK 
router.post('/updateClassBlock', authentication, putClassBlockController);
router.post('/deleteClassBlock', authentication, deleteClassBlockController );
export {router};