import { obtenerPerfilUsuario, editarPerfilUsuario } from '../services/usuario-services.js';

export const obtenerPerfil = async (req, res) => {
  try {
    const perfil = await obtenerPerfilUsuario(req.user.id);
    res.status(200).json(perfil);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const editarPerfil = async (req, res) => {
  try {
    const { biografia, nombre_completo, foto_perfil } = req.body;
    const usuarioActualizado = await editarPerfilUsuario(req.user.id, { biografia, nombre_completo, foto_perfil });
    res.status(200).json(usuarioActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};