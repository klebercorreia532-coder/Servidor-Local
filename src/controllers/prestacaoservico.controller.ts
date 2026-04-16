import type { Request, Response } from "express"
import type { PrestacaoServicoDBType, PrestacaoServicoDetalhadaType, ResponseType } from "../utils/types.js"
import { PrestacaoServicoModel } from "../models/prestacaoservico.models.js"

export const PrestacaoServicoController = {
    async create(req: Request, res: Response) {
        const prestacaoServico: PrestacaoServicoDBType = req.body

        if (!prestacaoServico) {
            return res.status(400).json({
                status: "error",
                message: "Dados de prestacao de servico invalidos",
                data: null
            })
        }

        const createPrestacaoServicoResponse: PrestacaoServicoDBType | null = await PrestacaoServicoModel.create(prestacaoServico)

        if (!createPrestacaoServicoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar prestacao de servico",
                data: null
            }
            return res.status(500).json(response)
        }

        return res.status(201).json({
            status: "success",
            message: "Prestacao de servico criada com sucesso",
            data: createPrestacaoServicoResponse
        })
    },

    async getAll(req: Request, res: Response) {

        const getAllPrestacaoServicosResponse : PrestacaoServicoDBType[] | null = await PrestacaoServicoModel.getAll()

        if (!getAllPrestacaoServicosResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar prestacoes de servico",
                data: null
            }
            return res.status(500).json(response)
        }

        return res.status(200).json({
            status: "success",
            message: "Prestacoes de servico buscadas com sucesso",
            data: getAllPrestacaoServicosResponse
        })
    },

    async get(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null
            }
            return res.status(400).json(response)
        }

        const getPrestacaoServicoByIdResponse : PrestacaoServicoDBType | null = await PrestacaoServicoModel.get(id as string)

        if (!getPrestacaoServicoByIdResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Prestacao de servico nao encontrada",
                data: null
            }
            return res.status(404).json(response)
        }

        return res.status(200).json({
            status: "success",
            message: "Prestacao de servico encontrada com sucesso",
            data: getPrestacaoServicoByIdResponse
        })
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const updatedPrestacaoServico: PrestacaoServicoDBType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        if (!updatedPrestacaoServico) {
            return res.status(400).json({
                status: "error",
                message: "Dados de prestacao de servico invalidos",
                data: null
            })
        }

        const updatePrestacaoServicoResponse: PrestacaoServicoDBType | null= await PrestacaoServicoModel.update(id as string, updatedPrestacaoServico)

        if (!updatePrestacaoServicoResponse) {
            const response: ResponseType<null> = {  
                status: "error",
                message: "Erro ao atualizar prestacao de servico",
                data: null
            }
            return res.status(500).json(response)
        }

        return res.status(200).json({
            status: "success",
            message: "Prestacao de servico atualizada com sucesso",
            data: updatePrestacaoServicoResponse
        })
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null
            }
            return res.status(400).json(response)
        }

        const deletePrestacaoServicoResponse : PrestacaoServicoDBType | null = await PrestacaoServicoModel.delete(id as string)

        if (!deletePrestacaoServicoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao apagar prestacao de servico",
                data: null
            }
            return res.status(400).json(response)
        }

        return res.status(200).json({
            status: "success",
            message: "Prestacao de servico apagada com sucesso",
            data: deletePrestacaoServicoResponse
        })
    },
    async getAllPrestacaoServicoDetalhada(req: Request, res: Response) {
        const { limit, offset } = req.query as {limit: string , offset: string}

        let LIMIT=10
        let  OFFSET=0

        if (limit && parseInt(limit)> 0) LIMIT = parseInt(limit)
        if (offset && parseInt(offset) > 0) OFFSET = parseInt(offset)

        const getAllPrestacaoServicosDetalhadaResponse: PrestacaoServicoDetalhadaType[] | null= await PrestacaoServicoModel.getAllPrestacaoServicoDetalhada(LIMIT, OFFSET)

        if (!getAllPrestacaoServicosDetalhadaResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar prestacoes de servico detalhadas",
                data: null
            }
            return res.status(500).json(response)

        }

        return res.status(200).json({
            status: "success",
            message: "Prestacoes de servico detalhadas buscadas com sucesso",
            data: getAllPrestacaoServicosDetalhadaResponse
        })
    },
    async getAllPrestacaoServicoByCategoria(req: Request, res: Response) {
const { categoria } = req.params
        const {limit, offset } = req.query as {
            limit?: string
            offset?: string
        }

        let LIMIT = 10
        let OFFSET = 0

        if (limit && parseInt(limit) > 0) LIMIT = parseInt(limit)
        if (offset && parseInt(offset) > 0) OFFSET = parseInt(offset)

        if (!categoria) {
            return res.status(400).json({
                status: "error",
                message: "Categoria obrigatoria",
                data: null
            })
        }

        const getAllPrestacaoServicoByCategoriaResponse: PrestacaoServicoDetalhadaType[] | null = await PrestacaoServicoModel.getByCategoria(categoria as string, LIMIT, OFFSET)

        if (!getAllPrestacaoServicoByCategoriaResponse) {
            const response: ResponseType<null> = { 
                status: "error",
                message: "Erro ao buscar prestacoes de servico por categoria",
                data: null
            }
            return res.status(500).json(response)
        }

        return res.status(200).json({
            status: "success",
            message: "Prestacoes encontradas",
            data: getAllPrestacaoServicoByCategoriaResponse
        })


}
}