import express, { type Request, type Response } from "express";
import { adicionarServico, listarServicos, apagarServico, obterServicoPorNome} from "./servico.js";
import { calcularOrcamento, selecionarServico } from "./orcamento.js";
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
  const { nome } = req.body;

  const selecionarServicoResponse = selecionarServico(nome as string);

  res.json({
    mensagem:"Orcamento calculado com sucesso",
    orcamentoTotal: calcularOrcamento
})}
)

// rota para calcular orcamento
app.post("/calcular-orcamento", (req: Request, res: Response) => {
  const { pedido } = req.body;

  
  const calcularOrcamentoResponse = calcularOrcamento(pedido);


  res.json(calcularOrcamentoResponse);
})


app.listen(8080, () => {
  console.log('Servidor a correr  na porta 8080')
});