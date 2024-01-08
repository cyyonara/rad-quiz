export interface Choice {
  label: string;
  isRightAnswer: boolean;
}

export default interface IQuestion {
  questionId: string;
  question: string;
  choices: Choice[];
}
