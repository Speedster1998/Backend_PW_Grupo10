import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Cliente = sequelize.define(
    "Cliente", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: DataTypes.STRING,
        dni: DataTypes.INTEGER,
        medioDePago: DataTypes.STRING
    }, {
        freezeTableName: true
    }
);