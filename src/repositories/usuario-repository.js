import { Client } from 'pg';
import DBConfig from '../config/db-config.js'; 
import logHelper from '../helpers/logHelper.js'; 
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
      getByNameAsync = async (nombre_usuario) => {
        
        let returnResult = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql    = `SELECT * FROM usuarios WHERE nombre_usuario = $1 `;
              const values = [nombre_usuario];
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
}
    
    
    getByIdAsync = async (id) => {
    let returnResult = null;
    const client = new Client(DBConfig);
    try {
        await client.connect();
        const sql = `SELECT * FROM usuarios WHERE id = $1`;
        const values = [id];
        const result = await client.query(sql, values);
        returnResult = result.rows[0];
    } catch (error) {
        logHelper.logError(error);
    } finally {
        await client.end();
    }
    return returnResult;
}

updateAsync = async (id, entity) => {
    let returnResult = null;
    const client = new Client(DBConfig);
    try {
        await client.connect();
        const sql = `UPDATE usuarios SET biografia = $1, nombre_completo = $2, foto_perfil = $3 WHERE id = $4 RETURNING *`;
        const values = [entity.biografia, entity.nombre_completo, entity.foto_perfil, id];
        const result = await client.query(sql, values);
        returnResult = result.rows[0];
    } catch (error) {
        logHelper.logError(error);
    } finally {
        await client.end();
    }
    return returnResult;
}
    
    getPerfilConPublicacionesAsync = async (id) => {
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
        const values = [id];
        const result = await client.query(sql, values);
        returnResult = result.rows;
    } catch (error) {
        logHelper.logError(error);
    } finally {
        await client.end();
    }
    return returnResult;
}
    
    }

