import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UsuarioRepository from '../repositories/usuario-repository.js';
import PublicacionRepository from '../repositories/publicacion-repository.js';

const secretKey = process.env.SECRET_KEY_JTW;
const usuarioRepository = new UsuarioRepository();
const publicacionRepository = new PublicacionRepository();


export const loginUsuario = async ({ email, nickname, password }) => {
  let usuario = null;

  if (email) {
    usuario = await usuarioRepository.getByEmailAsync(email);
  }

  if (!usuario && nickname) {
    usuario = await usuarioRepository.getByNameAsync(nickname);
  }

  if (!usuario) {
    throw new Error('Credenciales inválidas');
  }
  // Compara la contraseña ingresada contra el hash guardado en la BD
  const esValida = await bcrypt.compare(password, usuario.password);
  if (!esValida) {
    throw new Error('Credenciales inválidas');
  }

  const payload = {
    id: usuario.id,
    email: usuario.email,
    name: usuario.name
  };

  const options = {
    expiresIn: '2h',
    issuer: 'ORT'
  };

  return jwt.sign(payload, secretKey, options);
};

export const registrarUsuario = async ({ email, name, password }) => {
  const existePorEmail = await usuarioRepository.getByEmailAsync(email);
  if (existePorEmail) {
    throw new Error('Email ya registrado');
  }

  const existePorNombre = await usuarioRepository.getByNameAsync(name);
  if (existePorNombre) {
    throw new Error('Nickname ya registrado');
  }
  // Genera un hash de la contraseña (con 10 rondas de salt) para no guardarla en texto plano en la BD
  const hashedPassword = await bcrypt.hash(password, 10);

  return usuarioRepository.createAsync({ name, email, password: hashedPassword });
};



export const obtenerPerfilUsuario = async (userId) => {
  const usuario = await usuarioRepository.getByIdAsync(userId);
  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }

  const publicaciones = await publicacionRepository.getByUsuarioIdAsync(userId);

  return {
    id: usuario.id,
    email: usuario.email,
    name: usuario.name,
    nombre_completo: usuario.nombre_completo,
    biografia: usuario.biografia,
    foto_perfil: usuario.foto_perfil,
    publicaciones
  };
};

export const editarPerfilUsuario = async (userId, { biografia, nombre_completo, foto_perfil }) => {
  return usuarioRepository.updateAsync(userId, { biografia, nombre_completo, foto_perfil });
};