export const config = {
    port: 3000,
    logLevel: 'debug',
    production: true, 
    secret: 'sectret', 
    mysql: {
        host: 'localhost',
        user: 'root',
        database: 'node_mysql_ts',
        password: 'Voldemort1@',
    },
    email: {
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: '',
            pass: ''
        }
    }
};