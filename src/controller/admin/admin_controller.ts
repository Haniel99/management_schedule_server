import { Response } from "express";
import { admin_model } from "../../model/admin/admin_model";
import { request } from "../../interface/request_interface";

//This function shows all admin's data 
const admin_controller = async (req: request, res: Response) => {
    res.status(200).send({
        status: true,
        response: "The user is admin"
    })
}




export {
    admin_controller,
};