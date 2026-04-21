import db from "./lib/db.js";
import type { PropostaDBType } from "./utils/types.js";


export async function insertProposta(proposta: PropostaDBType ) {


    try {
        const query = `
INSERT INTO tbl_propostas
(
id_prestacao_servico,
preco_hora,
hora_estimadas,
estado,
enabled,
created_at,
updated_at
)
VALUES (?, ?, ?, ?, ?, ?, ?)
`

        const values = [
            proposta.id_prestacao_servico,
            proposta.preco_hora,
            proposta.horas_estimadas,
            proposta.estado,
            proposta.enabled,
            proposta.created_at,
            proposta.updated_at
        ]

        const [result] = await db.execute(query, values)


        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

