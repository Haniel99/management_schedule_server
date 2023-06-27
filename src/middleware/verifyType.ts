import { NextFunction, Response } from "express";
import { request } from "../interface/request_interface";
import { is_jefe_carrera, is_professor, is_rector } from "../model/login/login_model";

/**
 * Middleware to verify if a user is an administrator.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Function to pass control to the next middleware or router.
 * @returns {Promise<void>} - Does not explicitly return a value, but may send success or error responses.
 */

const isAdmin = async (req: request, res: Response, next: NextFunction) => {
    try {
        // Get the user from the request
        const user: any = req.user;
        // Verify if the user is an administrator by calling the is_jefe_carrera function
        const verifyIsAdmin = await is_jefe_carrera(user.id); 
        
        // If the user is not an administrator, return a response with status 200 and a message indicating that they are not an admin.
        if (!verifyIsAdmin) {
            return res.status(400).send({
                status: false,
                response: "The user is not admin"
            });
        }
        
        // If the user is an administrator, pass control to the next middleware or router.
        next();
    } catch (error) {
        // If an error occurs, return an error response with status 400.
        return res.status(400).send({ status: false, response: "" });
    }
};
const isProfessor = async (req: request, res: Response, next: NextFunction) => {
    try {
        // Get the user from the request
        const user: any = req.user;
        // Verify if the user is an administrator by calling the is_jefe_carrera function
        const verifyIsProfessor = await is_professor(user.id); 
        
        // If the user is not an administrator, return a response with status 200 and a message indicating that they are not an admin.
        if (!verifyIsProfessor) {
            return res.status(400).send({
                status: false,
                response: "The user is not professor"
            });
        }
        
        // If the user is an administrator, pass control to the next middleware or router.
        next();
    } catch (error) {
        // If an error occurs, return an error response with status 400.
        return res.status(400).send({ status: false, response: "" });
    }
};

const isRector = async (req: request, res: Response, next: NextFunction) => {
    try {
        // Get the user from the request
        const user: any = req.user;
        // Verify if the user is an administrator by calling the is_jefe_carrera function
        const verifyIsRector = await is_rector(user.id); 
        
        // If the user is not an administrator, return a response with status 200 and a message indicating that they are not an admin.
        if (!verifyIsRector) {
            return res.status(400).send({
                status: false,
                response: "The user is not rector"
            });
        }
        
        // If the user is an administrator, pass control to the next middleware or router.
        next();
    } catch (error) {
        // If an error occurs, return an error response with status 400.
        return res.status(400).send({ status: false, response: "" });
    }
};
export { isAdmin, isProfessor, isRector };
