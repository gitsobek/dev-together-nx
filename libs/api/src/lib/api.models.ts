import { User } from '@dev-together/auth';
import { Article, Comment, Profile } from '@dev-together/article';
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
  profile: Profile;
}

export interface ArticleResponse extends Response {
  article: Article;
}

export interface CommentResponse extends Response {
  comment: Comment;
}

export interface CommentsResponse extends Response {
  comments: Comment[];
}
