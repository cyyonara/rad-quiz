import { SiGitbook } from "react-icons/si";
import { Link } from "react-router-dom";

interface Props {
  path: string;
}

export default function Logo({ path }: Props) {
  return (
    <Link
      to={path}
      className="flex items-center gap-x-2 text-xl font-[900] uppercase text-cs-dark sm:text-2xl"
    >
      <SiGitbook />
      <h2>Rad Quiz.</h2>
    </Link>
  );
}
