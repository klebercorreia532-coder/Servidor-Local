import { get } from "node:http";
import { getAllServices, getServicesById} from "../../servico.js";
import { PrestadorModel } from "../../models/prestador.models.js";
import type { PrestadorDBType } from "../../utils/types.js";


export const servicoResolvel= {
    Query: {
        getAllServices: async () => {
            return await getAllServices();
        },
        getServicesById: async (_: any, args: { id: string }) => {
            return await getServicesById(args.id);
        
    }

},
Mutation:{
    createService: async (_: any, args: { service: PrestadorDBType }) => {
        return await PrestadorModel.create(args.service);
    },
    updateService: async (_: any, args: { id: string, service: PrestadorDBType }) => {
        return await PrestadorModel.update(args.id, args.service);
    },
    deleteService: async (_: any, args: { id: string }) => {
        return await PrestadorModel.delete(args.id);
    }
}
    }