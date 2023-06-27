import { query, mysqlIntance } from "../../config/config_mysql"
import { IClassBlock, IClassBlockChange, Schedule } from "../../interface/admin_interface"
//This function is to add a new schedule
const create_schedule_model = async (data: Schedule, usuario_id: number)=> {
    //get data
    const { plan, semestre, fecha_creacion } = data;
    //sql
    let sql: string = `insert into horario values(`+
    `NULL, ${mysqlIntance.escape(plan)},`+
    `${mysqlIntance.escape(semestre)},`+
    `${mysqlIntance.escape(fecha_creacion)},`+
    `${mysqlIntance.escape(usuario_id)}`+
    `)`; 
    //query
    await query(sql);
    //get schedule id
}
const get_schedule_model = async (id: number)=> {
    //sql for schedule
    let sql = `select  horario_id,plan,  semestre, fecha_creacion from horario where usuario_id = ${mysqlIntance.escape(id)} `;
    //query
    const res = await query(sql);
    const json = JSON.parse(JSON.stringify(res));
    if(json.length!=0){
        return { status: true, response: json }
    }
    return {status: false}
    ;
}
const get_schedule_semester_model = async (id: number) => {
    //sql
    let sql: string = `select semestre_id, numero_semestre from semestre where horario_id = ${mysqlIntance.escape(id)}`;
    //query
    const res = await query(sql);
    //verify
    const json = JSON.parse(JSON.stringify(res));
    if(json.length!=0){
        //return true
        return { status: true, response: json };
    }
    //return false
    return { status: false };
}
const create_semesters = async ( id: number, data: Schedule) => {
    //
    const { plan }= data; 
    let length = 0, cont = 0;
    if(plan === 'Plan 2019'){
        length = 11;
    }else if(plan === 'Plan 2013'){
        length = 12;
    }
    //this "for" is to add semester for year
    for (cont = 1; cont <= length; cont++) {
        //sql for semester
        let sql = `insert into semestre values(NULL,${mysqlIntance.escape(cont)}, ${mysqlIntance.escape(id)})`;
        await query(sql);        
    }
}

const get_schedule_id = async (date: string, user_id: number) => {
    //sql
    let sql = `select horario_id from horario where fecha_creacion = `+
    `${mysqlIntance.escape(date)} and `+
    `usuario_id = ${mysqlIntance.escape(user_id)}`;
    //query
    const res = await query(sql);
    return JSON.parse(JSON.stringify(res));
} 

/**
 * Model function to get the class blocks for a given semester.
 * @function get_block_semester_model
 * @async
 * @param {number} semester_id - The ID of the semester to get the class blocks for.
 * @returns {Object} JSON object with the status of the request and the class block data, or an error message.
 */
const get_block_semester_model = async (semester_id: number) => {    
    const daysOfWeek = [
        ["Lunes"],
        ["Martes"],
        ["Miercoles"],
        ["Jueves"],
        ["Viernes"]
      ];
      let json;
      // To do a query for every day
      for (let i = 0; i < daysOfWeek.length; i++) {
        const day = daysOfWeek[i][0];
        // Construct SQL query to get the class blocks for the given semester ID
        const sql = `
          SELECT b.hora_inicio, b.hora_fin, ass.nombre AS asignatura, u.nombre AS nombre_profesor, u.apellido AS apellido_profesor
          , s.nombre as sala, s.número as numero_sala, a.grupo as grupo,
          a.bloque_id, a.semestre_id, a.docente_id, a.asignatura_id, a.sala_id, a.grupo, a.semestre, a.year, a.dia
          FROM asignacion a 
          JOIN bloque_horario b ON a.bloque_id = b.bloque_id
          JOIN sala s ON a.sala_id = s.sala_id
          JOIN asignatura ass ON a.asignatura_id = ass.asignatura_id
          JOIN usuarios u ON a.docente_id = u.usuario_id
          WHERE a.semestre_id = ${mysqlIntance.escape(semester_id)} AND a.dia = ${mysqlIntance.escape(day)}
        `;
        const res = await query(sql);
        // Convert the response to JSON format
        json = JSON.parse(JSON.stringify(res));
        daysOfWeek[i].push(json);   
    }
    // Return a successful response with the class block data
    return { status: true, response: daysOfWeek };
}


