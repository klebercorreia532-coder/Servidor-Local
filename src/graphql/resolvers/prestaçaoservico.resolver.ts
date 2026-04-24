import { EmpresaModel } from "../../models/empresa.models.js";
import { OrcamentoModel } from "../../models/orcamento.models.js";
import { PrestacaoServicoModel } from "../../models/prestacaoservico.models.js";
import { PrestadorModel } from "../../models/prestador.models.js";
import { ServiceModel } from "../../models/servico.models.js";
import { UserModel } from "../../models/users.model.js";
import type { PrestacaoServicoDBType } from "../../utils/types.js";



export const PrestacaoSevicoResolver = {
    Query: {
        getAllPrestacaoServico: async () => {
            return await PrestacaoServicoModel.getAll();
        },

        getPrestacaoServicoById: async (_: any, args: { id: string }) => {
            return await PrestacaoServicoModel.get(args.id);
        },
    },

    Mutation: {
        createPrestacaoServico: async (_: any, args: { proposta: PrestacaoServicoDBType }) => {
            return await PrestacaoServicoModel.create(args.proposta);
        },

        updatePrestacaoServico: async (_: any, args: { id: string, proposta: PrestacaoServicoDBType }) => {
            return await PrestacaoServicoModel.update(args.id, args.proposta);
        },

        deletePrestacaoServico: async (_: any, args: { id: string }) => {
            return await PrestacaoServicoModel.delete(args.id);
        },
    },
    PrestacaoServico: {
        prestador: async (parent: { id: string }) => {
            return await PrestadorModel.get(parent.id);

        },
        orcomento: async (parent: { id: string }) => {
            return await OrcamentoModel.get(parent.id);

        },
        user: async (parent: { id: string }) => {
            return await UserModel.get(parent.id);

        },
        Servico: async (parent: { id: string }) => {
            return await ServiceModel.get(parent.id);

        },
        empresa: async (parent: { id: string }) => {
            return await EmpresaModel.get(parent.id);

        },
    },

}