import { IoCameraOutline } from "react-icons/io5";
import { useRef } from "react";

interface Props {
  setCoverPhoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CoverPhotoSetup({ setCoverPhoto }: Props) {
  const imageRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex h-full items-center justify-center gap-x-4 bg-slate-100">
      <input
        accept="image/*"
        type="file"
        hidden
        ref={imageRef}
        onChange={setCoverPhoto}
      />
      <button
        onClick={() => imageRef.current?.click()}
        className="flex items-center justify-center rounded-full bg-slate-200 p-4 duration-100 hover:scale-110 active:scale-95"
      >
        <IoCameraOutline size={40} />
      </button>
      <p className="text-lg font-semibold">
        Select a cover photo for your quiz
      </p>
    </div>
  );
}
