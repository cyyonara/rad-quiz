import IQuestion from "../../types/t.question";
import Question from "./Question";
import { AnimatePresence } from "framer-motion";
import { memo, FC } from "react";

interface Props {
  questions: IQuestion[];
}

const QuestionList: FC<Props> = ({ questions }: Props) => {
  return (
    <div className="flex flex-col gap-y-8">
      <div className="border-b border-gray-300 py-4 font-bold text-cs-dark">
        {questions.length} {questions.length > 1 ? "Questions" : "Question"}
      </div>
      <div className="flex flex-col gap-y-5">
        <AnimatePresence>
          {questions.map(({ questionId, question, options }) => (
            <Question
              key={questionId}
              questionId={questionId}
              question={question}
              options={options}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default memo(QuestionList);
