import mysql from "mysql2/promise";

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Baixadabxd123#",
    database: "servidor_local"
});

export default db;