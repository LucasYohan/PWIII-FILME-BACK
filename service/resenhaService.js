import database from '../repository/mysql.js'

//GET

async function listResenha() {
    const sql = "SELECT review FROM review";
    const conn = await database.connectDB();

    try {
        const [rows] = await conn.query(sql);
        return rows;
    } catch (error) {
        console.error("Erro ao executar query no listMP:", error);
        throw error;
    } finally {
        conn.end();
    }
}

//POST

async function createResenha() {
    const sql = " INSERT INTO review (review, review_user, review_movie) VALUES (?,?,?)";

    const bdInfo = [];

    const conn = await database.connectDB();
    await conn.query(sql, bdInfo);
    conn.end();
}

//PUT

async function updateResenha() {

    const sql = "UPDATE review SET review = ? WHERE = id_review = ?"

    const bdInfo = []

    const conn = await database.connectDB();

    await conn.query(sql, bdInfo)

    conn.end();
}

async function deleteResenha(id_review) {

    const sql = "UPDATE review SET deletado = 0 WHERE id_review = ?"

    const conn = await database.connectDB();

    await conn.query(sql, id_review);

    conn.end();
}

export default { listResenha, createResenha, updateResenha, deleteResenha };