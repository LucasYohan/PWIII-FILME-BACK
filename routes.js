import express from "express";
import userController from "./controller/userController.js"
import loginController from "./controller/loginController.js"
import LFController from "./controller/LFController.js"
import CFController from "./controller/CFController.js"
import homeController from "./controller/homeController.js"

const routes = express();

routes.use("/cadastrar_usuario", userController);
routes.use("/login", loginController);
routes.use("/listar_filme", LFController);
routes.use("/cadastrar_filme", CFController );
routes.use("/home", homeController);

export default routes;