interface PedidoServico {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean;
}

function processarPedido(pedido: PedidoServico, precoHora: number) {


    const valorBase = pedido.horasEstimadas * precoHora;


    let taxaUrgente = 0;

    if (pedido.urgente) {
        taxaUrgente = valorBase * 0.30;
    }

    const valorTotal = valorBase + taxaUrgente;


    return {
        cliente: pedido.cliente,
        descricao: pedido.descricao,
        urgente: pedido.urgente,
        valorBase: valorBase,
        taxaUrgente: taxaUrgente,
        total: valorTotal
    };
}



const pedido1: PedidoServico = {
    cliente: "Kleber",
    descricao: "Criar website",
    horasEstimadas: 10,
    urgente: true
};

const resultado = processarPedido(pedido1, 100);

console.log(resultado);


