import express, { type Request, type Response } from "express";
import { adicionarServico, listarServicos, apagarServico, obterServicoPorNome,updateService,insertService,deleteService } from "./servico.js";
import { calcularOrcamento, editarPrestadoresDeServico, } from "./orcamento.js";
import { selecionarPrestador, criarPrestadoresDeServico, } from "./orcamento.js";
import { getUserById, getUsers, insertUser} from "./users.js";
import type { ServicoDBType, UserServiceType } from "./utils/types.js";
import { insertPrestador, } from "./prestador.js";
import {insertProposta  } from "./proposta.js";
import db from "./lib/db.js";
import { generateUUID } from "./utils/uuid.js";

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
  const nomeDePrestador = req.body;

  const selecionarPrestadorResponse = selecionarPrestador(nomeDePrestador as string);

  res.json(selecionarPrestadorResponse);
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

    if (!getUserByIdResponse) {
      res.status(404).json({
        status: "error",
        mensagem: "Utilizador não encontrado",
        Data: null
      });
    }


    res.status(200).json({
      status: "success",
      mensagem: "Utilizador encontrado",
      Data: getUserByIdResponse,
    });

  } else {
    res.status(400).json({
      status: "error",
      mensagem: "ID do utilizador é obrigatório",
      Data: null
    });
  }
});

//rota para criar utilizador
app.post("/create-user", async (req: Request, res: Response) => {
  const user = req.body;


  if (!user) {
    res.status(400).json({
      status: "error",
      mensagem: "Campos obrigatórios em falta",
      data: null
    });
  }
  console.log(user);

  const insertUserResponse = await insertUser(user);
  res.json(insertUserResponse);

});




// rota para criar serviço
app.post("/create-service", async (req: Request, res: Response) => {

  const service: UserServiceType = req.body;
  console.log(service);
  const insertServiceResponse = await insertService(service);
  res.json(insertServiceResponse);

});
// Rota para criar prestador
app.post("/create-prestador", async (req: Request, res: Response) => {

  const prestador = req.body

  if (!prestador) {
    return res.status(400).json({
      status: "error",
      mensagem: "Dados obrigatórios em falta",
      data: null
    })
  }

  try {

    const response = await insertPrestador(prestador)

    res.status(201).json({
      status: "success",
      mensagem: "Prestador criado com sucesso",
      data: response
    })

  } catch (error) {

    res.status(500).json({
      status: "error",
      mensagem: "Erro ao criar prestador",
      data: error
    })

  }

})

// Rota para criar proposta
app.post("/create-proposta", async (req: Request, res: Response) => {

  const proposta = req.body

  if (!proposta) {
    return res.status(400).json({
      status: "error",
      mensagem: "Dados obrigatórios em falta",
      data: null
    })
  }

  try {

    const response = await insertProposta(proposta)

    res.status(201).json({
      status: "success",
      mensagem: "Proposta criada com sucesso",
      data: response
    })

  } catch (error) {

    res.status(500).json({
      status: "error",
      mensagem: "Erro ao criar proposta",
      data: error
    })

  }

})
 //rota para inserir um servico na base de dados 2
app.post("/create-service", async (req: Request, res: Response) => {
  const newService: ServicoDBType = req.body
  if (!newService) {
    res.status(404).json({
      status: "error",
      message: "Dados de servico invalidos",
      data: null
    })
  }

  // 429 too many requests
  // 409 conflict
  // 201 no content

  console.log(newService)

  const createServiceResponse = await addServicesToDB(newService)
  //caso funçãqo retorne null
  if (createServiceResponse === null) {
    res.status(400).json({
      status: "error",
      message: "Erro ao criar servico",
      data: null
    })
  }

  res.status(200).json({
    status: "success",
    message: "Servico criado com sucesso",
    data: createServiceResponse
  })

});
app.get("/get-service-by-id", async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(404).json({
      status: "error",
      message: "ID obrigatorio",
      data: null
    })
  }

  const getServiceByIdResponse = await getServicesById(id as string)

  if (!getServiceByIdResponse) {
    return res.status(404).json({
      status: "error",
      message: "Servico nao encontrado",
      data: null
    })
  }

  res.status(200).json({
    status: "success",
    message: "Servico encontrado",
    data: getServiceByIdResponse
  })

})
//rota para selecionar todos os servicos na base de dados
app.get("/get-all-services", async (req: Request, res: Response) => {
  const getAllServicesResponse = await getAllServices()

  if (!getAllServicesResponse) {
    return res.status(404).json({
      status: "error",
      message: "Erro ao selecionar servicos",
      data: null
    })
  }

  res.status(200).json({
    status: "success",
    message: "Servicos encontrados",
    data: getAllServicesResponse
  })
})


export async function addServicesToDB(newService: ServicoDBType) {
  console.log({ newService })

  try {
    const query = 'INSERT INTO tbl_servico VALUES(?,?,?,?,?,?,?)'

    const values =

      [
        null,
        newService.nome,
        newService.discricao,
        newService.categoria,
        newService.enabled,
        new Date(),
        new Date()

      ]
    const rows = await db.execute(query, values)

    return rows
  } catch (error) {
    console.log(error)
    return null
  }
}
//criar uma função para obter serviços na base de dados por ID
export async function getServicesById(id: string) {
  try {
    const query =' SELECT * FROM tbl_servico WHERE id = ?'

        const values = [id]

    const rows = await db.execute(query, values)

    return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getAllServices() {
  try {
    const query = 'SELECT * FROM tbl_servico'

    const rows = await db.execute(query)

    return Array.isArray(rows) && rows.length > 0 ? rows[0] : []
  } catch (error) {
    console.log(error)
    return null
  }
}
app.put("/update-service-id/:id", async (req: Request, res: Response)=>{
    const {id} = req.params
    const updatedService : ServicoDBType = req.body

    if(!id){
        return res.status(404).json({
            status: "error",
            message:"dados de servico invalidos",
            data: null
        })
    }

    if (!updatedService){
        return res.status(400).json({
            status: "error",
            message: "ID obrigatorio",
            data: null
        })
    }

    const updateServiceResponse = await updateService(id as string, updatedService)

    if(!updateServiceResponse){
        return res.status(400).json({
            status: "error",
            message: "Erro ao atualizar servico",
            data: null
        })
    }

    res.status(200).json({
        status: "success",
        message: "Erro ao encontrar servico",
        data: updateServiceResponse
    })
})

// rota para apagar um servico pelo id
app.delete("/delete-service-by-id/:id", async (req: Request, res: Response)=>{

    const {id} = req.params

    if(!id){
        return res.status(404).json({
            status: "error",
            message: "ID obrigatorio",
            data: null
        })
    }

    const deleteServiceResponse = await deleteService(id as string)

    if(!deleteServiceResponse){
        return res.status(400).json({
            status: "error",
            message: "Erro ao apagar servico",
            data: null
        })
    }

    res.status(200).json({
        status: "success",
        message: "Servico apagado com sucesso",
        data: deleteServiceResponse
    })
})
console.log(generateUUID)

app.listen(8080, () => {
  console.log("Server running on port 8080");
});