/**
 * Creates a new class block in the database.
 * @param data An object containing the information about the new class block.
 * @returns A Promise that resolves to an empty object if the class block is created successfully, or rejects with an error message if there was an issue creating the block.
 */
const create_class_block_model = async (data: IClassBlock) => {
    // Destructure the data object
    const { sala_id,semestre, bloque_id, asignatura_id, docente_id, year, dia, grupo, semestre_id } = data;

    // Construct SQL query to add the class blocks for the given semester ID
    let sql: string = `
        insert into asignacion 
        values (
            ${mysqlIntance.escape(bloque_id)}, 
            ${mysqlIntance.escape(semestre_id)},
            ${mysqlIntance.escape(docente_id)},
            ${mysqlIntance.escape(asignatura_id)},  
            ${mysqlIntance.escape(sala_id)},
            ${mysqlIntance.escape(grupo)}, 
            ${mysqlIntance.escape(semestre)}, 
            ${mysqlIntance.escape(year)}, 
            ${mysqlIntance.escape(dia)}
        )
    `;
    // Execute the SQL query to insert the class block
    await query(sql);
    //If all is ok, response true
    return {status: true}
}

const get_room_model = async  (department_id: number) => {
    //Sql
    let sql = `select sala_id, nombre, número as numero from sala where departamento_id = ${mysqlIntance.escape(department_id)}`;
    //Query
    const res = await query(sql);
    //Response
    return { status: true, response: JSON.parse(JSON.stringify(res))};
}

const putClassBlockModel = async (dataToVerify: IClassBlock, dataToChange: IClassBlockChange ) => {
    //sql
    let sql = `update asignacion
    set docente_id = ${mysqlIntance.escape(dataToChange.docente_id)},
    asignatura_id = ${mysqlIntance.escape(dataToChange.asignatura_id)},
    sala_id = ${mysqlIntance.escape(dataToChange.sala_id)},
    grupo = ${mysqlIntance.escape(dataToChange.grupo)}
    where 
    bloque_id = ${mysqlIntance.escape(dataToVerify.bloque_id)} and
        semestre_id = ${mysqlIntance.escape(dataToVerify.semestre_id)} and
        docente_id = ${mysqlIntance.escape(dataToVerify.docente_id)} and
        asignatura_id = ${mysqlIntance.escape(dataToVerify.asignatura_id)} and
        sala_id = ${mysqlIntance.escape(dataToVerify.sala_id)} and
        grupo = ${mysqlIntance.escape(dataToVerify.grupo)} and
        semestre = ${mysqlIntance.escape(dataToVerify.semestre)} and
        year = ${mysqlIntance.escape(dataToVerify.year)} and
        dia = ${mysqlIntance.escape(dataToVerify.dia)}
    `;
    //query
    await query(sql);
    //answer
}

const deleteClassBlockModel = async ( identify: IClassBlock  ) => {
    //sql
    let sql = `delete from asignacion
    where 
    bloque_id = ${mysqlIntance.escape(identify.bloque_id)} and
        semestre_id = ${mysqlIntance.escape(identify.semestre_id)} and
        docente_id = ${mysqlIntance.escape(identify.docente_id)} and
        asignatura_id = ${mysqlIntance.escape(identify.asignatura_id)} and
        sala_id = ${mysqlIntance.escape(identify.sala_id)} and
        grupo = ${mysqlIntance.escape(identify.grupo)} and
        semestre = ${mysqlIntance.escape(identify.semestre)} and
        year = ${mysqlIntance.escape(identify.year)} and
        dia = ${mysqlIntance.escape(identify.dia)}
    `;
    //query
    await query(sql);
    //answer
}
export {
    create_schedule_model,
    get_schedule_model,
    get_schedule_semester_model,
    get_schedule_id,
    create_semesters,
    get_block_semester_model,
    create_class_block_model,
    get_room_model,
    putClassBlockModel,
    deleteClassBlockModel
}