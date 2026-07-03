import 'dotenv/config';
import { registrarUsuario } from '../services/usuario-services.js';

const secretKey = process.env.SECRET_KEY_JWT;

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginUsuario({ email, password: password });
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const registrar = async (req, res) => {
  try {
    const { email, nombre_usuario, password } = req.body;
    const nuevoUsuario = await registrarUsuario({ email, nombre_usuario: nombre_usuario, password });
    res.status(201).json({ id: nuevoUsuario.id, email: nuevoUsuario.email });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};