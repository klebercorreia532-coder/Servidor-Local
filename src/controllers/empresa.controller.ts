import type { EmpresaType, ResponseType } from "../utils/types.js"


import type { Request, Response } from "express"
import { EmpresaModel } from "../models/empresa.models.js"



export const EmpresaController = {
    async create(req: Request, res: Response) {
        const empresa: EmpresaType = req.body
        if (!empresa) { 
            return res.status(400).json({
                status: "error",
                message: "Dados de empresa invalidos",
                data: null
            })
        }
        const createEmpresaResponse: EmpresaType | null = await EmpresaModel.create(empresa)  
        if (!createEmpresaResponse) {
        const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar empresa",
                data: null
            }
            return res.status(500).json(response)
        }
    return res.status(201).json({
        status: "success",
        message: "Empresa criada com sucesso",
        data: createEmpresaResponse
    })
    },
    async getAll(req: Request, res: Response) {
        const getAllEmpresasResponse : EmpresaType[] | null = await EmpresaModel.getAll()   
        if (!getAllEmpresasResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar empresas",
                data: null
            }
            return res.status(500).json(response)
        }
        return res.status(200).json({
            status: "success",
            message: "Empresas encontradas com sucesso",
            data: getAllEmpresasResponse
        })
    },
    async get(req: Request, res: Response) {
        const { id } = req.params   
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }
        const getEmpresaByIdResponse : EmpresaType | null = await EmpresaModel.get(id as string)        
        if (!getEmpresaByIdResponse) {
            return res.status(404).json({
                status: "error",
                message: "Empresa nao encontrada",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Empresa encontrada com sucesso",
            data: getEmpresaByIdResponse
        })
    },
    async update(req: Request, res: Response) {
        const { id } = req.params
        const updatedEmpresa: EmpresaType = req.body
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }
        if (!updatedEmpresa) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de empresa invalidos",
                data: null
            }
            return res.status(400).json(response)
        }
        const updateEmpresaResponse: EmpresaType | null = await EmpresaModel.update(id as string, updatedEmpresa)
        if (!updateEmpresaResponse) {
            const response: ResponseType<null> = {  
                status: "error",
                message: "Erro ao atualizar empresa",
                data: null
            }
            return res.status(500).json(response)
        }
        return res.status(200).json({
            status: "success",
            message: "Empresa atualizada com sucesso",
            data: updateEmpresaResponse
        })
    },
    async delete(req: Request, res: Response) {
        const { id } = req.params   
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }
        const deleteEmpresaResponse : EmpresaType | null = await EmpresaModel.delete(id as string)  
        if (!deleteEmpresaResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao apagar empresa",
                data: null
            }
            return res.status(400).json(response)
        }
        return res.status(200).json({
            status: "success",
            message: "Empresa apagada com sucesso",
            data: deleteEmpresaResponse
        })
    }
    

}