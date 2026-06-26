import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secretKey = process.env.SECRET_KEY_JTW;

export const login = (req, res) => {
  const { username, password } = req.body;

  const payload = {
    id: 123,
    username: username
  };

  const options = {
    expiresIn: '1h',
    issuer: 'ORT'
  };

  const token = jwt.sign(payload, secretKey, options);

  res.json({ token });
};
export const registrar = (req, res) => {   


    
}