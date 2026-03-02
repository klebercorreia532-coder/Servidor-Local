export interface PedidoServico {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean;
}

export interface ServicoType {
    nome: string;
    precoHora: number;
    categoria: string;
    minimoDescontado: number;
    percentagemDesconto: number;
}


export interface Responsetype {
    status: boolean;
    mensagem: string;
    data: ServicoType | null;
}
export interface PrestadorType {
    nome: string;
    precoHora: number;
    propfissao: string;
    minimoDesconto: number;
    percentagemDesconto: number;
    taxaUrgencia: number;
}