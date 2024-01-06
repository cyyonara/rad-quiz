import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <MainHeader />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
