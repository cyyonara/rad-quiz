import useAvatarDropdown from "../store/useAvatarDropdown";
import { useEffect, FC } from "react";

const Home: FC = () => {
  const closeDropdown = useAvatarDropdown((state) => state.closeDropdown);

  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <main
      className="flex flex-1 flex-col items-center"
      onClick={closeDropdown}
    ></main>
  );
};

export default Home;
