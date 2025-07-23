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

// Exporto las funciones que interactúan con el modelo

// retorna all products
export const getAllProducts = async () => {
	try {
		const snapshot = await getDocs(productsCollection);
		return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	} catch (error) {
		console.error("Error getting all products: ", error);
	}
};

// retorna product by ID
export const getProductById = async (id) => {
	try {
		const productRef = doc(productsCollection, id);
		const snapshot = await getDoc(productRef);
		return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
	} catch (error) {
		console.error("Error getting product by ID: ", error);
	}
};

// busca productos por nombre parcial (case-insensitive)
export const searchProductsByName = async (name) => {
	try {
		const snapshot = await getDocs(productsCollection);
		const allProducts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

		const lowerName = name.toLowerCase();

		return allProducts.filter((p) => p.name?.toLowerCase().includes(lowerName));
	} catch (error) {
		console.error("Error searching products:", error);
		throw error;
	}
};

// crea y retorna un nuevo producto
export const createProduct = async (data) => {
	try {
		const docRef = await addDoc(productsCollection, data);
		return { id: docRef.id, ...data };
	} catch (error) {
		console.error("Error creating product: ", error);
	}
};

// elimina un producto por ID
export const deleteProduct = async (id) => {
	try {
		const productRef = doc(productsCollection, id);
		const snapshot = await getDoc(productRef);

		if (!snapshot.exists()) {
			return null; // si el producto no existe, retornamos null
		}

		await deleteDoc(productRef); // eliminamos el producto
		return true;
	} catch (error) {
		console.error("Error deleting product: ", error);
	}
};

// actualiza un producto por ID
export const updateProduct = async (id, data) => {
	try {
		const productRef = doc(productsCollection, id);
		const snapshot = await getDoc(productRef);

		if (!snapshot.exists()) {
			return null; // si no existe el producto, devolvemos null
		}

		await setDoc(productRef, data, { merge: true }); // mergea con los datos existentes
		return { id, ...data }; // retornamos el producto actualizado
	} catch (error) {
		console.error("Error updating product: ", error);
	}
};

