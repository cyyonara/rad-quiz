import clsx from "clsx";
import useUploadQuiz from "../../hooks/useUploadQuiz";
import uploadImage from "../../services/uploadImage";
import toast from "react-hot-toast";
import CoverPhotoSetup from "./CoverPhotoSetup";
import QuestionList from "./QuestionList";
import AddQuestionDialog from "./AddQuestionDialog";
import QuizDetailsForm from "./QuizDetailsForm";
import ToastAlert from "./ToastAlert";
import IQuestion, { Option } from "../../types/t.question";
import { AiOutlineUpload, AiOutlineLoading } from "react-icons/ai";
import { useCallback, useState, createContext, ChangeEvent, FC } from "react";
import { AnimatePresence } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { FirebaseError } from "firebase/app";

interface IQuestionContext {
  deleteQuestion: (quesitonId: string) => void;
  updateCorrectAnswer: (questionId: string, label: string) => void;
  deleteOptions: (questionId: string, label: string) => void;
  updateQuestion: (updatedQuestion: IQuestion) => void;
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
  updateQuestion: () => {},
});

const formInitialState: IQuizDetails = {
  title: "",
  description: "",
  category: "",
};

const QuizSetup: FC = () => {
  const [quizCoverLink, setQuizCoverLink] = useState<string>("");
  const [quizCoverFile, setQuizCoverFile] = useState<File | null>(null);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [quizDetails, setQuizDetails] =
    useState<IQuizDetails>(formInitialState);
  const [showAddQuestionDialog, setShowAddQuestionDialog] =
    useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { mutate } = useUploadQuiz();

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

  const updateQuestion = (updatedQuestion: IQuestion) => {
    setQuestions((state) =>
      state.map((question) => {
        if (question.questionId === updatedQuestion.questionId) {
          return updatedQuestion;
        }
        return question;
      }),
    );
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

  const uploadQuiz = async () => {
    if (
      !quizDetails.title ||
      !quizDetails.description ||
      !quizDetails.category ||
      !quizCoverFile
    ) {
      toast(
        <ToastAlert message="Please complete the details of your quiz to continue" />,
      );
    } else {
      toast.promise<void>(
        new Promise(async (resolve, reject) => {
          try {
            setIsUploading(true);
            const imageLink = await uploadImage(quizCoverFile as File);
            mutate(
              {
                title: quizDetails.title,
                description: quizDetails.description,
                category: quizDetails.category,
                coverPhoto: imageLink,
                questions,
              },
              {
                onSuccess: () => {
                  setIsUploading(false);
                  resolve();
                },
                onError: (err) => {
                  reject(err.response?.data.message || "Something went wrong");
                  setIsUploading(false);
                },
              },
            );
          } catch (error) {
            if (error instanceof FirebaseError) {
              reject(error.message);
            } else {
              reject("Something went wrong");
            }
          }
        }),
        {
          loading: "Uploading...",
          success: "Quiz successfully created!",
          error: (err) => err,
        },
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
              disabled={isUploading}
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
        <div className="flex flex-1 flex-col gap-y-5">
          <div className="flex items-center gap-x-6">
            <h1 className="font text-3xl font-black uppercase text-cs-dark">
              Create your own quiz
            </h1>
            <span className="h-[1px] flex-1 bg-gray-400"></span>
          </div>
          <QuizDetailsForm
            {...quizDetails}
            isUploading={isUploading}
            handleChangeDetails={handleChangeDetails}
          />
          <QuestionContext.Provider
            value={{
              deleteQuestion,
              updateCorrectAnswer,
              deleteOptions,
              updateQuestion,
            }}
          >
            <QuestionList
              isUploading={isUploading}
              openDialog={() => setShowAddQuestionDialog(true)}
              questions={questions}
            />
          </QuestionContext.Provider>
          <button
            onClick={uploadQuiz}
            disabled={questions.length === 0 || isUploading}
            className={clsx(
              "mt-4 flex items-center justify-center gap-x-2 rounded-md bg-green-600 px-5 py-2 font-semibold uppercase text-white duration-150 hover:bg-green-600/85 focus:bg-green-600/85 disabled:cursor-not-allowed disabled:bg-green-600/75",
              {
                "disabled:cursor-progress": isUploading,
              },
            )}
          >
            {isUploading ? (
              <AiOutlineLoading size={20} className="animate-spin" />
            ) : (
              <AiOutlineUpload size={20} />
            )}
            <span>{isUploading ? "Uploading..." : "Upload Quiz"}</span>
          </button>
        </div>
        <div className="sticky top-[20px] flex h-min w-[300px] flex-col gap-y-4 rounded-md p-3 shadow-[0_0_6px_rgba(0,0,0,0.2)]">
          <span className="flex flex-col gap-y-2">
            <span className="text-sm text-gray-500">Title:</span>
            {quizDetails.title && (
              <span className="text-sm font-medium text-cs-dark">
                {quizDetails.title}
              </span>
            )}
          </span>
          <span className="flex flex-col gap-y-2">
            <span className="text-sm text-gray-500">Category:</span>
            {quizDetails.category && (
              <span className="text-sm font-medium text-cs-dark">
                {quizDetails.category}
              </span>
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default QuizSetup;
