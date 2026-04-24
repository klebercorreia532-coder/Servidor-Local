import { gql } from "graphql-tag";



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
    data_identificacao: String!,
    email: String!,
    teligane: String!,
    pais: String!,
    localizacao: String!,
    password: String!,
    role: Role!,
    enabled: Boolean!,
    created_at: String!,
    updated_at: String!
    }

type Proposta{
        id: ID!,
        id_prestacao_servico: PrestacaoServico,
        id_Prestador: Prestador!,
        preco_hora: Float!,
        horas_estimadas: Int!,
        estado: EstadoProposta,
        owner: String,
        enabled: Boolean,
        created_at: String,
        updated_at: String
    }

    type Orcamento{
        id: ID!,
        estado: EstadoOrcamento,
        horas_estimadas: Int!,
        preco_hora: Float!,
        id_prestacao_servico: PrestacaoServico,
        total: Float!,
        id_utilizador: Utilizador,
        enabled: Boolean,
        created_at: String,
        updated_at: String
    }

type PrestacaoServico{
    id: ID!,
    designacao: String!,
    subtorial: Float,
    horas_estimadas: Int!,
    id_prestadores: Prestador,
    id_orcamento: Orcamento,
    id_utilizador: Utilizador!,
    id_servico: Servico,
    id_empresa: Empresa,
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
    id_utilizador: Utilizador,
    localizacao: String!,
    enabled: Boolean,
    created_at: String,
    updated_at: String

}
    type Servico{
    prescentagem_desconto: Float!,
    minimo_desconto: Float,
    taxa_urgencia: Float,
    profissao: String,
    nif: String,
    disponivel: Boolean, 
    id: ID!,
    id_categoria: Categoria,
    nome: String!,
    descricao: String!,
    categoria: String!,
    enabled: Boolean,
    created_at: String,
    updated_at: String
}
    type Prestador {
    id: ID!,
    nif: String!,
    profissao: String!,
    taxa_urgencia: Float!,
    minimo_desconto: Float!,
    id_empresa: Empresa,
    id_utilizador: Utilizador,
    percentagem_desconto: Float!,
    disponivel: Boolean,
    enabled: Boolean,
    created_at: String,
    updated_at: String
}
    type Categoria {
    id: ID!,
    designacao: String!,
    icone: String!,
    created_at: String,
    updated_at: String
}

type Query {
    getAllUsers: [Utilizador]
    getUserById(id: ID!): Utilizador

    getAllServices: [Servico]
    getServicesById(id: ID!): Servico

    getAllPrestadores: [Prestador]
    getPrestadorById(id: ID!): Prestador

    getAllEmpresa: [Empresa]
    getEmpresaById(id: ID!): Empresa

    getAllPropostas: [Proposta]
    getPropostaById(id: ID!): Proposta

    getAllPrestacaoServico: [PrestacaoServico]
    getPrestacaoServicoById(id: ID!): PrestacaoServico

    getAllOrcamento: [Orcamento]
    getOrcamentoById(id: ID!): Orcamento

    getAllCategoria: [Categoria]
    getCategoriaById(id: ID!): Categoria
}

type Mutation {
    createUser(user: UtilizadorInput!): Utilizador
    updateUser(id: ID!, user: UtilizadorInput!): Utilizador
    deleteUser(id: ID!): Utilizador
    

    createService(service: ServicoInput!): Servico
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

    createOrcamento(orcamento: OrcamentoInput!): Orcamento
    updateOrcamento(id: ID!, orcamento: OrcamentoInput!): Orcamento
    deleteOrcamento(id: ID!): Orcamento


    createCategoria(categoria: CategoriaInput!): Categoria
    updateCategoria(id: ID!, categoria: CategoriaInput!): Categoria
    deleteCategoria(id: ID!): Categoria

}

input UtilizadorInput {
  nome: String!
  data_identificacao: String!
  email: String!
  teligane: String!
  pais: String!
  localizacao: String!
  password: String!
  role: Role!
  enabled: String
}

input ServicoInput {
  nome: String!
  descricao: String!
  categoria: String!
  id_categoria: ID
  prescentagem_desconto: Float
  minimo_desconto: Float
  taxa_urgencia: Float
  profissao: String
  nif: String
  disponivel: Boolean
}

input PrestadorInput {
  nif: String!
  profissao: String!
  taxa_urgencia: Float!
  minimo_desconto: Float!
  id_empresa: ID
  id_utilizador: ID
  percentagem_desconto: Float!
  disponivel: Boolean
}

input EmpresaInput {
  designacao: String!
  descricao: String!
  nif: String!
  icone: String!
  id_utilizador: ID
  localizacao: String!
}

input PropostaInput {
  id_prestacao_servico: ID
  idPrestador: ID!
  preco_hora: Float!
  horas_estimadas: Int!
  estado: EstadoProposta
}

input PrestacaoServicoInput {
  designacao: String!
  subtotal: Float
  horas_estimadas: Int!
  id_prestadores: ID
  id_orcamento: ID
  id_utilizador: ID!
  id_servico: ID
  id_empresa: ID
  tipo_prestador: TipoPrestador
  preco_hora: Float!
  urgente: Boolean
}

input OrcamentoInput {
  estado: EstadoOrcamento
  horas_estimadas: Int!
  preco_hora: Float!
  id_prestacao_servico: ID
  total: Float!
  id_utilizador: ID
}

input CategoriaInput {
  designacao: String!
  icone: String
}

`;