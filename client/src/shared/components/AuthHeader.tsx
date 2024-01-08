import Logo from "./Logo";
import { NavLink } from "react-router-dom";

export default function LoginHeader() {
  return (
    <header className="login-header flex justify-between gap-x-4 border-b bg-white px-4 py-5 text-cs-dark sm:px-[clamp(2rem,8vw,300px)]">
      <Logo path={"/"} />
      <div className="flex items-center gap-x-1">
        <NavLink to="/" className="px-2 py-1 text-sm sm:text-base">
          Login
        </NavLink>
        <NavLink to="/signup" className="px-2 py-1 text-sm sm:text-base">
          Sign up
        </NavLink>
      </div>
    </header>
  );
}
