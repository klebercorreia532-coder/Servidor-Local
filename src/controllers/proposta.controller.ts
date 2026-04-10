import type { Request, Response } from "express"
import { PropostaModel } from "../models/proposta.models.js"
import type { PropostaDBType, ResponseType } from "../utils/types.js"


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
            const propostaResponse : PropostaDBType[] | null = await PropostaModel.getAll()

            if (!propostaResponse) {
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
                data: propostaResponse
            }
            return res.status(200).json(response)
        },
       

    async get(req: Request, res: Response) {
        const { id } = req.params
     if (!id)
        const response : ResponseType<null> = {
            status: "error",
            message: "ID da proposta é obrigatório",
            data: null
        }
        message: "ID da proposta é obrigatório" })
            const propostaResponse = await PropostaModel.get(id as string)

            if (!propostaResponse) return res.status(400).json({ message: "Erro ao buscar proposta" })

            return res.status(200).json({ message: "Proposta encontrada com sucesso", propostaResponse })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: "Erro ao buscar proposta" })
        }
    },

    async update(req: Request, res: Response) {
        const { id } = req.params
        try {
            const propostaData = req.body as PropostaDBType
            const propostaResponse = await PropostaModel.update(id as string, propostaData)

            if (!propostaResponse) return res.status(400).json({ message: "Erro ao atualizar proposta" })

            return res.status(200).json({ message: "Proposta atualizada com sucesso", propostaResponse })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: "Erro ao atualizar proposta" })
        }
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params
        try {
            const propostaResponse = await PropostaModel.delete(id as string)

            if (!propostaResponse) return res.status(400).json({ message: "Erro ao deletar proposta" })

            return res.status(200).json({ message: "Proposta deletada com sucesso", propostaResponse })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: "Erro ao deletar proposta" })
        }
    }
}