import database from '../repository/mysql.js';

async function listFilmes() {
    const sql = "SELECT * FROM movies";
    const conn = await database.connectDB();

    try {
        const [rows] = await conn.query(sql);
        return rows;
    } catch (error) {
        console.error("Erro ao executar query em listFilmes:", error);
        throw error;
    } finally {
        conn.end();
    }
}

export default { listFilmes };