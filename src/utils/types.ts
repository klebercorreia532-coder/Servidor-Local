
export enum EstadoPrestacaoServico {
    PENDENTE = "PENDENTE",
    EM_ANDAMENTO = "EM_ANDAMENTO",
    CONCLUIDA = "CONCLUIDA",
    CANCELADA = "CANCELADA"
}

export enum Role{
    CLIENTE = "cliente",
    ADMIN = "admin",
    PRESTADOR = "prestador",
    EMPRESA = "empresa"
}


export enum EstadoProposta {
    PENDENTE = "PENDENTE",
    ACEITE = "ACEITE",
    REJEITADA = "REJEITADA"
}

export enum TipoPrestador {
    PRESTADOR = "prestador",
    EMPRESA = "empresa"
}


export interface PedidoSevicoType {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean
}

export interface AlunosType {
    nome: string;   
    endereco: string;
    contacto: string;
}

export interface ServicoType {
    nome: string,
    precoHora: number,
    categoria: string,
    minimoDescontado: number,
    percentagemDeconto: number
}

// export interface ResponseType {
//     status: boolean,
//     message: string,
//     data: ServicoType | null,
// }

export interface PrestadorType {
    nome: string;
    precoHora: number;
    profissao: string;
    minimoParaDesconto: number;
    percentagemDesconto: number;
    taxaDesconto: number;
}

export interface UserType {
    id: string,
	nome:   string,
	numero_identificado: string,
	data_nascimento: string,
	email: string,
    telefone: string,
	pais: string,
	localidade: string,
    password: string;
    role: Role;
    enabled: boolean;
    created_at: string;
    updated_at: string
}


// export interface ServicoType {
//     id:string ,
//     nome:string ,
//     descricao:string,
//     categoria:string,
//     enabled:boolean,
//     created_at:string ,
//     updated_at:string
// }

export interface PrestadorType {
    id:string ,
    nif:number ,
    profissao:string,
    taxa_urgencia:number,
    minimo_desconto:number,
    percentagem_desconto:number,
    disponivel:number,
    enabled:boolean,
    created_at:string ,
    update_at:string
}

export interface ListaServicoType {
    id:string ,
    nome:string ,
    descricao:string,
    categoria:string,
    enabled:boolean,
    created_at:string ,
    update_at:string
}

export interface ServicoDBType {
    id:string,
    id_categoria:string,
    nome:string,
    descricao:string,
    enabled:boolean,
    created_at:string,
    updated_at:string
}

export interface PrestadorDBType {
    id:string,
    nif:number,
    profissao:string,
    taxa_urgencia:number,
    minimo_desconto:number,
    id_empresa:string,
    id_utilizador:string,
    percentagem_desconto:number,
    disponivel:number,
    enabled:boolean,
    created_at:string,
    update_at:string
}

export interface UserDBType {
    id:string,
    nome:string,
    numero_identificado:string,
    email:string,
    telefone:string,
    numero_utilizador:string,
    data_nascimento:string,
    localidade:string,
    password:string,
    enabled:boolean,
    created_at:string,
    update_at:string
}

export interface OrcamentoDBType {
    estado: any;
    horas_estimadas: any;
    preco_hora: any;
    id_prestacao_servico: any;
    id:string,
    total:number,
    id_utilizador:string,
    enabled:boolean,
    created_at:string,
    update_at:string
}

export interface PropostaDBType {
    id:string,
    id_prestacao_servico:string,
    id_Prestador:string,
    preco_hora:number,
    horas_estimadas:number,
    estado: EstadoProposta,
    owner?: String,
    enabled:boolean,
    created_at:string,
    updated_at:string
}

export interface PrestacaoServicoDBType {
    id:string,
    designacao:string,
    subtotal:string,
    horas_estimadas:number,
    id_prestador:string,
    id_orcamento:string,
    id_utilizador: string,
    id_servico:string,
    id_empresa:string,
    tipo_prestador: TipoPrestador,
    preco_hora:number,
    estado: EstadoPrestacaoServico,
    urgente:boolean,
    enabled:boolean,
    created_at:string,
    updated_at:string

}

export interface ResponseType <T> {
    status: "success" | "error",
    message: string,
    data: T | null
}

export interface PrestacaoServicoDetalhoadaType {
    id: string,
    nome_utilizador: string,
    email_utilizador: string,
    nome_servico: string;
    descricao: string ,
    data_pedido: string,
    urgente: boolean
}

export interface ServicoDetalhadaType {
    id: string,
    nome: string,
    descricao: string,
    designacao_categoria : string,
    icone_categoria : string,
    id_empresa: string,
    designacao_empresa: string
}
export interface CategoriaDBType {
    id: string,
    nome: string,
    designacao: string,
    icone: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface EmpresaDBtype {
    id: string,
    designacao: string,
    descricao: string,
    nif: string,
    icone: string,
    id_utilizador: string,
    localizacao: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface PrestacaoServicoPorCategoriaType{
    id: string,
    nome: string,
    data_pedido: string,
    id_servico: string,
    nome_servico: string,
    id_categria: string,
    designacao_categoria: string,
    icone_categoria: string
}
