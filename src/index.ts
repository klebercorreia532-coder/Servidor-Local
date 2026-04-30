import express, {type Request, type Response } from "express";
import { router as serviceRouter } from "./routes/servico.route.js";
import { router as prestadorRouter } from "./routes/prestador.route.js";
import { router as propostaRouter } from "./routes/proposta.route.js";  
import { router as orcamentoRouter } from "./routes/orcamento.route.js";
import { router as userRouter } from "./routes/users.route.js";
import { router as prestacaoServicoRouter } from "./routes/prestacaoservico.routes.js";
import {swaggerSpec} from "./docs/swagger.js"
import swaggerUi from "swagger-ui-express"
import dotenv from "dotenv"
import { resolvers, typeDefs } from "./graphql/index.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  
}))

dotenv.config();

app.use("/service", serviceRouter)
app.use("/prestador", prestadorRouter)
app.use("/proposta", propostaRouter)
app.use("/orcamento", orcamentoRouter)
app.use("/user", userRouter)
app.use("/prestacao-servico",  prestacaoServicoRouter)


app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers,
});

await graphqlServer.start()

app.use("/graphql", 
  expressMiddleware(graphqlServer, { context: async ({ req }) => ({  
  Token: req.headers.authorization,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_DATABASE,
}) })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});



app.listen(8080, () => {
  console.log("Server running on port 8080");
});