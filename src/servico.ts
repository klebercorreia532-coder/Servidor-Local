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

// adicionar um  serniso novo
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
            return {
                status: false,
                mensagem: `Erro: O serviço '${novoServico.nome}' já está cadastrado.`,
                data: null
            };
        }


        catalogoDeServicos.push(novoServico);


        return {
            status: true,
            mensagem: "Serviço adicionado com sucesso!",
            data: novoServico
        };
    };
}
// listar todos os serviços
export function listarServicos(): ServicoType[] {
//TODO: implementar a fetch listarServicos

return catalogoDeServicos;
}
// apagar um serviço

export function apagarServico(nome: string): boolean {
    //TODO: implementar a fetch apagarServico


const novoCatalogoTemp: ServicoType[] = [];

for ( let i = 0; i < catalogoDeServicos.length; i++) {
    if (catalogoDeServicos[i]?.nome !== undefined && catalogoDeServicos[i]?.nome !== nome ) {
novoCatalogoTemp.push(catalogoDeServicos[i]!)
}
}
// devolver um novo catalogo sem o servico que foi apagado

catalogoDeServicos = novoCatalogoTemp;

return true;
}

// obter um servico pela nome
export function obterServicoPorNome(nome: string): ServicoType | null {
    for (let i = 0; i < catalogoDeServicos.length; i++) {
        if (catalogoDeServicos[i]?.nome === nome) {
            return catalogoDeServicos[i]!;
        }
    }
    return null;
}




