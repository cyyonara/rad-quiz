import IQuestion from "../../types/t.question";
import CreatedOption from "./CreatedOption";
import ToastAlert from "./ToastAlert";
import { Option } from "../../types/t.question";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { v4 as uuid } from "uuid";
import {
  useRef,
  useEffect,
  useState,
  useCallback,
  ChangeEvent,
  FC,
} from "react";

interface Props {
  closeDialog: () => void;
  addQuestion: (question: IQuestion) => void;
}

const AddQuestionDialog: FC<Props> = ({ closeDialog, addQuestion }: Props) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [inputOption, setInputOption] = useState<string>("");
  const [inputQuestion, setInputQuestion] = useState<string>("");
  const questionRef = useRef<HTMLTextAreaElement | null>(null);
  const optionsContainerRef = useRef<HTMLDivElement | null>(null);

  const addNewOption = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputOption) return;

    if (options.length >= 10) {
      return toast(<ToastAlert message="Options exceed the maximum limit" />);
    }

    const newOption = inputOption.trim();
    const isOptionExist = options.find((option) => option.label === newOption);

    if (!isOptionExist) {
      setOptions([...options, { label: newOption, isRightAnswer: false }]);
      setInputOption("");
      setTimeout(() => {
        optionsContainerRef.current!.scrollTo(
          0,
          optionsContainerRef.current!.scrollHeight,
        );
      }, 10);
    } else {
      toast(
        <ToastAlert message="Option already exist. Please try another one" />,
      );
    }
  };

  const handleUpdate = useCallback((label: string) => {
    setOptions((prev) =>
      prev.map((option) => {
        if (option.label === label) {
          return { ...option, isRightAnswer: !option.isRightAnswer };
        } else {
          return { ...option, isRightAnswer: false };
        }
      }),
    );
  }, []);

  const handleDelete = useCallback((label: string) => {
    setOptions((prev) => prev.filter((option) => option.label !== label));
  }, []);

  const handleAddQuestion = () => {
    if (!inputQuestion || options.length === 0) {
      toast(
        <ToastAlert message="Please provide a question and options before you proceed" />,
      );
    } else if (!options.find((option) => option.isRightAnswer)) {
      toast(
        <ToastAlert message=" Please specify the correct answer for this question." />,
      );
    } else {
      addQuestion({
        questionId: uuid(),
        question: inputQuestion,
        options,
      });
      questionRef.current?.focus();
      setInputQuestion("");
      setOptions([]);
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.01 }}
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/60 text-cs-dark"
    >
      <div className="flex max-w-[500px] flex-1 flex-col gap-y-4 rounded-md bg-white p-6 shadow-md">
        <div className="flex items-center gap-x-3 border-b pb-4">
          <h2 className="text-lg font-extrabold uppercase">Add Question</h2>
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
              id="question"
              ref={questionRef}
              cols={20}
              rows={5}
              className="resize-none rounded-md border border-gray-300 p-3 text-sm text-cs-dark outline-none focus:border-cs-dark"
              value={inputQuestion}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setInputQuestion(e.target.value)
              }
            ></textarea>
          </div>
          <form onSubmit={addNewOption} className="flex gap-x-3">
            <input
              type="text"
              placeholder="Enter option..."
              value={inputOption}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputOption(e.target.value)
              }
              className="w-0 flex-1 rounded-md border border-gray-300 px-3 text-sm outline-none placeholder:font-roboto placeholder:text-sm focus:border-cs-dark"
            />
            <button
              type="submit"
              disabled={inputOption === ""}
              className="rounded-md bg-cs-dark px-3 py-3 text-xs font-bold text-white duration-150 hover:bg-cs-dark/90 active:bg-cs-dark/80 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-gray-500"
            >
              Add option
            </button>
          </form>
          <div
            className="flex max-h-[400px] flex-col gap-y-2 overflow-y-auto scroll-smooth"
            ref={optionsContainerRef}
          >
            {options.map((option, i) => (
              <CreatedOption
                key={option.label}
                optionNumber={i + 1}
                label={option.label}
                isRightAnswer={option.isRightAnswer}
                handleUpdate={() => handleUpdate(option.label)}
                handleDelete={() => handleDelete(option.label)}
              />
            ))}
          </div>
          <div className="flex items-center justify-end gap-x-2 border-t pt-4">
            <button
              onClick={closeDialog}
              className="rounded-md bg-gray-200 px-3 py-2 text-sm text-cs-dark duration-150 hover:bg-gray-300"
            >
              Close
            </button>
            <button
              className="b rounded-md bg-green-600 px-3 py-2 text-sm text-white duration-150   disabled:cursor-not-allowed disabled:border-none"
              onClick={handleAddQuestion}
              disabled={inputQuestion === "" || options.length === 0}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AddQuestionDialog;
