import { jest, describe,it, beforeEach, expect } from "@jest/globals";
import { isOwner } from "../security/auth.middleware.js";



describe("Unit Test: isOner Middleware", () =>{
let mockRequest: any
let mockResponse: any
let nextFuntctiom: any = jest.fn();


//formatacao de resposta mpckda para o teste

beforeEach(()=>{

    mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
});

it(" Deve retornor 403 se o utilizador nao for o dono do recurso", async() =>{
// 1. semulaçao de um utilizador logado ( ID: "user_123")
mockRequest = {
    user: {id: "user_123"},
    params: {id: "resource_456"},
};
 //2. Simulação do Model (ID do dono na BD é "outro_user")
const mockModel ={
    get: jest.fn<any>().mockResolvedValue({id_utilizador: "outro_user"}),

};
const middleware = isOwner(mockModel, "id_utilizador");
await middleware(mockRequest, mockResponse, nextFuntctiom);

//verificação: deve bloquear com 403
expect(mockResponse.status).toHaveBeenCalledWith(403);
expect(mockResponse.json).toHaveBeenCalledWith({
        message:"Permissão insuficiente"
})
expect(nextFuntctiom).not.toHaveBeenCalled();
});
})





