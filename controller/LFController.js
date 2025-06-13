import express from "express";
import service from "../service/LFService.js";

const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const filmes = await service.listFilmes();
    if (!filmes || filmes.length === 0) {
      return res.status(404).send({ message: "Nenhum filme encontrado." });
    }
    return res.status(200).json(filmes);
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    return res.status(500).send({ message: "Erro interno do servidor." });
  }
});

route.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const affectedRows = await service.deletarFilme(Number(id));
    if (affectedRows === 0) {
      return res.status(404).send({ message: "Filme não encontrado." });
    }
    return res.status(200).send({ message: "Filme excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir filme:", error);
    return res.status(500).send({ message: "Erro interno do servidor." });
  }
});

route.put("/:id", async (req, res) => {
  const { id } = req.params;
  const dados = req.body;
  try {
    const affectedRows = await service.atualizarFilme(Number(id), dados);
    if (affectedRows === 0) {
      return res.status(404).send({ message: "Filme não encontrado." });
    }
    return res.status(200).send({ message: "Filme atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar filme:", error);
    return res.status(500).send({ message: "Erro interno do servidor." });
  }
});

route.post("/", async (req, res) => {
  try {
    const novoFilme = await service.criarFilme(req.body);
    res.status(201).json(novoFilme);
  } catch (error) {
    console.error("Erro ao criar filme:", error);
    res.status(500).json({ message: "Erro ao criar filme" });
  }
});


export default route;