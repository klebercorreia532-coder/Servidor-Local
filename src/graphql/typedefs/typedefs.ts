import { gql } from "graphql-tag"



export const typeDefs = gql`

enum Role{
CLIENTE="cliente",
ADMIN:"admin"
EMPRESA="empresa"
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
        id_prestacao_servico: ID!,
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
    subtorial: String!,
    horas_estimadas: Int!,
    id_prestadores: ID!,
    id_orcamento: ID!,
    id_utilizador: ID!,
    id_servico: ID!,
    id_empresa: ID!,
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
`