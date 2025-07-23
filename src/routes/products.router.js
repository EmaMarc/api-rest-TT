import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

//importo los controladores
import * as productsController from "../controllers/products.controller.js";

// ==== Rutas =====================================================================

// Obtener todos los productos
router.get("/products", productsController.getAllProducts);

// Buscar productos por nombre (query param: ?name=)
router.get("/products/search", productsController.searchProduct);// IMPORTANTE: esta ruta debe estar antes de /:id

// Obtener un producto por su ID
router.get("/products/:id", productsController.getProductById);

// Rutas protegidas ================================================================
router.use(authMiddleware);

// Crear un nuevo producto (requiere autenticación)
router.post("/products", productsController.createProduct);

// Actualizar un producto por ID (requiere autenticación)
router.put("/products/:id", productsController.updateProduct);

// Eliminar un producto por ID (requiere autenticación)
router.delete("/products/:id", productsController.deleteProduct);

export default router;
