import usuarioRepository  from '../repositories/repository-province.js';
import { validarProvincia } from '../helpers/validaciones-helper.js';


export default class ProvinceService {

    getAllAsync = async () => {
        const repo = new ProvinceRepository()   
        const returnArray = await repo.getAllAsync()
        return returnArray
    }

  getByIdAsync = async (id) => {

    const repo = new ProvinceRepository();
    const province = await repo.getByIdAsync(id)
    return province;
}
   createAsync = async (body) => {
    validarProvincia(body)
    const repo = new ProvinceRepository()
    return await repo.createAsync(body)
}}