import UserCredentials from "../types/t.auth.credentials";
import A_Error from "../types/t.axios_error";
import axios from "axios";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

interface SignupForm {
  username: string;
  password: string;
}

const signup = async (formData: SignupForm): Promise<UserCredentials> => {
  const response = await axios.post<UserCredentials>(
    "/api/auth/signup",
    formData,
  );
  return response.data;
};

const useSignup = (): UseMutationResult<
  UserCredentials,
  A_Error,
  SignupForm
> => {
  return useMutation<UserCredentials, A_Error, SignupForm>({
    mutationKey: ["signup"],
    mutationFn: signup,
  });
};

export default useSignup;
