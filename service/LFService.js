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

async function deletarFilme(id) {
  const conn = await database.connectDB();
  const [result] = await conn.query("DELETE FROM movies WHERE id_movie = ?", [id]);
  await conn.end();
  return result.affectedRows;
}

async function atualizarFilme(id, dados) {
  const conn = await database.connectDB();
  const [result] = await conn.query(
    "UPDATE movies SET name_movie=?, director=?, release_date=?, gender_movie=?, age_range=?, main_actor=?, synopsis=?, imagem=? WHERE id_movie=?",
    [
      dados.name_movie,
      dados.director,
      dados.release_date,
      dados.gender_movie,
      dados.age_range,
      dados.main_actor,
      dados.synopsis,
      dados.imagem,
      id
    ]
  );
  await conn.end();
  return result.affectedRows;
}

async function criarFilme(dados) {
  const db = await database.connectDB();
  const sql = `
    INSERT INTO movies (name_movie, director, release_date, gender_movie, age_range, main_actor, synopsis, imagem)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    dados.name_movie,
    dados.director,
    dados.release_date,
    dados.gender_movie,
    dados.age_range,
    dados.main_actor,
    dados.synopsis,
    dados.imagem
  ];

  const [result] = await db.execute(sql, values);
  return { id_movie: result.insertId, ...dados };
}



export default { listFilmes, deletarFilme, atualizarFilme, criarFilme };