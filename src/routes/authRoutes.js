import { Router } from 'express';
import { login, registrar } from '../controllers/authController.js';
import { validarToken } from '../middlewares/validarToken.js';
import { validarCamposRequeridos } from '../middlewares/validarDatos.js';

const router = Router();

router.post('/register', validarCamposRequeridos(['email', 'name', 'password']), registrar);
router.post('/login', validarCamposRequeridos(['email', 'password']), login);


export default router;


