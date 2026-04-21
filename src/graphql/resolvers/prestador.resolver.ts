import { PrestadorModel } from "../../models/prestador.models.js";
import type { PrestadorDBType,} from "../../utils/types.js";
import {getPrestadorById} from "../../users.js"




export const prestadorResolvers = {
    Query: {
        getAllPrestadores: async () => {
            return await prestadorModel.getAll();

        },
        getPrestadorById: async (_: any, args: { id: string }) => {
            return await getPrestadorById(args.id);
        }

    },

    Mutation: {
        createPrestador: async (_: any, args: { prestador: PrestadorDBType }) => {
            return await PrestadorModel.create(args.prestador);
        },
        updatePrestador: async (_: any, args: { id: string, prestador: PrestadorDBType }) => {
            return await PrestadorModel.update(args.id, args.prestador);
        },
        delitePrestador: async (_: any, args: { id: string }) => {
            return await PrestadorModel.delete(args.id);
        }
    }
}