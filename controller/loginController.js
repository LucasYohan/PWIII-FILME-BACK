import express from "express";
import db from "../service/loginService.js"
import { generatePassword, generatedToken } from "../helpers/loginActions.js";

const route = express.Router();

//FAZER LOGIN

route.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await db.login(username, password);

  console.log(user)

  if (!user) {
    return res.status(401).send({ message: 'Usuário ou senha inválidos.' });
  }


  return res.status(200).send({ typeUser: user.typeUser });

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