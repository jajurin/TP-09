import { Router } from 'express';
import { obtenerPerfil, editarPerfil } from '../controllers/usuariosController.js';
import { validarToken } from '../middlewares/validarToken.js';

const router = Router();

router.get('/perfil', validarToken, obtenerPerfil);
router.put('/perfil', validarToken, editarPerfil);

export default router;