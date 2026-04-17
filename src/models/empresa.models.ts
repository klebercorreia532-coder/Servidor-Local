import type { RowDataPacket } from "mysql2"
import type { EmpresaType } from "../utils/types.js"
import { generateUUID } from "../utils/uuid.js"
import db from "../lib/db.js"




export const EmpresaModel = {
    async create(empresa: EmpresaType): Promise<EmpresaType | null> {
        try {
            const [rows] = await db.execute<EmpresaType & RowDataPacket[]>(
                `INSERT INTO tbl_empresas 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [
                    generateUUID(),
                    empresa.designacao,
                    empresa.descricao,
                    empresa.nif,
                    empresa.icone,
                    empresa.id_utilizador,
                    empresa.loclizacao,
                    empresa.enabled,
                    new Date(),
                    new Date()
                ]
            )

            return rows as EmpresaType
        } catch (err) {
            console.log(err)
            return null
        }
    },  
    async getAll(): Promise<EmpresaType[] | null> {
        const [rows] = await db.execute<EmpresaType[] & RowDataPacket[]>
            ("SELECT * FROM tbl_empresas")

        return rows as EmpresaType[]
    }, 
    
    async get(id: string): Promise<EmpresaType | null> {    
        try {
            const [rows] = await db.execute<EmpresaType & RowDataPacket[]>(
                `SELECT * FROM tbl_empresas 
                WHERE tbl_empresas.id = ?`, 
                [id]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as EmpresaType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async update(id: string, empresa: EmpresaType): Promise<EmpresaType | null> {
        try {   
            const [rows] = await db.execute<EmpresaType & RowDataPacket[]>(
                `UPDATE tbl_empresas 
                SET designacao = ?, descricao = ?, nif = ?, icone = ?, id_utilizador = ?, loclizacao = ?, enabled = ?, updated_at = ?
                WHERE id = ?`,
                [
                    empresa.designacao,
                    empresa.descricao,
                    empresa.nif,
                    empresa.icone,
                    empresa.id_utilizador,
                    empresa.loclizacao,
                    empresa.enabled,
                    new Date(),
                    id
                ]
            )   
                return rows as EmpresaType
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async delete(id: string): Promise<EmpresaType | null> { 
        try {
            const rows: any = await db.execute<EmpresaType & RowDataPacket[]>(
                `DELETE FROM tbl_empresas 
                WHERE id = ?`, 
                [id]
            )

            return rows[0].affectedRows === 0 ? null : rows[0]
        } catch (err) {
            console.log(err)
            return null
        }
    }
}