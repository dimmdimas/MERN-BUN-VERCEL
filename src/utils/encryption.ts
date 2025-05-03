export default async function encryption(password:string) {
    return Bun.password.hash(password);
}

export async function Vencryption(password:string, PasswordHash:string) {
    return Bun.password.verify(password, PasswordHash)
}