import { obtenerTodasLasPublicaciones } from '../services/publicaciones-services.js';

export const obtenerPublicaciones = async (req, res) => {
  try {
    const publicaciones = await obtenerTodasLasPublicaciones();
    res.status(200).json(publicaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};