import express from "express";
import db from "../service/loginService.js"
import { generatedToken } from "../helpers/loginActions.js";

const route = express.Router();

//FAZER LOGIN

route.post('/', async (req, res) => {
  const { username, password } = req.body;
  const user = await db.login(username, password);

  if (!user) {
    return res.status(401).send({ message: 'Usuário ou senha inválidos.' });
  }

  const token = generatedToken(user.typeUser, user.id_user, user.username);

  return res.status(200).send({ token, typeUser: user.typeUser, id_user: user.id_user, username: user.username});
});


export default route;