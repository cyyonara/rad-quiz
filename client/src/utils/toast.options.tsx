import { MdError } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default {
  className: " rounded-sm text-cs-dark rounded-sm",
  style: {
    borderRadius: "4px",
    maxWidth: 1000,
  },
  success: {
    icon: <IoIosCheckmarkCircleOutline />,
    className: "text-sm",
    style: { color: "green" },
  },
  error: {
    icon: <MdError class="text-2xl" />,
    className: "text-sm border",
    style: { color: "red" },
  },
  loading: {
    className: "text-sm text-cs-dark",
  },
};
