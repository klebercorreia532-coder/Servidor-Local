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
    numero_identificado: string;
    data_nascimento: string;
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
    descricao: string;
    categoria: string;
    enabled: boolean;
    created_at: Date;
    updated_at: Date;
}
export interface PrestadorDBType {
    id: string
    nif: number
    profissao: string
    taxa_urgencia: number
    minimo_desconto: number
    percentagem_desconto: number
    desponivel: number
    enabled: number
    created_at: Date
    updated_at: Date
}

export interface  PropostaDBType {
    id: string
    id_prestacao_servico: number
    preco_hora: number
    hora_estimadas: number
    estado: "pendente" | "aceito" | "recusado"
    enabled: number
    created_at: Date
    updated_at: Date
}

export interface ServicoDBType {
    id: string;
    nome: string;
    discricao: string;
    categoria: string;
    enabled: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface OrcamentoDBType {
    id: string;
    total: number;
    id_utilizador: string;
    enabled: string;
    created_at: Date
    updated_at: Date
}


