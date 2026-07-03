import { Router } from 'express';
import { obtenerPublicaciones, crearPublicacion } from '../controllers/publicacionesController.js';
import { validarToken } from '../middlewares/validarToken.js';
import { validarCamposRequeridos } from '../middlewares/validarDatos.js';

const router = Router();

router.get('/', obtenerPublicaciones);
router.post('/', validarToken, validarCamposRequeridos(['url_imagen', 'descripcion']), crearPublicacion);

export default router;