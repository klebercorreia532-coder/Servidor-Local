import db from "./lib/db.js";
import { formatDateDDMMYYYY } from "./utils/date.js";
import { hashPassword } from "./utils/password.js";
import type { UserType } from "./utils/types.js";
import { generateUUID } from "./utils/uuid.js";

export async function getUsers() {
    const rows = await db.execute("SELECT * FROM tbl_utilizadores");
    return rows;
}

export async function getUserById(id: string) {
    const [rows] = await db.execute(
        `SELECT * FROM tbl_utilizadores
        WHERE tbl_utilizadores.id = ? `,
        [id],
    );

    if (Array.isArray(rows) && rows.length === 0) return null;
    return Array.isArray(rows) ? rows[0] : rows;
}

//criar uma função para inserir um utilizador na base de dados
export async function insertUser(user: UserType) {
    try {
        console.log(user);
        const [rows] = await db.execute(
            `INSERT INTO tbl_utilizadores (id,nome, numero_identificado, data_nascimento, email, telefone,
        pais, localidade, password , enabled, created_at, update_at) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?,?,?)`,
            [
                generateUUID(),
                user.nome,
                user.numero_identificado,
                formatDateDDMMYYYY(user.data_nascimento),
                user.email,
                user.telefone,
                user.pais,
                user.localidade,
                await hashPassword(user.password),
                user.enabled,
                new Date(),
                new Date(),
            ],
        );
        return rows;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function updateUser(id: string, updatedUser: UserType) {
    try {
        const query = `
        UPDATE tbl_utilizadores
        SET
    nome: = ?,
    numero_identidade: = ?,
    data_nascimento: = ?,
    email: = ?,
    password: = ?,
    telefone: = ?,
    pais: = ?,
    localidade: = ?,
    enebled: = ?,
    update_at: = ?
        WHERE
        id=?
        `;

        const values = [
            updatedUser.nome,
            updatedUser.numero_identificado,
            formatDateDDMMYYYY(updatedUser.data_nascimento),
            updatedUser.email,
            updatedUser.telefone,
            updatedUser.pais,
            updatedUser.localidade,
            await hashPassword(updatedUser.password),
            updatedUser.enabled,
            new Date(),
            id,
        ];
        const rows = await db.execute(query, values);

        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function deleteUser(id: string) {
    try {
        const query = "DELETE  FROM tbl_utilizadores WHERE id = ?";

        const values = [id];

        const rows: any = await db.execute(query, values);

        return rows[0]?.affetedRows === 0 ? null : rows;
    } catch (error) {
        console.log(error);
        return null;
    }
}
