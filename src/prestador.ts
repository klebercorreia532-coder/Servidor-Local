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








/*
nome: "Kleber",
precoHora: 100,
propfissao: "Desenvolvedor",
minimoDesconto: 1000,
percentagemDesconto: 0.1,
taxaUrgencia: 0.2
*/
