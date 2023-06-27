import { Response, response } from "express";
import { request } from "../../interface/request_interface";
import {
  create_semesters,
  create_schedule_model,
  get_schedule_model,
  get_schedule_semester_model,
  get_schedule_id,
  get_block_semester_model,
  create_class_block_model,
  get_room_model,
  putClassBlockModel,
  deleteClassBlockModel,
} from "../../model/admin/schedule_model";
import { get_department_id } from "../../model/admin/services_model";
//This function is to add a new schedule
const create_schedule_controller = async (req: request, res: Response) => {
  try {
    const { data } = req.body;
    const user: any = req.user;
    //create schedule
    const answer_model = await create_schedule_model(data, user.id);
    //create semesters
    const schedule_id = await get_schedule_id(data.fecha_creacion, user.id);
    await create_semesters(schedule_id[0].horario_id, data);
    return res.status(200).send({
      status: true,
      response: "Schedule created successfully",
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      response: "Unexpected error occurred",
    });
  }
};

const get_schedule_contoller = async (req: request, res: Response) => {
  try {
    const user: any = req.user;
    const answer_model = await get_schedule_model(user.id); //This answer has all the schedule data from the table.
    if (answer_model?.status) {
      return res.status(200).send({
        status: true,
        response: answer_model.response,
      });
    }
    return res
      .status(500)
      .send({
        status: false,
        response: "El usuario no tiene un horario creado",
      });
  } catch (error) {
    res.status(400).send({
      status: false,
      response: "Unexpected error occurred",
    });
  }
};

const get_schedule_semester_controller = async (
  req: request,
  res: Response
) => {
  try {
    //get data of bady
    const { data } = req.body;
    //get schedule id
    const horario_id: number = data.horario_id;
    const answer_model = await get_schedule_semester_model(horario_id);
    //verify answer
    if (answer_model.status) {
      //If there are schedule semesters, also return a 200 status and a json response
      return res.status(200).send({
        status: true,
        response: answer_model.response,
      });
    }
    //If there are not semester, return an error response
    return { status: false, response: "Schedule id doesn't exist" };
  } catch (error) {
    res.status(400).send({
      status: false,
      response: "Unexpected error occurred",
    });
  }
};

/**
 * Controller function to get the class blocks of a specific semester.
 * @function get_block_semester_controller
 * @async
 * @returns {Object} JSON object with the request status and the model response.
 */
const get_block_semester_controller = async (req: request, res: Response) => {
  try {
    // Get request body data
    const { data } = req.body;

    // Get semester id
    const { semester_id } = data;

    // Get class blocks from the model
    const answer_model = await get_block_semester_model(semester_id);

    // If there are class blocks, return a successful response
    return res.status(200).send({
      status: true,
      response: answer_model.response,
    });
  } catch (error) {
    // If an unexpected error occurs, return an error response
    return res.status(400).send({
      status: false,
      response: "Unexpected error occurred",
    });
  }
};
/**
 * Controller function to create a new class block.
 * @function create_class_block_controller
 * @async
 * @returns {Object} JSON object with the request status and the model response.
 */
const create_class_block_controller = async (req: request, res: Response) => {
  try {
    // Get data from request body
    const { data } = req.body;
    console.log(data);
    const answer_model = await create_class_block_model(data);
    // Return successful response
    return res.status(200).send({
      status: true,
      response: "Class block created successfully",
    });
  } catch (error) {
    // If an unexpected error occurs, return an error response
    return res.status(400).send({
      status: false,
      response: "Unexpected error occurred",
    });
  }
};

const get_room_controller = async (req: request, res: Response) => {
  try {
    const user: any = req.user;
    const department_id = await get_department_id(user.id);
    const answer_model = await get_room_model(department_id[0].departamento_id);
    res.status(200).send(answer_model.response);
  } catch (error) {
    // If an unexpected error occurs, return an error response
    return res.status(400).send({
      status: false,
      response: "Unexpected error occurred",
    });
  }
};

const putClassBlockController = async (req: request, res: Response) => {
  try {
    const { data } = req.body;

    const { change, validate } = data;
    await putClassBlockModel(validate, change);
    res.status(200).send({
        status: true,
        response: "Actualizado correctamente"
    })
} catch (error) {
    return res.status(400).send({
      status: false,
      response: "Unexpected error occurred",
    });
  }
};

const deleteClassBlockController = async (req: request, res: Response) => {
  try {
    const { data } = req.body;
    const resModel = await deleteClassBlockModel(data);
    res.status(200).send({
      status: true,
      response: "Class block removed successfully"
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      response: "Unexpected error occurred"
    });
  }
}

export {
  create_schedule_controller,
  get_schedule_contoller,
  get_schedule_semester_controller,
  get_block_semester_controller,
  create_class_block_controller,
  get_room_controller,
  putClassBlockController,
  deleteClassBlockController,
};
