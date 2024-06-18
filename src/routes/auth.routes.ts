import express from "express";
import validateResource from "../middlewares/validateResource";
import { loginSchema } from "../schema/auth.schema";
import authController from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post(
  "/api/auth/login",
  validateResource(loginSchema),
  authController.login
);

export default authRouter;
