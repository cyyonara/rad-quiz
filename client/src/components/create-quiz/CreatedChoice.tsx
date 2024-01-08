import clsx from "clsx";
import { FaCheck } from "react-icons/fa6";
import { MdDelete, MdClose } from "react-icons/md";

interface Props {
  choiceNumber: number;
  label: string;
  isRightAnswer: boolean;
  handleUpdate: () => void;
  handleDelete: () => void;
}

function CreatedChoice({
  choiceNumber,
  label,
  isRightAnswer,
  handleUpdate,
  handleDelete,
}: Props) {
  return (
    <div
      className={clsx("flex flex-col gap-y-1 rounded-md border bg-white p-2", {
        "border-green-600 bg-green-200/20": isRightAnswer,
      })}
    >
      <div
        className={clsx("flex items-center justify-between border-b pb-2", {
          "border-green-600": isRightAnswer,
        })}
      >
        <span
          className={clsx("text-sm font-bold text-cs-dark", {
            "text-green-600": isRightAnswer,
          })}
        >
          Option #{choiceNumber}
        </span>
        <div className="flex items-center gap-x-2">
          <button onClick={handleUpdate} className="text-green-600">
            {isRightAnswer ? <MdClose className="text-red-600" /> : <FaCheck />}
          </button>
          <button onClick={handleDelete} className="text-cs-dark">
            <MdDelete
              className={clsx("text-lg", { "text-green-600": isRightAnswer })}
            />
          </button>
        </div>
      </div>
      <p
        className={clsx(
          "overflow-x-hidden text-ellipsis py-3 text-sm text-cs-dark",
          {
            "text-green-700": isRightAnswer,
          },
        )}
      >
        {label}
      </p>
    </div>
  );
}

export default CreatedChoice;
