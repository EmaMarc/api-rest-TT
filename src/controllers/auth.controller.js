import jwt from "jsonwebtoken";

const default_user = {
	id: 1,
	email: "user@email.com",
	password: "password123",
};

export const login = (req, res) => {
	try {
		const { email, password } = req.body;

		// 1. Validar que se hayan enviado ambos campos
		if (!email || !password) {
			return res.status(400).json({ error: "Email y contraseña son obligatorios." });
		}

		// 2. Validar credenciales
		if (email === default_user.email && password === default_user.password) {
			const payload = { user: { id: 1, email } };
			const expiration = { expiresIn: "1h" };

			const token = jwt.sign(payload, process.env.JWT_SECRET, expiration);

			return res.status(200).json({ token });
		}

		// 3. Credenciales incorrectas
		return res.status(401).json({ error: "Credenciales inválidas." });
	} catch (error) {
		// 4. Error inesperado
		return res.status(500).json({ error: "Error interno del servidor." });
	}
};
