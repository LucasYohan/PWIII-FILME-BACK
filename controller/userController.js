import express from "express";
import service from '../service/userService.js'


const route = express.Router();

//GET

route.get("/Get", async (request, response) => {
    try {

        const users = await service.getUsers();

        if (users.length === 0) {

            return response.status(404).send({ message: "Usuario não encontrado." });
        }

        return response.status(200).send(users);

    } catch (error) {

        console.error("Erro no GET", error);

        return response.status(500).send({ message: "Erro interno do servidor." });
    }
});


//POST


route.post("/Post", verifyUserType("admin"), async (req, res) => {
    const { name, surname, username, email, password, telephone } = req.body;


    if (!name || !surname || !username || !email || !password || !telephone) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    try {
        await service.createUsers(name, surname, username, email, password, telephone);
        return res.status(201).json({ message: "Usuário cadastrado com sucesso" });
    } catch (err) {
        console.error("Erro no POST:", err);
        return res.status(500).json({ error: err.message });
    }
});



//PUT


route.put("/Put/:id_users", async (request, response) => {

    const { name, surname, username, email, password, telephone } = request.body;

    const { id_users } = request.params;

    await service.updateUsers(name, surname, username, email, password, telephone, id_users);

    return response.status(201).send({ message: "Usuario atualizado com sucesso" });

})


//DELETE


route.delete("/Delete/:id_users", async (request, response) => {

    const { id_users } = request.params;

    await service.deleteUsers(id_users);

    return response.status(201).send({ message: "Usuario deletado" });
});


export default route;