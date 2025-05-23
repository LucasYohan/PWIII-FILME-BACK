import express from "express";
import service from "../service/LFService.js"

const route = express.Router();

route.get("/", async (req, res) => {
    try {
        const filmes = await service.listFilmes();

        if (!filmes || filmes.length === 0) {
            return res.status(404).send({ message: "Nenhum filme encontrado." });
        }

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(filmes);
    } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        return res.status(500).send({ message: "Erro interno do servidor." });
    }
});

export default route;