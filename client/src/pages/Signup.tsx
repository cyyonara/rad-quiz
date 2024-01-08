import SignupForm from "../components/signup/SignupForm";
import useAuth from "../store/useAuth";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function Signup() {
  const { auth } = useAuth();

  useEffect(() => {
    document.title = "Sign up";
  }, []);

  if (auth) return <Navigate to={"/home"} />;

  return (
    <main className="flex min-h-[70vh] justify-center px-6 sm:px-[clamp(5rem,8vw,300px)]">
      <div className="mt-[150px] flex max-w-[420px] flex-1 flex-col gap-y-8 text-cs-dark">
        <h1 className="text-3xl font-extrabold uppercase">
          Create your account
        </h1>
        <SignupForm />
      </div>
    </main>
  );
}
