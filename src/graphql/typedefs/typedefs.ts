import { gql } from "graphql-tag"



export const typeDefs = gql`

enum Role{
CLIENTE,
ADMIN,
PRESTADOR,
EMPRESA
}

enum EstadoProposta{
PENDENTE,
ACEITE,
REJEITADA
}

enum TipoPrestador{
PRESTADOR,
EMPRESA
}

enum EstadoPrestacaoServico{
PENDENTE,
EM_ANDAMENTO,
CONCLUIDA,
CANCELADA
}

enum EstadoOrcamento{
PENDENTE,
ACEITE,
REJEITADA
}
type Utilizador {
    id: ID!,
    nome: String!,
    data_identificaçao: String!,
    email: String!,
    teligane: String!,
    pais: String!,
    localizaçao: String!,
    password: String!,
    role: Role!,
    enabled: String!,
    created_at: String!,
    updated_at: String!
    }

type Proposta{
        id: ID!,
        id_prestacao_servico: PrestacaoServico,
        idPrestador: ID!,
        preco_hora: Float!,
        horas_estimadas: Int!,
        estado: EstadoProposta,
        owner: String,
        enabled: Boolean,
        created_at: String,
            update_at: String
    }

    type orcamento{
        id: ID!,
        estado: EstadoOrcamento,
        horas_estimadas: Int!,
        preco_hora: Float!,
        id_prestacao_servico: ID!,
        total: Float!,
        id_utilizador2: ID!,
        enabled: Boolean,
        created_at: String,
        update_at: String
    }

type PrestacaoServico{
    id: ID!,
    designacao: String!,
    subtorial: Float,
    horas_estimadas: Int!,
    id_prestadores: Prestador,
    id_orcamento: orcamento,
    id_utilizador: utilizador!,
    id_servico: Servico,
    id_empresa: empresa,
    tipo_prestador: TipoPrestador,
    preco_hora: Float!,
    urgente: Boolean,
    enabled: Boolean,
    created_at: String,
    updated_at: String
}   
    type Empresa{
    id: ID!,
    designacao: String!,
    descricao: String!,
    nif: String!,
    icone: String!,
    id_utilizador: ID!,
    localizacao: String!,
    enabled: Boolean,
    created_at: String,
    updated_at: String

}
    type Servico{
    prescentagem_desconto: Float,
    minimo_desconto: Float,
    taxa_urgencia: Float,
    profissao: String,
    nif: String,
    disponivel: Boolean, 
    id: ID!,
    nome: String!,
    descricao: String!,
    categoria: String!,
    enabled: Boolean,
    created_at: String,
    update_at: String
}
    type Prestador{
    id: ID!,
    nif: String!,
    profissao: String!,
    taxa_urgencia: Float!,
    minimo_desconto: Float!,
    percentagem_desconto: Float!,
    disponivel: Boolean,
    enabled: Boolean,
    created_at: String,
    update_at: String
}
    type Categoria{
    id: ID!,
    designacao: String!,
    icone: 
    created_at: String,
    updated_at: String
}

type Query{
    getAllUsers: [Utilizador]
    getUserById(id: ID!): Utilizador
    getAllServices: [Servico]
    getServicesById(id: ID!): Servico
    getAllPrestador: [Prestador]
    getPrestadorById(id: ID!): Prestador
    getAllEmpresa: [Empresa]
    getEmpresaById(id: ID!): Empresa
    getAllProposta: [Proposta]
    getPropostaById(id: ID!): Proposta
    getAllPrestacaoServico: [PrestacaoServico]
    getPrestacaoServicoById(id: ID!): PrestacaoServico
    getAllOrcamento: [orcamento]
    getOrcamentoById(id: ID!): orcamento
    getAllCategoria: [Categoria]
    getCategoriaById(id: ID!): Categoria
}
    type Mutation{
        createUser(user: UtilizadorInput!): Utilizador
        updateUser(id: ID!, user: UtilizadorInput!): Utilizador
        deleteUser(id: ID!): Utilizador
        createService(servico: ServicoInput!): Servico
        updateService(id: ID!, service: ServicoInput!): Servico
        deleteService(id: ID!): Servico
        createPrestador(prestador: PrestadorInput!): Prestador
        updatePrestador(id: ID!, prestador: PrestadorInput!): Prestador
        deletePrestador(id: ID!): Prestador
        createEmpresa(empresa: EmpresaInput!): Empresa
        updateEmpresa(id: ID!, empresa: EmpresaInput!): Empresa
        deleteEmpresa(id: ID!): Empresa
        createProposta(proposta: PropostaInput!): Proposta
        updateProposta(id: ID!, proposta: PropostaInput!): Proposta
        deleteProposta(id: ID!): Proposta
        createPrestacaoServico(prestacaoServico: PrestacaoServicoInput!): PrestacaoServico
        updatePrestacaoServico(id: ID!, prestacaoServico: PrestacaoServicoInput!): PrestacaoServico
        deletePrestacaoServico(id: ID!): PrestacaoServico
        createOrcamento(orcamento: orcamentoInput!): orcamento
        updateOrcamento(id: ID!, orcamento: orcamentoInput!): orcamento
        deleteOrcamento(id: ID!): orcamento
        createCategoria(categoria: CategoriaInput!): Categoria
        updateCategoria(id: ID!, categoria: CategoriaInput!): Categoria
        deleteCategoria(id: ID!): Categoria
    }

`