import useAuth from "../store/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import A_Error from "../types/t.axios_error";
import UserCredentials from "../types/t.auth.credentials";
import { useState, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";

interface LoginFormData {
  username: string;
  password: string;
}

const formInitialState: LoginFormData = { username: "", password: "" };

export default function LoginForm() {
  const [loginForm, setLoginForm] = useState<LoginFormData>(formInitialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setCredentials } = useAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    toast.promise(axios.post<UserCredentials>("/api/auth/login", loginForm), {
      loading: "Logging in...",
      error: (err: A_Error) => {
        setIsLoading(false);
        return err.response!.data.message || "Internal Server Error";
      },
      success: ({ data }) => {
        setIsLoading(false);
        setCredentials(data);
        return `Welcome ${data.username}`;
      },
    });
  };

  return (
    <form className="flex flex-col gap-y-6" onSubmit={handleLogin}>
      <div className="flex flex-col gap-1">
        <label htmlFor="username" className="text-sm">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={loginForm.username}
          onChange={handleChange}
          className="border border-cs-dark px-4 py-3 text-sm outline-none"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="text-sm">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={loginForm.password}
          onChange={handleChange}
          className="border border-cs-dark px-4 py-3 text-sm outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-cs-dark py-[10px] font-semibold uppercase text-white duration-100 hover:bg-cs-dark/90 active:bg-cs-dark/85 disabled:bg-cs-dark/80"
      >
        {isLoading ? "Logging in..." : "Log in"}
      </button>
      <span className="mt-1 text-center text-sm">
        Don't have an account?{" "}
        <Link to={"/signup"} className="font-semibold hover:underline">
          Sign up
        </Link>
      </span>
    </form>
  );
}
