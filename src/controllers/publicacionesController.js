import { obtenerTodasLasPublicaciones, crearNuevaPublicacion } from '../services/publicaciones-services.js';

export const obtenerPublicaciones = async (req, res) => {
  try {
    const publicaciones = await obtenerTodasLasPublicaciones();
    res.status(200).json(publicaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const crearPublicacion = async (req, res) => {
  try {
    const { url_imagen, descripcion } = req.body;
    const nuevaPublicacion = await crearNuevaPublicacion({
      usuario_id: req.user.id, 
      url_imagen,
      descripcion
    });
    res.status(201).json(nuevaPublicacion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};