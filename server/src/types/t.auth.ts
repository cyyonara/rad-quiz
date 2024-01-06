export interface LoginFormData {
  username: string;
  password: string;
}

export interface SignUpFormdata extends LoginFormData {
  image: string;
}
