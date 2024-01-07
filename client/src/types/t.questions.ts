export interface Option {
  label: string;
  isRightAnswer: boolean;
}

export default interface Question {
  questionId: string;
  question: string;
  options: Option[];
}
