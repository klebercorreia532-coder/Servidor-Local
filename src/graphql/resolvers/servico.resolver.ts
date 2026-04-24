import { CategoriaModel } from "../../models/categoria.models.js";
import { PrestacaoServicoModel } from "../../models/prestacaoservico.models.js";
import { ServiceModel } from "../../models/servico.models.js";
import type { ServicoDBType } from "../../utils/types.js";

export const servicoResolvel = {
    Query: {
        getAllServices: async () => {
            return await ServiceModel.getAll();
        },

        getServicesById: async (_: any, args: { id: string }) => {
            return await ServiceModel.get(args.id);
        }
    },

    Mutation: {
        createService: async (_: any, args: { nome: string, descricao: string, id_categoria: string, enabled: boolean}) => {
            const service: ServicoDBType = {
                id: "",
                nome: args.nome,
                descricao: args.descricao,
                id_categoria: args.id_categoria,
                enabled: args.enabled,
                created_at: "",
                updated_at: ""
            } 
            return await ServiceModel.create(service);
        },

        updateService: async (_: any, args: any) => {
            return await ServiceModel.update(args.id, args.service);
        },

        deleteService: async (_: any, args: any) => {
            return await ServiceModel.delete(args.id);
        },
    },
    Servico: {
        categoria: async (parent: any) => {
            return await CategoriaModel.get(parent.id_categoria);
        },

        PrestacaoServico: async (parent: any) => {
            return await PrestacaoServicoModel.get(parent.id);
        }
    }
};