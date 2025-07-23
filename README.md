Perfecto. A continuación te dejo un `README.md` completo, personalizado y profesional, adaptado a tu proyecto real con Firestore, Express y autenticación por JWT. Incluye estructura, instalación, endpoints y funcionamiento general, pero con un estilo diferente al de tu profesor:

---

````markdown
# 🛠️ API REST - Gestión de Productos

API REST desarrollada con **Node.js**, **Express** y **Firebase Firestore** para gestionar productos. Incluye operaciones CRUD, autenticación con JWT y control de acceso mediante middleware.

---

## 📦 ¿Qué hace esta API?

Esta API permite:

- Consultar productos existentes
- Buscar por nombre
- Obtener un producto específico por ID
- Crear, actualizar y eliminar productos (requiere autenticación)

---

## 🚀 Cómo empezar

### 1. Cloná el repositorio

```bash
git clone https://github.com/tu-usuario/api-productos.git
cd api-productos
```
````

### 2. Instalá las dependencias

```bash
npm install
```

### 3. Configurá el entorno

Copiá el archivo de ejemplo `.env-example` y completá los datos requeridos:

```bash
cp .env-example .env
```

Variables necesarias:

```env
JWT_SECRET=clave-secreta-para-tokens
FIREBASE_API_KEY=...
FIREBASE_PROJECT_ID=...
# etc.
```

### 4. Ejecutá la API

```bash
npm run dev
```

---

## 🔐 Autenticación

Para crear, editar o eliminar productos, es necesario autenticarse vía JWT.  
El endpoint de login genera un token que se debe enviar en el header:

```http
Authorization: Bearer <token>
```

---

## 📘 Endpoints principales

### 🔎 Obtener todos los productos

**GET** `/products`

Devuelve una lista con todos los productos.

---

### 🔍 Buscar productos por nombre

**GET** `/products/search?name=camiseta`

Filtra productos que contienen esa palabra en su nombre (case-insensitive).

---

### 🧾 Obtener producto por ID

**GET** `/products/:id`

Busca un producto por su identificador único.

---

### ➕ Crear un producto

**POST** `/products`  
🔐 Requiere autenticación

Body esperado (JSON):

```json
{
	"name": "Mate Imperial",
	"price": 500
}
```

---

### 🛠️ Actualizar un producto

**PUT** `/products/:id`  
🔐 Requiere autenticación

Reemplaza todos los datos del producto.

---

### ❌ Eliminar un producto

**DELETE** `/products/:id`  
🔐 Requiere autenticación

Elimina un producto permanentemente.

---

## ⚙️ Estado de respuestas

| Código | Significado                 |
| ------ | --------------------------- |
| 200    | OK                          |
| 201    | Recurso creado              |
| 204    | Eliminación exitosa         |
| 400    | Error en los datos enviados |
| 401    | No autorizado (sin token)   |
| 404    | Recurso no encontrado       |
| 500    | Error interno del servidor  |

---

## 🗂️ Estructura del proyecto

```
📁 src/
├── controllers/
│   └── products.controller.js
├── models/
│   └── product.model.js
├── services/
│   └── products.service.js
├── routes/
│   └── products.router.js
├── middlewares/
│   └── auth.middleware.js
└── index.js
```

---

## 🧰 Tecnologías utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Firebase Firestore](https://firebase.google.com/products/firestore)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [nodemon](https://www.npmjs.com/package/nodemon)

---

## ✍️ Autor

Emanuel Marcello  
Licenciatura en Sistemas - Cátedra de Backend/API REST

---

¿Querés probar la API con Insomnia o Postman?  
Importá el token desde `/login` y accedé a las rutas protegidas ✅

```

---

¿Querés que te prepare también el `.env-example`, una colección de Insomnia, o una documentación con Swagger?
```
