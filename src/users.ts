import db from "./lib/db.js"
import type { UserServiceType } from "./utils/types.js";


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

    const {
        id,
        nome,
        numaro_identificado,
        data_nascimento,
        email,
        telefone,
        pais,
        localidade,
        password,
        enabled
    } = user;

    const body = `
INSERT INTO tbl_utilisadores
(id, nome, numaro_identificado, data_nascimento, email, telefone, pais, localidade, password, enabled, created_at, updated_at)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

    const values = [
        id,
        nome,
        numaro_identificado,
        data_nascimento,
        email,
        telefone,
        pais,
        localidade,
        password,
        enabled,
        new Date(),
        new Date()
    ];

    const [result] = await db.execute(body, values);

    return result;
}

export async function getServicos() {
    const [rows] = await db.execute("SELECT * FROM tbl_servico")
    console.log(rows)
    return rows;
}

export async function insertService(service: UserServiceType) {
    console.log(service);
    const [query] = await db.execute(`
INSERT INTO tbl_servico
VALUES ( ?, ?, ?, ?,?,?,?)
`, [
        service.id ?? null,
        service.nome,
        service.descricao,
        service.categoria,
        service.enabled,
        new Date(),
        new Date()
    ]);

    return query;
}