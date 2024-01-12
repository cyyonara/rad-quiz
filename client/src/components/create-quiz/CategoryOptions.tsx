import useCategories from "../../hooks/useCategories";
import { memo, FC } from "react";

const CategoryOptions: FC = () => {
  const { data: categories, isSuccess } = useCategories();

  return (
    <>
      {isSuccess &&
        categories.map(({ _id, categoryName }) => (
          <option key={_id} value={categoryName}>
            {categoryName}
          </option>
        ))}
    </>
  );
};

export default memo(CategoryOptions);
