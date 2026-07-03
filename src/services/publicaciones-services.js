import PublicacionRepository from '../repositories/publicacion-repository.js';

const publicacionRepository = new PublicacionRepository();

export const obtenerTodasLasPublicaciones = async () => {
  return publicacionRepository.getAllAsync();
};