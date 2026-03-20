
import db from "../lib/db.js";
import type { ServicoDBType } from "../utils/types.js";

export const serviceModel = {
    async create(newService: ServicoDBType) {

        try {
            const query = 'INSERT INTO tbl_services VALUES(?,?,?,?,?,?,?)'

            const values =

                [
                    null,
                    newService.nome,
                    newService.discricao,
                    newService.categoria,
                    newService.enabled,
                    new Date(),
                    new Date()

                ]
            const rows = await db.execute(query, values)

            return rows
        } catch (error) {
            console.log(error)
            return null
        }
    },
    async getAll() {
        try {
            const query = 'SELECT * FROM tbl_servico'

            const rows = await db.execute(query)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []
        } catch (error) {
            console.log(error)
            return null
        }

    },
    async get(id: string) {

        try {
            const query = ' SELECT * FROM tbl_services WHERE id = ?'

            const values = [id]

            const rows = await db.execute(query, values)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async update(id: string, servicoAtualizado: ServicoDBType) {
        try {
            const query = `UPDATE tbl_servico
                            SET
                                nome=?,
                                discricao=?,
                                categoria=?,
                                enabled=?,
                                update_at=?
                            WHERE
                                id=?
                            ;`

            const values = [
                servicoAtualizado.nome,
                servicoAtualizado.discricao,
                servicoAtualizado.categoria,
                servicoAtualizado.enabled,
                new Date(),
                id
            ]

            const rows = await db.execute(query, values)
            return rows

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async delete(id: string) {
        try {
            const query = 'DELETE FROM tbl_servico WHERE id= ?'

            const value = [id]

            const rows: any = await db.execute(query, value)

            return rows[0]?.affectedRows === 0 ? null : rows


        } catch (error) {
            console.log(error)
            return null
        }
    }

}