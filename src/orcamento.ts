import { hasSubscribers } from "node:diagnostics_channel";
import { catalogarServicos } from "./servico.js";
import { type ServicoType, type PedidoServico, type PrestadorType, type prestadoresDeServico } from "./utils/types.js";
import e from "express";

const taxaUrgencia: number = 0.2;
const mnnimoDesconto: number = 1000;
const percentagemDesconto: number = 0.1;


const servicosSelecionadas: ServicoType[] = [];
const prestadoresDeServico: PrestadorType[] = [];
const prestadoresSelecionados: PrestadorType[] = [];

// Funcao para selecionar servico e horaEstimada
export function selecionarServico(nome: string) {
    for (let i = 0; i < catalogarServicos.length; i++) {
        if (catalogarServicos[i]?.nome === nome) {
            servicosSelecionadas.push(catalogarServicos[i]!);
            return true

        };
    }
    return false;
}

// selecionar prestador de servico

export function selecionarPrestador(nomeDoPrestador: string) {
    // ciclo for que percorre o array de prestadores de servico e verifica se o nome do prestador existe
    for (let i = 0; i < prestadoresDeServico.length; i++) {
        if (prestadoresDeServico[i]?.nome === nomeDoPrestador) {
            //se for igual, adicionar o item [i] ao array de prestadoresSelecionados e retornar uma mensagem de sucesso
            prestadoresSelecionados.push(prestadoresDeServico[i]!);
            return true;
        }
    }
    //  se nao existe
    return false;
}




// Funcao para criar prestadores de servico
export function criarPrestadoresDeServico(novoPrestador: PrestadorType) {
    //verificar se o prestador ja esta no array
    prestadoresDeServico.map((prestadorExistente: PrestadorType) => {
        if (prestadorExistente.nome === novoPrestador.nome) {
            return {
                status: false,
                mensagem: "Prestador já existe",
                data: null
            }

        }

    })
}
// Funcao para calcular orcamento

export function calcularOrcamento(pedido: PedidoServico) {
    let totalBruto: number = 0;
    let totalFinal: number = 0;



    servicosSelecionadas.map((servico) => {
        let totalServico: number = servico.precoHora * pedido.horasEstimadas;


        totalBruto = totalBruto + totalServico;
    })

    if (pedido.urgente) {
        totalFinal = totalBruto + (totalBruto * taxaUrgencia);
    }

    if (totalBruto > mnnimoDesconto) {
        totalFinal = totalFinal - (totalFinal * percentagemDesconto);
    }


    return totalFinal;
}




    //() => {} --- function
    //forEach() => {} --- function normal
    /*
    
    urgente: true
    taxaUrgencia: 0.2
    totalBruto: 1000
    totalTaxa: 1000 * 0.2 = 200
    totalFinal: 1000 + 200 = 1200
    
    totalBruto: 1000
    totalbruto apos urgencia: 1200
    minimo desconto: 1000
    percentagem: 0.1
    desconto sobe total final: 1200 * 0.1 = 120
    desconto sobre total final: 1200 - 120 = 1080
    */
