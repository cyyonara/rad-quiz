import { CiImageOn } from "react-icons/ci";
import { useRef, memo, FC, ChangeEvent } from "react";

interface Props {
  setCoverPhoto: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CoverPhotoSetup: FC<Props> = ({ setCoverPhoto }: Props) => {
  const imageRef = useRef<HTMLInputElement | null>(null);

  return (
    <div
      onClick={() => imageRef.current?.click()}
      className="flex h-full cursor-pointer items-center justify-center gap-x-4 bg-slate-100"
    >
      <input
        accept="image/*"
        type="file"
        hidden
        ref={imageRef}
        onChange={setCoverPhoto}
      />
      <button className="flex items-center justify-center rounded-full bg-slate-200 p-4 duration-100 hover:scale-110 active:scale-95">
        <CiImageOn size={40} />
      </button>
      <p className="text-lg font-semibold">
        Select a cover photo for your quiz
      </p>
    </div>
  );
};

export default memo(CoverPhotoSetup);
