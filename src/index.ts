import express, { type Request, type Response } from "express";
import { adicionarServico, listarServicos, apagarServico, obterServicoPorNome } from "./servico.js";
import { calcularOrcamento, editarPrestadoresDeServico,  } from "./orcamento.js";
import { selecionarPrestador, criarPrestadoresDeServico, } from "./orcamento.js";
import { getUserById, getUsers, insertUser } from "./users.js";
import { stat } from "node:fs";

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

// rota selecionar todos  os utilizadores presentes na base de dados 

app.get("/get-users", async (req: Request, res: Response) => {
  const getUserResponse = await getUsers()
  
  res.json(getUserResponse);
});

// selecionar um utilizador pelo id
app.get("/get-user-by-id", async (req: Request, res: Response) => {
  const { id } = req.query;

  if (id) {
    const getUserByIdResponse = await getUserById(id as string)
    
    if(!getUserByIdResponse) {
    res.status(404).json({
      status:"error",
      mensagem: "Utilizador não encontrado",
      Data: null
    });
  }


  res.status(200).json({
      status:"success",
      mensagem: "Utilizador encontrado",
      Data:getUserByIdResponse,
  });

} else {
  res.status(400).json({
    status:"error",
    mensagem: "ID do utilizador é obrigatório",
    Data: null
  }); 
}
});

//rota para inserir utilizador
app.post("/insert-user", async (req: Request, res: Response) => {

  const { id, nome, matricula, email, telefone, pais, cidade, senha } = req.body;

  if (!id || !nome || !email) {
    return res.status(400).json({
      status: "error",
      mensagem: "Campos obrigatórios em falta",
      data: null
    });
  }

  const result = await insertUser({
    id,
    nome,
    matricula,
    email,
    telefone,
    pais,
    cidade,
    senha
  });

  return res.status(201).json({
    status: "success",
    mensagem: "Utilizador inserido com sucesso",
    data: result
  });

});



app.listen(8080, () => {
  console.log('Servidor a correr  na porta 8080')
});

// rota selecionar todos  os utilizadores presentes na base de dados 