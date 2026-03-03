import express, { type Request, type Response } from "express";
import { adicionarServico, listarServicos, apagarServico, obterServicoPorNome } from "./servico.js";
import { calcularOrcamento, selecionarServico } from "./orcamento.js";
import { selecionarPrestador, criarPrestadoresDeServico,  } from "./orcamento.js";
const app = express();

app.use(express.json());


app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});



app.post("/adicionar-servico", (req: Request, res: Response) => {
  const novoServico = req.body;

  console.log(novoServico);

  const addServicoResponse = adicionarServico(novoServico);

  res.json(addServicoResponse);
});

// rota para listar os serviços
app.get("/listar-servicos", (req: Request, res: Response) => {

  const listServicoResponse = listarServicos();
  res.json(listServicoResponse);


});
// rota para apagar servicos
app.delete("/apagar-servico", (req: Request, res: Response) => {
  const { nome } = req.query;


  if (nome) {
    const apagarServicoResponse = apagarServico(nome as string);

    res.json(apagarServicoResponse);
  } else {
    res.json({
      mensagem: "Nome do serviço é obrigatório para apagar."
    });
  }

});

//rota para obter servico pelo nome 
app.get("/obter-servico", (req: Request, res: Response) => {
  const { nome } = req.query;

  if (nome) {
    const servico = obterServicoPorNome(nome as string);

    res.json(servico);

  } else {
    res.json({
      mensagem: "Nome do serviço é obrigatório."
    });
  }
});


// rota para selecionar um serviço
app.post("/selecionar-servico", (req: Request, res: Response) => {
  const nomeDePrestador  = req.body;

  const selecionarPrestadorResponse = selecionarPrestador(nomeDePrestador as string);

  res.json({
    status: selecionarPrestadorResponse,

    mensagem: "prestador de servico com sucisso",
  });
})

// rota para calcular orcamento
app.post("/criar-prestador", (req: Request, res: Response) => {
  const novoPrestador = req.body;


  const criarPrestadorResponse = criarPrestadoresDeServico(novoPrestador);


  res.json(criarPrestadorResponse);
})

// rota para calcular orcamento
app.post("/calcular-orcamento", (req: Request, res: Response) => {
    const { pedido } = req.body 

    const calcularOrcamentoresponse = calcularOrcamento(pedido)
    
    res.json({
        message: "Orçamento calculado com sucesso!",
        orcamentoTotal: calcularOrcamentoresponse
    })
})

app.listen(8080, () => {
  console.log('Servidor a correr  na porta 8080')
});