import useCategories from "../../hooks/useCategories";
import { Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FC } from "react";

const CategoriesPopup: FC = () => {
  const { data: categories, isLoading, isError, refetch } = useCategories();

  if (isLoading) {
    return (
      <div className="pointer-events-none absolute left-0 top-[86%] flex min-h-[100px] min-w-[150px] items-center justify-center rounded-sm bg-white p-3 opacity-0 shadow-md duration-100 group-hover:pointer-events-auto group-hover:opacity-100">
        <AiOutlineLoading3Quarters className="animate-spin text-3xl text-cs-dark" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="pointer-events-none absolute left-0 top-[86%] flex min-h-[100px] min-w-[150px] flex-col items-center justify-center gap-y-2 rounded-sm bg-white p-3 text-cs-dark opacity-0 shadow-md duration-100 group-hover:pointer-events-auto group-hover:opacity-100">
        <span className="whitespace-nowrap text-xs">
          Something went wrong. Click here to reload
        </span>
        <button
          onClick={() => refetch()}
          className="rounded-sm bg-cs-dark px-2 py-1 text-xs text-white duration-150 hover:bg-cs-dark/85 active:bg-cs-dark/75"
        >
          Reload
        </button>
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute left-0 top-[86%] flex min-h-[100px] w-full min-w-[400px] flex-col gap-y-3 rounded-sm bg-white p-4 text-cs-dark opacity-0 shadow-md duration-100 group-hover:pointer-events-auto group-hover:opacity-100">
      <div className="border-b pb-2 text-center text-gray-500">
        All Categories
      </div>
      <div className="grid grid-cols-3 gap-2">
        {categories!.map(({ _id, categoryName }) => (
          <Link
            to={`/categories/${categoryName.toLowerCase()}`}
            key={_id}
            className="text-center text-sm hover:underline"
          >
            {categoryName}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPopup;
