module.exports = {
    development: {
        database: {
            host: 'localhost',
            port: 3306,
            name: 'brandestec',
            dialect: 'mysql',
            user: 'root',
            password: '123456',
            timezone: "-03:00"
        }
    },
    production: {
        database: {
            host: process.env.DB_HOST,
            host: process.env.DB_PORT
        }
    }
}