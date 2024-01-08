import clsx from "clsx";
import DefaultAvatar from "./DefaultAvatar";
import DropdownNav from "./DropdownNav";
import useAuth from "../../store/useAuth";
import useAvatarDropdown from "../../store/useAvatarDropdown";
import { IoIosArrowDown } from "react-icons/io";

export default function AvatarDropDownContainer() {
  const { auth } = useAuth();
  const { showDropdown, toggleAvatarDropdown } = useAvatarDropdown();

  return (
    <div
      className={clsx(
        "relative flex cursor-pointer items-center justify-between gap-x-12 rounded-sm border border-white p-[6px] hover:border-slate-300",
        {
          "border-gray-200 hover:border-slate-300": showDropdown,
        },
      )}
      onClick={(e: React.SyntheticEvent) => {
        e.stopPropagation();
        toggleAvatarDropdown();
      }}
    >
      <div className="flex items-center gap-x-2">
        {auth?.image ? (
          <img
            src={auth.image}
            alt={auth.username}
            className="object-cover object-center"
          />
        ) : (
          <div className="h-[35px] w-[35px]">
            <DefaultAvatar />
          </div>
        )}
        <span className="text-sm text-slate-500">{auth?.username}</span>
      </div>
      <IoIosArrowDown className="text-slate-500" />
      {showDropdown && <DropdownNav />}
    </div>
  );
}
