import bcrypt from "bcrypt";
import { UserModel } from "./models/users.model.js";
import type { Request, Response } from "express";
import { OrcamentoModel } from "./models/orcamento.models.js";
import { PropostaModel } from "./models/proposta.models.js";


export async function updatePassword(req: Request, res: Response) {
    try {
        const userId = req.user.id;
        const { oldPassword, newPassword } = req.body;

        const user = await UserModel.getById(userId);

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "Utilizador não encontrado",
                data: null
            });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(401).json({
                status: "error",
                message: "Password antiga incorreta",
                data: null
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await UserModel.updatePassword(userId, hashedPassword);

        return res.json({
            status: "success",
            message: "Password atualizada com sucesso",
            data: null
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Erro interno",
            data: error
        });
    }
}

// Motor Lógico (Cálculo de Orçamento)^
export async function calcularOrcamento(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const servicos = await OrcamentoModel.getServicosByOrcamento(id);

        if (!servicos.length) {
            return res.status(404).json({
                status: "error",
                message: "Nenhum serviço encontrado",
                data: null
            });
        }

        let total = 0;

        for (const s of servicos) {
            let subtotal = s.preco_hora * s.horas_estimadas;

            // urgência
            if (s.taxa_urgencia) {
                subtotal += subtotal * (s.taxa_urgencia / 100);
            }

            // desconto prestador
            if (s.desconto) {
                subtotal -= subtotal * (s.desconto / 100);
            }

            total += subtotal;
        }

        await OrcamentoModel.updateTotal(id, total);

        return res.json({
            status: "success",
            message: "Orçamento calculado",
            data: { total }
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Erro ao calcular orçamento",
            data: error
        });
    }
}

// Fluxo de Negociação (Aceitar Proposta)^

export async function aceitarProposta(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const proposta = await PropostaModel.getById(id);

        if (!proposta) {
            return res.status(404).json({
                status: "error",
                message: "Proposta não encontrada",
                data: null
            });
        }

        // aceitar proposta
        await PropostaModel.updateStatus(id, "Aceite");

        // atualizar serviço
        await ServicoModel.updateStatus(proposta.id_servico, "Fechado");

        // rejeitar outras propostas
        await PropostaModel.rejectOthers(proposta.id_servico, id);

        return res.json({
            status: "success",
            message: "Proposta aceite com sucesso",
            data: null
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Erro ao aceitar proposta",
            data: error
        });
    }
}
    // //CALCULAR ORÇAMENTO
    // //(CRIAR / COMPLETAR)


    // async calcularTotal(req: Request, res: Response) {
    //     try {
    //         const { id } = req.params;

    //         if (!id) {
    //             return res.status(400).json({
    //                 status: "error",
    //                 message: "ID obrigatório",
    //                 data: null
    //             });
    //         }

    //         const total = await OrcamentoModel.calcularTotal(id as string);

    //         if (total === null) {
    //             return res.status(400).json({
    //                 status: "error",
    //                 message: "Erro ao calcular orçamento",
    //                 data: null
    //             });
    //         }

    //         return res.status(200).json({
    //             status: "success",
    //             message: "Total calculado com sucesso",
    //             data: total
    //         });

    //     } catch (error) {
    //         return res.status(500).json({
    //             status: "error",
    //             message: "Erro interno",
    //             data: error
    //         });
    //     }
    // },
