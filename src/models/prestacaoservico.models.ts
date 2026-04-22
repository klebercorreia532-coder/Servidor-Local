import type { RowDataPacket } from "mysql2"
import db from "../lib/db.js"
import type { PrestacaoServicoDBType, PrestacaoServicoDetalhoadaType } from "../utils/types.js"
import { generateUUID } from "../utils/uuid.js"


export const PrestacaoServicoModel = {
    async create(prestacaoServico: PrestacaoServicoDBType): Promise<PrestacaoServicoDBType | null> {
        try {
            const [rows] = await db.execute<PrestacaoServicoDBType & RowDataPacket[]>(
                `INSERT INTO tbl_prestacao_servico 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,

                [
                    generateUUID(),
                    prestacaoServico.designacao,
                    prestacaoServico.subtotal,
                    prestacaoServico.horas_estimadas,
                    prestacaoServico.id_prestador,
                    prestacaoServico.id_servico,
                    prestacaoServico.preco_hora,
                    prestacaoServico.estado,
                    prestacaoServico.id_orcamento,
                    prestacaoServico.enabled,
                    new Date(),
                    new Date()
                ]
            )

            return rows as PrestacaoServicoDBType
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getAll(): Promise<PrestacaoServicoDBType[] | null> {
        const [rows] = await db.execute<PrestacaoServicoDBType[] & RowDataPacket[]>("SELECT * FROM tbl_prestacao_servico")

        return rows as PrestacaoServicoDBType[]
    },

    async get(id: string): Promise<PrestacaoServicoDBType | null> {
        try {
            const [rows] = await db.execute<PrestacaoServicoDBType[] & RowDataPacket[]>(
                `SELECT * FROM tbl_prestacao_servico 
                WHERE tbl_prestacao_servico.id = ?`,

                [id]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as PrestacaoServicoDBType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async update(id: string, prestacaoServico: PrestacaoServicoDBType): Promise<PrestacaoServicoDBType | null> {
        try {
            const [rows] = await db.execute<PrestacaoServicoDBType & RowDataPacket[]>(
                `UPDATE tbl_prestacao_servico 
                SET designacao = ?, 
                subtotal = ?, 
                horas_estimadas = ?, 
                id_prestador = ?, 
                id_servico = ?, 
                preco_hora = ?, 
                estado = ?, 
                id_orcamento = ?, 
                enabled = ?, 
                updated_at = ?
                WHERE id = ?`,

                [
                    prestacaoServico.designacao,
                    prestacaoServico.subtotal,
                    prestacaoServico.horas_estimadas,
                    prestacaoServico.id_prestador,
                    prestacaoServico.id_servico,
                    prestacaoServico.preco_hora,
                    prestacaoServico.estado,
                    prestacaoServico.id_orcamento,
                    prestacaoServico.enabled,
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

    async delete(id: string): Promise<PrestacaoServicoDBType | null> {
        try {
            const rows: any = await db.execute<PrestacaoServicoDBType[] & RowDataPacket[]>(
                `DELETE FROM tbl_prestacao_servico 
                WHERE id = ?`,

                [id]
            )

            return rows[0].affectedRows === 0 ? null : rows[0]
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getByIdOrcamento(id_orcamento: string): Promise<PrestacaoServicoDBType | null> {
        try {
            const [rows] = await db.execute<PrestacaoServicoDBType[] & RowDataPacket[]>(
                `SELECT * FROM tbl_prestacao_servico 
                WHERE tbl_prestacao_servico.id_orcamento = ?`,

                [id_orcamento]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as PrestacaoServicoDBType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async getAllPrestacaoServicoDetalhada(limit: number, offset: number) {
        try {
            const query =
                `SELECT 
                ps.id as id_prestacao_servico,
                ps.designacao as designacao,
                u.nome as nome_utilizador,
                u.email as email_utilizador,
                s.nome as nome_servico,
                ps.created_at as data_pedido,
                ps.urgencia as urgencia
                FROM tbl_prestacao_servico ps
                INNER JOIN tbl_servicos s ON ps.id_servico = s.id
                INNER JOIN tbl_utilizadores u ON ps.id_utilizador = u.id
                ORDER BY ps.created_at DESC;
                LIMIT ? OFFSET ?`

            const [rows] = await db.execute<PrestacaoServicoDetalhoadaType[] & RowDataPacket[]>(
                query,
                [
                    limit.toString(),
                    offset.toString()
                ]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows as PrestacaoServicoDetalhoadaType[] : null

        }

        catch (err) {
            console.log(err)
            return null
        }
    },
    async getByCategoria(idCategoria: string, limit: number, offset: number) {
        try {
            const query = `
        SELECT 
        ps.id as id_prestacao_servico,
        ps.designacao as designacao,
        u.nome as nome_servico,
        c.designacao as nome_categoria,
        c.icone as icone_categoria,
        ps.created_at as data_pedido,
        ps.urgencia 
        FROM tbl_prestacao_servico ps
        INNER JOIN tbl_categorias c ON c.id = s.id_categoria AND c.id=?
        INNER JOIN tbl_servicos s ON ps.id_servico = s.id
        WHERE c.designacao = ?
        ORDER BY ps.created_at DESC
        LIMIT ? OFFSET ?`

            const [rows] = await db.execute<PrestacaoServicoDetalhoadaType[] & RowDataPacket[]>(
                query,
                [
                    idCategoria,
                    limit.toString(),
                    offset.toString()
                ]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows as PrestacaoServicoDetalhoadaType[] : null

        }

        catch (err) {
            console.log(err)
            return null     

        }
}
}