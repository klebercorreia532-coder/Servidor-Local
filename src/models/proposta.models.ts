import e from "express";
import db from "../lib/db.js";
import { generateUUID } from "../utils/uuid.js";
import type { PropostaType } from "../utils/types.js";


export const propostaModel = {
    async create(newProposta: PropostaType) {

        try {
            const query = `
    INSERT INTO tbl_propostas
    (
      id,
      id_prestacao_servico,
      preco_hora,
      horas_estimadas,
      estado,
      enabled,
      created_at,
      updated_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `

            const values = [
                newProposta.id ?? generateUUID(),
                newProposta.id_prestacao_servico,
                newProposta.preco_hora,
                newProposta.hora_estimadas,
                newProposta.estado,
                newProposta.enabled,
                new Date(),
                new Date()
            ];

            const [result] = await db.execute(query, values);

            return result;
        }
    catch (error) {
        console.log(error);
        return null;
    }

}
}

