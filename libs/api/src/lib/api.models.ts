import { User } from '@dev-together/auth';
import { Article } from '@dev-together/article';
import { HttpErrorResponse } from '@angular/common/http';

interface Response {
  code: number;
  message?: string;
  error?: object;
}

export type ErrorResponse = Partial<HttpErrorResponse>;

export interface UserResponse extends Response {
  user?: User;
}

export interface ProfileResponse extends Response {
  profile: object;
}

export interface ArticleResponse extends Response {
  article: Article;
}
