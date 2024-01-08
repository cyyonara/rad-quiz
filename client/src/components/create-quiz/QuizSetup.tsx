import toast from "react-hot-toast";
import IQuestion from "../../types/t.question";
import CoverPhotoSetup from "./CoverPhotoSetup";
import CategoryOptions from "./CategoryOptions";
import QuestionList from "./QuestionList";
import AddQuestionDialog from "./AddQuestionDialog";
import { useState, createContext } from "react";
import { GrAdd } from "react-icons/gr";
import { AnimatePresence } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

const questionDummy: IQuestion = {
  questionId: "sdfsdfsdf",
  question: "Who is the father of John Cena?",
  choices: [{ label: "Triple H", isRightAnswer: false }],
};

// { label: "Cm Punk", isRightAnswer: false }, { label: "Jan", isRightAnswer: true },],

interface IQuestionContext {
  updateCorrectAnswer: (questionId: string, label: string) => void;
  deleteChoices: (questionId: string, label: string) => void;
}

export const QuestionContext = createContext<IQuestionContext>({
  updateCorrectAnswer: () => {},
  deleteChoices: () => {},
});

function QuizSetup() {
  const [quizCoverLink, setQuizCoverLink] = useState<string>("");
  const [quizCoverFile, setQuizCoverFile] = useState<File | null>(null);
  const [questions, setQuestions] = useState<IQuestion[]>([questionDummy]);
  const [showAddQuestionDialog, setShowAddQuestionDialog] =
    useState<boolean>(false);

  const setCoverPhoto = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];
      const fileExt = imageFile.name.split(".");
      const actualFileExt = fileExt[fileExt.length - 1].toLowerCase();
      const acceptedFileExt = ["png", "jpg", "jpeg"];
      if (acceptedFileExt.find((ext) => ext === actualFileExt)) {
        const tempUrl = URL.createObjectURL(imageFile);
        setQuizCoverLink(tempUrl);
        setQuizCoverFile(imageFile);
      } else {
        toast.error("You must select an image file");
      }
    }
  };

  const removePhoto = (): void => {
    setQuizCoverLink("");
    setQuizCoverFile(null);
  };

  const addQuestion = (question: IQuestion): void => {
    setQuestions([...questions, question]);
  };

  const updateCorrectAnswer = (questionId: string, label: string) => {
    setQuestions((state) =>
      state.map((question) => {
        if (question.questionId === questionId) {
          return {
            ...question,
            choices: question.choices.map((choice) => {
              if (choice.label === label) {
                return { ...choice, isRightAnswer: true };
              }
              return { ...choice, isRightAnswer: false };
            }),
          };
        }
        return question;
      }),
    );
  };

  const deleteChoices = (questionId: string, label: string) => {
    const question = questions.find(
      (question) => question.questionId === questionId,
    );

    if (question?.choices.length === 1) {
      setQuestions((state) =>
        state.filter((question) => question.questionId !== questionId),
      );
    }
  };

  return (
    <>
      <div className="h-[400px] w-full overflow-hidden rounded-lg text-cs-dark shadow-sm">
        {quizCoverFile ? (
          <div className="relative h-full w-full">
            <img
              src={quizCoverLink}
              alt={quizCoverLink}
              className="h-full w-full object-cover object-center"
            />
            <button
              className="absolute right-3 top-3 z-20 rounded-full bg-slate-200 p-1 text-2xl text-cs-dark duration-75 hover:scale-110 active:hover:scale-95"
              onClick={removePhoto}
            >
              <IoCloseOutline />
            </button>
          </div>
        ) : (
          <CoverPhotoSetup setCoverPhoto={setCoverPhoto} />
        )}
      </div>
      <div className="flex gap-x-10">
        <AnimatePresence>
          {showAddQuestionDialog && (
            <AddQuestionDialog
              closeDialog={() => setShowAddQuestionDialog(false)}
              addQuestion={addQuestion}
            />
          )}
        </AnimatePresence>
        <div className="flex flex-1 flex-col gap-y-6">
          <div className="flex items-center gap-x-6">
            <h1 className="text-3xl font-extrabold uppercase text-cs-dark">
              Create your quiz
            </h1>
            <span className="h-[1px] flex-1 bg-gray-400"></span>
          </div>
          <div className="flex gap-x-[5%]">
            <div className="flex flex-[1.5] flex-col gap-y-6">
              <div className="flex flex-col gap-y-1 ">
                <label
                  htmlFor="title"
                  className="text-sm after:ml-1 after:text-red-600 after:content-['*']"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="rounded-md border border-cs-dark px-4 py-3 text-sm text-cs-dark outline-none"
                />
              </div>
              <div className="flex flex-col gap-y-1 ">
                <label
                  htmlFor="description"
                  className="text-sm after:ml-1 after:text-red-600 after:content-['*']"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  cols={30}
                  rows={8}
                  className="resize-none rounded-md border border-cs-dark px-4 py-3 text-sm text-cs-dark outline-none"
                ></textarea>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-y-6">
              <div className="flex flex-col gap-y-1">
                <label
                  htmlFor="categories"
                  className="text-sm after:ml-1 after:text-red-600 after:content-['*']"
                >
                  Category
                </label>
                <div className="relative flex w-full items-center">
                  <select
                    id="category"
                    className="w-full cursor-pointer appearance-none rounded-md border border-cs-dark p-3 text-sm text-cs-dark outline-none"
                  >
                    <option value="">-- Select category --</option>
                    <CategoryOptions />
                  </select>
                  <IoIosArrowDown className="absolute right-3 top-[50%] -translate-y-[50%]" />
                </div>
              </div>
            </div>
          </div>
          <QuestionContext.Provider
            value={{ deleteChoices, updateCorrectAnswer }}
          >
            {questions.length > 0 && <QuestionList questions={questions} />}
          </QuestionContext.Provider>
          <button className="self-start rounded-md bg-green-600 px-5 py-2 font-bold text-white">
            Upload Quiz
          </button>
        </div>
        <div className="flex h-min w-[250px] flex-col gap-y-4">
          <button
            onClick={() => setShowAddQuestionDialog(true)}
            className="flex items-center justify-center gap-x-2 rounded-md bg-green-600 px-4 py-3 text-sm font-bold uppercase text-white duration-150 hover:bg-green-500 active:bg-green-400"
          >
            <GrAdd color="white" />
            <span>Add question</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default QuizSetup;
