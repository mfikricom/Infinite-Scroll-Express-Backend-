import {Sequelize} from "sequelize";

const db = new Sequelize('infinite_db','root','',{
    host:"localhost",
    dialect:"mysql"
});

export default db;