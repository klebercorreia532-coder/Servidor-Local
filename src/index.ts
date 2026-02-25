import express from "express";
import { adicionarServico } from "./servico.js";



const app = express();
  
const costante =""
let variavvel ="variavvel"

app.get("/adicionar-servico", (req, res) => {
  const novoServico = req.body;
  adicionarServico(novoServico)
})



app.get("/hello",  (req, res) => { 
    res.send("Hello World");
});
  app.listen(8080, () => {
    console.log('Servidor a correr  na porta 8080')
  });