import toast from "react-hot-toast";
import IQuestion from "../../types/t.question";
import ToastAlert from "./ToastAlert";
import CreatedOption from "./CreatedOption";
import { Option } from "../../types/t.question";
import {
  useContext,
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  FC,
  FormEvent,
} from "react";
import { QuestionContext } from "./QuizSetup";
import { motion } from "framer-motion";

interface Props extends IQuestion {
  toggleModal: () => void;
  closeActions: () => void;
}

const EditQuestionModal: FC<Props> = ({
  questionId,
  question,
  options,
  toggleModal,
  closeActions,
}: Props) => {
  const [updatedQuestion, setUpdatedQuestion] = useState<string>(question);
  const [updatedOptions, setUpdatedOptions] = useState<Option[]>(options);
  const [inputOption, setNewInputOption] = useState<string>("");
  const optionsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeActions();
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    if (!inputOption) return;

    if (updatedOptions.length >= 10) {
      return toast(<ToastAlert message="Options exceed the maximum limit" />);
    }

    const newOption: string = inputOption.trim();
    if (!updatedOptions.find((option) => option.label === newOption)) {
      setUpdatedOptions((state) => [
        ...state,
        { label: inputOption, isRightAnswer: false },
      ]);
      setNewInputOption("");
      setTimeout(() => {
        optionsContainerRef.current?.scrollTo(
          0,
          optionsContainerRef.current.scrollHeight,
        );
      }, 80);
    } else {
      toast(
        <ToastAlert message="Option already exist. Please try another one" />,
      );
    }
  };

  const handleUpdate = (label: string) => {};

  const handleDelete = (label: string) => {
    setUpdatedOptions((state) =>
      state.filter((option) => option.label !== label),
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.01 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-[clamp(3rem,10vh,300px)] shadow-lg"
    >
      <div className="flex max-w-[450px] flex-1 flex-col rounded-md bg-white p-4 shadow-lg">
        <div className="flex flex-col gap-y-4">
          <h2 className="border-b border-gray-300 pb-4 text-xl font-bold text-cs-dark">
            Edit Question
          </h2>
          <div className="flex flex-col gap-y-3">
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="question"
                className="text-sm text-cs-dark after:ml-1 after:text-red-600 after:content-['*']"
              >
                Question
              </label>
              <textarea
                id="question"
                cols={30}
                rows={6}
                value={updatedQuestion}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setUpdatedQuestion(e.target.value)
                }
                className="resize-none rounded-md border border-gray-300 p-3 text-sm outline-none focus-within:border-cs-dark"
              ></textarea>
            </div>
            <form onSubmit={handleAdd} className="flex gap-x-3">
              <input
                type="text"
                placeholder="Enter option..."
                value={inputOption}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNewInputOption(e.target.value)
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
              ref={optionsContainerRef}
              className="flex max-h-[400px] flex-col gap-y-2 overflow-y-auto overflow-x-scroll scroll-smooth"
            >
              {updatedOptions.map((option, index) => (
                <CreatedOption
                  key={option.label}
                  label={option.label}
                  optionNumber={index + 1}
                  isRightAnswer={option.isRightAnswer}
                  handleDelete={() => handleDelete(option.label)}
                  handleUpdate={() => handleUpdate(option.label)}
                />
              ))}
            </div>
            <div className="flex items-center justify-end gap-x-2 border-t pt-4">
              <button
                onClick={toggleModal}
                className="rounded-md bg-gray-200 px-3 py-2 text-sm text-cs-dark duration-150 hover:bg-gray-300"
              >
                Close
              </button>
              <button className="b rounded-md bg-green-600 px-3 py-2 text-sm text-white duration-150   disabled:cursor-not-allowed disabled:border-none disabled:bg-green-600/90">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EditQuestionModal;
