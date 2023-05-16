import { Request, Response } from "express";
import { 
    get_id, 
    login_model, 
    signup_model, 
    validate_email, 
    validate_password,
    is_professor,
    is_jefe_carrera
} from "../model/login/login_model";
const login_controller_professor = async (req: Request, res: Response ) => {
    try {
        const res_login_controller: any = await login_controller(req, res);
        const isProfessor = await is_professor(res_login_controller);
        if(!isProfessor){
            return res.status(500).send({status: false, response: "The user is not professor"});
        }  
        const { jwt } = await login_model(res_login_controller); //get token 
        res.status(200).send({status: true, response: jwt, id: res_login_controller});
    } catch (error) {
        
    }
}
const login_controller_head = async (req: Request, res: Response ) => {
    try {
        const res_login_controller: any = await login_controller(req, res);
        const isProfessor = await is_jefe_carrera(res_login_controller);
        if(!isProfessor){
            return res.status(500).send({status: false, response: "The user is not head of department"});
        }  
        const { jwt } = await login_model(res_login_controller); //get token 
        res.status(200).send({status: true, response: jwt, id: res_login_controller});
    } catch (error) {
        
    }
}
const login_controller = async (req: Request, res: Response) => {
    try {
        //Validate email
        const {data} = req.body; 
        const res_email_exists = await validate_email(data.correo);
        if (!res_email_exists) {
            return res.status(400).send({
                status: false,
                response: "The email is invalid"
            });
        }
        //Valdiate password
        const res_validate = await validate_password(data.contrasena,data.correo);
        if (!res_validate) {
            return res.status(400).send( {
                status: false,
                response: "The password is invalid"
            });
        }
        //get user id 
        const query_id: any = await get_id(data.correo);
        let id_num:number = query_id[0].usuario_id;
        //answer user id
        return id_num;
    } catch (error) {
        console.log(error);
        // Handle any unexpected errors here
        res.status(500).send({
            status: false,
            response: "Unexpected error occurred"
        });
    }
}

const signup_controller = async (req: Request, res: Response) => {
    try {
        //create account
        const {data} = req.body; 
        const singup_res = await signup_model(data); 
        //Validate answers   
        if (!singup_res.status){
            //Answer error
            return res.status(400).send({
                status: false,
                response: "This email exists"
            });
        }
        //Answer successfully 
        return res.status(200).send({
            status: true,
            response: "The account was created successfully"
        });
    } catch (error) {
        res.status(400).send({
            status: false,
            response: "Unexpected error occurred"
        });
    }
}

export {
    login_controller_head,
    login_controller_professor,
    signup_controller
};