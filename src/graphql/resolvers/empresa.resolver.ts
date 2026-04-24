import { EmpresaModel } from "../../models/empresa.models.js";
import { PrestacaoServicoModel } from "../../models/prestacaoservico.models.js";
import { UserModel } from "../../models/users.model.js";
import type { EmpresaDBtype } from "../../utils/types.js";



export const empresaResolver = {
    Query: {
        getAllEmpresa: async () => {
            return await EmpresaModel.getAll();
        },
        getEmpresaById: async (_: any, args: { id: string }) => {
            return await EmpresaModel.get(args.id);
        }
    },
    Mutation: {
        createEmpresa: async (_: any, args: { empresa: EmpresaDBtype }) => {
            return await EmpresaModel.create(args.empresa);
        },
        updateEmpresa: async (_: any, args: { id: string, empresa: EmpresaDBtype }) => {
            return await EmpresaModel.update(args.id, args.empresa);
        },
        deleteEmpresa: async (_: any, args: { id: string }) => {
            return await EmpresaModel.delete(args.id);
        }
    },
    Empresa: {
        user: async (parent: { id: string }) => {
            return await UserModel.get(parent.id);
        },
        PrestacaoServico: async (parent: { id: string }) => {
                return await PrestacaoServicoModel.get(parent.id);
            }
}
}