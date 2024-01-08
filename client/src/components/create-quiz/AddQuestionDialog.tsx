import IQuestion from "../../types/t.question";
import CreatedChoice from "./CreatedChoice";
import { useRef, useEffect, useState, ChangeEvent } from "react";
import { Choice } from "../../types/t.question";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { v4 as uuid } from "uuid";

interface Props {
  closeDialog: () => void;
  addQuestion: (question: IQuestion) => void;
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
  const [choices, setChoices] = useState<Choice[]>([]);
  const [inputChoice, setInputChoice] = useState<string>("");
  const [inputQuestion, setInputQuestion] = useState<string>("");
  const questionRef = useRef<HTMLTextAreaElement | null>(null);
  const choicesContainerRef = useRef<HTMLDivElement | null>(null);

  const addNewOption = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputChoice) return;

    if (choices.length >= 10)
      return toast.error("Choices exceed the maximum limit");

    const newChoice = inputChoice.trim();
    const isChoiceExist = choices.find((choice) => choice.label === newChoice);

    if (!isChoiceExist) {
      setChoices([...choices, { label: newChoice, isRightAnswer: false }]);
      setInputChoice("");

      setTimeout(() => {
        choicesContainerRef.current!.scrollTo(
          0,
          choicesContainerRef.current!.scrollHeight,
        );
      }, 10);
    } else {
      toast.error("Choice already exist. Please enter a new one");
    }
  };

  const handleUpdate = (label: string): void => {
    setChoices((prev) =>
      prev.map((choice) => {
        if (choice.label === label) {
          return { ...choice, isRightAnswer: !choice.isRightAnswer };
        } else {
          return { ...choice, isRightAnswer: false };
        }
      }),
    );
  };

  const handleDelete = (label: string): void => {
    setChoices((prev) => prev.filter((choice) => choice.label !== label));
  };

  const handleAddQuestion = () => {
    if (!inputQuestion || choices.length === 0) {
      toast.error(
        "You need to provide a question and choices before you proceed",
      );
    } else if (!choices.find((choice) => choice.isRightAnswer)) {
      toast.error("Please specify the correct answer for this question");
    } else {
      addQuestion({
        questionId: uuid(),
        question: inputQuestion,
        choices,
      });
      setInputQuestion("");
      setChoices([]);
    }
  };

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
              value={inputQuestion}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setInputQuestion(e.target.value)
              }
            ></textarea>
          </div>
          <form onSubmit={addNewOption} className="flex gap-x-3">
            <input
              type="text"
              placeholder="Enter choices..."
              value={inputChoice}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputChoice(e.target.value)
              }
              className="w-0 flex-1 rounded-md border border-cs-dark px-3 text-sm outline-none placeholder:font-roboto placeholder:text-sm"
            />
            <button
              type="submit"
              disabled={inputChoice === ""}
              className="rounded-md bg-cs-dark px-3 py-3 text-xs font-bold text-white duration-150 hover:bg-cs-dark/90 active:bg-cs-dark/80 disabled:bg-gray-400"
            >
              Add choice
            </button>
          </form>
          <div
            className="flex max-h-[200px] flex-col gap-y-2 overflow-y-auto scroll-smooth"
            ref={choicesContainerRef}
          >
            {choices.map((choice, i) => (
              <CreatedChoice
                key={choice.label}
                choiceNumber={i + 1}
                label={choice.label}
                isRightAnswer={choice.isRightAnswer}
                handleUpdate={() => handleUpdate(choice.label)}
                handleDelete={() => handleDelete(choice.label)}
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
            <button
              className="rounded-md border border-cs-dark bg-white px-3 py-2 text-sm text-cs-dark disabled:border-none disabled:bg-gray-300"
              onClick={handleAddQuestion}
              disabled={inputQuestion === "" || choices.length === 0}
            >
              Add question
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AddQuestionDialog;
