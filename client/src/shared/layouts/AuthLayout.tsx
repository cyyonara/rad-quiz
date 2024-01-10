import AuthHeader from "../components/AuthHeader";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { FC } from "react";

const AuthLayout: FC = () => {
  return (
    <>
      <AuthHeader />
      <Outlet />
      <Footer />
    </>
  );
};

export default AuthLayout;
