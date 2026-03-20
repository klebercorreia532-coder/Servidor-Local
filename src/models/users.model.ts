





export const usersModel = {
    async create(newUser: UserType) {
         try {
       
        const [rows] = await db.execute(
            `INSERT INTO tbl_utilizadores (id,nome, numero_identificado, data_nascimento, email, telefone,
        pais, localidade, password , enabled, created_at, update_at) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?,?,?)`,
            [
                generateUUID(),
                user.nome,
                user.numero_identificado,
                formatDateDDMMYYYY(user.data_nascimento),
                user.email,
                user.telefone,
                user.pais,
                user.localidade,
                await hashPassword(user.password),
                user.enabled,
                new Date(),
                new Date(),
            ],
        );
        return rows;
    } catch (error) {
        console.log(error);
        return null;
    }
    }
}