import type { Request, Response } from "express"
import { PropostaModel } from "../models/proposta.models.js"
import type { PropostaDBType, ResponseType } from "../utils/types.js"
import { stat } from "node:fs"


export const PropostaController = {
    async create(req: Request, res: Response) {
        try {
            const propostaData = req.body as PropostaDBType
            const propostaResponse: PropostaDBType | null = await PropostaModel.create(propostaData)

            if (!propostaResponse) return res.status(400).json({ message: "Erro ao criar proposta" })

            return res.status(201).json({ message: "Proposta criada com sucesso", propostaResponse })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: "Erro ao criar proposta" })
        }
    },

    async getAll(req: Request, res: Response) {
            const getAllPropostaResponse : PropostaDBType[] | null = await PropostaModel.getAll()

            if (!getAllPropostaResponse) {
                const response : ResponseType<null> = {
                    status: "error",
                    message: "Erro ao buscar propostas",
                    data: null
                }
                return res.status(400).json(response)
            }

            const response : ResponseType<PropostaDBType[]> = {
                status: "success",
                message: "Propostas encontradas com sucesso",
                data: getAllPropostaResponse
            }
            return res.status(200).json(response)
    },
    async get(req: Request, res: Response) {
        const { id } = req.params
    if (!id){
        const response : ResponseType<null> = {
            status: "error",
            message: "ID da proposta é obrigatório",
            data: null
        }
        return res.status(400).json(response)
        }
            const getPropostaResponse: PropostaDBType | null= await PropostaModel.get(id as string)

            if (!getPropostaResponse) {
                const response : ResponseType<null> = {
                    status: "error",
                    message: "Erro ao buscar proposta",
                    data: null
                }
                return res.status(400).json(response)
            }

            return res.status(200).json({
                status: "success",
                message: "Proposta encontrada com sucesso",
                data: getPropostaResponse
            })
    },

    async update(req: Request, res: Response) {
    const { id } = req.params
            const propostaData = req.body as PropostaDBType
            if (!id) {
                const response : ResponseType<null> = {
                    status: "error",
                    message: "ID da proposta é obrigatório",
                    data: null
                }
                return res.status(400).json(response)
            }
        const updatePropostaResponse= await PropostaModel.update(id as string, propostaData)

            if (!updatePropostaResponse) {
                const response : ResponseType<null> = {
                    status: "error",
                    message: "Erro ao atualizar proposta",
                    data: null
                }
                return res.status(400).json(response)
                const propostaResponse: PropostaDBType | null = await PropostaModel.update(id as string, propostaData)
            }
        },
    async delete(req: Request, res: Response) {
        const { id } = req.params
    if (!id) {
            const response : ResponseType<null> = {
                status: "error",
                message: "ID da proposta é obrigatório",
                data: null
            }
            return res.status(400).json(response)
        }
            const propostaResponse: PropostaDBType | null = await PropostaModel.delete(id as string)

            if (!propostaResponse) {
                const response : ResponseType<null> = {
                    status: "error",
                    message: "Erro ao deletar proposta",
                    data: null
                }
                return res.status(400).json(response)
            }

    }
}
