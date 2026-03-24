import { create } from "node:domain";
import { formatDateDDMMYYYY } from "../utils/date.js";
import { hashPassword } from "../utils/password.js";
import type { PrestadorType } from "../utils/types.js";
import db from "../lib/db.js";


export const pretadorModel = {
    // create prestador
    async insertPrestador(prestador: PrestadorType) {
        const query = `INSERT INTO tbl_prestadores(
    id,
    nif,
    taxa_urgencia,
    minimo_desconto,
    percentagem_desconto,
    desponivel,
    enabled,
    created_at,
    updated_at
    profissao,
    )VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        const values = [
            prestador.id,
            prestador.nif,
            prestador.profissao,
            prestador.taxa_urgencia,
            prestador.minimo_desconto,
            prestador.percentagem_desconto,
            prestador.desponivel,
            prestador.enabled,
            prestador.created_at,
            prestador.updated_at
        ]
        const [result] = await db.execute(query, values)
        return result
    },
    // todos os prestadores
    async getAllPrestadores() {
        const query = `SELECT * FROM tbl_prestadores`
        const [result] = await db.execute(query)
        return result
    },
    // update prestador
    async updatePrestador(id: string, prestador: PrestadorType) {
        const query = `UPDATE tbl_prestadores SET
        nif = ?,
        taxa_urgencia = ?,
        minimo_desconto = ?,
        percentagem_desconto = ?,
        desponivel = ?,
        enabled = ?,
        updated_at = ?
        WHERE id = ?`
        const values = [
            prestador.nif,
            prestador.taxa_urgencia,
            prestador.minimo_desconto,  
            prestador.percentagemDesconto,
            prestador.desponivel,
            prestador.enabled,
            new Date(),
            id
        ]
        const [result] = await db.execute(query, values)
        return result
    },
    // delete prestador
    async deletePrestador(id: string) {
        const query = `DELETE FROM tbl_prestadores WHERE id = ?`
        const values = [id]
        const [result] = await db.execute(query, values)
        return result   
        }





}

