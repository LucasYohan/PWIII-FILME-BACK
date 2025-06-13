import express from "express";
import service from '../service/resenhaService.js'

const route = express.Router();

//GET

route.get("/Get", async (request, response) => {

    try {
        const resenha = await service.listResenha();

        if (resenha.length === 0) {
            return response.status(404).send({ message: "Resenha não encontrada." });
        }
        
        response.setHeader('Content-Type', 'application/json');
        return response.status(200).send(resenha);
    }
    catch (error) {
        return response.status(500).send({ message: "Erro interno do servidor." });
    }
});

//POST

route.post("/Post", async (request, response) => {

    const { review, review_user, review_movie } = request.body;

    try {
        await service.createResenha(review, review_user, review_movie)
        return response.status(201).send({ "message": "Resenha cadastrada com sucesso" });
    }
    catch (err) {
        return response.status(500).send(`Erro : ${err}`)
    }
})

//PUT

route.put("/Put/:id_review", async (request, response) => {

    try {
        const { id_review } = request.body;
        const { review } = request.params;

        await service.updateResenha(id_review, review);
        return response.status(201).send({ message: "Resenha atualizada com sucesso" });
    }
    catch (err) {
        return response.status(500).send(`Erro : ${err}`)
    }
})

route.delete("/Delete/:id_review", async (request, response) => {

    const { id_review } = request.params;

    await service.deleteResenha(id_review);

    return response.status(200).send({ message: "Resenha de Fator deletada" });
});

export default route;