    import jwt from 'jsonwebtoken';
    import 'dotenv/config';

    const secretKey = process.env.SECRET_KEY_Jwt;

    export const validarToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: 'Token requerido' });
    }

    try {
        const payloadOriginal = jwt.verify(token, secretKey);
        req.user = payloadOriginal; 
        next();
      } catch (e) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
        }
    };