import QuizSetup from "../components/QuizSetup";
import useAvatarDropdown from "../store/useAvatarDropdown";
import { useEffect } from "react";

function CreateQuiz() {
  const { closeDropdown } = useAvatarDropdown();

  useEffect(() => {
    document.title = "Create Quiz - Rad Quiz";
  }, []);

  return (
    <main onClick={closeDropdown} className="flex flex-1 items-start px-5">
      <section className="mx-auto flex max-w-[1100px] flex-1 flex-col gap-y-7 pb-28 pt-6">
        <QuizSetup />
      </section>
    </main>
  );
}

export default CreateQuiz;
