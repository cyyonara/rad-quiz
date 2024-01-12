import Quiz from "../models/quizModel";
import Category from "../models/categoryModel";
import Question from "../models/questionModel";
import IRequest from "../types/t.request";
import handler from "express-async-handler";
import IQuiz from "../types/t.quiz";
import { Response } from "express";

const createQuiz = handler(async (req: IRequest, res: Response) => {
  let { questions, category, ...rest }: IQuiz = req.body;
  const quiz = new Quiz({ ...rest, author: req.user?._id });
  const dbCategory = await Category.findOne({ categoryName: category });

  quiz.category = dbCategory!._id;
  questions = questions.map((question) => ({ ...question, quizId: quiz._id }));

  const dbQuestions = await Question.insertMany(questions);
  quiz.questions = dbQuestions.map((dbQuestion) => dbQuestion._id);
  await quiz.save();
  res.status(201).json({ message: "Quiz uploaded successfully" });
});

export { createQuiz };
