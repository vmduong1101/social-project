import 'dotenv/config';
import { Sequelize } from 'sequelize';

const DB_HOST_NAME = process.env.DB_HOST_NAME
const DB_PORT = process.env.DB_PORT
const DB_USER = process.env.DB_USER || ''
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME || ''

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST_NAME,
    port: Number(DB_PORT),
    dialect: 'mysql'
})


export default sequelize;
