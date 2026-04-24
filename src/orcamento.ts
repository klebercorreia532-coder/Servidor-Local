
import db from "./lib/db.js";
import { catalogarServicos } from "./servico.js";
import { type ServicoDBType,type PedidoSevicoType ,type PrestadorType,  } from "./utils/types.js";


const taxaUrgencia: number = 0.2;
const mnnimoDesconto: number = 1000;
const percentagemDesconto: number = 0.1;


const servicosSelecionadas: ServicoDBType[] = [];
const prestadoresDeServico: PrestadorType[] = [];
const prestadoresSelecionados: PrestadorType[] = [];



export async function getOrcamento() {
    const rows = await db.execute("SELECT * FROM tbl_orcamentos");
    return rows;
}

export async function getOrcamentoById(id: string) {
    const rows = await db.execute("SELECT * FROM tbl_orcamentos WHERE id = ?", [id]);
    return rows;
}


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
    prestadoresDeServico.push(novoPrestador);
    return {
        status: true,
        mensagem: "Prestador criado com sucesso",
        data: novoPrestador
    }
}
// Funcao para editar um  prestador de servico

export function editarPrestadoresDeServico(nomeDoPrestador: string, novoDadosDoPrestador: PrestadorType) {

    prestadoresDeServico.map((prestadorExistente: PrestadorType) => {
        if (prestadorExistente.nome === nomeDoPrestador) {
            prestadorExistente.nome = novoDadosDoPrestador.nome
            prestadorExistente.precoHora = novoDadosDoPrestador.precoHora
            prestadorExistente.profissao = novoDadosDoPrestador.profissao
            prestadorExistente.minimo_desconto = novoDadosDoPrestador.minimo_desconto
            prestadorExistente.percentagemDesconto = novoDadosDoPrestador.percentagemDesconto
            prestadorExistente.taxa_urgencia = novoDadosDoPrestador.taxa_urgencia

            return {
                status: true,
                mensagem: "Prestador editado com sucesso",
                data: prestadorExistente
            }
        }
    })

    //se nao exister no prestador com o nome recibido, o retorna uma mensogen de erro 

    return {
        status: false,
        mensagem: "Nao existe prestador de servico com esse nome",
        data: null
    }
}



//funcao para apagar prestador de servico
export function apagarPrestadorDeServico(nomeDoPrestador: string) {


    if (!nomeDoPrestador) {

        return {
            status: false,
            mensagem: "nome doprestador e obrigatorio",
            data: null
        }
    }

    prestadoresDeServico.filter(
        (PrestadorExistente: PrestadorType) => PrestadorExistente.nome !== nomeDoPrestador
    )

    return {
        status: true,
        mensagem: "Prestador apagado com sucesso",
        data: null
    }

}


// Funcao para calcular orcamento
export function calcularOrcamento(pedido: PedidoSevicoType ) {
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
