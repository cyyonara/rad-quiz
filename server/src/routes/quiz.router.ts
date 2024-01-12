import express, { IRouter } from "express";
import protect from "../middlewares/protect";
import { createQuiz } from "../controllers/quiz.controller";

const router: IRouter = express.Router();

router.post("/", protect, createQuiz);

export default router;
