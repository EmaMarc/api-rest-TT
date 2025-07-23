import * as service from "../services/products.service.js";
import * as model from "../models/product.model.js";

// Controladores para manejar las peticiones HTTP relacionadas con productos

// Los get los hago desde el service, para que sean utiles =====
// =============================================================
export const getAllProducts = async (req, res) => {
	res.json(await model.getAllProducts());
};

//Buscar producto por nombre
export const searchProduct = async (req, res) => {
	const { name } = req.query;

	if (!name) {
		return res.status(400).json({ error: "Falta el parámetro 'name' en la query" });
	}

	try {
		const filtered = await model.searchProductsByName(name);

		if (filtered.length === 0) {
			return res.status(404).json({ message: "No se encontraron productos" });
		}

		res.json(filtered);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error });
	}
};

export const getProductById = async (req, res) => {
	const { id } = req.params; //obtenemos el id del producto desde los params de la url
	const allProducts = await model.getAllProducts();
	const product = allProducts.find((item) => item.id == req.params.id);
	if (!product) {
		res.status(404).json({ error: "Producto no encontrado" });
	} else {
		res.json(product);
	}
};

// Los post, put y delete los hago desde el model, ===========
// ya que el service no hace nada ============================
// ===========================================================

export const createProduct = (req, res) => {
	//console.log(req.body);//req.body es undefined porque no estamos usando un middleware para parsear el cuerpo de la solicitud
	const { ...data } = req.body;

	const newProduct = model.createProduct({ ...data });

	res.status(201).json(newProduct); //estado 201 (creado)
};

export const updateProduct = async (req, res) => {
	const productId = req.params.id; //obtenemos el id del producto desde los params de la url

	if (!req.body || Object.keys(req.body).length === 0) {
		return res.status(400).json({ error: "No se enviaron datos para actualizar" });
	}

	const updatedProduct = await model.updateProduct(productId, req.body);

	if (!updatedProduct) {
		return res.status(404).json({ error: "Producto no encontrado" }); //si no encontramos el producto, respondemos con un error 404
	}

	res.json(updatedProduct);
};

export const deleteProduct = (req, res) => {
	const productId = req.params.id; //obtenemos el id del producto desde los params de la url

	const product = model.deleteProduct(productId); //llamamos al método del modelo para eliminar el producto

	if (!product) {
		return res.status(404).json({ error: "Producto no encontrado" }); //si no encontramos el producto, respondemos con un error 404
	}

	res.status(204).send(); //respondemos con un estado 204 (sin contenido)
};
