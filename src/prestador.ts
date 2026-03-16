import db from "./lib/db.js";
import type { PrestadorType } from "./utils/types.js";

class Prestador {
    nome: string;
    precoHora: number;
    propfissao: string;
    minimoDesconto: number;
    percentagemDesconto: number;
    taxaUrgencia: number;

    constructor(
        nomeDoPrestador: string,
        precoHoraDoPrestador: number,
        propfissaoDoPrestador: string,
        minimoDescontoDoPrestador: number,
        percentagemDescontoDoPrestador: number,
        taxaUrgenciaDoPrestador: number
    ) {
        this.nome = nomeDoPrestador;
        this.precoHora = precoHoraDoPrestador;
        this.propfissao = propfissaoDoPrestador;
        this.minimoDesconto = minimoDescontoDoPrestador;
        this.percentagemDesconto = percentagemDescontoDoPrestador;
        this.taxaUrgencia = taxaUrgenciaDoPrestador;


    }
    alterarPrecoHora(novoPrecoHora: number) {
        this.precoHora = novoPrecoHora;
    }

    alterarNome(novoNome: string) {
        this.nome = novoNome;
    }
}

    const prestador1 = new Prestador(
        "Kleber",
        100,
        "Desenvolvedor",
        1000,
        0.1,
        0.2
    );


    export async function insertPrestador(prestador: PrestadorType) {

const query = `
INSERT INTO tbl_prestadores
(
id,
nif,
profissao,
taxa_urgencia,
minimo_desconto,
percentagem_desconto,
desponivel,
enabled,
created_at,
updated_at
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`

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
}








/*
nome: "Kleber",
precoHora: 100,
propfissao: "Desenvolvedor",
minimoDesconto: 1000,
percentagemDesconto: 0.1,
taxaUrgencia: 0.2
*/
