export interface Option {
  label: string;
  isRightAnswer: boolean;
}

export default interface IQuestion {
  questionId: string;
  question: string;
  options: Array<Option>;
}
