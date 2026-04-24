import { PrestacaoServicoController } from "../../controllers/prestacaoservico.controller.js";
import { EmpresaModel } from "../../models/empresa.models.js";
import { PrestacaoServicoModel } from "../../models/prestacaoservico.models.js";
import { PrestadorModel } from "../../models/prestador.models.js";
import { UserModel } from "../../models/users.model.js";
import { getUserById } from "../../users.js";
import type { UserType } from "../../utils/types.js";


export const userResolvers = {
    Query:{
        getAllUsers: async () => {
            return await UserModel.getAll();
    
        },

        getUserById: async (_:any, args: {id:string}) => {
            return await UserModel.get(args.id);
        }
    
        },
    
Mutation: {
    createUser: async (_: any, args: { user: UserType }) => {
    return await UserModel.create(args.user);
    },
    updateUser: async (_: any, args: { id: string, user: UserType }) => {
    return await UserModel.update(args.id, args.user);
    },
    deleteUser: async (_: any, args: { id: string }) => {
    return await UserModel.delete(args.id);
    }
},
user: {
    empresa: async (parent: { id: string }) => {
        return await EmpresaModel.get(parent.id);
    },
    PrestacaoServico: async (parent: { id: string }) => {
        return await PrestacaoServicoModel.get(parent.id);
    },
    prestador: async (parent: { id: string }) => {
                return await PrestadorModel.get(parent.id);
    
            },
}
}
    