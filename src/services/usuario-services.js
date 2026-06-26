import usuarioRepository from '../repositories/usuario-repository.js';
import { validarProvincia } from '../helpers/validaciones-helper.js';


export default class usuarioService {

    getAllAsync = async () => {
        const repo = new usuarioRepository()   
        const returnArray = await repo.getAllAsync()
        return returnArray
    }

  getByIdAsync = async (id) => {

    const repo = new usuarioRepository();
    const usuario = await repo.getByIdAsync(id)
    return usuario;
}
   createAsync = async (body) => {
    validarProvincia(body)
    const repo = new usuarioRepository()
    return await repo.createAsync(body)
}}