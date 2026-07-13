import 'dotenv/config';
import { Client } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import DBConfig from '../config/db-config.js';
import logHelper from '../helpers/logHelper.js';

const secretKey = process.env.SECRET_KEY_JWT;

const getByEmailAsync = async (email) => {
  let returnResult = null;
  const client = new Client(DBConfig);
  try {
    await client.connect();
    const sql = `SELECT * FROM usuarios WHERE email = $1`;
    const result = await client.query(sql, [email]);
    returnResult = result.rows[0];
  } catch (error) {
    logHelper.logError(error);
  } finally {
    await client.end();
  }
  return returnResult;
};

const getByNameAsync = async (nombre_usuario) => {
  let returnResult = null;
  const client = new Client(DBConfig);
  try {
    await client.connect();
    const sql = `SELECT * FROM usuarios WHERE nombre_usuario = $1`;
    const result = await client.query(sql, [nombre_usuario]);
    returnResult = result.rows[0];
  } catch (error) {
    logHelper.logError(error);
  } finally {
    await client.end();
  }
  return returnResult;
};

const createAsync = async (entity) => {
  let returnResult = null;
  const client = new Client(DBConfig);
  try {
    await client.connect();
    const sql = `INSERT INTO usuarios (nombre_usuario, nombre_completo, email, password) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [entity.nombre_usuario, entity.nombre_completo, entity.email, entity.password];
    const result = await client.query(sql, values);
    returnResult = result.rows[0];
  } catch (error) {
    logHelper.logError(error);
  } finally {
    await client.end();
  }
  return returnResult;
};

const updateAsync = async (id, entity) => {
  let returnResult = null;
  const client = new Client(DBConfig);
  try {
    await client.connect();
  const sql = ` UPDATE usuarios  SET biografia = $1, nombre_completo = $2, foto_perfil = $3  WHERE id = $4  RETURNING id, nombre_usuario, nombre_completo, email, foto_perfil, biografia`;
    const values = [entity.biografia, entity.nombre_completo, entity.foto_perfil, id];
    const result = await client.query(sql, values);
    returnResult = result.rows[0];
  } catch (error) {
    logHelper.logError(error);
  } finally {
    await client.end();
  }
  return returnResult;
};

const getPerfilConPublicacionesAsync = async (id) => {
  let returnResult = null;
  const client = new Client(DBConfig);
  try {
    await client.connect();
    const sql = `
      SELECT 
        u.id AS usuario_id,
        u.nombre_usuario,
        u.nombre_completo,
        u.email,
        u.foto_perfil,
        u.biografia,
        p.id AS publicacion_id,
        p.url_imagen,
        p.descripcion,
        p.likes,
        p.fecha_creacion
      FROM usuarios u
      LEFT JOIN publicaciones p ON p.usuario_id = u.id
      WHERE u.id = $1
      ORDER BY p.fecha_creacion DESC
    `;
    const result = await client.query(sql, [id]);
    returnResult = result.rows;
  } catch (error) {
    logHelper.logError(error);
  } finally {
    await client.end();
  }
  return returnResult;
};

export const loginUsuario = async ({ email, nombre_usuario, password }) => {
  let usuario = null;

  if (email) {
    usuario = await getByEmailAsync(email);
  }
  if (!usuario && nombre_usuario) {
    usuario = await getByNameAsync(nombre_usuario);
  }
  if (!usuario) {
    throw new Error('Credenciales inválidas');
  }

  const esValida = await bcrypt.compare(password, usuario.password);
  if (!esValida) {
    throw new Error('Credenciales inválidas');
  }

  const payload = {
    id: usuario.id,
  };

  const options = {
    expiresIn: '2h',
    issuer: 'ORT'
  };

  return jwt.sign(payload, secretKey, options);
};

export const registrarUsuario = async ({ email, nombre_usuario, nombre_completo, password }) => {
  const existePorEmail = await getByEmailAsync(email);
  if (existePorEmail) {
    throw new Error('Email ya registrado');
  }

  const existePorNombre = await getByNameAsync(nombre_usuario);
  if (existePorNombre) {
    throw new Error('Nombre de usuario ya registrado');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return createAsync({ nombre_usuario, nombre_completo, email, password: hashedPassword });
};

export const obtenerPerfilUsuario = async (userId) => {
  const filas = await getPerfilConPublicacionesAsync(userId);

  if (!filas || filas.length === 0) {
    throw new Error('Usuario no encontrado');
  }

  const primera = filas[0];

  return {
    id: primera.usuario_id,
    email: primera.email,
    nombre_usuario: primera.nombre_usuario,
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
};

export const editarPerfilUsuario = async (userId, { biografia, nombre_completo, foto_perfil }) => {
  const usuarioActualizado = await updateAsync(userId, { biografia, nombre_completo, foto_perfil });

  if (!usuarioActualizado) {
    throw new Error('Usuario no encontrado');
  }

  return usuarioActualizado;
};