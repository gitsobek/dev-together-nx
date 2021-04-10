export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface RegisterUser {
  username: string;
  email: string;
  password: string;
}