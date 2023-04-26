import { Router } from "express";
import { ProductManager } from "../scripts/ProductManager.js";

const router = Router();
const prod = new ProductManager("./src/data/productos.json");

router.get("/", (req, res) => {
    let { limit } = req.query;
    if (limit) {
        res.status(200).send(prod.getProducts().slice(0, +limit));
    } else {
        res.status(200).send(prod.getProducts());
    }
});
router.get("/", (req, res) => {
    let { limit } = req.query;
    if (limit) {
        res.status(200).send(prod.getProducts().slice(0, +limit));
    } else {
        res.status(200).send(prod.getProducts());
    }
});
router.get("/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let foundprod = prod.getProductById(id);
    if (foundprod === false) {
        res.status(404).send({ error: "Producto no encontrado" });
    } else {
        res.status(200).send(foundprod);
    }
});

router.post("/", (req, res) => {
    const producto = req.body;
    (async () => {
        try {
            const result = await prod.addProduct(producto);
            if (result.error) {
                res.status(400).send(result);
            } else {
                res.status(201).send(result);
            }
        } catch (err) {
            res.status(400).send(err);
        }
    })();
});
router.put("/", (req, res) => {
    const producto = req.body;
    (async () => {
        try {
            const result = await prod.updateProduct(producto);
            if (result.error) {
                res.status(400).send(result);
            } else {
                res.status(200).send(result);
            }
        } catch (err) {
            res.status(400).send(err);
        }
    })();
});

router.delete("/:id", (req, res) => {
    let id = parseInt(req.params.id);
    (async () => {
        try {
            const result = await prod.deleteProduct(id);
            if (result.error) {
                res.status(400).send(result);
            } else {
                res.status(204);
            }
        } catch (err) {
            res.status(400).send(err);
        }
    })();
});

export default router;
