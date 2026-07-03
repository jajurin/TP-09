import { Client } from 'pg';
import DBConfig from '../config/db-config.js'; // ajustá el path según tengas armado
import logHelper from '../helpers/logHelper.js'; // ajustá según tu proyecto

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
  };
}