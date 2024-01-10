import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import { FC } from "react";

interface Props {
  deleteQuestion: () => void;
  toggleModal: () => void;
}

const QuestionAction: FC<Props> = ({ toggleModal, deleteQuestion }: Props) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.015 }}
      className="absolute right-[12px] top-0 origin-top-right flex-col rounded-md border bg-white text-sm shadow-md duration-200"
    >
      <button
        onClick={toggleModal}
        className="flex w-full items-center justify-center gap-x-1 px-6 py-3 duration-150 hover:bg-gray-100"
      >
        <FaEdit />
        <span className="flex items-end">Edit</span>
      </button>
      <button
        onClick={deleteQuestion}
        className="durta flex items-center justify-center gap-x-1 px-6 py-3 duration-150 hover:bg-gray-100"
      >
        <MdDelete />
        <span className="flex items-end">Delete</span>
      </button>
    </motion.div>
  );
};

export default QuestionAction;
