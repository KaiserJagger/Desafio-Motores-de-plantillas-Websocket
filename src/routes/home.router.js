import { Router } from "express";
import { ProductManager } from "../scripts/ProductManager.js";


const router = Router();
const prod = new ProductManager("./src/data/productos.json");

router.get("/", (req, res) => {
    const products = prod.getProducts();
    res.render("home", {products: products});
});

export default router;
