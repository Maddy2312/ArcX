import { Router } from "express";
import { getUser, login, logout, register } from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post('/register', registerValidator, register);
authRouter.post('/login', loginValidator, login);
authRouter.get("/getUser", authenticateUser, getUser)

authRouter.post("/logout", authenticateUser, logout);

export default authRouter;