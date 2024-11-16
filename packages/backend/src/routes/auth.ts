import { Router } from "express";
import {
  handleLogin,
  handleRegistration,
  handleLogout,
  handleVerify,
} from "../controllers/authController";

const authRouter = Router();

authRouter.post("/login", handleLogin);
authRouter.post("/register", handleRegistration);
authRouter.get("/logout", handleLogout);
authRouter.get("/verify", handleVerify);


export { authRouter };
