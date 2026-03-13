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
export interface prestadoresDeServico {
    nome: string;
    precoHora: number;
    propfissao: string;
    minimoDesconto: number;
    percentagemDesconto: number;
    taxaUrgencia: number;
}

export interface UserType {
    id: string;
    nome: string;
    numaro_identificado: string;
    data_nascimento: Date;
    email: string;
    telefone: string;
    pais: string;
    localidade: string;
    password: string;
    enabled: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface UserServiceType {
    id: string;
    nome: string;
    discricao: string;
    categoria: string;
    enabled: boolean;
    created_at: Date;
    updated_at: Date;
}