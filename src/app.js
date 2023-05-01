import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

import { ProductManager } from "./scripts/ProductManager.js";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import homeRouter from "./routes/home.router.js";
import realTimeProducts from "./routes/realtimeproducts.router.js";
import __dirname from "./utils.js";

const app = express();
app.use(express.json());

app.use("/", homeRouter);
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/realtimeproducts", realTimeProducts);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const httpServer = app.listen(8080, () => {
    console.log("Server UP");
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socketClient) => {
    const prod = new ProductManager("./src/data/productos.json");
    console.log("cliente conectado");
    socketClient.on("deleteProd", (prodId) => {
        console.log(prodId);
        const result = prod.deleteProduct(prodId);
        console.log(result);
        socketServer.emit("products", prod.getProducts());
    });
});
