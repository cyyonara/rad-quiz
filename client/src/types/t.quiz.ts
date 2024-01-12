import IQuestion from "./t.question";

interface IQuiz {
  title: string;
  description: string;
  category: string;
  coverPhoto: string;
  questions: Array<IQuestion>;
}

export default IQuiz;
