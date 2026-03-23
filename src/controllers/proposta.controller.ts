import type { Request, Response } from "express";
import {propostaModel } from "../models/proposta.models.js";
import type { PropostaType } from "../utils/types.js";

export const propostaController = {
    async create(req: Request, res: Response) {
        const newProposta: PropostaType = req.body


        if (!newProposta)
            return res.status(400).json({
                status: "error",
                message: "Dados de proposta invalidos",
                data: null
            })
        const createPropostaResponse = await propostaModel.create(newProposta)
        if (createPropostaResponse === null)
            return res.status(400).json({
                status: "error",
                message: "Erro ao criar proposta",
                data: null
            })

        res.status(200).json({
            status: "success",
            message: "Proposta criada com sucesso",
            data: createPropostaResponse
        })
    }

}



// export async function createProposta(req: Request, res: Response) {
//     const proposta = req.body;

//     if (!proposta) {
//         return res.status(400).json({
//             status: "error",
//             mensagem: "Dados obrigatórios em falta",
//             data: null
//         });
//     }

//     try {
//         const response = await insertProposta(proposta);

//         return res.status(201).json({
//             status: "success",
//             mensagem: "Proposta criada com sucesso",
//             data: response
//         });

//     } catch (error) {
//         return res.status(500).json({
//             status: "error",
//             mensagem: "Erro ao criar proposta",
//             data: error
//         });
//     }
// }