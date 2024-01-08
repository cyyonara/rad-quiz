import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";
import RootLayout from "./shared/layouts/RootLayout";
import AuthLayout from "./shared/layouts/AuthLayout";
import { Routes, Route } from "react-router-dom";
import CreateQuiz from "./pages/CreateQuiz";

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
      <Route element={<RootLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<CreateQuiz />} />
      </Route>
    </Routes>
  );
}
