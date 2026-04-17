import type { RowDataPacket } from "mysql2"
import type { CategoriaType } from "../utils/types.js"
import db from "../lib/db.js"
import { generateUUID } from "../utils/uuid.js"





export const CategoriaModel = {
    async create(categoria: CategoriaType): Promise<CategoriaType | null> {
        try {
            const [rows] = await db.execute<CategoriaType & RowDataPacket[]>(
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

            return rows as CategoriaType
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getAll(): Promise<CategoriaType[] | null> {
        const [rows] = await db.execute<CategoriaType[] & RowDataPacket[]>
            ("SELECT * FROM tbl_categorias")

        return rows as CategoriaType[]
    },

    async get(id: string): Promise<CategoriaType | null> {
        try {   
            const [rows] = await db.execute<CategoriaType & RowDataPacket[]>(   
                `SELECT * FROM tbl_categorias 
                WHERE tbl_categorias.id = ?`,

                [id]
            )
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as CategoriaType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async update(id: string, categoria: CategoriaType): Promise<CategoriaType | null> {
        try {
            const [rows] = await db.execute<CategoriaType & RowDataPacket[]>(
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
                return rows as CategoriaType
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async delete(id: string): Promise<CategoriaType | null> {
        try {
            const [rows] = await db.execute<CategoriaType & RowDataPacket[]>(
                `DELETE FROM tbl_categorias 
                WHERE id = ?`,

                [id]
            )

            return rows as CategoriaType
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async disable(id: string): Promise<CategoriaType | null> {
        try {
            const [rows] = await db.execute<CategoriaType & RowDataPacket[]>(
                `UPDATE tbl_categorias 
                SET enabled = ?, updated_at = ?
                WHERE id = ?`,
                [
                    false,
                    new Date(),
                    id
                ]
            )
                return rows as CategoriaType
        } catch (err) {
            console.log(err)
            return null
        }
}   
}
