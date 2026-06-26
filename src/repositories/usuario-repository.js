export default class usuarioRepository {
    getAllAsync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql    = `SELECT * FROM province`;
            const result = await client.query(sql);
            returnArray = result.rows;
        } catch (error) {
            logHelper.logError(error);
        }finally {
    await client.end();
         }
        return returnArray;
    }
    
    getByIdAsync = async (idR) => {
        
        let returnResult = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql    = `SELECT * FROM province WHERE id = $1 `;
              const values = [idR];
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
            const sql    = `INSERT INTO province ( name, full_name, latitude, longitude, display_order) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
              const values = [ entity.name, entity.full_name, entity.latitude, entity.longitude, entity.display_order];
            const result = await client.query(sql, values);
            returnResult = result.rows[0];
        } catch (error) {
            logHelper.logError(error);
        }finally {
    await client.end();
       } 
        return returnResult;}}