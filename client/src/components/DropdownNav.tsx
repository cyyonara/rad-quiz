import clsx from "clsx";
import { HiOutlineUserCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { motion } from "framer-motion";
import { useState } from "react";

export default function DropdownNav() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div
      className="absolute right-0 top-[110%] flex min-w-[200px] flex-col rounded-sm border bg-white py-5 shadow-md"
      onClick={(e: React.SyntheticEvent) => e.stopPropagation()}
    >
      <div className="flex flex-col gap-y-3 text-gray-500">
        <div className="flex items-center gap-x-2 px-4">
          <HiOutlineUserCircle size={25} />
          <span className="text-sm font-semibold">My Stuff</span>
        </div>
        <div className="flex flex-col pb-5">
          <Link
            to={"/profile"}
            className="py-2 pl-[48px] pr-3 text-sm text-cs-dark duration-150 hover:bg-slate-100"
          >
            Profile
          </Link>
          <Link
            to={"/settings"}
            className="py-2 pl-[48px] pr-3 text-sm text-cs-dark duration-150 hover:bg-slate-100"
          >
            User Settings
          </Link>
        </div>
      </div>
      <div className="border-y py-3">
        <div className="flex items-center justify-between py-2 pl-[48px] pr-3 duration-150 hover:bg-slate-100">
          <span className="text-sm text-cs-dark">Dark Mode</span>
          <button
            className={clsx(
              "flex h-[20px] w-[40px] justify-start rounded-full border bg-slate-100",
              {
                "justify-end": isDarkMode,
              },
            )}
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            <motion.span
              layout
              className="h-full w-[50%] rounded-full border bg-white shadow-sm"
            ></motion.span>
          </button>
        </div>
      </div>
      <div className="flex pt-5">
        <button className="flex flex-1 items-center gap-x-2 px-4 py-2 duration-150 hover:bg-slate-100">
          <IoIosLogOut size={24} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}
