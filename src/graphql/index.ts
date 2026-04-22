import { userResolvers } from "./resolvers/user.resolver.js"
import { typeDefs } from "./typedefs/typedefs.js"






export const resolvers = {
    Query: {
        ...userResolvers.Query,
    },
    Mutation:{
        ...userResolvers.Mutation
    }

    
}

export { typeDefs }