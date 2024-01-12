import IQuestion from "../../types/t.question";
import Question from "./Question";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import { memo, FC } from "react";
import { IoIosAdd } from "react-icons/io";

interface Props {
  questions: IQuestion[];
  isUploading: boolean;
  openDialog: () => void;
}

const QuestionList: FC<Props> = ({
  openDialog,
  questions,
  isUploading,
}: Props) => {
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex items-center justify-between border-b border-gray-300 pb-2 text-cs-dark">
        <span className="self-end text-sm">
          {questions.length} {questions.length > 1 ? "Questions" : "Question"}
        </span>
        <button
          onClick={openDialog}
          disabled={isUploading}
          className={clsx(
            "flex items-center gap-x-1 rounded-md bg-green-600 p-2 text-sm font-medium uppercase text-white duration-150 hover:bg-green-600/85 focus:bg-green-600/85 disabled:bg-green-600/75",
            { "disabled:cursor-progress": isUploading },
          )}
        >
          <IoIosAdd size={20} />
          Add Question
        </button>
      </div>
      <div className="flex flex-col gap-y-5">
        <AnimatePresence>
          {questions.map((question) => (
            <Question key={question.questionId} {...question} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default memo(QuestionList);
