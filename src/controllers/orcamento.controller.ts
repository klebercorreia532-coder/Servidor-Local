

import type { Request, Response } from "express"
import { EstadoProposta, type OrcamentoDBType, type PropostaDBType, type ResponseType } from "../utils/types.js"
import { OrcamentoModel } from "../models/orcamento.models.js"
import { id } from "date-fns/locale/id"
import { PrestacaoServicoModel } from "../models/prestacaoservico.models.js"
import { PropostaModel } from "../models/proposta.models.js"
import { PrestadorModel } from "../models/prestador.models.js"

export const OrcamentoController = {
    async create(req: Request, res: Response) {
        const orcamento: OrcamentoDBType = req.body

        if (!orcamento) {
            return res.status(400).json({
                status: "error",
                message: "Dados de orcamento invalidos",
                data: null
            })
        }

        const createOrcamentoResponse = await OrcamentoModel.create(orcamento)

        if (!createOrcamentoResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao criar orcamento",
                data: null
            })
        }

        return res.status(201).json({
            status: "success",
            message: "Orcamento criado com sucesso",
            data: createOrcamentoResponse
        })
    },

    async getAll(req: Request, res: Response) {
        const getAllOrcamentosResponse = await OrcamentoModel.getAll()

        if (!getAllOrcamentosResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar orcamentos",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamentos buscados com sucesso",
            data: getAllOrcamentosResponse
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

        const getOrcamentoByIdResponse = await OrcamentoModel.get(id as string)

        if (!getOrcamentoByIdResponse) {
            return res.status(404).json({
                status: "error",
                message: "Orcamento nao encontrado",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamento encontrado com sucesso",
            data: getOrcamentoByIdResponse
        })
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const updatedOrcamento: OrcamentoDBType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        if (!updatedOrcamento) {
            return res.status(400).json({
                status: "error",
                message: "Dados de orcamento invalidos",
                data: null
            })
        }

        const updateOrcamentoResponse = await OrcamentoModel.update(id as string, updatedOrcamento)

        if (!updateOrcamentoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar orcamento",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamento atualizado com sucesso",
            data: updateOrcamentoResponse
        })
    },

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

    async delete(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        const deleteOrcamentoResponse = await OrcamentoModel.delete(id as string)

        if (!deleteOrcamentoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar orcamento",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamento apagado com sucesso",
            data: deleteOrcamentoResponse
        })
    },
    //CALCULAR ORÇAMENTO
    async calculateBudget(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatório",
                data: null
            };
            return res.status(400).json(response);
        }
        const prestacaoServico = await PrestacaoServicoModel.getByIdOrcamento(id as string);

        if (!prestacaoServico) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Prestação de serviço não encontrada para o orçamento",
                data: null
            };
            return res.status(404).json(response);
        }

        // fetch all proposal
        const propostas = await PropostaModel.getByIdPrestacaoServico(prestacaoServico.id as string);

        if (!propostas) {
            return res.status(400).json({
                status: "error",
                message: "Propostas não encontradas para o orçamento",
                data: null
            });
        }

        //find accepted proposal
        const propostaAceita: PropostaDBType | undefined = propostas.find((proposta) => proposta.estado === EstadoProposta.ACEITO);

        if (!propostaAceita) {
            return res.status(400).json({
                status: "error",
                message: "Nenhuma proposta aceita encontrada para o orçamento",
                data: null
            });
        }

        const precoHora = propostaAceita.preco_hora;
        const horasEstimadas = prestacaoServico.horas_estimadas;

        //fetch prestador to get urgenccy tax minima  discont percentague based on attrs in uttrs/types.ts
        const prestador = await PrestadorModel.get(propostaAceita.id_prestador);

        if (!prestador) {
            return res.status(404).json({
                status: "error",
                message: "Prestador não encontrado",
                data: null
            });
        }

        const urgencyTax = prestador.taxa_urgencia;
        const minimaDesconto = prestador.minimo_desconto;
        const percentagemDesconto = prestador.percentagem_desconto;

        //calculated the budget based on  utils/types.ts
        let subtotal = precoHora * horasEstimadas;

        //if minimum discont is greater than discount percentage

        if (subtotal > minimaDesconto) {
            subtotal = subtotal * (1 - percentagemDesconto)
        }

        if (prestacaoServico.urgencia) {
            subtotal = subtotal * (1 + urgencyTax)
        }

        const updateOrcamentoResponse = await OrcamentoModel.updateOrcamento(id as string, subtotal);

        if (!updateOrcamentoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar orçamento com o total calculado",
                data: null
            });
        }
        const response: ResponseType<OrcamentoDBType> = {
            status: "success",
            message: "Orçamento calculado com sucesso",
            data: updateOrcamentoResponse
        };
        return res.status(200).json(response);
    }
}