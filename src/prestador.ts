import db from "./lib/db.js";
import type { PrestadorType } from "./utils/types.js";

export async function insertPrestador(prestador: PrestadorType) {
    const {
        nome,
        precoHora,
        propfissao,
        minimoDesconto,
        percentagemDesconto,
        taxaUrgencia
    } = prestador;

    const sql = `
    INSERT INTO prestadores
    (nome, preco_hora, profissao, minimo_desconto, percentagem_desconto, taxa_urgencia)
    VALUES (?, ?, ?, ?, ?, ?)`;

    const values = [
        nome,
        precoHora,
        propfissao,
        minimoDesconto,
        percentagemDesconto,
        taxaUrgencia
    ];

    const [result] = await db.execute(sql, values);

    return result;
}
/*
nome: "Kleber",
precoHora: 100,
propfissao: "Desenvolvedor",
minimoDesconto: 1000,
percentagemDesconto: 0.1,
taxaUrgencia: 0.2
*/
