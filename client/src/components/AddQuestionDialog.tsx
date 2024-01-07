import Question from "../types/t.questions";
import { useRef, useEffect, useState } from "react";
import { Option } from "../types/t.questions";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import CreatedOption from "./CreatedOption";

interface Props {
  closeDialog: () => void;
  addQuestion: (question: Question) => void;
}

const dialog = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

function AddQuestionDialog({ closeDialog, addQuestion }: Props) {
  const [options, setOptions] = useState<Option[]>([]);
  const [inputOption, setInputOption] = useState<string>("");
  const questionRef = useRef<HTMLTextAreaElement | null>(null);
  const optionsContainerRef = useRef<HTMLDivElement | null>(null);

  const addNewOption = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!inputOption) return;
    const newOption = inputOption.trim();
    const isOptionExist = options.find(
      (option) => option.label.toLowerCase() === newOption.toLowerCase(),
    );

    if (!isOptionExist) {
      setOptions([...options, { label: newOption, isRightAnswer: false }]);
      setInputOption("");
    } else {
      toast.error("Choice already exist. Please enter a new one");
    }
  };

  const handleUpdateOption = (label: string) => {
    setOptions((prev) =>
      prev.map((option) => {
        if (option.label.toLowerCase() === label.toLowerCase()) {
          return { ...option, isRightAnswer: !option.isRightAnswer };
        } else {
          return { ...option, isRightAnswer: false };
        }
      }),
    );
  };

  useEffect(() => {
    optionsContainerRef.current!.scrollTo(
      0,
      optionsContainerRef.current!.scrollHeight,
    );
  }, [options]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    questionRef.current?.focus();
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      variants={dialog}
      initial="initial"
      animate="animate"
      exit="initial"
      transition={{ delay: 0.15 }}
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 text-cs-dark"
    >
      <div className="flex max-w-[500px] flex-1 flex-col gap-y-4 rounded-md bg-white p-6 shadow-md">
        <div className="flex items-center gap-x-3 border-b pb-4">
          <h2 className="text-lg font-extrabold uppercase">Add new question</h2>
        </div>
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-col gap-y-1 ">
            <label
              htmlFor="question"
              className="text-sm after:ml-1 after:text-red-600 after:content-['*']"
            >
              Question
            </label>
            <textarea
              ref={questionRef}
              id="question"
              cols={20}
              rows={5}
              className="resize-none rounded-md border border-cs-dark p-3 text-sm text-cs-dark outline-none"
            ></textarea>
          </div>
          <form onSubmit={addNewOption} className="flex gap-x-3">
            <input
              type="text"
              placeholder="Enter choices..."
              value={inputOption}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputOption(e.target.value)
              }
              className="w-0 flex-1 rounded-md border border-cs-dark px-3 text-sm outline-none placeholder:font-roboto placeholder:text-sm"
            />
            <button
              type="submit"
              disabled={inputOption === ""}
              className="rounded-md bg-cs-dark px-3 py-3 text-xs font-bold text-white duration-150 hover:bg-cs-dark/90 active:bg-cs-dark/80 disabled:bg-gray-400"
            >
              Add choice
            </button>
          </form>
          <div
            className="flex max-h-[200px] flex-col gap-y-2 overflow-y-auto scroll-smooth"
            ref={optionsContainerRef}
          >
            {options.map((option, i) => (
              <CreatedOption
                key={option.label}
                optionNumber={i + 1}
                label={option.label}
                isRightAnswer={option.isRightAnswer}
                handleUpdate={() => handleUpdateOption(option.label)}
              />
            ))}
          </div>
          <div className="flex items-center justify-end gap-x-2 border-t pt-4">
            <button
              onClick={closeDialog}
              className="rounded-md bg-gray-200 px-3 py-2 text-sm text-cs-dark"
            >
              Close
            </button>
            <button className="rounded-md border border-cs-dark bg-white px-3 py-2 text-sm text-cs-dark">
              Add question
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AddQuestionDialog;
