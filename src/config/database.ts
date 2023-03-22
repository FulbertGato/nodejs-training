import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const sequelize = new Sequelize({
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "nodejs_api",
    dialectModule: mysql2, // utiliser mysql2 comme module de dialecte
});

sequelize.authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

export default sequelize;
