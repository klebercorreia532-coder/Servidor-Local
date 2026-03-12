import db from "./lib/db.js"


export async function getUsers() {

    const [rows] = await db.execute("SELECT * FROM  tbl_utilisadores")

    console.log(rows)

    return rows;
}

export async function getUserById(id: string) {

    const [rows] = await db.execute(
        "SELECT * FROM  tbl_utilisadores WHERE tbl_utilisadores.id=?",

        [id])


    if (Array.isArray(rows) && rows.length === 0) return null
    return Array.isArray(rows) ? rows[0] : null
}

export async function insertUser(user: any) {

    const { id, nome, matricula, email, telefone, pais, cidade, senha } = user;

    const [result] = await db.execute(
        `INSERT INTO tbl_utilisadores (
        id, 
        nome, 
        matricula, 
        email, 
        telefone,
        pais, 
        cidade, 
        senha
        )
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            id,
            nome,
            matricula,
            email,
            telefone,
            pais,
            cidade,
            senha]
    );

    return result;
}



