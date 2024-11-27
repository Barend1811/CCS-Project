import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres'
import 'dotenv/config'

const sequelize = new Sequelize({
    dialect: PostgresDialect,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: false,
});

export default sequelize;