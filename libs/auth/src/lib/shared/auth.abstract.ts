import { UserResponse } from '@dev-together/api';
import { LoginUser, RegisterUser } from '@dev-together/auth';
import { Observable } from 'rxjs';

export abstract class Auth {
  abstract user(): Observable<UserResponse>;
  abstract login(credentials: LoginUser): Observable<UserResponse>;
  abstract register(credentials: RegisterUser): Observable<UserResponse>;
}
