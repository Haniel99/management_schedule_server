import { query, mysqlIntance } from "../../config/config_mysql"; 
import { User_login, User_singup } from "../../interface/login_interface";
import { hashPassword, comparePassword } from "../../utilities/handlers/hash_handler";
import { singJWT } from "../../utilities/handlers/token_handler";

/**
 * @function login_model
 * This function registers a user in the database 
 * @param user_data 
 * @returns true or false
 */
const login_model = async (id: number) => {
    //generate token
    const jwt = singJWT(id);
    return {jwt};
}
//This function if to verify that the user is Head of Department 
const is_jefe_carrera = async (id: number) => {
    let sql = `select * from jefe_carrera where jefe_carrera_id = ${mysqlIntance.escape(id)}`;
    const response = await query(sql); 
    return JSON.parse(JSON.stringify(response)).length !== 0; 
}
//This function if to verify that the user is professor 
const is_professor = async (id: number ) => {
    let sql = `select * from docente where docente_id = ${mysqlIntance.escape(id)}`;
    const response = await query(sql); 
    return JSON.parse(JSON.stringify(response)).length !== 0; 
}
const is_rector = async (id: number ) => {
    let sql = `select * from rector where rector_id = ${mysqlIntance.escape(id)}`;
    const response = await query(sql); 
    return JSON.parse(JSON.stringify(response)).length !== 0; 
}
/**
 * @function signup_model
 * This function registers a user in the database 
 * @param user_data 
 * @returns true or false
 */
const signup_model = async ( user_data: User_singup) => {
    //Verify account
    let res_email_exists = await validate_email(user_data.correo);
    if (res_email_exists) {
        return { status: false };
    }
    //Hash password
    const hash_password = await hashPassword(user_data.contrasena);
    //Query sql
    let sql: string = 'insert into usuarios values (' +
        `NULL,` + 
        `${mysqlIntance.escape(user_data.nombre)},` + 
        `${mysqlIntance.escape(user_data.apellido)},` +
        `${mysqlIntance.escape(user_data.rut)},` +
        `${mysqlIntance.escape(user_data.correo)},` +
        `${mysqlIntance.escape(hash_password)},` +
        `${mysqlIntance.escape(user_data.telefono)},` +
        `${mysqlIntance.escape(user_data.departamento_id)}` +
        `)`
        ;
    await query(sql);
    let professor_id = await get_id(user_data.correo);
    //Add to the table profesor
    sql = `insert into docente values(${mysqlIntance.escape(professor_id[0].usuario_id)})`;
    await query(sql);
    //return 
    return { status: true };
}
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
/*----------------------SERVICE FUNCTIONS-----------------------*/
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/

/**
 * This function return true if email exists.
 * @param email 
 * @returns true or false 
 */
const validate_email = async (email: string) => {
    let sql = `select correo from  usuarios where correo = ${mysqlIntance.escape(email)}`;
    const query_res = await query(sql); 
    return JSON.parse(JSON.stringify(query_res)).length !== 0; 
}

//This function validate the database password with password hash  
const validate_password = async (password: string, email: string) => {
    let sql: string = `select contrasena from usuarios where correo = ${mysqlIntance.escape(email)}`;
    const query_res = await query(sql);
    let res_parse = JSON.parse(JSON.stringify(query_res));
    //compare has
    let compare = await comparePassword(password, res_parse[0].contrasena);
    //return
    return compare;
}

const get_id = async (correo: string) => {
    //query
    let sql: string = `select * from usuarios where correo = ${mysqlIntance.escape(correo)}`;
    const query_res = await query(sql);
    //return
    return  JSON.parse(JSON.stringify(query_res));
}

//Modules 
export {
    login_model,
    signup_model,
    validate_email,
    validate_password,
    is_professor,
    is_jefe_carrera,
    is_rector,
    get_id
};