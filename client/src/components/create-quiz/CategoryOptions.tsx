import useCategories from "../../hooks/useCategories";

export default function CategoryOptions() {
  const { data: categories, isSuccess } = useCategories();

  return (
    <>
      {isSuccess &&
        categories.map(({ _id, categoryName }) => (
          <option key={_id} value={_id}>
            {categoryName}
          </option>
        ))}
    </>
  );
}
