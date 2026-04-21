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


    


    `