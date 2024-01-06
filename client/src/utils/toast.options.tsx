import { MdError } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default {
  className:
    "bg-white border border-cs-dark rounded-sm text-cs-dark rounded-sm",
  style: {
    borderRadius: "2px",
  },
  success: {
    icon: <IoIosCheckmarkCircleOutline />,
    className: "text-sm border",
    style: { color: "green", borderColor: "green" },
  },
  error: {
    icon: <MdError class="text-2xl" />,
    className: "text-sm border-red-400 border",
    style: { color: "red", borderColor: "red" },
  },
  loading: {
    className: "text-sm border-cs-dark text-cs-dark border",
  },
};
