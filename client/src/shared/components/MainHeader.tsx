import useAvatarDropdown from "../../store/useAvatarDropdown";
import SearchInput from "./SearchInput";
import AvatarDropDownContainer from "./AvatarDropdownContainer";
import Logo from "./Logo";
import CategoriesPopup from "./CategoriesPopup";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import { FC } from "react";

const MainHeader: FC = () => {
  const { closeDropdown } = useAvatarDropdown();

  return (
    <header
      className="flex flex-col items-center justify-between bg-white"
      onClick={closeDropdown}
    >
      <div className="flex w-full items-center justify-between px-4 py-3 sm:px-[clamp(2rem,8vw,300px)]">
        <Logo path={"/home"} />
        <SearchInput />
        <AvatarDropDownContainer />
      </div>
      <div className="flex w-full gap-x-6 bg-cs-dark px-4 text-sm text-white sm:px-[clamp(2rem,8vw,300px)]">
        <Link
          to={"/home"}
          className="flex items-center gap-x-1 py-3 text-white"
        >
          <span>Home</span>
        </Link>
        <div className="group relative flex cursor-pointer items-center gap-x-1 py-3">
          <span>Categories</span>
          <IoIosArrowDown className="duration-150 group-hover:rotate-180" />
          <CategoriesPopup />
        </div>
        <Link
          to={"/create"}
          className="flex items-center gap-x-1 py-3 text-white"
        >
          <span>Create quiz</span>
          <IoAddCircle size={18} />
        </Link>
      </div>
    </header>
  );
};

export default MainHeader;
