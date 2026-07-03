import { Client } from 'pg';
import DBConfig from '../config/db-config.js'; 
import logHelper from '../helpers/logHelper.js'; 
export default class PublicacionRepository {
  getAllAsync = async () => {
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
  }

  getByUsuarioIdAsync = async (usuarioId) => {
    let returnResult = null;
    const client = new Client(DBConfig);
    try {
      await client.connect();
      const sql = `SELECT * FROM publicaciones WHERE usuario_id = $1 ORDER BY fecha_creacion DESC`;
      const values = [usuarioId];
      const result = await client.query(sql, values);
      returnResult = result.rows;
    } catch (error) {
      logHelper.logError(error);
    } finally {
      await client.end();
    }
    return returnResult;
  }

  createAsync = async (entity) => {
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
  }
}