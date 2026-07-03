import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UsuarioRepository from '../repositories/usuario-repository.js';
const secretKey = process.env.SECRET_KEY_JTW;
const usuarioRepository = new UsuarioRepository();


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
  const filas = await usuarioRepository.getPerfilConPublicacionesAsync(userId);

  if (!filas || filas.length === 0) {
    throw new Error('Usuario no encontrado');
  }

  // Los datos del usuario se repiten en cada fila (por el JOIN), tomo la primera
  const primera = filas[0];

  const perfil = {
    id: primera.usuario_id,
    email: primera.email,
    name: primera.name,
    nombre_completo: primera.nombre_completo,
    biografia: primera.biografia,
    foto_perfil: primera.foto_perfil,
    publicaciones: primera.publicacion_id
      ? filas.map(f => ({
          id: f.publicacion_id,
          url_imagen: f.url_imagen,
          descripcion: f.descripcion,
          likes: f.likes,
          fecha_creacion: f.fecha_creacion
        }))
      : []
  };

  return perfil;
};
export const editarPerfilUsuario = async (userId, { biografia, nombre_completo, foto_perfil }) => {
  const usuarioActualizado = await usuarioRepository.updateAsync(userId, { biografia, nombre_completo, foto_perfil });

  if (!usuarioActualizado) {
    throw new Error('Usuario no encontrado');
  }

  return usuarioActualizado;
};