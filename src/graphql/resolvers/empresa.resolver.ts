import { EmpresaModel } from "../../models/empresa.models.js";
import type { EmpresaDBtype } from "../../utils/types.js";



export const empresoResolver = {
    Query: {
        getAllEmpresas: async () => {
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
    }
};