import mongoose from "mongoose";

interface IOption {
  label: string;
  isRightAnswer: boolean;
}

interface IQuestion {
  quizId?: any;
  question: string;
  options: Array<IOption>;
}

interface IQuiz {
  title: string;
  description: string;
  category: string;
  coverPhoto: string;
  questions: Array<IQuestion>;
}

export default IQuiz;
