import type { Request, Response } from "express"
import { insertPrestador } from "../prestador.js"
import { PrestadorModel, } from "../models/prestador.models.js"
import type { PrestadorDBType } from "../utils/types.js"


export const prestadorController = {
    // Rota para criar prestador
    async create(req: Request, res: Response) {
        const prestador = req.body
        if (!prestador) {
            return res.status(400).json({
                status: "error",
                mensagem: "Dados obrigatórios em falta",
                data: null
            })
        }
        const response = await PrestadorModel.create(prestador)
        if (!response) {
            return res.status(500).json({
                status: "error",
                message: "Utilizador nao encontrado",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Utilizador encontrado com sucesso",
            data: response
        })
    },
    // Rota para buscar todos os prestadores
    async getAll(req: Request, res: Response) {
        const response = await PrestadorModel.getAll()
        if (!response) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar prestadores",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Prestadores encontrados com sucesso",
            data: response
        })
    },
    // Rota para buscar prestador por ID
    async getById(req: Request, res: Response) {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatório",
                data: null
            })
        }
        const response = await PrestadorModel.get(id as string)
        if (!response) {
            return res.status(404).json({
                status: "error",
                message: "Prestador não encontrado",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Prestador encontrado com sucesso",
            data: response,


        })


    },

    // Rota para buscar dados do prestadores
    async update(req: Request, res: Response) {
        const { id } = req.params

        const updatedPrestador: PrestadorDBType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        if (!updatedPrestador) {
            return res.status(400).json({
                status: "error",
                message: "Dados de prestador invalidos",
                data: null
            })
        }

        const updatePrestadorResponse = await PrestadorModel.update(id as string, updatedPrestador)

        if (!updatePrestadorResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar prestador",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Prestador atualizado com sucesso",
            data: updatePrestadorResponse
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

        const deletePrestadorResponse = await PrestadorModel.delete(id as string)

        if (!deletePrestadorResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar prestador",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Prestador apagado com sucesso",
            data: deletePrestadorResponse
        })
    }
}