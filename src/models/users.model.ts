

import db from "../lib/db.js";
import { formatDateDDMMYYYY } from "../utils/date.js";
import { hashPassword } from "../utils/password.js";
import type { UserType } from "../utils/types.js";
import { generateUUID } from "../utils/uuid.js";

export async function getUsers() {
    const [rows] = await db.execute("SELECT * FROM tbl_utilizadores");
    return rows;
}

export async function getUserById(id: string) {
    const [rows]: any = await db.execute(
        "SELECT * FROM tbl_utilizadores WHERE id = ?",
        [id]
    );

    return rows.length === 0 ? null : rows[0];
}

export async function insertUser(user: UserType) {
    try {
        const query = `
      INSERT INTO tbl_utilizadores (
        id, nome, numero_identificado, data_nascimento,
        email, telefone, pais, localidade,
        password, enabled, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

        const values = [
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
        ];

        const [result] = await db.execute(query, values);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function updateUser(id: string, user: UserType) {
    try {
        const query = `
      UPDATE tbl_utilizadores
      SET
        nome = ?,
        numero_identificado = ?,
        data_nascimento = ?,
        email = ?,
        telefone = ?,
        pais = ?,
        localidade = ?,
        password = ?,
        enabled = ?,
        updated_at = ?
      WHERE id = ?
    `;

        const values = [
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
            id,
        ];

        const [result]: any = await db.execute(query, values);
        return result.affectedRows === 0 ? null : result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function deleteUser(id: string) {
    try {
        const [result]: any = await db.execute(
            "DELETE FROM tbl_utilizadores WHERE id = ?",
            [id]
        );

        return result.affectedRows === 0 ? null : result;
    } catch (error) {
        console.log(error);
        return null;
    }
}