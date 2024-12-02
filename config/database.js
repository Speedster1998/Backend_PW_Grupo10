import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("datosTienda", "postgres", "peru1821", {
    host: "localhost",
    dialect: "postgres"
});