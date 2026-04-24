import { categoriaResolvers } from "./resolvers/categoria.resolver.js"
import { empresaResolver } from "./resolvers/empresa.resolver.js"
import { orcamentoResolver } from "./resolvers/orcamento.resolver.js"
import { prestadorResolvers } from "./resolvers/prestador.resolver.js"
import { PrestacaoSevicoResolver } from "./resolvers/prestaçaoservico.resolver.js"
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
        ...orcamentoResolver.Query,
        ...PrestacaoSevicoResolver.Query,
        ...categoriaResolvers.Query,
        ...empresaResolver.Query,
    
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...prestadorResolvers.Mutation,
        ...propostaResolver.Mutation,
        ...servicoResolvel.Mutation,
        ...orcamentoResolver.Mutation,
        ...PrestacaoSevicoResolver.Mutation,
        ...categoriaResolvers.Mutation,
        ...empresaResolver.Mutation,
    
    }

    
}

export { typeDefs }