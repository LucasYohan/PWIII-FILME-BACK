import express from "express";
import db from "../service/loginService.js"
import { generatePassword, generatedToken } from "../helpers/loginActions.js";

const route = express.Router();

//FAZER LOGIN

route.post('/', async (req, res) => {
  const { name, password } = req.body;

  const user = await db.login(name, password);

  if (!user) {
    return res.status(401).send({ message: 'Usuário ou senha inválidos.' });
  }

  // Gerando o token incluindo o tipo de usuário
  const token = generatedToken(user.id_user, user.name, user.typeUser);

  return res.status(200).send({ token, typeUser: user.typeUser });
});

//RECUPERAR SENHA

route.post("/reset", async (req, res) => {

  const { name } = req.body;

  try {
    const user = await db.checkEmail(name);

    if (user.length > 0) {

      const newPassword = generatePassword();

      await db.changePassword(name, newPassword);

      res.status(200).send({ message: `Nova senha: ${newPassword}` });

    } else res.status(404).send({ message: "Usuario nao encontrado" });

  } catch (err) {

    res.send({ message: `Houve um erro no banco de dados. ${err}` });

  }
});

export default route;