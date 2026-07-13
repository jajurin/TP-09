import { Client } from 'pg';
import DBConfig from '../config/db-config.js';
import logHelper from '../helpers/logHelper.js';

const getAllAsync = async () => {
  let returnResult = null;
  const client = new Client(DBConfig);
  try {
    await client.connect();
    const sql = `SELECT * FROM publicaciones ORDER BY fecha_creacion DESC`;
    const result = await client.query(sql);
    returnResult = result.rows;
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
    const sql = `INSERT INTO publicaciones (usuario_id, url_imagen, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [entity.usuario_id, entity.url_imagen, entity.descripcion, 0];
    const result = await client.query(sql, values);
    returnResult = result.rows[0];
  } catch (error) {
    logHelper.logError(error);
  } finally {
    await client.end();
  }
  return returnResult;
};
export const obtenerTodasLasPublicaciones = async () => {
  return getAllAsync();
};

export const crearNuevaPublicacion = async ({ usuario_id, url_imagen, descripcion }) => {
  return createAsync({ usuario_id, url_imagen, descripcion });
};