

import type { Request, Response } from "express"
import { EstadoProposta, type OrcamentoDBType, type PrestacaoServicoDBType, type PropostaDBType, type ResponseType } from "../utils/types.js"
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

        const createOrcamentoResponse: OrcamentoDBType | null = await OrcamentoModel.create(orcamento)

        if (!createOrcamentoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar orcamento",
                data: null
            }
            return res.status(500).json(response)
        }

        return res.status(201).json({
            status: "success",
            message: "Orcamento criado com sucesso",
            data: createOrcamentoResponse
        })
    },

    async getAll(req: Request, res: Response) {
        const getAllOrcamentosResponse : OrcamentoDBType[] | null = await OrcamentoModel.getAll()

        if (!getAllOrcamentosResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar orcamentos",
                data: null
            }
            return res.status(500).json(response )
        }

    const response: ResponseType<OrcamentoDBType[]> = {
            status: "success",
            message: "Orcamentos buscados com sucesso",
            data: getAllOrcamentosResponse
        }
        return res.status(200).json(response)
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

        const getOrcamentoByIdResponse : OrcamentoDBType | null = await OrcamentoModel.get(id as string)

        if (!getOrcamentoByIdResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Orcamento nao encontrado",
                data: null
            }
            return res.status(404).json(response)
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
        const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null
            }
            return res.status(400).json(response)
        }

        if (!updatedOrcamento) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de orcamento invalidos",
                data: null
            }
            return res.status(400).json(response)

        }

        const updateOrcamentoResponse: OrcamentoDBType | null = await OrcamentoModel.update(id as string, updatedOrcamento)

        if (!updateOrcamentoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao atualizar orcamento",
                data: null
            }
            return res.status(400).json(response)
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamento atualizado com sucesso",
            data: updateOrcamentoResponse
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

        const deleteOrcamentoResponse : OrcamentoDBType  | null = await OrcamentoModel.delete(id as string)

        if (!deleteOrcamentoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Orcamento nao encontrado ou erro ao apagar",
                data: null
            }
            return res.status(400).json(response)
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
        const prestacaoServico : PrestacaoServicoDBType | null = await PrestacaoServicoModel.getByIdOrcamento(id as string);

        if (!prestacaoServico) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Prestação de serviço não encontrada para o orçamento",
                data: null
            };
            return res.status(404).json(response);
        }

        // fetch all proposal
        const propostas: PropostaDBType[] | null = await PropostaModel.getByIdPrestacaoServico(prestacaoServico.id as string);

        if (!propostas) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar propostas para a prestação de serviço",
                data: null
            };
            return res.status(400).json(response)
        }

        //find accepted proposal
        const propostaAceita: PropostaDBType | undefined = propostas.find((proposta) => proposta.estado === EstadoProposta.ACEITE);

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
        const prestador = await PrestadorModel.get(propostaAceita.id_Prestador);

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

        if (prestacaoServico.urgente) {
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

