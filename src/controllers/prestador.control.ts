import type { Request, Response } from "express"
import { insertPrestador } from "../prestador.js"
import { pretadorModel } from "../models/prestador.models.js"


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
        const response = await pretadorModel.insertPrestador(prestador)
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
        const response = await pretadorModel.getAllPrestadores()
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
            const response = await pretadorModel.getPrestadorById(id as string)






}