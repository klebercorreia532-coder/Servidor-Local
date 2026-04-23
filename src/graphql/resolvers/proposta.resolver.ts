
import { PrestacaoServicoModel } from "../../models/prestacaoservico.models.js";
import { PropostaModel } from "../../models/proposta.models.js";
import type { PropostaDBType } from "../../utils/types.js";
import { PrestacaoSevicoResolver } from "./prestaçaoservico.resolver.js";

export const propostaResolver = {
    Query: {
        getAllPropostas: async () => {
            return await PropostaModel.getAll();
        },

        getPropostaById: async (_: any, args: { id: string }) => {
            return await PropostaModel.get(args.id);
        }
    },

    Mutation: {
        createProposta: async (_: any, args: { proposta: PropostaDBType }) => {
            return await PropostaModel.create(args.proposta);
        },

        updateProposta: async (_: any, args: { id: string, proposta: PropostaDBType }) => {
            return await PropostaModel.update(args.id, args.proposta);
        },

        deleteProposta: async (_: any, args: { id: string }) => {
            return await PropostaModel.delete(args.id);
        }
    },
    Proposta: {
        prestador: async (parent: { id: string }) => {
            return await PropostaModel.get(parent.id);
        },
        PrestacaoSevico: async (parent: { id: string }) => {
            return await PrestacaoServicoModel.get(parent.id);
        }
    }



};