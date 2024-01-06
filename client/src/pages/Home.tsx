import useAvatarDropdown from "../store/useAvatarDropdown";
import { useEffect } from "react";

export default function Home() {
  const { closeDropdown } = useAvatarDropdown();

  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <main
      className="flex flex-1 flex-col items-center"
      onClick={closeDropdown}
    ></main>
  );
}
