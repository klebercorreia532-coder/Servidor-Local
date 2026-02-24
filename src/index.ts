import express from "express";

const app = express();
  
const costante =""
let variavvel ="variavvel"





app.get("/hello",  (req, res) => { 
    console.log("Hello World");
    res.send("Hello World");
});
  app.listen(8080, () => {
    console.log('Servidor a correr  na porta 8080')
  });