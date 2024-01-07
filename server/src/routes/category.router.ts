import protect from "../middlewares/protect";
import express, { IRouter } from "express";
import { getCategories } from "../controllers/categoryController";

const router: IRouter = express.Router();

// @GET - private - /api/categories
router.get("/", protect, getCategories);

export default router;
