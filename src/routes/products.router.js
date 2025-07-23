import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

//importo los controladores
import * as productsController from "../controllers/products.controller.js";

// ==== Rutas =====================================================================

//GET todos los productos
router.get("/products", productsController.getAllProducts);

//GET productos por nombre
router.get("/products/search", productsController.searchProduct);

//GET producto por id
router.get("/products/:id", productsController.getProductById); //debe estar despues del search xq sino piensa que el search es un id

//POST crear un producto
router.post("/products", authMiddleware, productsController.createProduct);

//PUT actualiza TODO el producto (PATCH actualiza parcialmente el producto)
router.put("/products/:id", authMiddleware, productsController.updateProduct);

//DELETE eliminar un producto
router.delete("/products/:id", authMiddleware, productsController.deleteProduct);

export default router;
