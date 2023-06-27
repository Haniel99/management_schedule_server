import { query, mysqlIntance } from "../../config/config_mysql";

//Services
const get_department_id = async (id: number) => {
    try {
        //sql
        let sql: string = `select departamento_id from usuarios where usuario_id = ${mysqlIntance.escape(id)}`; 
        //Query to data base
        const response_id = await query(sql); 
        //Return
        return JSON.parse(JSON.stringify(response_id));
    } catch (error) {
        
    }
};
const get_head_id = async (department_id: number) =>{
    //sql 
    let sql = `select * from jefe_carrera where exists (select 1 from jefe_carrera j join usuarios u on(j.jefe_carrera_id = u.usuario_id) 
    and u.departamento_id =${mysqlIntance.escape(department_id)} )`;
    //query
    const res = await query(sql);
    //answer
    return JSON.parse(JSON.stringify(res));
}

export { get_department_id,get_head_id };