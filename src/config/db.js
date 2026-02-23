import mysql from 'mysql2/promise.js'; // chama a biblioteca que faz a manipulação do banco de dados (node_modules >> mysql2 >> promise.js)
import 'dotenv/config';

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT_MYSQL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0 // não tem fila para aguardar (nesse caso que é 0)
});

export default pool;