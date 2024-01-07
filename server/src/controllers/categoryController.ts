import IRequest from "../types/t.request";
import Category from "../models/Category";
import handler from "express-async-handler";
import { Response } from "express";

// @GET - private - /api/categories
const getCategories = handler(async (req: IRequest, res: Response): Promise<void> => {
  const categories = await Category.find();
  res.status(200).json(categories);
});

export { getCategories };
