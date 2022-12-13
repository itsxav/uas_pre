import { Sequelize } from "sequelize";

const db = new Sequelize('japanese_db','root','',{
    host: 'localhost',
    dialect: "mysql"
});

export default db;