import { Client } from 'pg';
import DBConfig from '../config/db-config.js'; // ajustá el path según tengas armado
import logHelper from '../helpers/logHelper.js'; // ajustá según tu proyecto
export default class usuarioRepository {    
    getByEmailAsync = async (email) => {
        
        let returnResult = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql    = `SELECT * FROM usuarios WHERE email = $1 `;
              const values = [email];
            const result = await client.query(sql, values);
            returnResult = result.rows[0];
        } catch (error) {
            logHelper.logError(error);
        }finally {
    await client.end();
          } 
        return returnResult;

    }
      getByNameAsync = async (name) => {
        
        let returnResult = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql    = `SELECT * FROM usuarios WHERE name = $1 `;
              const values = [name];
            const result = await client.query(sql, values);
            returnResult = result.rows[0];
        } catch (error) {
            logHelper.logError(error);
        }finally {
    await client.end();
          } 
        return returnResult;

    }
    createAsync = async (entity) => {
        let returnResult = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `INSERT INTO usuarios (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
            const values = [entity.name, entity.email, entity.password];
            const result = await client.query(sql, values);
            returnResult = result.rows[0];
        } catch (error) {
            logHelper.logError(error);
        }finally {
    await client.end();
       } 
        return returnResult;}}