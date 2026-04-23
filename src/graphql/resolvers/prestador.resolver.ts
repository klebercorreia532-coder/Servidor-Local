
// import { getPrestadorById } from "../../models/prestador.models.js";

import { PrestacaoServicoModel } from "../../models/prestacaoservico.models.js";
import { PrestadorModel } from "../../models/prestador.models.js";
import type { PrestadorDBType, } from "../../utils/types.js";





export const prestadorResolvers = {
    Query: {
        getAllPrestadores: async () => {
            return await PrestadorModel.getAll();

        },
        getPrestadorById: async (_: any, args: { id: string }) => {
            return await PrestadorModel.get(args.id);
        }

    },

    Mutation: {
        createPrestador: async (_: any, args: { prestador: PrestadorDBType }) => {
            return await PrestadorModel.create(args.prestador);
        },
        updatePrestador: async (_: any, args: { id: string, prestador: PrestadorDBType }) => {
            return await PrestadorModel.update(args.id, args.prestador);
        },
        deletePrestador: async (_: any, args: { id: string }) => {
            return await PrestadorModel.delete(args.id);
        }
    },
    Prestador: {
        user: async (parent: { id: string }) => {
            return await PrestadorModel.get(parent.id);
        },

        empresa: async (parent: { id: string }) => {
            return await PrestadorModel.get(parent.id);
        },
        PrestacaoServico: async (parent: { id: string }) => {
            return await PrestacaoServicoModel.get(parent.id);
        }

    }
}