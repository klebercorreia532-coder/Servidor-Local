import type { get } from "node:http"
import db from "../lib/db.js"
import type { PropostaDBType } from "../utils/types.js"
import { generateUUID } from "../utils/uuid.js"
import type { RowDataPacket } from "mysql2/promise"


export const PropostaModel = {
    async create(proposta: PropostaDBType) : Promise<PropostaDBType | null> {
        try {
            const [rows] = await db.execute <PropostaDBType & RowDataPacket[]>(
                `INSERT INTO tbl_propostas 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,

                [
                    generateUUID(),
                    proposta.id_prestacao_servico,
                    proposta.preco_hora,
                    proposta.hora_estimadas,
                    proposta.estado,
                    proposta.enabled,
                    new Date(),
                    new Date()
                ]
            )
            
            return rows as PropostaDBType
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getAll() : Promise<PropostaDBType[] | null> {
        const [rows] = await db.execute<PropostaDBType[] & RowDataPacket[]>("SELECT * FROM tbl_propostas")

        return rows as PropostaDBType[]
    },

    async get(id: string) : Promise<PropostaDBType | null> {
        try {
            const [rows] = await db.execute<PropostaDBType[] & RowDataPacket[]>(
                `SELECT DISTINCT 
                pt.*,
                pr.id as owner
                FROM tbl_propostas pt
                INNER JOIN tbl_prestadores pr ON pt.id_prestador = pr.id
                INNER JOIN tbl_utilizadores u ON pr.id_utilizador = u.id
                WHERE pt.id = ?`,

                [id]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as PropostaDBType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async update(id: string, proposta: PropostaDBType) : Promise<PropostaDBType | null> {
        try {
            const [rows] = await db.execute<PropostaDBType & RowDataPacket[]>(
                `UPDATE tbl_propostas 
                SET id_prestacao_servico = ?, 
                preco_hora = ?, 
                hora_estimadas = ?, 
                estado = ?, 
                enabled = ?, 
                updated_at = ?
                WHERE id = ?`,

                [
                    proposta.id_prestacao_servico,
                    proposta.preco_hora,
                    proposta.hora_estimadas,
                    proposta.estado,
                    proposta.enabled,
                    new Date(),
                    id
                ]
            )
            console.log({ rows })
            return rows
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getByIdPrestacaoServico(id_prestacao_servico: string): Promise<PropostaDBType[] | null> {
        try {
            const [rows] = await db.execute<PropostaDBType[] & RowDataPacket[]>(
                `SELECT * FROM tbl_propostas 
                WHERE tbl_propostas.id_prestacao_servico = ?`,
                [id_prestacao_servico]
            )
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows: null
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async propostaAceita(id: string) {
        
    }, 

    async delete(id: string): Promise<PropostaDBType | null> {
        try {
            const rows: any = await db.execute<PropostaDBType[] & RowDataPacket[]>(
                `DELETE FROM tbl_propostas 
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