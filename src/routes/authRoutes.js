import { Router } from 'express';
import { login, registrar } from '../controllers/authController.js';
import { validarToken } from '../middlewares/validarToken.js';

const router = Router();

router.post('/login', login);  

router.get('/perfil', validarToken, (req, res) => {
  res.json({ user: req.user });
});

router.post('/register', registrar);  


export default router;