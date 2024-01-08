import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import { Outlet } from "react-router-dom";

function RootLayout() {
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

export default RootLayout;
