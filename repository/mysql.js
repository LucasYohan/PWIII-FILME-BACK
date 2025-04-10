import mysql from "mysql2/promise";

async function connectDB() {
    return await mysql.createConnection({
        "user":"root",
        "password":"etecembu@123",
        "host":"localhost",
        "port":3306,
        "database":"bd_resenhapop"
    })
}

export default {connectDB};