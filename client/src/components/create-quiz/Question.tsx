import IQuestion from "../../types/t.question";
import Option from "./Option";
import QuestionAction from "./QuestionAction";
import EditQuestionModal from "./EditQuestionModal";
import { SlOptionsVertical } from "react-icons/sl";
import { QuestionContext } from "./QuizSetup";
import { AnimatePresence, motion } from "framer-motion";
import {
  memo,
  useContext,
  useState,
  useCallback,
  ChangeEvent,
  FC,
  SyntheticEvent,
} from "react";

interface Props extends IQuestion {}

const Question: FC<Props> = ({ questionId, question, options }: Props) => {
  const { deleteQuestion, updateCorrectAnswer } = useContext(QuestionContext);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showActions, setShowActions] = useState<boolean>(false);

  const handleUpdate = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      e.target.checked &&
      updateCorrectAnswer(questionId as string, e.target.value),
    [],
  );

  const openActions = () => setShowActions(true);
  const closeActions = () => setShowActions(false);
  const toggleModal = () => setShowEditModal(!showEditModal);

  return (
    <>
      <motion.div
        key={questionId}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ x: 200, opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={closeActions}
        className="flex max-w-[810px] flex-1 flex-col gap-y-6 rounded-md p-3 text-cs-dark shadow-[0_0_4px_rgba(0,0,0,0.3)]"
      >
        <AnimatePresence>
          {showEditModal && (
            <EditQuestionModal
              questionId={questionId}
              question={question}
              options={options}
              toggleModal={toggleModal}
              closeActions={closeActions}
            />
          )}
        </AnimatePresence>
        <div className="flex items-start justify-between">
          <p className="w-full overflow-x-hidden text-ellipsis font-medium">
            {question}
          </p>
          <div
            onClick={(e: SyntheticEvent) => {
              e.stopPropagation();
              openActions();
            }}
            className="relative cursor-pointer"
          >
            <SlOptionsVertical />
            <AnimatePresence>
              {showActions && (
                <QuestionAction
                  toggleModal={toggleModal}
                  deleteQuestion={() => deleteQuestion(questionId as string)}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col gap-y-3">
          {options.map(({ label, isRightAnswer }) => (
            <Option
              key={label}
              label={label}
              questionId={questionId as string}
              isRightAnswer={isRightAnswer}
              handleUpdate={handleUpdate}
            />
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default memo(Question);
