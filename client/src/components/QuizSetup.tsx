import toast from "react-hot-toast";
import CoverPhotoSetup from "./CoverPhotoSetup";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

const acceptedFileExt = ["png", "jpg", "jpeg"];

export default function QuizSetup() {
  const [quizCoverLink, setQuizCoverLink] = useState<string>("");
  const [quizCoverFile, setQuizCoverFile] = useState<File | null>(null);

  const setCoverPhoto = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];
      const fileExtension = imageFile.name.split(".");
      const actualFileExt =
        fileExtension[fileExtension.length - 1].toLowerCase();

      if (acceptedFileExt.find((ext) => ext === actualFileExt)) {
        const url = URL.createObjectURL(imageFile);
        setQuizCoverLink(url);
        setQuizCoverFile(imageFile);
      } else {
        toast.error("You must select an image file");
      }
    }
  };

  const removePhoto = (): void => {
    setQuizCoverLink("");
    setQuizCoverFile(null);
  };

  return (
    <>
      <div className="h-[450px] w-full overflow-hidden rounded-lg text-cs-dark">
        {quizCoverFile ? (
          <div className="relative h-full w-full">
            <img
              src={quizCoverLink}
              alt={quizCoverLink}
              className="h-full w-full object-cover object-center"
            />
            <button
              className="absolute right-3 top-3 z-20 rounded-full bg-slate-200 p-1 text-2xl text-cs-dark duration-75 hover:scale-110 active:hover:scale-95"
              onClick={removePhoto}
            >
              <IoCloseOutline />
            </button>
          </div>
        ) : (
          <CoverPhotoSetup setCoverPhoto={setCoverPhoto} />
        )}
      </div>
    </>
  );
}
