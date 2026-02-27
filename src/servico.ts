import {type Responsetype,type ServicoType } from "./utils/types.js";
export let catalogarServicos: ServicoType[] = [];



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
        for (let i = 0; i < catalogarServicos.length; i++) {
            if (catalogarServicos[i]?.nome === novoServico.nome) {
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


        catalogarServicos.push(novoServico);


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

return catalogarServicos;
}
// apagar um serviço

export function apagarServico(nome: string): boolean {
    //TODO: implementar a fetch apagarServico


const novoCatalogoTemp: ServicoType[] = [];

for ( let i = 0; i < catalogarServicos.length; i++) {
    if (catalogarServicos[i]?.nome !== undefined && catalogarServicos[i]?.nome !== nome ) {
novoCatalogoTemp.push(catalogarServicos[i]!)
}
}
// devolver um novo catalogo sem o servico que foi apagado

catalogarServicos = novoCatalogoTemp;

return true;
}

// obter um servico pela nome
export function obterServicoPorNome(nome: string): ServicoType | null {
    for (let i = 0; i < catalogarServicos.length; i++) {
        if (catalogarServicos[i]?.nome === nome) {
            return catalogarServicos[i]!;
        }
    }
    return null;
}




