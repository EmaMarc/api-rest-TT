import * as model from "../models/product.model.js";

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
	try {
		const products = await model.getAllProducts();
		res.json(products);
	} catch (error) {
		console.error("Error al obtener productos:", error);
		res.status(500).json({ error: "No se pudieron obtener los productos." });
	}
};

// Buscar producto por nombre
export const searchProduct = async (req, res) => {
	const { name } = req.query;

	if (!name) {
		return res.status(400).json({ error: "Falta el parámetro 'name' en la query." });
	}

	try {
		const filtered = await model.searchProductsByName(name);

		if (filtered.length === 0) {
			return res.status(404).json({ message: "No se encontraron productos que coincidan con el nombre." });
		}

		res.json(filtered);
	} catch (error) {
		console.error("Error al buscar productos:", error);
		res.status(500).json({ error: "Ocurrió un error al buscar productos." });
	}
};

// Obtener producto por ID
export const getProductById = async (req, res) => {
	const { id } = req.params;

	try {
		const product = await model.getProductById(id);

		if (!product) {
			return res.status(404).json({ error: "Producto no encontrado." });
		}

		res.json(product);
	} catch (error) {
		console.error(`Error al obtener producto con ID ${id}:`, error);
		res.status(500).json({ error: "No se pudo obtener el producto." });
	}
};

// Crear un producto
export const createProduct = async (req, res) => {
	const data = req.body;

	if (!data || Object.keys(data).length === 0) {
		return res.status(400).json({ error: "No se enviaron datos para crear el producto." });
	}

	try {
		const newProduct = await model.createProduct(data);
		res.status(201).json(newProduct);
	} catch (error) {
		console.error("Error al crear producto:", error);
		res.status(500).json({ error: "No se pudo crear el producto." });
	}
};

// Actualizar producto por ID
export const updateProduct = async (req, res) => {
	const productId = req.params.id;
	const data = req.body;

	if (!data || Object.keys(data).length === 0) {
		return res.status(400).json({ error: "No se enviaron datos para actualizar." });
	}

	try {
		const updatedProduct = await model.updateProduct(productId, data);

		if (!updatedProduct) {
			return res.status(404).json({ error: "Producto no encontrado." });
		}

		res.json(updatedProduct);
	} catch (error) {
		console.error(`Error al actualizar producto ${productId}:`, error);
		res.status(500).json({ error: "No se pudo actualizar el producto." });
	}
};

// Eliminar producto por ID
export const deleteProduct = async (req, res) => {
	const productId = req.params.id;

	try {
		const result = await model.deleteProduct(productId);

		if (!result) {
			return res.status(404).json({ error: "Producto no encontrado." });
		}

		res.status(204).send(); // No Content
	} catch (error) {
		console.error(`Error al eliminar producto ${productId}:`, error);
		res.status(500).json({ error: "No se pudo eliminar el producto." });
	}
};
