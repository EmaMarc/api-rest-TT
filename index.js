import express from "express";
// importo CORS para permitir peticiones desde el frontend
import cors from "cors";

// importo el dotenv para manejar variables de entorno
import "dotenv/config";

const app = express();

//middlewares
app.use(express.json()); //para parsear el cuerpo de la solicitud en formato JSON
app.use(cors()); //para permitir peticiones desde el frontend

app.get("/", (req, res) => {
	res.json({ message: "API Rest en node" });
});


import authRouter from "./src/routes/auth.router.js";
app.use(authRouter); //uso el router de autenticación

// importo el router de productos
import productsRouter from "./src/routes/products.router.js";
//uso el router de productos
app.use(productsRouter);

//si la URL no coincide con ninguna de las anteriores, respondemos con un error 404
//debe ir al final para que no intercepte las rutas anteriores
app.use((req, res, next) => {
	res.status(404).json({ error: "Not Found" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
