
import type { get } from "node:http";
import db from "../lib/db.js";
import type { ServicoDBType, ServicoDetalhadaType, } from "../utils/types.js";
import type { RowDataPacket } from "mysql2/promise";
import { getAllServices } from "../servico.js";
import { isArray } from "node:util";

export const ServiceModel = {
    async create(newService: ServicoDBType): Promise<ServicoDBType | null> {
        try {
            const query = `INSERT INTO tbl_servicos VALUES (?, ?, ?, ?, ?, ?, ?)`

            const values = [
                null,
                newService.nome,
                newService.descricao,
                newService.categoria,
                newService.enabled,
                new Date(),
                new Date()
            ]

            const [rows] = await db.execute<ServicoDBType & RowDataPacket[]>(query, values)

            return rows as ServicoDBType
        } catch (error) {
            console.log(error)
            return null
        }

    },

    async getAll(): Promise<ServicoDBType | null> {
        try {
            const query = `SELECT * FROM tbl_servicos`

            const [rows] = await db.execute<ServicoDBType & RowDataPacket[]>(query)

            if (!rows || (Array.isArray(rows) && rows.length === 0)) return null
            return Array.isArray(rows) && rows.length > 0 ? rows[0] as ServicoDBType : null

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async get(id: string) {
        try {
            const query = `SELECT * FROM tbl_servicos WHERE id = ?`

            const value = [id]

            const [rows] = await db.execute<ServicoDBType & RowDataPacket[]>(query, value)

            if (!rows || (Array.isArray(rows) && rows.length === 0)) return null
            return Array.isArray(rows) && rows.length > 0 ? rows[0] as ServicoDBType : null

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async update(id: string, servicoAtualizado: ServicoDBType) {
        try {
            const query = `UPDATE tbl_servicos 
                        SET 
                            nome=?,
                            discricao=?,
                            categoria=?,
                            enabled=?,
                            updated_at=?
                        WHERE
                            id=?
                        ;`

            const values = [
                servicoAtualizado.nome,
                servicoAtualizado.descricao,
                servicoAtualizado.categoria,
                servicoAtualizado.enabled,
                new Date(),
                id
            ]

            const [rows] = await db.execute<ServicoDBType & RowDataPacket[]>(query, values)

            return rows 
        } catch (error) {
            console.log(error)
            return null
        }
    },

    async delete(id: string): Promise<ServicoDBType | null> {
        try {
            const query = `DELETE FROM tbl_servicos WHERE id = ?`

            const value = [id]

            const [rows] = await db.execute<ServicoDBType & RowDataPacket[]>(query, value)

            return rows[0]?.affectedRows === 0 ? null : rows
        } catch (error) {
            console.log(error)
            return null
        }
    },

    async getAllServiceDetalhada(limit: number, offset: number): Promise<ServicoDetalhadaType[] | null> {
        try {
            const query = 
            `SELECT 
            id
            nome,
            descricao as descricao_categoria,
            icone as icone_categoria,
            id as id_empresa,
            designacao as designacao_empresa,
            icone as icone_empresa,
            s.enabled 
            enabled,
            FROM tbl_servicos
            INNERJOIN tbl_categorias c ON c.id = s.id_categorias
            INNERJOIN tbl_empresas e ON e.id = s.id_empresa
            LIMIT ? OFFSET ?`

            const values = [limit, offset]

            const [rows] = await db.execute<ServicoDetalhadaType[] & RowDataPacket[]>(query, values)

            return Array.isArray(rows) && rows.length > 0 ? rows as ServicoDetalhadaType[] : null
        } catch (error) {
            console.log(error)
            return null
        }
    }
}