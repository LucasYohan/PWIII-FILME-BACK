
import database from '../repository/mysql.js'


//GET

async function getUsers() {

    const sql = "SELECT * FROM users WHERE Enabled = false";

    const conn = await database.connectDB();

    try {

        const [rows] = await conn.query(sql);

        return rows

    } catch (error) {

        console.error("Erro ao executar query no getUsers:", error);

        throw error;

    } finally {

        conn.end();
    }
}


//POST


async function createUsers(name, surname, username, email, password, telephone) {

    const sql = "INSERT INTO users(name, surname, username, email, password, telephone ) VALUES (?,?,?,?,?,?)";

    const bdInfo = [name, surname, username, email, password, telephone];

    const conn = await database.connectDB();
    try {
        await conn.query(sql, bdInfo);
    } catch (error) {
        console.error("Erro ao executar query no createUsers:", error);
        throw error;
    } finally {
        conn.end();
    }
}

//PUT


async function updateUsers(name, surname, username, email, password, telephone) {

    const sql = "UPDATE users SET name = ?, surname = ?, username = ?,  email = ?, password = ?, telephone = ? WHERE id_user = ?"

    const bdInfo = [name, surname, username, email, password, telephone]

    const conn = await database.connectDB();

    await conn.query(sql, bdInfo)

    conn.end();
}


//DELETE


async function deleteUsers(id) {

    const sql = "UPDATE users SET habilitado = 1 WHERE id = ? "

    const conn = await database.connectDB();

    await conn.query(sql, id);

    conn.end();
}

export default { getUsers, createUsers, updateUsers, deleteUsers }; 
