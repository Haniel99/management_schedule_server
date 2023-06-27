import { NextFunction, Response } from "express";
import { verifyJWT } from "../utilities/handlers/token_handler";
import { request } from "../interface/request_interface";


const authentication = (req: request, res: Response, next: NextFunction) => {

    try {
        //get token
        let jwt: any = req.headers.authorization || false;
        //valdiate if exist token  
        if (!jwt) {
            return res.status(400).send({ status: false, response: "We need a token for authorization" })
        }
        //get jwt 
        jwt = jwt.split(' ').pop();
        //varyfi if the token is valid 
        const tokenUser = verifyJWT(jwt);
        req.user = tokenUser;
        next();
    } catch (error) {
        return res.status(400).send({ status: false, response: "The token is invalid" });
    }
}

export { authentication };