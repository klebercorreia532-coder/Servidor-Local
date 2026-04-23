import { prestadorResolvers } from "./resolvers/prestador.resolver.js"
import { propostaResolver } from "./resolvers/proposta.resolver.js"
import { servicoResolvel } from "./resolvers/servico.resolver.js"


import { userResolvers } from "./resolvers/user.resolver.js"
import { typeDefs } from "./typedefs/typedefs.js"






export const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...prestadorResolvers.Query,
        ...propostaResolver.Query,
        ...servicoResolvel.Query,
    
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...prestadorResolvers.Mutation,
        ...propostaResolver.Mutation,
        ...servicoResolvel.Mutation,
    }

    
}

export { typeDefs }