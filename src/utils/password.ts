import{hash, compare} from "bcrypt"

export async function hashPassword( passwordEmTexto: string) {
  return  hash(passwordEmTexto, 12)

}
export async function comparePasswoerd( passwordEmTexto: string, passwordHash: string) {
    return await compare( passwordEmTexto,passwordHash)
    
}