import path from "node:path";
import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Serviços ",
            description: 'Plataformo de Gestão de Serviços',
            version: '1.0.0'
        },
        server: [
            {
                url: "http://localhost:8080",
                descrition: "dev",
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: [
        path.join(process.cwd(),"./src/docs/schemas/*.yaml"),

        path.join(process.cwd(),"./src/docs/paths/*.yaml"),
        
    ]
}
export const swaggerSpec = swaggerJsdoc(options);