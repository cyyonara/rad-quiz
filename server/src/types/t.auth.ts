export interface LoginFormData {
  username: string;
  password: string;
}

export interface SignupFormdata extends LoginFormData {
  image: string;
}
