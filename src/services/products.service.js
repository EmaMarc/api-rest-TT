import * as model from "../models/product.model.js";

export const getAllProducts = () => {
	return model.getAllProducts();
};

export const getProductById = (id) => {
	return model.getProductById(id);
};
