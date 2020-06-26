import { createPool } from "mysql2/promise";
import { config } from "./config/config"

export async function connect() {
    const connection = await createPool({
        database: config.mysql.database,
        host: config.mysql.host,
        user: config.mysql.user,
        password: config.mysql.password,
        connectionLimit: 10
    })

    return connection;
}