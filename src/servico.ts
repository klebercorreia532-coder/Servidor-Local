import { error } from "node:console";
import db from "./lib/db.js";
import {type ResponseType, type ServicoDBType, type ServicoType } from "./utils/types.js";

export let catalogarServicos: ServicoType[] = [];



// adicionar um  serniso novo
export function adicionarServico(novoServico: ServicoType): ResponseType<ServicoType>{
    {
        if (!novoServico.nome || novoServico.precoHora <= 0) {
            return {
                status: "error",
                message: "preço deve ser maior que zero.",
                data: null
            };
        }

        let existe = false;
        for (let i = 0; i < catalogarServicos.length; i++) {
            if (catalogarServicos[i]?.nome === novoServico.nome) {
                existe = true;
                break;
            }
        }

        if (existe) {
            return {
                status:"success",
                message: `Erro: O serviço '${novoServico.nome}' já está cadastrado.`,
                data: null
            };
        }


        catalogarServicos.push(novoServico);


        return {
            status:"success",
            message: "Serviço adicionado com sucesso!",
            data: novoServico
        };
    };
}
// listar todos os serviços
export function listarServicos(): ServicoType[] {
    //TODO: implementar a fetch listarServicos

    return catalogarServicos;
}
// apagar um serviço

export function apagarServico(nome: string): boolean {
    //TODO: implementar a fetch apagarServico


    const novoCatalogoTemp: ServicoType[] = [];

    for (let i = 0; i < catalogarServicos.length; i++) {
        if (catalogarServicos[i]?.nome !== undefined && catalogarServicos[i]?.nome !== nome) {
            novoCatalogoTemp.push(catalogarServicos[i]!)
        }
    }
    // devolver um novo catalogo sem o servico que foi apagado

    catalogarServicos = novoCatalogoTemp;

    return true;
}

// obter um servico pela nome
export function obterServicoPorNome(nome: string): ServicoType | null {
    for (let i = 0; i < catalogarServicos.length; i++) {
        if (catalogarServicos[i]?.nome === nome) {
            return catalogarServicos[i]!;
        }
    }
    return null;
}

export async function insertService(service: any) {

    const {
        id,
        nome,
        discricao,
        categoria,
        enabled
    } = service;

    const body = `
INSERT INTO tbl_servicos
(id, nome, descricao, categoria, enabled, created_at, updated_at)
VALUES (?, ?, ?, ?, ?, ?, ?)
`;

    const values = [
        id,
        nome,
        discricao,
        categoria,
        enabled,
        new Date(),
        new Date()
    ];

    const [result] = await db.execute(body, values);

    return result;
}

export async function addServicesToDB(newService: ServicoDBType) {
    console.log({ newService })

    try {
        const query = 'INSERT INTO tbl_services VALUES(?,?,?,?,?,?,?)'

        const values =

            [
                null,
                newService.nome,
                newService.descricao,
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
        const query = ' SELECT * FROM tbl_services WHERE id = ?'

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

//update de dados
export async function updateService(id: string, updateService: ServicoDBType) {
    try {
        const query = `UPDATE tbl_servico
                            SET
                                nome=?,
                                discricao=?,
                                categoria=?,
                                enabled=?,
                                update_at=?
                            WHERE
                                id=?
                            ;`

        const values = [
            updateService.nome,
            updateService.descricao,
            updateService.categoria,
            updateService.enabled,
            new Date(),
            id
        ]

        const rows = await db.execute(query, values)
        return rows

    } catch (error) {
        console.log(error)
        return null
    }
}
export async function deleteService (id:string){
    try {
        const query = 'DELETE FROM tbl_servico WHERE id= ?'

        const value = [id]

        const rows: any= await db.execute(query, value) 

        return rows[0]?.affectedRows === 0 ? null : rows
        

    } catch (error) {
        console.log(error)
        return null
    }
}
