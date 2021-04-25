import { User } from "@dev-together/auth";

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  favorites: number;
  favorited: boolean;
  author: Profile;
}

export type Profile = Omit<User, 'token' | 'email'> & { following: boolean };

export interface Comment {
  id: number;
  body: string;
  createdAt: string;
  author: Profile;
}