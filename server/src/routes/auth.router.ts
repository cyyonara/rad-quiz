import express, { IRouter } from "express";
import { login, signup } from "../controllers/authController";

const router: IRouter = express.Router();

// @POST - public - /api/auth/signup
router.post("/signup", signup);

// @POST - public - /api/auth/login
router.post("/login", login);

export default router;
