import { User } from '@dev-together/auth';

interface Response {
  code: number;
  message?: string;
  error?: object;
}

export interface UserResponse extends Response {
  user?: User;
}
