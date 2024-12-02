import express from "express";
import cors from "cors";
import { Sequelize } from 'sequelize';
import { sequelize } from "./config/database.js";
import { Producto } from "./models/Producto.js";
import { Categoria } from "./models/Categoria.js";
import { Cliente } from "./models/Cliente.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

async function verificarConexión(){
    try{
        await sequelize.authenticate();
        console.log("Conexión a la base de datos exitosa.");
        //await sequelize.sync(/*{ force: true }*/);
    }catch(error){
        console.error("Ocurrio un error al conectarse a la base de datos.", error);
    }
}

app.listen(port, () => {
    console.log("Servidor corriendo en el puerto " + port);
    verificarConexión();
});

// Listar productos disponibles en el catálogo:
app.get("/productos", async (req, res) => {
    try {
        const productos = await sequelize.query("SELECT * FROM products", { type: Sequelize.QueryTypes.SELECT });
        res.status(200).json(productos);
    } catch (error) {
        res.status(404).send("Error al obtener los productos");
    }
});

// Listar categorías de los productos:
app.get("/categorias", async (req, res) => {
    try {
        const categorias = await sequelize.query("SELECT * FROM categories", { type: Sequelize.QueryTypes.SELECT });
        res.status(200).json(categorias);
    } catch (error) {
        res.status(404).send("Error al listar las categorias");
    }
});

// Hallar producto en base a su número de ID:
app.get("/productos/:id", async (req, res) => {
    const productoId = req.params.id;

    try {
        const producto = await sequelize.query("SELECT * FROM products WHERE id = :id", {
            replacements: { id: productoId },
            type: Sequelize.QueryTypes.SELECT,
        });

        if (producto.length > 0) {
            res.status(200).json(producto[0]);  // Se asume que "producto" es un arreglo
        } else {
            res.status(404).send("<strong>Error:</strong> Producto no encontrado");
        }
    } catch (error) {
        console.error(error);
        res.status(404).send("Error al obtener el producto");
    }
});
