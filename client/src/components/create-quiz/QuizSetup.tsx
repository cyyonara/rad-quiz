import toast from "react-hot-toast";
import IQuestion, { Option } from "../../types/t.question";
import CoverPhotoSetup from "./CoverPhotoSetup";
import QuestionList from "./QuestionList";
import AddQuestionDialog from "./AddQuestionDialog";
import QuizDetailsForm from "./QuizDetailsForm";
import ToastAlert from "./ToastAlert";
import { useCallback, useState, createContext, ChangeEvent, FC } from "react";
import { GrAdd } from "react-icons/gr";
import { AnimatePresence } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";

const questionDummy: IQuestion = {
  questionId: "sdfsdfsdf",
  question: "Who is the father of John Cena?",
  options: [
    { label: "Triple H", isRightAnswer: false },
    { label: "Cm Punk", isRightAnswer: false },
    { label: "Jan", isRightAnswer: true },
  ],
};

interface IQuestionContext {
  deleteQuestion: (quesitonId: string) => void;
  updateCorrectAnswer: (questionId: string, label: string) => void;
  deleteOptions: (questionId: string, label: string) => void;
}

interface IQuizDetails {
  title: string;
  description: string;
  category: string;
}

export type TQuizFormEvent =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLSelectElement>
  | ChangeEvent<HTMLTextAreaElement>;

export const QuestionContext = createContext<IQuestionContext>({
  deleteQuestion: () => {},
  updateCorrectAnswer: () => {},
  deleteOptions: () => {},
});

const formInitialState: IQuizDetails = {
  title: "",
  description: "",
  category: "",
};

const QuizSetup: FC = () => {
  const [quizCoverLink, setQuizCoverLink] = useState<string>("");
  const [quizCoverFile, setQuizCoverFile] = useState<File | null>(null);
  const [questions, setQuestions] = useState<IQuestion[]>([questionDummy]);
  const [quizDetails, setQuizDetails] =
    useState<IQuizDetails>(formInitialState);
  const [showAddQuestionDialog, setShowAddQuestionDialog] =
    useState<boolean>(false);

  const handleChangeDetails = useCallback((e: TQuizFormEvent) => {
    setQuizDetails((state) => ({ ...state, [e.target.id]: e.target.value }));
  }, []);

  const setCoverPhoto = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const imageFile: File = e.target.files[0];
        const fileExt: Array<string> = imageFile.name.split(".");
        const actualFileExt: string = fileExt[fileExt.length - 1].toLowerCase();
        const acceptedFileExt: Array<string> = ["png", "jpg", "jpeg"];

        if (acceptedFileExt.find((ext) => ext === actualFileExt)) {
          const tempUrl: string = URL.createObjectURL(imageFile);
          setQuizCoverLink(tempUrl);
          setQuizCoverFile(imageFile);
        } else {
          toast.error("You must select an image file");
        }
      }
    },
    [],
  );

  const removePhoto = () => {
    setQuizCoverLink("");
    setQuizCoverFile(null);
  };

  const addQuestion = (question: IQuestion) => {
    setQuestions([...questions, question]);
  };

  const deleteQuestion = (quesitonId: string) => {
    setQuestions((state) =>
      state.filter((question) => question.questionId !== quesitonId),
    );
  };

  const updateCorrectAnswer = (questionId: string, label: string) => {
    setQuestions((state) =>
      state.map((question) => {
        if (question.questionId === questionId) {
          return {
            ...question,
            options: question.options.map((option) => {
              if (option.label === label) {
                return { ...option, isRightAnswer: true };
              }
              return { ...option, isRightAnswer: false };
            }),
          };
        }
        return question;
      }),
    );
  };

  const deleteOptions = (questionId: string, label: string) => {
    const question = questions.find(
      (question) => question.questionId === questionId,
    ) as IQuestion;

    if (question!.options.length === 1) {
      setQuestions((state) =>
        state.filter((question) => question.questionId !== questionId),
      );
    } else {
      const selectedOption = question.options.find(
        (option) => option.label === label,
      ) as Option;

      if (selectedOption.isRightAnswer) {
        const filteredOptions = question!.options.filter(
          (option) => option.label !== label && !option.isRightAnswer,
        );
        filteredOptions[0].isRightAnswer = true;
        setQuestions((state) =>
          state.map((question) => {
            if (question.questionId === questionId) {
              return { ...question, options: filteredOptions };
            }
            return question;
          }),
        );
      } else {
        setQuestions((state) =>
          state.map((question) => {
            if (question.questionId === questionId) {
              return {
                ...question,
                options: question.options.filter(
                  (option) => option.label !== label,
                ),
              };
            }
            return question;
          }),
        );
      }
    }
  };

  const uploadQuiz = () => {
    if (
      !quizDetails.title ||
      !quizDetails.description ||
      !quizDetails.category
    ) {
      toast(
        <ToastAlert message="Please complete the details of your quiz to continue" />,
      );
    } else {
      console.log("Hi");
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
            <h1 className="font text-3xl font-black uppercase text-cs-dark">
              Create your own quiz
            </h1>
            <span className="h-[1px] flex-1 bg-gray-400"></span>
          </div>
          <QuizDetailsForm
            title={quizDetails.title}
            description={quizDetails.description}
            category={quizDetails.category}
            handleChangeDetails={handleChangeDetails}
          />
          <QuestionContext.Provider
            value={{ deleteQuestion, updateCorrectAnswer, deleteOptions }}
          >
            {questions.length > 0 && <QuestionList questions={questions} />}
          </QuestionContext.Provider>
          <button
            onClick={uploadQuiz}
            disabled={questions.length === 0}
            className="mt-4 rounded-md bg-green-600 px-5 py-2 font-semibold text-white disabled:cursor-not-allowed"
          >
            Upload Quiz
          </button>
        </div>
        <div className="sticky top-[20px] flex h-min w-[250px] flex-col gap-y-4">
          <button
            onClick={() => setShowAddQuestionDialog(true)}
            className="flex items-center justify-center gap-x-2 rounded-md bg-cs-dark px-4 py-3 text-sm font-bold uppercase text-white duration-150 hover:bg-cs-dark/90 active:bg-cs-dark/80"
          >
            <GrAdd color="white" />
            <span>Add question</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default QuizSetup;
