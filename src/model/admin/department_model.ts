import { query, mysqlIntance } from "../../config/config_mysql";
import { get_department_id } from "./services_model";
import { Subject, Room } from "../../interface/admin_interface";
//This funcion is to add a new subject
const add_subject_model = async (data: Subject, departamento_id: number) => {
  //sql
  //get id department
  let sql: string =
    "insert into asignatura values (" +
    `NULL,` +
    `${mysqlIntance.escape(data.nombre)},` +
    `${mysqlIntance.escape(data.codigo)},` +
    `${mysqlIntance.escape(data.tipo_formacion)},` +
    `${mysqlIntance.escape(departamento_id)}` +
    `)`;
  //query
  await query(sql);
  return { status: true };
};
//This function is to get all subjects
const get_subjects_model = async (id: number) => {
  //Sql
  let sql = `select asignatura_id, nombre, codigo, tipo_formacion from asignatura where departamento_id = ${mysqlIntance.escape(
    id
  )}`;
  //Query
  const res = await query(sql);
  //Response
  return { status: true, response: JSON.parse(JSON.stringify(res)) };
};

//This funciton is to add a new class room
const add_room_model = async (data: Room) => {
  //sql
  let sql: string =
    "insert into sala values (" +
    `NULL,` +
    `${mysqlIntance.escape(data.nombre)},` +
    `${mysqlIntance.escape(data.numero)},` +
    `${mysqlIntance.escape(data.departamento_id)}` +
    `)`;
  //query
  await query(sql);
};

export { add_subject_model, add_room_model, get_subjects_model };
