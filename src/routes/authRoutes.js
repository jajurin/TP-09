import { Router } from 'express';
import { login, registrar } from '../controllers/authController.js';
import { validarCamposRequeridos } from '../middlewares/validarDatos.js';

const router = Router();

router.post('/register', validarCamposRequeridos(['email', 'nombre_usuario', 'nombre_completo', 'password']), registrar);
router.post('/login', validarCamposRequeridos(['email', 'password']), login);


export default router;


