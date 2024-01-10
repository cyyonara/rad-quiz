import clsx from "clsx";
import { FaCheck } from "react-icons/fa6";
import { MdDelete, MdClose } from "react-icons/md";
import { memo, FC } from "react";

interface Props {
  optionNumber: number;
  label: string;
  isRightAnswer: boolean;
  handleUpdate: () => void;
  handleDelete: () => void;
}

const CreatedOption: FC<Props> = ({
  optionNumber,
  label,
  isRightAnswer,
  handleUpdate,
  handleDelete,
}: Props) => {
  return (
    <div
      className={clsx("flex flex-col gap-y-1 rounded-md border p-2", {
        "border-green-600 bg-green-100/30": isRightAnswer,
      })}
    >
      <div
        className={clsx("flex items-center justify-between border-b pb-2", {
          "border-green-600": isRightAnswer,
        })}
      >
        <span
          className={clsx("text-sm text-cs-dark", {
            "text-green-600": isRightAnswer,
          })}
        >
          Option #{optionNumber}
        </span>
        <div className="flex items-center gap-x-2">
          <button onClick={handleUpdate} className="text-green-600">
            {isRightAnswer ? <MdClose className="text-red-600" /> : <FaCheck />}
          </button>
          <button onClick={handleDelete} className="text-cs-dark">
            <MdDelete className="text-lg" />
          </button>
        </div>
      </div>
      <p
        className={clsx(
          "overflow-x-hidden text-ellipsis py-1 text-sm text-cs-dark",
          {
            "text-green-700": isRightAnswer,
          },
        )}
      >
        {label}
      </p>
    </div>
  );
};

export default memo(CreatedOption);
