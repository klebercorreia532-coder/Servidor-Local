import type { RowDataPacket } from "mysql2"
import type { CategoriaDBType } from "../utils/types.js"
import db from "../lib/db.js"
import { generateUUID } from "../utils/uuid.js"





export const CategoriaModel = {
    async create(categoria: CategoriaDBType): Promise<CategoriaDBType | null> {
        try {
            const [rows] = await db.execute<CategoriaDBType & RowDataPacket[]>(
                `INSERT INTO tbl_categorias 
                VALUES (?, ?, ?, ?, ?)`,

                [
                    generateUUID(),
                    categoria.nome,
                    categoria.icone,
                    categoria.enabled,
                    new Date(),
                    new Date()
                ]
            )

            return rows as CategoriaDBType
        } catch (err) {
            console.log(err)
            return null
        }
    },
async getAll(): Promise<CategoriaDBType[]> {
    const [rows] = await db.execute<CategoriaDBType[] & RowDataPacket[]>(
        "SELECT * FROM tbl_categoria"
    );

    return rows;
},

    async get(id: string): Promise<CategoriaDBType | null> {
        try {   
            const [rows] = await db.execute<CategoriaDBType & RowDataPacket[]>(   
                `SELECT * FROM tbl_categorias 
                WHERE tbl_categorias.id = ?`,

                [id]
            )
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as CategoriaDBType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async update(id: string, categoria: CategoriaDBType): Promise<CategoriaDBType | null> {
        try {
            const [rows] = await db.execute<CategoriaDBType & RowDataPacket[]>(
                `UPDATE tbl_categorias 
                SET nome = ?, icone = ?, enabled = ?, updated_at = ?
                WHERE id = ?`,
                [
                    categoria.nome,
                    categoria.icone,
                    categoria.enabled,
                    new Date(),
                    id
                ]
                )
                return rows as CategoriaDBType
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async delete(id: string): Promise<CategoriaDBType | null> {
        try {
            const [rows] = await db.execute<CategoriaDBType & RowDataPacket[]>(
                `DELETE FROM tbl_categorias 
                WHERE id = ?`,

                [id]
            )

            return rows as CategoriaDBType
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async disable(id: string): Promise<CategoriaDBType | null> {
        try {
            const [rows] = await db.execute<CategoriaDBType & RowDataPacket[]>(
                `UPDATE tbl_categorias 
                SET enabled = ?, updated_at = ?
                WHERE id = ?`,
                [
                    false,
                    new Date(),
                    id
                ]
            )
                return rows as CategoriaDBType
        } catch (err) {
            console.log(err)
            return null
        }
}   
}
