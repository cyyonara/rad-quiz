import IQuiz from "../types/t.quiz";
import A_Error from "../types/t.axios_error";
import axios from "axios";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

interface UploadResponse {
  message: string;
}

const uploadQuiz = async (quiz: IQuiz): Promise<UploadResponse> => {
  quiz.questions = quiz.questions.map(({ questionId, ...rest }) => ({
    ...rest,
  }));
  const response = await axios.post<UploadResponse>("/api/quiz", quiz, {
    withCredentials: true,
  });
  return response.data;
};

const useUploadQuiz = (): UseMutationResult<UploadResponse, A_Error, IQuiz> => {
  return useMutation<UploadResponse, A_Error, IQuiz>({
    mutationFn: uploadQuiz,
  });
};

export default useUploadQuiz;
