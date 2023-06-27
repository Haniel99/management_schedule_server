//it is to create a new schedule
interface Schedule {
    fecha_creacion: string,
    plan:string,
    semestre: number
}

interface Room{
    nombre: string,
    numero: number,
    departamento_id: number,
}

interface Subject{
    nombre: string,
    codigo: number,
    tipo_formacion: string
}

interface Department{
    nombre: string,
    region: string,
    direccion: string 
}
interface IClassBlock{
    bloque_id: number,
    semestre_id: number,
    sala_id: number,
    asignatura_id: number, 
    docente_id: number, 
    grupo: string,
    year: number, 
    dia: string, 
    semestre: number
}
interface IClassBlockChange {
    asignatura_id: number,
    sala_id: number,
    docente_id: number,
    grupo: string
}

export {
    Schedule,
    Room,
    Subject,
    Department,
    IClassBlock,
    IClassBlockChange
}

/**
 * SELECT b.hora_inicio, b.hora_fin, g.grupo, a.dia, u.nombre, u.apellido, ass.nombre from asignacion a join grupo g on(a.grupo_id = g.grupo_id) 
 * join bloque_horario b on (b.bloque_id = a.grupo_id) join usuarios u on(g.profesor_id = u.usuario_id) join asignatura ass on(g.asignatura_id = ass.asignatura_id) ; 
 */