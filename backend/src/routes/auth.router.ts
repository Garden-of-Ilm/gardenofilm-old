import { Router } from "express";
import { AuthController } from "../controller/auth.contorller";

const authRouter = Router();

const authController = new AuthController();

// Todo: register disable in backend
// authRouter.post('/register', authController.register)
authRouter.post("/login", authController.login);

export default authRouter;
