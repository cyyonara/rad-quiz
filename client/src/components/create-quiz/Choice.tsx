import { MdDelete } from "react-icons/md";
import { QuestionContext } from "./QuizSetup";
import { useContext } from "react";

interface Props {
  label: string;
  questionId: string;
  isRightAnswer: boolean;
  handleUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Choice({ label, questionId, isRightAnswer, handleUpdate }: Props) {
  const { deleteChoices } = useContext(QuestionContext);

  const handleDelete = () => deleteChoices(questionId, label);

  return (
    <div className="flex items-center justify-between gap-x-4">
      <label
        key={label}
        className="flex w-max cursor-pointer items-center gap-x-3"
        htmlFor={label}
      >
        <input
          id={label}
          name={questionId}
          hidden
          type="radio"
          value={label}
          onChange={handleUpdate}
          checked={isRightAnswer}
          className="peer"
        />
        <div className="flex h-[20px] w-[20px] min-w-[20px] items-center justify-center rounded-full border border-gray-300 p-1 peer-checked:border-[2px] peer-checked:border-green-500">
          {isRightAnswer && (
            <span className="h-full w-full rounded-full bg-green-500"></span>
          )}
        </div>
        <span className="italic text-gray-500">{label}</span>
      </label>
      <button onClick={handleDelete} className="text-cs-dark">
        <MdDelete />
      </button>
    </div>
  );
}

export default Choice;
