import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Producto = sequelize.define(
    "Producto", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: DataTypes.STRING,
        categoria: DataTypes.STRING,
        precio: DataTypes.STRING,
        foto: DataTypes.TEXT,
    }, {
        freezeTableName: true
    }
);