import { Router } from 'express';
import { obtenerPublicaciones } from '../controllers/publicacionesController.js';

const router = Router();

router.get('/', obtenerPublicaciones);

export default router;