

export const orcamentoController = {
    async calcularOrcamento(req: Request, res: Response) {
        const { neworcamento } = req.body

        if (!neworcamento) {
            return res.status(400).json({
                status: "error",
                mensagem: "Dados obrigatórios em falta",
                data: null
            });
        }
         
    

    }
}   


