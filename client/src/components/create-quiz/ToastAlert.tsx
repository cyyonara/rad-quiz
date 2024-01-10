import { BiSolidMessageSquareError } from "react-icons/bi";
import { FC } from "react";

interface Props {
  message: string;
}
const ToastAlert: FC<Props> = ({ message }: Props) => {
  return (
    <div className="flex items-center gap-x-1 text-cs-dark">
      <BiSolidMessageSquareError className="text-blue-400" />
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default ToastAlert;
