import { User } from '@dev-together/auth';
import { Article, Comment } from '@dev-together/article';
import { Profile } from '@dev-together/profile';
import { HttpErrorResponse } from '@angular/common/http';

export interface ApiResponse {
  code: number;
  message?: string;
  error?: object;
}

export type ErrorResponse = Partial<HttpErrorResponse>;

export interface UserResponse extends ApiResponse {
  user?: User;
}

export interface ProfileResponse extends ApiResponse {
  profile: Profile;
}

export interface ArticleResponse extends ApiResponse {
  article: Article;
}

export interface CommentResponse extends ApiResponse {
  comment: Comment;
}

export interface CommentsResponse extends ApiResponse {
  comments: Comment[];
}
