import axios from "axios";
import A_Error from "../types/t.axios_error";
import Categories from "../types/t.category";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const getCategories = async (): Promise<Categories[]> => {
  const response = await axios.get("/api/categories");
  return response.data;
};

const useCategories = (): UseQueryResult<Categories[], A_Error> => {
  return useQuery<Categories[], A_Error>({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 5 * (1000 * 60),
    refetchOnWindowFocus: false,
  });
};

export default useCategories;
