import express from "express";
import userController from "./controller/userController.js"
import loginController from "./controller/loginController.js"
import LFController from "./controller/LFController.js"
import resenhaController from "./controller/resenhaController.js"
import { verifyJWT } from "./middleware/jwt.js";

const routes = express();

routes.use("/Cadastrar_usuario", userController);
routes.use("/login", loginController);
routes.use("/filmes", verifyJWT, LFController);
routes.use("/resenha", verifyJWT, resenhaController)

export default routes;