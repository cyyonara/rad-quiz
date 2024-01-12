import QuizSetup from "../components/create-quiz/QuizSetup";
import useAvatarDropdown from "../store/useAvatarDropdown";
import { useEffect, FC } from "react";

const CreateQuiz: FC = () => {
  const closeDropdown = useAvatarDropdown((state) => state.closeDropdown);

  useEffect(() => {
    document.title = "Create Quiz - Rad Quiz";
  }, []);

  return (
    <main
      onClick={closeDropdown}
      className="flex flex-1 items-start bg-slate-100 px-5"
    >
      <section className="mx-auto my-8 flex max-w-[1150px] flex-1 flex-col gap-y-7 rounded-lg bg-white px-8 pb-[80px] pt-8 shadow-md">
        <QuizSetup />
      </section>
    </main>
  );
};

export default CreateQuiz;
