import { Router } from 'express';
import { login } from '../controllers/authController.js';
import { validarToken } from '../middlewares/validarToken.js';

const router = Router();

router.post('/login', login);  

router.get('/perfil', validarToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;