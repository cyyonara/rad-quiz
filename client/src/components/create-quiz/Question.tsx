import IQuestion from "../../types/t.question";
import Choice from "./Choice";
import { SlOptionsVertical } from "react-icons/sl";
import { QuestionContext } from "./QuizSetup";
import { useContext } from "react";
import { motion } from "framer-motion";

interface Props extends IQuestion {}

function Question({ questionId, question, choices }: Props) {
  const { updateCorrectAnswer } = useContext(QuestionContext);

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      updateCorrectAnswer(questionId, e.target.value);
    }
  };

  return (
    <motion.div
      key={questionId}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex max-w-[810px] flex-1 flex-col gap-y-6 rounded-md p-3 text-cs-dark shadow-[0_0_4px_rgba(0,0,0,0.3)]"
    >
      <div className="flex items-start justify-between">
        <p className="w-full break-words font-medium">{question}</p>
        <div className="relative cursor-pointer">
          <SlOptionsVertical />
        </div>
      </div>
      <div className="flex flex-col gap-y-3">
        {choices.map(({ label, isRightAnswer }) => (
          <Choice
            key={label}
            label={label}
            questionId={questionId}
            isRightAnswer={isRightAnswer}
            handleUpdate={handleUpdate}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default Question;
