import CategoryOptions from "./CategoryOptions";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useRef, memo, FC } from "react";
import { TQuizFormEvent } from "./QuizSetup";

interface Props {
  title: string;
  description: string;
  category: string;
  isUploading: boolean;
  handleChangeDetails: (e: TQuizFormEvent) => void;
}

const QuizDetailsForm: FC<Props> = ({
  title,
  description,
  category,
  isUploading,
  handleChangeDetails,
}: Props) => {
  const titleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <div className="flex gap-x-[5%]">
      <div className="flex flex-[1.5] flex-col gap-y-6">
        <div className="flex flex-col gap-y-1 ">
          <label
            htmlFor="title"
            className="text-sm after:ml-1 after:text-red-600 after:content-['*']"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            ref={titleRef}
            disabled={isUploading}
            value={title}
            onChange={handleChangeDetails}
            className="rounded-md border border-gray-300 px-4 py-3 text-sm text-cs-dark outline-none focus:border-cs-dark"
          />
        </div>
        <div className="flex flex-col gap-y-1 ">
          <label
            htmlFor="description"
            className="text-sm after:ml-1 after:text-red-600 after:content-['*']"
          >
            Description
          </label>
          <textarea
            id="description"
            cols={30}
            rows={8}
            disabled={isUploading}
            value={description}
            onChange={handleChangeDetails}
            className="resize-none rounded-md border border-gray-300 px-4 py-3 text-sm text-cs-dark outline-none focus:border-cs-dark"
          ></textarea>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-y-6">
        <div className="flex flex-col gap-y-1">
          <label
            htmlFor="categories"
            className="text-sm after:ml-1 after:text-red-600 after:content-['*']"
          >
            Category
          </label>
          <div className="relative flex w-full items-center">
            <select
              id="category"
              value={category}
              onChange={handleChangeDetails}
              disabled={isUploading}
              className="w-full cursor-pointer appearance-none rounded-md border border-gray-300 p-3 text-sm text-cs-dark outline-none focus:border-cs-dark"
            >
              <option value="">-- Select category --</option>
              <CategoryOptions />
            </select>
            <IoIosArrowDown className="absolute right-3 top-[50%] -translate-y-[50%]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(QuizDetailsForm);
