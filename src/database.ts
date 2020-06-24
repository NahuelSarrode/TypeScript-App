import { createPool } from "mysql2/promise";

export async function connect() {
    const connection = await createPool({
        database: 'node_mysql_ts',
        host: 'localhost',
        user: 'root',
        password: 'voldemort1',
        connectionLimit: 10
    })

    return connection;
}