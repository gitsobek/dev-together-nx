import { Injectable } from "@angular/core";
import { ApiService, UserResponse } from '@dev-together/api';
import { Observable } from "rxjs";
import { LoginUser, RegisterUser } from '../+state/auth.models'

@Injectable()
export class AuthService {
  constructor(private apiService: ApiService) {}

  user(): Observable<UserResponse> {
    return this.apiService.get<UserResponse>('/user');
  }

  login(credentials: LoginUser): Observable<UserResponse> {
    return this.apiService.post<UserResponse, LoginUser>('/users/login', credentials);
  }

  register(credentials: RegisterUser): Observable<UserResponse> {
    return this.apiService.post<UserResponse, RegisterUser>('/users', credentials);
  }
}