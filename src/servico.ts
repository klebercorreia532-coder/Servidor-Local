import { response } from "express";



interface Responsetype {
    status: boolean;
    mensagem: string;
    data: ServicoType | null;
}
interface ServicoType {
    nome: string;
    precoHora: number;
    categoria: string;
    minimoDescontado: number;
    percentagemDesconto: number;
}


let catalogoDeServicos: ServicoType[] = [];


export function adicionarServico(novoServico: ServicoType): Responsetype {
    {
        if (!novoServico.nome || novoServico.precoHora <= 0) {
            return {
                status: false,
                mensagem: "preço deve ser maior que zero.",
                data: null
            };
        }

        let existe = false;
        for (let i = 0; i < catalogoDeServicos.length; i++) {
            if (catalogoDeServicos[i]?.nome === novoServico.nome) {
                existe = true;
                break;
            }
        }

        if (existe) {
            return {`Erro: O serviço '${novoServico.nome}' já está cadastrado.`};
        }


        catalogoDeServicos.push(novoServico);


        return {
            status: true,
            mensagem: "Serviço adicionado com sucesso!",
            data: novoServico
        };
    };
}