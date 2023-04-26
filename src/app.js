import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

const app = express();
app.use(express.json())

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(8080, () => {
    console.log("Server UP");
});

/*
app.get("/", (req, res) => {
    res.send(`serverup `);
});
app.get("/products", (req, res) => {
    let { limit } = req.query;
    if( limit) {
        res.status(200).send(prod.getProducts().slice(0,+limit));
    } else {
        res.status(200).send(prod.getProducts());
    }
});
app.get("/product/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let foundprod = prod.getProductById(id)
    if(foundprod===false) {
        res.status(400).send({error:'Producto no encontrado'});
    } else {
        res.status(200).send(foundprod);
    }
});
*/
