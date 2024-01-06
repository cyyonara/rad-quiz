import { SiGitbook } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { JSX } from "react";

interface AccouuntLink {
  path: string;
  component: JSX.Element;
}

export default function Footer() {
  const year: number = new Date().getFullYear();
  const accountLinks: AccouuntLink[] = [
    { path: "https://github.com/cyyonara", component: <FaGithub /> },
    {
      path: "https://www.facebook.com/cyrelvillanueva.30/",
      component: <FaFacebookF />,
    },
    {
      path: "https://www.instagram.com/_cyyonara/",
      component: <FaInstagram />,
    },
  ];

  return (
    <footer className="flex min-h-[200px] flex-col justify-center gap-10 bg-cs-dark px-4 pb-12 pt-9 text-slate-400 sm:px-[clamp(2rem,8vw,300px)]">
      <div className="flex justify-start md:justify-center">
        <span className="flex items-center gap-2 text-lg">
          <SiGitbook size={25} />
          <h2 className="font-bold">RAD QUIZ.</h2>
        </span>
      </div>
      <div className="flex flex-col justify-center gap-x-16 gap-y-4 text-sm md:flex-row md:items-center">
        <span>Terms of Service</span>
        <span>Privay and Policy</span>
        <span>About</span>
        <span>Contact</span>
      </div>
      <div className="mt-1 flex flex-col items-start justify-between gap-y-4 text-sm md:flex-row md:items-center ">
        <span>Developed by: Cyrel B. Villanueva</span>
        <div className="flex items-center gap-x-4">
          {accountLinks.map(({ path, component }) => (
            <Link key={path} to={path} target="_blank">
              <span className="text-lg">{component}</span>
            </Link>
          ))}
        </div>
        <span className="mt-8 md:mt-0">
          &#169; {year} Rad Quiz. All rights reserved
        </span>
      </div>
    </footer>
  );
}
