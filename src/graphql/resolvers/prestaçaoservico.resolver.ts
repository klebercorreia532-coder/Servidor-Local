import { PrestacaoServicoModel } from "../../models/prestacaoservico.models.js";
import type { PrestacaoServicoDBType } from "../../utils/types.js";



export const PrestacaoSevicoResolver = {
    Query: {
        getAllPrestacaoSevico: async () => {
            return await PrestacaoServicoModel.getAll();
        },

        getPrestacaoSevicoById: async (_: any, args: { id: string }) => {
            return await PrestacaoServicoModel .get(args.id);
        }
    },

    Mutation: {
        createPrestacaoSevico: async (_: any, args: { proposta: PrestacaoServicoDBType }) => {
            return await PrestacaoServicoModel .create(args.proposta);
        },

        updatePrestacaoSevico: async (_: any, args: { id: string, proposta: PrestacaoServicoDBType }) => {
            return await PrestacaoServicoModel .update(args.id, args.proposta);
        },

        deletePrestacaoSevico: async (_: any, args: { id: string }) => {
            return await PrestacaoServicoModel .delete(args.id);
        }
    }
};