import { AxiosError } from "axios";

export default interface A_Error extends AxiosError<{ message: string }> {}
