import { OrcamentoModel } from "../../models/orcamento.models.js";
import { UserModel } from "../../models/users.model.js";
import type { OrcamentoDBType } from "../../utils/types.js";



export const orcamentoResolver = {
    Query: {
        getAllOrcamento: async () => {
            return await OrcamentoModel.getAll();
        },
        getOrcamentoById: async (_: any, args: { id: string }) => {
            return await OrcamentoModel.get(args.id);
        }
    },
    Mutation: {
        createOrcamento: async (_: any, args: { orcamento: OrcamentoDBType }) => {
            return await OrcamentoModel.create(args.orcamento);
        },
        updateOrcamento: async (_: any, args: { id: string, orcamento: OrcamentoDBType }) => {
            return await OrcamentoModel.update(args.id, args.orcamento);
        },
        deleteOrcamento: async (_: any, args: { id: string }) => {
            return await OrcamentoModel.delete(args.id);
        }
    },
    Orcamento: {
        prestacaoServico: async (parent: { id: string }) => {
            return await OrcamentoModel.get(parent.id);
        },

        user: async (parent: { id: string }) => {
            return await UserModel.get(parent.id);
        }


    }
}