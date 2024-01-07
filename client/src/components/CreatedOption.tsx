import clsx from "clsx";

import { MdDelete, MdClose } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

interface Props {
  optionNumber: number;
  label: string;
  isRightAnswer: boolean;
  handleUpdate: () => void;
}

function CreatedOption({
  optionNumber,
  label,
  isRightAnswer,
  handleUpdate,
}: Props) {
  return (
    <div
      className={clsx("flex flex-col gap-y-1 rounded-md border p-2", {
        "border-green-600": isRightAnswer,
      })}
    >
      <div className="flex items-center justify-between border-b pb-2">
        <span className="text-sm font-bold text-cs-dark">
          Option #{optionNumber}
        </span>
        <div className="flex items-center gap-x-2">
          <button onClick={handleUpdate} className="text-green-600">
            {isRightAnswer ? <MdClose className="text-red-600" /> : <FaCheck />}
          </button>
          <button className="text-cs-dark">
            <MdDelete className="text-lg" />
          </button>
        </div>
      </div>
      <p className="overflow-x-hidden text-ellipsis py-3 text-sm text-cs-dark">
        {label}
      </p>
    </div>
  );
}

export default CreatedOption;
