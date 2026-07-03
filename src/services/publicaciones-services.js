import PublicacionRepository from '../repositories/publicacion-repository.js';

const publicacionRepository = new PublicacionRepository();

export const obtenerTodasLasPublicaciones = async () => {
  return publicacionRepository.getAllAsync();
};

export const crearNuevaPublicacion = async ({ usuario_id, url_imagen, descripcion }) => {
  return publicacionRepository.createAsync({ usuario_id, url_imagen, descripcion });
};