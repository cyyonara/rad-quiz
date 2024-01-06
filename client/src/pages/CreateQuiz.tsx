import QuizSetup from "../components/QuizSetup";
import useAvatarDropdown from "../store/useAvatarDropdown";
import { useEffect } from "react";

export default function CreateQuiz() {
  const { closeDropdown } = useAvatarDropdown();

  useEffect(() => {
    document.title = "Create Quiz - Rad Quiz";
  }, []);

  return (
    <main onClick={closeDropdown} className="flex flex-1 items-start">
      <section className="mx-auto flex max-w-[1300px] flex-1 flex-col py-6">
        <QuizSetup />
      </section>
    </main>
  );
}
