import express, { type Request, type Response } from "express";
import { adicionarServico, listarServicos, apagarServico, obterServicoPorNome } from "./servico.js";
import { apagarPrestadorDeServico, calcularOrcamento, editarPrestadoresDeServico,  } from "./orcamento.js";
import { selecionarPrestador, criarPrestadoresDeServico, } from "./orcamento.js";
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
app.put("/editar-prestador", (req: Request, res: Response) => {
  const { nomeDoPrestador, novoDadosDoPrestador } = req.body;
  const editarPrestadorResponse = editarPrestadoresDeServico(nomeDoPrestador as string, novoDadosDoPrestador);
  res.json(editarPrestadorResponse);
});
// rota para apagar servicos
app.delete("/apagar-prestador", (req: Request, res: Response) => {
  const { nomeDoPrestador } = req.query;


  if (nomeDoPrestador) {
    const apagarPrestadorResponse = apagarServico(nomeDoPrestador as string);

    res.json(apagarPrestadorResponse);
  } else {
    res.json({
      mensagem: "Nome do prestador é obrigatório para apagar."
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

  res.json( selecionarPrestadorResponse);
})

// rota para criar prestador de serviço
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