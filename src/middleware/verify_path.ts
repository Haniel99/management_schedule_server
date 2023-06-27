import { NextFunction, Response } from "express";
import { request } from "../interface/request_interface";
import { is_jefe_carrera, is_professor, is_rector } from "../model/login/login_model";

const verify_path = async (req: request, res: Response) => {
  try {
    const user: any = req.user;
    const isProfesor = await is_professor(user.id);
    if (isProfesor) {
      return res.status(200).send({
        status: true,
        response: "PROFESOR",
      });
    }
    const isHead = await is_jefe_carrera(user.id);
    if (isHead) {
      return res.status(200).send({
        status: true,
        response: "HEAD",
      });
    }
    const isRector = await is_rector(user.id);
    if (isRector) {
      return res.status(200).send({
        status: true,
        response: "RECTOR",
      });
    }
  } catch (error) {}
};

export default verify_path;
