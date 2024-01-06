import AuthHeader from "../components/AuthHeader";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

export default function AuthLayout() {
  return (
    <>
      <AuthHeader />
      <AnimatePresence>
        <Outlet />
      </AnimatePresence>
      <Footer />
    </>
  );
}
