import LoginForm from "../components/login/LoginForm";
import useAuth from "../store/useAuth";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const { auth } = useAuth();

  useEffect(() => {
    document.title = "Login";
  }, []);

  if (auth) return <Navigate to={"/home"} />;

  return (
    <motion.main className="flex min-h-[86vh] px-6 py-14 text-cs-dark sm:px-[clamp(5rem,8vw,300px)]">
      <section className="m-auto flex max-w-[1300px] flex-1 flex-col gap-x-[100px] gap-y-12 lg:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-y-4">
          <h1 className="logo-animated relative max-w-min text-nowrap text-5xl font-[900] text-white md:text-7xl">
            RAD QUIZ.
          </h1>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi
            dolores ex debitis enim, nesciunt explicabo laborum incidunt, atque
            quo aspernatur quos officia minus. Dicta veniam soluta accusamus vel
            dolor voluptatum commodi, qui harum pariatur excepturi animi in
            beatae fuga a? Earum praesentium illum a eius autem distinctio eaque
            doloribus dicta, corrupti unde? Expedita saepe commodi voluptatibus
            sapiente non
          </p>
        </div>
        <div className="flex basis-[35%] flex-col gap-y-2">
          <h1 className="mb-3 rounded-md text-xl font-bold uppercase text-cs-dark ">
            Login to Rad Quiz.
          </h1>
          <LoginForm />
        </div>
      </section>
    </motion.main>
  );
}
