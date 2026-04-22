import { create } from "node:domain";
import { ServiceModel as serviceModel } from "../models/servico.models.js";
import type { ResponseType, ServicoDBType, ServicoDetalhadaType } from "../utils/types.js";
import type { Request, Response } from "express";




export const servicoController = {
    async create(req: Request, res: Response) {
        const newService: ServicoDBType = req.body

        if (!newService) {
            return res.status(400).json({
                status: "error",
                message: "Dados de servico invalidos",
                data: null
            })
        }

        const createServiceResponse: ServicoDBType | null = await serviceModel.create(newService)

        if (createServiceResponse) {
            const response: ResponseType<ServicoDBType> = {
                status: "success",
                message: "Servico criado com sucesso",
                data: createServiceResponse
            }
            return res.status(201).json(response)
        }

        const response: ResponseType<null> = {
            status: "error",
            message: "Erro ao criar servico",
            data: null
        }

        res.status(200).json({
            status: "success",
            message: "Servico criado com sucesso",
            data: createServiceResponse
        })
    },

    async getAll(req: Request, res: Response) {
        const getAllServiceResponse: ServicoDBType | null = await serviceModel.getAll()

        if (!getAllServiceResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao selecionar servicos",
                data: null
            }
            return res.status(404).json(response)
        }

        res.status(200).json({
            status: "success",
            message: "Servicos encontrados",
            data: getAllServiceResponse
        })
    },
    async get(req: Request, res: Response) {
        const id = req.params.id

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID do servico nõa fornecido",
                data: null
            }
            return res.status(400).json(response)
        }

        const getServiceResponse: ServicoDBType | null = await serviceModel.get(id as string)

        if (!getServiceResponse) {

            const response: ResponseType<null> = {
                status: "error",
                message: "Servico não encontrado",
                data: null
            }
            return res.status(404).json(response)
        }

        res.status(200).json({
            status: "success",
            message: "Servico encontrado com sucesso",
            data: getServiceResponse
        })
    },

    async update(req: Request, res: Response) {

        const { id } = req.params
        const updatedService: ServicoDBType = req.body

        if (!id) {
            return res.status(404).json({
                status: "error",
                message: "dados de servico invalidos",
                data: null
            })
        }

        if (!updatedService) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        const updateServiceResponse: ServicoDBType | null= await serviceModel.update(id as string, updatedService)

        if (!updateServiceResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar servico",
                data: null
            })
        }

        res.status(200).json({
            status: "success",
            message: "Erro ao encontrar servico",
            data: updateServiceResponse
        })
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(404).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        const deleteServiceResponse: ServicoDBType | null= await serviceModel.delete(id as string)

        if (!deleteServiceResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao apagar servico",
                data: null
            }
        }

        res.status(200).json({
            status: "success",
            message: "Servico apagado com sucesso",
            data: deleteServiceResponse
        })
    },
    async getAllServiceDetalhada(req: Request, res: Response) {
        const { limit, offset } = req.query

        let LIMIT = 10
        let OFFSET = 0

        if (limit) {
            LIMIT = parseInt(limit as string)
        }

        if (offset) {
            OFFSET = parseInt(offset as string)
        }


        const getAllServiceDetalhadaResponse = await serviceModel.getAllServiceDetalhada(
            LIMIT,
            OFFSET
        )

        if (!getAllServiceDetalhadaResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao selecionar servicos detalhados",
                data: null
            }
            return res.status(404).json(response)
        }

        res.status(200).json({
            status: "success",
            message: "Servicos detalhados encontrados",
            data: getAllServiceDetalhadaResponse
        })
    }

}