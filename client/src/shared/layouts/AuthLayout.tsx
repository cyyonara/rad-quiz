import AuthHeader from "../components/AuthHeader";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <AuthHeader />
      <Outlet />
      <Footer />
    </>
  );
}
