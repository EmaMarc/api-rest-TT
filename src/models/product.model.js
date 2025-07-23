import fs from "fs";
import path from "path";
import { db } from "./data.js";
import { collection, getDocs, doc, getDoc, addDoc, deleteDoc, setDoc } from "firebase/firestore";

const __dirname = import.meta.dirname;

// Defino el path del archivo products.json
const jsonPath = path.join(__dirname, "./products.json");
// Leo el archivo products.json desde el path
const json = fs.readFileSync(jsonPath, "utf-8");
// Parseo el json a objeto
const products = JSON.parse(json);

const productsCollection = collection(db, "products");

// Retorna todos los productos
export const getAllProducts = async () => {
	try {
		const snapshot = await getDocs(productsCollection);
		return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	} catch (error) {
		console.error("Error getting all products:", error);
		throw new Error("No se pudieron obtener los productos.");
	}
};

// Retorna un producto por ID
export const getProductById = async (id) => {
	try {
		const productRef = doc(productsCollection, id);
		const snapshot = await getDoc(productRef);
		return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
	} catch (error) {
		console.error(`Error getting product by ID (${id}):`, error);
		throw new Error("No se pudo obtener el producto.");
	}
};

// Busca productos por nombre parcial (case-insensitive)
export const searchProductsByName = async (name) => {
	try {
		const snapshot = await getDocs(productsCollection);
		const allProducts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		const lowerName = name.toLowerCase();
		return allProducts.filter((p) => p.name?.toLowerCase().includes(lowerName));
	} catch (error) {
		console.error("Error searching products:", error);
		throw new Error("No se pudieron buscar los productos.");
	}
};

// Crea y retorna un nuevo producto
export const createProduct = async (data) => {
	try {
		const docRef = await addDoc(productsCollection, data);
		return { id: docRef.id, ...data };
	} catch (error) {
		console.error("Error creating product:", error);
		throw new Error("No se pudo crear el producto.");
	}
};

// Elimina un producto por ID
export const deleteProduct = async (id) => {
	try {
		const productRef = doc(productsCollection, id);
		const snapshot = await getDoc(productRef);

		if (!snapshot.exists()) {
			return null; // Producto no encontrado
		}

		await deleteDoc(productRef);
		return true;
	} catch (error) {
		console.error(`Error deleting product (${id}):`, error);
		throw new Error("No se pudo eliminar el producto.");
	}
};

// Actualiza un producto por ID
export const updateProduct = async (id, data) => {
	try {
		const productRef = doc(productsCollection, id);
		const snapshot = await getDoc(productRef);

		if (!snapshot.exists()) {
			return null; // Producto no encontrado
		}

		await setDoc(productRef, data, { merge: true });
		return { id, ...data };
	} catch (error) {
		console.error(`Error updating product (${id}):`, error);
		throw new Error("No se pudo actualizar el producto.");
	}
};


