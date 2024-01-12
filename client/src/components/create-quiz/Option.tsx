import { MdDelete } from "react-icons/md";
import { QuestionContext } from "./QuizSetup";
import { useContext, memo, ChangeEvent, FC } from "react";
import clsx from "clsx";

interface Props {
  label: string;
  questionId: string;
  isRightAnswer: boolean;
  handleUpdate: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Option: FC<Props> = ({
  label,
  questionId,
  isRightAnswer,
  handleUpdate,
}: Props) => {
  const { deleteOptions } = useContext(QuestionContext);
  const handleDelete = () => deleteOptions(questionId, label);

  return (
    <div className="flex items-center justify-between gap-x-4 overflow-hidden text-ellipsis break-words">
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
        <div className="flex h-[20px] w-[20px] min-w-[20px] items-center justify-center rounded-full border border-gray-300 p-1 peer-checked:border-[2px] peer-checked:border-cs-dark">
          {isRightAnswer && (
            <span className="h-full w-full rounded-full bg-cs-dark"></span>
          )}
        </div>
        <span
          className={clsx("max-w-full text-sm text-gray-500", {
            "text-cs-dark": isRightAnswer,
          })}
        >
          {label}
        </span>
      </label>
      <button onClick={handleDelete} className="text-cs-dark">
        <MdDelete />
      </button>
    </div>
  );
};

export default memo(Option);
